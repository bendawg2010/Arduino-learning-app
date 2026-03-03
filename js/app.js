/* ─────────────────────────────────────────────────────────
   app.js  –  Main application controller for ArduinoLearn.
              Step-based guided lesson flow.
   ───────────────────────────────────────────────────────── */

// ── Markdown → HTML (used for hardware lesson theory) ──────
function md2html(md) {
  if (!md) return '';
  let s = md.trim();

  // 1. Fenced code blocks (must be first)
  s = s.replace(/```(?:\w*)\n([\s\S]*?)```/g, (_, code) =>
    `<pre><code>${code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`);

  // 2. Markdown tables
  s = s.replace(/((?:\|[^\n]+\|\n?)+)/g, match => {
    const rows = match.trim().split('\n').filter(l => !/^\|[-|: ]+\|$/.test(l.trim()));
    if (!rows.length) return match;
    return '<table class="lesson-table">' + rows.map((row, i) => {
      const cells = row.split('|').slice(1, -1);
      const tag = i === 0 ? 'th' : 'td';
      return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`;
    }).join('') + '</table>';
  });

  // 3. Blockquotes → info-box
  s = s.replace(/^> (.+)$/gm, '<div class="info-box">$1</div>');

  // 4. Headings
  s = s.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  s = s.replace(/^## (.+)$/gm, '<h2>$1</h2>');

  // 5. Unordered lists
  s = s.replace(/((?:^- .+\n?)+)/gm, m => {
    const items = m.trim().split('\n').map(l => `<li>${l.slice(2)}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  // 6. Inline bold + code
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/`([^`\n]+)`/g, '<code>$1</code>');

  // 7. Wrap bare text blocks in <p>
  s = s.split(/\n{2,}/).map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<[a-z]/.test(block)) return block;
    return `<p>${block.replace(/\n/g, ' ')}</p>`;
  }).join('\n');

  return s;
}

// ── Auto-generate steps for hardware lessons (no steps array) ─
function _buildHWSteps(lesson) {
  const steps = [];

  // Step 1: Theory + wiring
  let learnHTML = lesson.theory ? md2html(lesson.theory) : `<p>${lesson.desc || ''}</p>`;
  if (lesson.wiring && lesson.wiring.length) {
    learnHTML += '<h3>🔌 Wiring</h3><ul>' +
      lesson.wiring.map(w => `<li>${w}</li>`).join('') + '</ul>';
  }
  if (lesson.parts && lesson.parts.length) {
    learnHTML += '<h3>🛒 Parts Needed</h3><ul>' +
      lesson.parts.map(p => `<li>${p}</li>`).join('') + '</ul>';
  }
  steps.push({ type: 'learn', title: 'How It Works', icon: '📖', content: learnHTML });

  // Step 2: Run the code
  if (lesson.starterCode) {
    steps.push({
      type: 'run', title: 'Try It', icon: '▶',
      content: '<p>Click <strong>▶ Run</strong> to test in the simulator, or upload to your Arduino.</p>',
      code: lesson.starterCode,
    });
  }

  // Step 3: Challenge
  if (lesson.challenge) {
    steps.push({
      type: 'challenge', title: 'Challenge', icon: '🎯',
      content: `<p>${lesson.challenge}</p>`,
      code: lesson.starterCode || '',
      hint: 'Check the wiring section and re-read the theory for clues.',
      validate: lesson.validate || (() => false),
    });
  }

  return steps.length ? steps :
    [{ type: 'learn', title: lesson.title, icon: lesson.icon || '📖', content: `<p>${lesson.desc || ''}</p>` }];
}

// Apply to every lesson that has no steps array
LESSONS.forEach(lesson => { if (!lesson.steps) lesson.steps = _buildHWSteps(lesson); });
const DEFAULT_STATE = {
  xp: 0, level: 1,
  completedLessons: [], quizScores: {}, achievements: [],
  challengesPassed: 0, firstTryPasses: 0,
  serialUsed: false, pwmUsed: false,
  savedCodes: {},
};
let STATE = loadState();
let board  = null;
let editor = null;
let currentLesson    = null;
let currentStepIdx   = 0;
let stepChallengePassed = false;
let stepQuizAnswered    = false;
let challengeAttempts   = 0;

function loadState() {
  try {
    const s = localStorage.getItem('arduinolearn_state');
    return s ? { ...DEFAULT_STATE, ...JSON.parse(s) } : { ...DEFAULT_STATE };
  } catch { return { ...DEFAULT_STATE }; }
}
function saveState() {
  localStorage.setItem('arduinolearn_state', JSON.stringify(STATE));
}

// ── XP / Levels ────────────────────────────────────────────
function addXP(amount) {
  const oldLevel = getLevel();
  STATE.xp += amount;
  saveState();
  updateXPBar();
  showXPPop(amount);
  const newLevel = getLevel();
  if (newLevel.level > oldLevel.level) showLevelUpToast(newLevel);
  checkAchievements();
}

function getLevel() {
  let cur = LEVELS[0];
  for (const l of LEVELS) { if (STATE.xp >= l.xp) cur = l; }
  return cur;
}
function getNextLevel() {
  const idx = LEVELS.findIndex(l => l.level === getLevel().level);
  return LEVELS[idx + 1] || null;
}

function updateXPBar() {
  const cur  = getLevel();
  const next = getNextLevel();
  const chip = document.getElementById('level-chip');
  const fill = document.getElementById('xp-fill');
  const lbl  = document.getElementById('xp-label');
  if (!chip) return;
  chip.textContent = `Lv ${cur.level}`;
  if (next) {
    const pct = ((STATE.xp - cur.xp) / (next.xp - cur.xp) * 100).toFixed(1);
    fill.style.width = Math.min(100, pct) + '%';
    lbl.textContent  = `${STATE.xp} / ${next.xp} XP`;
  } else {
    fill.style.width = '100%';
    lbl.textContent  = `${STATE.xp} XP — MAX`;
  }
}

function showXPPop(amount) {
  const pop = document.createElement('div');
  pop.className = 'xp-pop';
  pop.textContent = `+${amount} XP`;
  document.body.appendChild(pop);
  const bar = document.getElementById('xp-fill');
  if (bar) {
    const r = bar.getBoundingClientRect();
    pop.style.left = r.left + 'px';
    pop.style.top  = (r.top - 10) + 'px';
  }
  setTimeout(() => pop.remove(), 1400);
}

// ── Achievements ────────────────────────────────────────────
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (STATE.achievements.includes(ach.id)) return;
    try {
      if (ach.cond(STATE)) {
        STATE.achievements.push(ach.id);
        saveState();
        showAchievementToast(ach);
      }
    } catch(_) {}
  });
}

// ── Toasts ──────────────────────────────────────────────────
let _toastQueue = [];
let _toastBusy  = false;
function showAchievementToast(ach) {
  _toastQueue.push(ach);
  if (!_toastBusy) _nextToast();
}
function _nextToast() {
  if (!_toastQueue.length) { _toastBusy = false; return; }
  _toastBusy = true;
  const ach   = _toastQueue.shift();
  const toast = document.getElementById('achievement-toast');
  document.getElementById('ach-toast-icon').textContent = ach.icon;
  document.getElementById('ach-toast-name').textContent = ach.name;
  toast.classList.remove('hidden');
  setTimeout(() => { toast.classList.add('hidden'); setTimeout(_nextToast, 300); }, 3500);
}

function showLevelUpToast(lvl) {
  const toast = document.getElementById('levelup-toast');
  document.getElementById('lvl-sub').textContent = `Level ${lvl.level} — ${lvl.title}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3200);
}

// ── Mobile tab bar ────────────────────────────────────────
function updateMobileTabs(screen) {
  document.querySelectorAll('.tab-item').forEach(el => {
    const tab = el.dataset.tab;
    const match = tab === screen || (screen === 'lesson' && tab === 'lesson-picker');
    el.classList.toggle('active', match);
  });
}

function showLessonPicker() {
  // On mobile, show a modal with all lessons grouped by difficulty
  const groups = ['beginner', 'intermediate', 'advanced'];
  const body = groups.map(diff => {
    const lessons = LESSONS.filter(l => l.difficulty === diff);
    return `
      <div style="margin-bottom:16px">
        <div style="font-size:.7rem;font-weight:700;text-transform:uppercase;
                    letter-spacing:.08em;color:var(--text3);margin-bottom:8px">${diff}</div>
        ${lessons.map(l => {
          const done = STATE.completedLessons.includes(l.id);
          return `<div onclick="closeModal();navigate('lesson','${l.id}')"
                       style="display:flex;align-items:center;gap:12px;
                              padding:12px 14px;border-radius:var(--radius);
                              background:var(--surface3);border:1px solid var(--border);
                              margin-bottom:6px;cursor:pointer;min-height:52px">
            <span style="font-size:1.4rem">${l.icon}</span>
            <div style="flex:1">
              <div style="font-size:.9rem;font-weight:600">${l.title}</div>
              <div style="font-size:.72rem;color:var(--text3)">${l.steps ? l.steps.length : 0} steps · +${l.xp} XP</div>
            </div>
            ${done ? '<span style="color:var(--green);font-size:.9rem">✓</span>' : ''}
          </div>`;
        }).join('')}
      </div>`;
  }).join('');
  showModal('📚 Choose a Lesson', body, `<button class="btn-secondary" onclick="closeModal()">Close</button>`);
  document.getElementById('modal-bg').classList.remove('hidden');
  updateMobileTabs('lesson');
}

// ── Navigation ──────────────────────────────────────────────
async function navigate(screen, lessonId) {
  if (board && board.isRunning()) await board.stop();

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const active = document.querySelector(`.nav-item[data-screen="${screen}"]`);
  if (active) active.classList.add('active');
  updateMobileTabs(screen);

  const content = document.getElementById('content');
  if (screen === 'home') {
    content.innerHTML = renderHome();
  } else if (screen === 'lesson' && lessonId) {
    renderLesson(lessonId);
  } else if (screen === 'reference') {
    content.innerHTML = renderReference();
  } else if (screen === 'achievements') {
    content.innerHTML = renderAchievements();
  } else if (screen === 'projects') {
    content.innerHTML = renderProjects();
  } else if (screen === 'playground') {
    renderPlayground();
  }
  window.scrollTo(0, 0);
}

// ── Sidebar ──────────────────────────────────────────────────
function populateSidebar() {
  ['beginner', 'intermediate', 'advanced'].forEach(diff => {
    const container = document.getElementById(`nav-${diff}`);
    if (!container) return;
    container.innerHTML = '';
    LESSONS.filter(l => l.difficulty === diff).forEach(lesson => {
      const div = document.createElement('div');
      const done = STATE.completedLessons.includes(lesson.id);
      div.className = 'nav-item';
      div.dataset.lesson = lesson.id;
      div.innerHTML = `<span>${lesson.icon}</span><span class="nav-lesson-title">${lesson.title}</span>${done ? '<span class="nav-check">✓</span>' : ''}`;
      div.addEventListener('click', () => navigate('lesson', lesson.id));
      container.appendChild(div);
    });
  });
}

// ── Home Screen ─────────────────────────────────────────────
function renderHome() {
  const total = LESSONS.length;
  const done  = STATE.completedLessons.length;
  const pct   = total > 0 ? Math.round(done / total * 100) : 0;
  const lvl   = getLevel();
  const next  = LESSONS.find(l => !STATE.completedLessons.includes(l.id)) || LESSONS[0];

  return `
  <div class="dash-hero">
    <h1>Welcome to <span>ArduinoLearn</span> ⚡</h1>
    <p>Step-by-step guided lessons, a live simulator, quizzes &amp; hands-on challenges.
       Go from zero to Arduino hero — one concept at a time!</p>
    <div class="hero-btns">
      <button class="btn-primary" onclick="navigate('lesson','${next.id}')">
        ${done === 0 ? '🚀 Start Learning' : '▶ Continue Learning'}
      </button>
      <button class="btn-secondary" onclick="navigate('playground')">🧪 Free Playground</button>
      <button class="btn-secondary" onclick="navigate('reference')">📚 Reference</button>
    </div>
  </div>

  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-icon">📚</div>
      <div class="stat-val">${done}/${total}</div>
      <div class="stat-label">Lessons Complete</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">⭐</div>
      <div class="stat-val">${STATE.xp}</div>
      <div class="stat-label">Total XP</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">⚡</div>
      <div class="stat-val">Lv ${lvl.level}</div>
      <div class="stat-label">${lvl.title}</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🏆</div>
      <div class="stat-val">${STATE.achievements.length}/${ACHIEVEMENTS.length}</div>
      <div class="stat-label">Achievements</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📈</div>
      <div class="stat-val">${pct}%</div>
      <div class="stat-label">Progress</div>
    </div>
  </div>

  <div class="section-header"><h2>All Lessons</h2></div>
  <div class="lesson-grid">${LESSONS.map(l => lessonCard(l)).join('')}</div>
  `;
}

function lessonCard(lesson) {
  const done  = STATE.completedLessons.includes(lesson.id);
  const steps = lesson.steps ? lesson.steps.length : 0;
  return `
  <div class="lesson-card ${done ? 'completed' : ''}" onclick="navigate('lesson','${lesson.id}')">
    <div class="lesson-card-icon">${lesson.icon}</div>
    <div class="lesson-card-title">${lesson.title}</div>
    <div class="lesson-card-desc">${lesson.desc}</div>
    <div class="lesson-card-meta">
      <span class="diff-badge ${lesson.difficulty}">${lesson.difficulty}</span>
      <span class="xp-badge"><span>+${lesson.xp}</span> XP</span>
      <span style="color:var(--text3);font-size:.72rem">${steps} steps</span>
    </div>
  </div>`;
}

// ── Markdown → HTML (for hardware lesson theory fields) ──
function mdToHtml(md) {
  if (!md) return '';
  let h = md
    // Fenced code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, (_, c) => `<pre><code>${c.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`)
    // Tables: detect lines with | and convert
    .replace(/((?:\|[^\n]+\|\n?)+)/g, (tbl) => {
      const rows = tbl.trim().split('\n').filter(r => !/^\s*\|[-| :]+\|\s*$/.test(r));
      if (rows.length < 1) return tbl;
      const mkRow = (r, tag) => '<tr>' + r.split('|').filter((_, i, a) => i > 0 && i < a.length - 1)
        .map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
      return `<table class="md-table"><thead>${mkRow(rows[0], 'th')}</thead><tbody>${
        rows.slice(1).map(r => mkRow(r, 'td')).join('')}</tbody></table>`;
    })
    // Headers
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm,  '<h3>$1</h3>')
    .replace(/^# (.+)$/gm,   '<h2>$1</h2>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, (m) => `<ul>${m}</ul>`)
    // Nested ul fix: collapse adjacent </ul><ul>
    .replace(/<\/ul>\s*<ul>/g, '')
    // Bold & italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Paragraphs: double newline
    .replace(/\n\n+/g, '</p><p>')
    .replace(/^(?!<[a-z])(.+)$/gm, (m) => m.trim() ? m : '');
  return `<p>${h}</p>`.replace(/<p>\s*<\/p>/g, '').replace(/<p>(<(?:h[2-4]|ul|pre|blockquote|table)[^>]*>)/g, '$1').replace(/(<\/(?:h[2-4]|ul|pre|blockquote|table)>)<\/p>/g, '$1');
}

// ── Convert hardware-format lesson to step-based ──────────
function buildHardwareSteps(lesson) {
  const clone = Object.assign({}, lesson);

  let theoryHtml = mdToHtml(lesson.theory || '');
  if (lesson.parts && lesson.parts.length) {
    theoryHtml = `<div class="info-box"><strong>Parts needed:</strong><ul>${
      lesson.parts.map(p => `<li>${p}</li>`).join('')}</ul></div>` + theoryHtml;
  }
  if (lesson.wiring && lesson.wiring.length) {
    theoryHtml += `<div class="info-box tip"><strong>Wiring:</strong><ul>${
      lesson.wiring.map(w => `<li>${w}</li>`).join('')}</ul></div>`;
  }
  if (lesson.skills && lesson.skills.length) {
    theoryHtml += `<div class="info-box"><strong>Skills:</strong> ${lesson.skills.join(' · ')}</div>`;
  }

  clone.steps = [];

  // Step 1 — Theory
  clone.steps.push({
    type: 'learn',
    title: lesson.title,
    icon: lesson.icon || '📖',
    content: theoryHtml,
  });

  // Step 2 — Run starter code
  if (lesson.starterCode) {
    clone.steps.push({
      type: 'run',
      title: 'Run the Starter Code',
      icon: '▶',
      content: `<h3>Try It in the Simulator!</h3>
<p>Click <strong>▶ Run</strong> to execute the code. Watch the Serial Monitor output and interact with the simulator components.</p>`,
      code: lesson.starterCode,
    });
  }

  // Step 3 — Challenge
  if (lesson.challenge) {
    clone.steps.push({
      type: 'challenge',
      title: 'Your Challenge',
      icon: '🎯',
      content: `<h3>Challenge</h3><p>${lesson.challenge}</p>`,
      code: lesson.starterCode || '',
      // Hardware validators use (simState) but checkStepChallenge calls (code, simState)
      validate: lesson.validate ? (_code, simState) => lesson.validate(simState) : undefined,
      hint: 'Modify the starter code above to meet the challenge requirements. Check the Serial Monitor for output.',
    });
  }

  return clone;
}

// ── Lesson Screen (step-based) ────────────────────────────
function renderLesson(lessonId) {
  const raw = LESSONS.find(l => l.id === lessonId);
  if (!raw) return navigate('home');
  // Hardware lessons use theory/starterCode format — convert to step format
  currentLesson = raw.steps ? raw : buildHardwareSteps(raw);

  currentStepIdx      = 0;
  stepChallengePassed = false;
  stepQuizAnswered    = false;
  challengeAttempts   = 0;

  const idx  = LESSONS.indexOf(currentLesson);
  const prev = LESSONS[idx - 1];
  const nxt  = LESSONS[idx + 1];

  document.querySelectorAll('.nav-item[data-lesson]').forEach(el => {
    el.classList.toggle('active', el.dataset.lesson === lessonId);
  });

  const content = document.getElementById('content');
  content.innerHTML = `
  <div class="lesson-view" id="lesson-view">

    <div class="lesson-header">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <span style="font-size:1.5rem">${currentLesson.icon}</span>
        <h1 style="font-size:1.25rem;font-weight:700">${currentLesson.title}</h1>
        <span class="diff-badge ${currentLesson.difficulty}">${currentLesson.difficulty}</span>
        ${STATE.completedLessons.includes(lessonId) ? '<span style="color:var(--green);font-size:.8rem">✓ Completed</span>' : ''}
      </div>
      <div class="lesson-nav-btns">
        ${prev ? `<button onclick="navigate('lesson','${prev.id}')">← Prev</button>` : ''}
        <button onclick="navigate('home')">🏠 Home</button>
        ${nxt  ? `<button onclick="navigate('lesson','${nxt.id}')">Next Lesson →</button>` : ''}
      </div>
    </div>

    <!-- Left panel: guided step content -->
    <div class="theory-panel" id="step-panel">
      <div id="step-area" style="display:flex;flex-direction:column;height:100%"></div>
    </div>

    <!-- Right panel: editor + simulator -->
    <div class="editor-panel">
      <div class="editor-toolbar">
        <span class="toolbar-title">sketch.ino&nbsp;<span style="color:var(--text3);font-weight:400;font-size:.72rem">(Ctrl+Enter = Run)</span></span>
        <button class="run-btn" id="run-btn" onclick="toggleRun()">▶ Run</button>
        <button class="reset-code-btn" onclick="resetCode()">↺ Reset</button>
      </div>
      <div class="editor-cm-wrap" id="editor-wrap"></div>
      <div class="sim-panel">
        <div class="sim-header">
          <strong>Simulator</strong>
          <span id="sim-status-label" style="font-size:.7rem;color:var(--text3);margin-left:8px">○ Idle</span>
          <span style="flex:1"></span>
          <div class="sim-status-dot" id="sim-status-dot"></div>
        </div>
        <div class="sim-body" id="sim-body"></div>
      </div>
    </div>
  </div>`;

  // Pick first step with code for initial editor value
  const firstCode = currentLesson.steps.find(s => s.code)?.code ||
    raw.starterCode ||
    '// Your code here\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // ...\n}';

  const wrap = document.getElementById('editor-wrap');
  if (typeof CodeMirror !== 'undefined') {
    editor = CodeMirror(wrap, {
      value:        firstCode,
      mode:         'text/x-c++src',
      theme:        'dracula',
      lineNumbers:  true,
      indentWithTabs: false,
      tabSize:      2,
      autofocus:    true,
      extraKeys: { 'Ctrl-Enter': toggleRun, 'Cmd-Enter': toggleRun },
    });
    setTimeout(() => { editor.setSize('100%', '100%'); editor.refresh(); }, 60);
  } else {
    wrap.innerHTML = `<textarea id="editor-fallback"
      style="width:100%;height:100%;background:#1e1e2e;color:#cdd6f4;font-family:monospace;
             font-size:13px;padding:12px;border:none;resize:none;outline:none;
             line-height:1.6;tab-size:2">${firstCode}</textarea>`;
    editor = {
      getValue: () => document.getElementById('editor-fallback').value,
      setValue: (v) => { document.getElementById('editor-fallback').value = v; },
      setSize: () => {}, refresh: () => {},
    };
  }

  board = new ArduinoBoard(document.getElementById('sim-body'), currentLesson.components || []);
  renderStep();
}

// ── Step Renderer ─────────────────────────────────────────
function renderStep() {
  if (!currentLesson) return;
  const step  = currentLesson.steps[currentStepIdx];
  const total = currentLesson.steps.length;
  const isFirst = currentStepIdx === 0;
  const isLast  = currentStepIdx === total - 1;
  const alreadyDone = STATE.completedLessons.includes(currentLesson.id);

  // Determine if Next should be locked
  let nextLocked = false;
  if (!alreadyDone) {
    if (step.type === 'challenge' && !stepChallengePassed) nextLocked = true;
    if (step.type === 'quiz'      && !stepQuizAnswered)    nextLocked = true;
  }

  // Update editor only if this step has code
  if (step.code && editor) {
    editor.setValue(step.code);
  }

  // Build progress dots
  const stepTypeIcons = { learn: '📖', run: '▶', modify: '✏️', challenge: '🎯', quiz: '❓' };
  const dots = currentLesson.steps.map((s, i) => {
    const cls = i < currentStepIdx ? 'done' : i === currentStepIdx ? 'current' : '';
    return `<div class="step-dot ${cls}" title="${s.title || ''}"></div>`;
  }).join('');

  // Build step body HTML
  let bodyHTML = step.content || '';

  if (step.type === 'challenge') {
    bodyHTML += `
      <div class="challenge-box" style="margin-top:16px">
        <div class="challenge-result" id="step-challenge-result"></div>
        <button class="btn-primary" id="step-check-btn" onclick="checkStepChallenge()" style="margin-top:8px;width:100%">
          ✔ Check My Code
        </button>
        <div style="margin-top:10px">
          <button onclick="showStepHint()" style="color:var(--yellow);font-size:.8rem;text-decoration:underline;cursor:pointer">
            💡 Show Hint
          </button>
          <div id="step-hint-box" class="info-box hidden" style="margin-top:8px"></div>
        </div>
      </div>`;
  }

  if (step.type === 'quiz') {
    const letters = ['A', 'B', 'C', 'D'];
    bodyHTML += `
      <div id="step-quiz-area" style="margin-top:16px">
        <div class="quiz-q">${step.q}</div>
        <div class="quiz-opts" id="step-quiz-opts">
          ${step.opts.map((opt, i) => `
            <div class="quiz-opt" data-idx="${i}">
              <div class="quiz-opt-letter">${letters[i]}</div>
              <span>${opt}</span>
            </div>`).join('')}
        </div>
        <div id="step-quiz-explain" class="quiz-explanation hidden"></div>
      </div>`;
  }

  const area = document.getElementById('step-area');
  area.innerHTML = `
    <div class="step-progress">${dots}</div>
    <div class="step-header">
      <span class="step-type-icon">${step.icon || stepTypeIcons[step.type] || '📄'}</span>
      <div>
        <div class="step-counter">Step ${currentStepIdx + 1} of ${total}</div>
        <div class="step-title">${step.title}</div>
      </div>
    </div>
    <div class="step-body theory-content">${bodyHTML}</div>
    <div class="step-nav-btns">
      <button class="btn-secondary step-back-btn" ${isFirst ? 'disabled' : ''} onclick="goPrevStep()">← Back</button>
      <button class="btn-primary step-next-btn" id="step-next-btn" ${nextLocked ? 'disabled' : ''} onclick="goNextStep()">
        ${isLast ? '🎉 Finish Lesson!' : 'Next →'}
      </button>
    </div>`;

  // Attach quiz listeners after DOM is updated
  if (step.type === 'quiz') {
    document.querySelectorAll('#step-quiz-opts .quiz-opt').forEach(el => {
      el.addEventListener('click', () => handleStepQuiz(el, step));
    });
  }
}

// ── Step Navigation ───────────────────────────────────────
function goNextStep() {
  if (!currentLesson) return;
  const total = currentLesson.steps.length;
  if (currentStepIdx >= total - 1) {
    completeLesson();
    return;
  }
  currentStepIdx++;
  stepChallengePassed = false;
  stepQuizAnswered    = false;
  renderStep();
}

function goPrevStep() {
  if (currentStepIdx <= 0) return;
  currentStepIdx--;
  stepChallengePassed = false;
  stepQuizAnswered    = false;
  renderStep();
}

// ── Challenge Handler ─────────────────────────────────────
async function checkStepChallenge() {
  if (!currentLesson || !editor || !board) return;
  const step = currentLesson.steps[currentStepIdx];
  if (!step || !step.validate) return;

  const resultEl = document.getElementById('step-challenge-result');
  const btnEl    = document.getElementById('step-check-btn');
  if (!resultEl) return;

  resultEl.className = 'challenge-result';
  resultEl.innerHTML = '<span style="color:var(--text3)">⏳ Checking…</span>';
  if (btnEl) { btnEl.disabled = true; btnEl.textContent = '⏳ Checking…'; }

  const code = editor.getValue();
  if (board.isRunning()) await board.stop();
  await board.runForCheck(code);

  if (btnEl) { btnEl.disabled = false; btnEl.textContent = '✔ Check My Code'; }

  // Check for syntax/runtime errors first — never pass with broken code
  const lastError = board.getLastError();
  if (lastError) {
    challengeAttempts++;
    resultEl.className = 'challenge-result fail';
    const safeErr = lastError.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    resultEl.innerHTML = `
      <strong>❌ Code Error</strong><br>
      <code class="err-msg">${safeErr}</code><br>
      <button class="btn-explain" onclick="explainMistake('syntax')">💡 Explain My Mistake</button>`;
    return;
  }

  const simState = board.getState();
  let passed = false;
  try { passed = step.validate(code, simState); } catch(_) {}

  challengeAttempts++;
  resultEl.className = 'challenge-result ' + (passed ? 'pass' : 'fail');

  if (passed) {
    resultEl.innerHTML = '🎉 Challenge complete! Click <strong>Next</strong> to continue.';
    stepChallengePassed = true;

    STATE.challengesPassed++;
    if (challengeAttempts === 1) STATE.firstTryPasses++;
    if (simState.serialUsed) { STATE.serialUsed = true; }
    if (simState.pwmUsed)    { STATE.pwmUsed    = true; }
    saveState();
    checkAchievements();
    launchConfetti();

    const nextBtn = document.getElementById('step-next-btn');
    if (nextBtn) nextBtn.disabled = false;
  } else {
    resultEl.innerHTML = `
      ❌ Not quite right yet!<br>
      <button class="btn-explain" onclick="explainMistake('logic')">💡 Explain My Mistake</button>
      <button class="btn-hint" onclick="showStepHint()" style="margin-left:8px">💡 Show Hint</button>`;
  }
}

// ── Explain Mistake ───────────────────────────────────────
function explainMistake(errorType) {
  if (!currentLesson || !editor) return;
  const step = currentLesson.steps[currentStepIdx];
  const code = editor.getValue();
  const resultEl = document.getElementById('step-challenge-result');
  if (!resultEl) return;

  // If the step has a custom explain function, use it
  if (step.explainFn) {
    const simState = board ? board.getState() : {};
    const msg = step.explainFn(code, simState, errorType);
    if (msg) {
      showExplainModal(msg);
      return;
    }
  }

  // Generic explanations based on error type + common code analysis
  let msg = '';
  if (errorType === 'syntax') {
    const lastError = board ? board.getLastError() : '';
    msg = `<h3>🔍 Code Error Detected</h3>
<p>Your code has a <strong>syntax error</strong> — this means the Arduino can't even understand it.</p>
<p class="err-detail">${lastError ? lastError.replace(/</g,'&lt;') : 'Unknown error'}</p>
<h4>Common causes:</h4>
<ul>
  <li>Missing semicolon <code>;</code> at the end of a line</li>
  <li>Mismatched curly braces <code>{ }</code> — count your opens and closes!</li>
  <li>Typo in a function name (remember: it's <code>digitalWrite</code> not <code>digitalwrite</code>)</li>
  <li>Missing closing parenthesis <code>)</code></li>
</ul>
<p>💡 <strong>Tip:</strong> Read the error message above carefully — it usually tells you exactly what's wrong!</p>`;
  } else {
    // Analyze code for common logic mistakes
    const lines = code.split('\n');
    const hints = [];

    if (step.hint) hints.push(`<li>${step.hint}</li>`);

    // Check for missing setup()/loop()
    if (!code.includes('void setup') && !code.includes('void loop')) {
      hints.push('<li>Your sketch needs both <code>void setup()</code> and <code>void loop()</code> functions!</li>');
    }

    // Check for missing Serial.begin if Serial.print used
    if (code.includes('Serial.print') && !code.includes('Serial.begin')) {
      hints.push('<li>You\'re using <code>Serial.print()</code> but forgot <code>Serial.begin(9600);</code> in setup()!</li>');
    }

    // Check for missing pinMode
    if ((code.includes('digitalWrite') || code.includes('digitalRead')) && !code.includes('pinMode')) {
      hints.push('<li>Remember to call <code>pinMode(pin, OUTPUT)</code> or <code>pinMode(pin, INPUT)</code> in setup()!</li>');
    }

    msg = `<h3>🔍 Logic Check</h3>
<p>Your code runs without errors, but it doesn't quite do what the challenge expects yet.</p>
${hints.length > 0 ? `<h4>Things to check:</h4><ul>${hints.join('')}</ul>` : ''}
<h4>General tips:</h4>
<ul>
  <li>Re-read the challenge description carefully</li>
  <li>Check your pin numbers match what the challenge asks for</li>
  <li>Make sure you're using the right function (<code>digitalWrite</code> vs <code>analogWrite</code>)</li>
  <li>Check your delay values if timing matters</li>
</ul>
<p>💡 Use the <strong>Show Hint</strong> button for a specific tip about this challenge!</p>`;
  }

  showExplainModal(msg);
}

function showExplainModal(html) {
  const modalBg = document.getElementById('modal-bg');
  const modalTitle = document.getElementById('modal-title');
  const modalBody  = document.getElementById('modal-body');
  const modalFoot  = document.getElementById('modal-foot');
  if (!modalBg) return;
  modalTitle.textContent = 'Explaining Your Mistake';
  modalBody.innerHTML = html;
  modalFoot.innerHTML = '<button class="btn-primary" onclick="closeModal()">Got It!</button>';
  modalBg.classList.remove('hidden');
}

function showStepHint() {
  const step = currentLesson?.steps[currentStepIdx];
  const box  = document.getElementById('step-hint-box');
  if (!box || !step?.hint) return;
  box.textContent = '💡 ' + step.hint;
  box.classList.remove('hidden');
}

// ── Quiz Handler ──────────────────────────────────────────
function handleStepQuiz(el, step) {
  if (stepQuizAnswered) return;
  stepQuizAnswered = true;

  const chosen = parseInt(el.dataset.idx);
  document.querySelectorAll('#step-quiz-opts .quiz-opt').forEach((o, i) => {
    o.classList.add('disabled');
    if (i === step.correct) o.classList.add('correct');
    else if (i === chosen)  o.classList.add('wrong');
  });

  const explain = document.getElementById('step-quiz-explain');
  if (explain) {
    explain.textContent = (chosen === step.correct ? '✅ Correct! ' : '❌ ') + step.explain;
    explain.classList.remove('hidden');
  }

  // Track quiz score and award bonus XP for correct answer
  if (chosen === step.correct) {
    const prev = STATE.quizScores[currentLesson.id] || 0;
    STATE.quizScores[currentLesson.id] = Math.max(prev, 100);
    saveState();
    addXP(5);
    checkAchievements();
  }

  const nextBtn = document.getElementById('step-next-btn');
  if (nextBtn) nextBtn.disabled = false;
}

// ── Lesson Completion ─────────────────────────────────────
function completeLesson() {
  const alreadyDone = STATE.completedLessons.includes(currentLesson.id);

  // Save the user's current editor code for this lesson
  if (editor) {
    if (!STATE.savedCodes) STATE.savedCodes = {};
    const code = editor.getValue();
    if (code && code.trim()) {
      STATE.savedCodes[currentLesson.id] = code;
    }
  }

  if (!alreadyDone) {
    STATE.completedLessons.push(currentLesson.id);
    saveState();
    addXP(currentLesson.xp);
    updateSidebarChecks();
    checkAchievements();
    launchConfetti();
  } else {
    saveState();
  }

  const idx        = LESSONS.indexOf(currentLesson);
  const nextLesson = LESSONS[idx + 1];

  showModal(
    alreadyDone ? `✅ Lesson Reviewed!` : `🎉 Lesson Complete!`,
    `<div style="text-align:center;padding:20px 0">
      <div style="font-size:3.5rem">${currentLesson.icon}</div>
      <h2 style="margin:12px 0 6px;font-size:1.3rem">${currentLesson.title}</h2>
      ${alreadyDone
        ? `<p style="color:var(--text3)">You've already completed this lesson. Great review!</p>`
        : `<p style="color:var(--green);font-weight:600;font-size:1.1rem">+${currentLesson.xp} XP earned!</p>
           <p style="color:var(--text3);margin-top:6px">Outstanding work! Keep it up! 💪</p>`
      }
      <p style="color:var(--text3);font-size:.8rem;margin-top:10px">
        💾 Your code has been saved — find it in the Playground under "Your Saved Lesson Code"
      </p>
    </div>`,
    `${nextLesson
      ? `<button class="btn-primary" onclick="closeModal();navigate('lesson','${nextLesson.id}')">
           Next: ${nextLesson.title} →
         </button>`
      : `<button class="btn-primary" onclick="closeModal();navigate('achievements')">🏆 View Achievements</button>`}
     <button class="btn-secondary" onclick="closeModal();navigate('playground')">🧪 Open Playground</button>
     <button class="btn-secondary" onclick="closeModal();navigate('home')">🏠 Dashboard</button>`
  );
}

// ── Reset Code ────────────────────────────────────────────
function resetCode() {
  if (!currentLesson || !editor) return;
  if (board) board.stop();
  const step = currentLesson.steps[currentStepIdx];
  const code = step?.code || currentLesson.steps.find(s => s.code)?.code || '';
  if (code) editor.setValue(code);
}

function updateSidebarChecks() {
  document.querySelectorAll('.nav-item[data-lesson]').forEach(el => {
    const done = STATE.completedLessons.includes(el.dataset.lesson);
    let check = el.querySelector('.nav-check');
    if (done && !check) {
      check = document.createElement('span');
      check.className = 'nav-check';
      check.textContent = '✓';
      el.appendChild(check);
    }
  });
}

// ── Free Code Playground ─────────────────────────────────
// Hardware component definitions for playground
const PG_COMPONENTS = [
  { id: 'button',     label: '🔘 Button',      type: 'button',     pin: 2 },
  { id: 'buzzer',     label: '🔔 Buzzer',       type: 'buzzer',     pin: 8 },
  { id: 'servo',      label: '⚙️ Servo',        type: 'servo',      pin: 9 },
  { id: 'rgb',        label: '🌈 RGB LED',      type: 'rgb',        pins: { r: 9, g: 10, b: 11 } },
  { id: 'ultrasonic', label: '📡 Ultrasonic',   type: 'ultrasonic', trigPin: 9, echoPin: 10 },
  { id: 'motor',      label: '🔄 DC Motor',     type: 'motor',      enablePin: 6, in1Pin: 7, in2Pin: 8 },
  { id: 'stepper',    label: '⚙️ Stepper',      type: 'stepper',    pins: [8, 9, 10, 11] },
  { id: 'imu',        label: '🔵 IMU',          type: 'imu' },
  { id: 'lcd',        label: '📺 LCD 16×2',     type: 'lcd' },
];
let pgActiveComponents = new Set();

function renderPlayground() {
  currentLesson = null;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('content').innerHTML = `
  <div class="lesson-view" id="lesson-view">
    <div class="lesson-header">
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:1.5rem">🧪</span>
        <h1 style="font-size:1.25rem;font-weight:700">Free Code Playground</h1>
        <span style="font-size:.8rem;color:var(--text3)">Write any Arduino code and run it!</span>
      </div>
      <div class="lesson-nav-btns"><button onclick="navigate('home')">🏠 Home</button></div>
    </div>
    <div class="theory-panel">
      <div class="panel-tabs"><div class="panel-tab active">📋 Snippets</div></div>
      <div class="panel-content">
        <p style="color:var(--text3);font-size:.85rem;margin-bottom:12px">Click a snippet to load it into the editor:</p>
        ${[
          ['💡 Blink',       'void setup(){pinMode(13,OUTPUT);Serial.begin(9600);}\nvoid loop(){digitalWrite(13,HIGH);Serial.println("ON");delay(500);digitalWrite(13,LOW);Serial.println("OFF");delay(500);}'],
          ['📡 Serial',      'void setup(){Serial.begin(9600);Serial.println("Hello World!");}\nvoid loop(){Serial.print("Uptime: ");Serial.print(millis()/1000.0,1);Serial.println("s");delay(1000);}'],
          ['🌈 PWM Fade',    'void setup(){pinMode(9,OUTPUT);}\nvoid loop(){for(int b=0;b<=255;b+=5){analogWrite(9,b);delay(15);}for(int b=255;b>=0;b-=5){analogWrite(9,b);delay(15);}}'],
          ['🎛️ Analog Read', 'void setup(){Serial.begin(9600);}\nvoid loop(){int v=analogRead(A0);int p=map(v,0,1023,0,100);Serial.print("A0=");Serial.print(v);Serial.print(" (");Serial.print(p);Serial.println("%)");delay(500);}'],
          ['⏱️ millis()',    'unsigned long prev=0;\nvoid setup(){Serial.begin(9600);}\nvoid loop(){unsigned long now=millis();if(now-prev>=1000){prev=now;Serial.print("Second: ");Serial.println(now/1000);}}'],
          ['🔘 Button Read', 'void setup(){pinMode(2,INPUT_PULLUP);Serial.begin(9600);}\nvoid loop(){int state=digitalRead(2);Serial.println(state==LOW?"Button PRESSED":"Button released");delay(100);}'],
          ['🔔 Buzzer Tone', 'void setup(){pinMode(8,OUTPUT);}\nvoid loop(){for(int i=0;i<50;i++){digitalWrite(8,HIGH);delay(1);digitalWrite(8,LOW);delay(1);}delay(500);}'],
        ].map(([name, code]) => `
          <div class="snippet-chip" onclick='loadSnippet(${JSON.stringify(code)})'>${name}</div>
        `).join('')}
        <div style="margin-top:16px;border-top:1px solid var(--border);padding-top:12px">
          <p style="color:var(--text3);font-size:.82rem;margin-bottom:8px;font-weight:600">Your Saved Lesson Code:</p>
          ${renderSavedCodeSnippets()}
        </div>
      </div>
    </div>
    <div class="editor-panel">
      <div class="editor-toolbar">
        <span class="toolbar-title">playground.ino&nbsp;<span style="color:var(--text3);font-weight:400;font-size:.72rem">(Ctrl+Enter = Run)</span></span>
        <button class="run-btn" id="run-btn" onclick="toggleRun()">▶ Run</button>
        <button class="reset-code-btn" onclick="resetPlayground()">↺ Clear</button>
      </div>
      <div class="hw-toolbar" id="hw-toolbar">
        <span class="hw-toolbar-label">Hardware Components (click to add to simulator):</span>
        ${PG_COMPONENTS.map(c => `
          <div class="hw-chip" id="hw-${c.id}" onclick="toggleHWComponent('${c.id}')" title="Pin ${c.pin || c.pins?.join('/')}">
            <span class="hw-dot"></span>${c.label}
          </div>
        `).join('')}
      </div>
      <div class="editor-cm-wrap" id="editor-wrap"></div>
      <div class="sim-panel">
        <div class="sim-header">
          <strong>Simulator</strong>
          <span id="sim-status-label" style="font-size:.7rem;color:var(--text3);margin-left:8px">○ Idle</span>
          <span style="flex:1"></span>
          <div class="sim-status-dot" id="sim-status-dot"></div>
        </div>
        <div class="sim-body" id="sim-body"></div>
      </div>
    </div>
  </div>`;

  const STARTER = `// Free Playground — write any Arduino sketch!\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(13, OUTPUT);\n  Serial.println("Playground ready!");\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  Serial.println("LED ON");\n  delay(500);\n  digitalWrite(13, LOW);\n  Serial.println("LED OFF");\n  delay(500);\n}`;

  const wrap = document.getElementById('editor-wrap');
  if (typeof CodeMirror !== 'undefined') {
    editor = CodeMirror(wrap, {
      value: STARTER, mode: 'text/x-c++src', theme: 'dracula',
      lineNumbers: true, indentWithTabs: false, tabSize: 2, autofocus: true,
      extraKeys: { 'Ctrl-Enter': toggleRun, 'Cmd-Enter': toggleRun },
    });
    setTimeout(() => { editor.setSize('100%', '100%'); editor.refresh(); }, 60);
  } else {
    wrap.innerHTML = `<textarea id="editor-fallback" style="width:100%;height:100%;background:#1e1e2e;color:#cdd6f4;font-family:monospace;font-size:13px;padding:12px;border:none;resize:none;outline:none;">${STARTER}</textarea>`;
    editor = {
      getValue: () => document.getElementById('editor-fallback').value,
      setValue: (v) => { document.getElementById('editor-fallback').value = v; },
      setSize: () => {}, refresh: () => {},
    };
  }
  pgActiveComponents = new Set();
  rebuildPlaygroundBoard();
}

function renderSavedCodeSnippets() {
  const saved = STATE.savedCodes || {};
  const entries = Object.entries(saved);
  if (!entries.length) return '<p style="color:var(--text3);font-size:.8rem;font-style:italic">Complete lessons to save your code here.</p>';
  return entries.map(([id, code]) => {
    const lesson = LESSONS.find(l => l.id === id);
    const title = lesson ? `${lesson.icon} ${lesson.title}` : id;
    return `<div class="snippet-chip" onclick='loadSnippet(${JSON.stringify(code)})' title="${title}">${title}</div>`;
  }).join('');
}

window.toggleHWComponent = function(id) {
  if (pgActiveComponents.has(id)) {
    pgActiveComponents.delete(id);
  } else {
    pgActiveComponents.add(id);
  }
  document.querySelectorAll('.hw-chip').forEach(c => c.classList.remove('active'));
  pgActiveComponents.forEach(cid => {
    const el = document.getElementById(`hw-${cid}`);
    if (el) el.classList.add('active');
  });
  rebuildPlaygroundBoard();
};

function rebuildPlaygroundBoard() {
  if (board) board.stop();
  const simBody = document.getElementById('sim-body');
  if (!simBody) return;
  const components = [];
  pgActiveComponents.forEach(cid => {
    const def = PG_COMPONENTS.find(c => c.id === cid);
    if (!def) return;
    // Pass full component config (strip UI-only fields)
    const comp = Object.assign({}, def);
    delete comp.id;
    delete comp.label;
    components.push(comp);
  });
  board = new ArduinoBoard(simBody, components);
}

window.loadSnippet = (code) => { if (editor) editor.setValue(code); };
window.resetPlayground = () => {
  if (editor) editor.setValue('// Your code here\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // ...\n}');
  if (board) board.stop();
};

// ── Run / Stop ────────────────────────────────────────────
async function toggleRun() {
  if (!board || !editor) return;
  const btn = document.getElementById('run-btn');
  if (board.isRunning()) {
    if (btn) { btn.textContent = '▶ Run'; btn.classList.remove('running'); }
    await board.stop();
  } else {
    const code = editor.getValue();
    if (btn) { btn.textContent = '⏹ Stop'; btn.classList.add('running'); }
    await board.run(code);
    if (btn) { btn.textContent = '▶ Run'; btn.classList.remove('running'); }
    if (board.sim) {
      if (board.sim.serialUsed) { STATE.serialUsed = true; saveState(); checkAchievements(); }
      if (board.sim.pwmUsed)    { STATE.pwmUsed    = true; saveState(); checkAchievements(); }
    }
  }
}

// ── Confetti ──────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#00A550','#F2A900','#3fb950','#ffd700','#bc8cff'];
  for (let i = 0; i < 40; i++) {
    const d = document.createElement('div');
    d.className = 'confetti-bit';
    d.style.cssText = `left:${Math.random()*100}vw;background:${colors[i%colors.length]};
      animation-duration:${0.8+Math.random()*0.8}s;animation-delay:${Math.random()*0.3}s;
      width:${6+Math.random()*6}px;height:${6+Math.random()*6}px;border-radius:${Math.random()>0.5?'50%':'2px'}`;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 1800);
  }
}

// ── Reference ─────────────────────────────────────────────
function renderReference() {
  const colorMap = { blue:'var(--blue)', green:'var(--green)', orange:'var(--orange)',
                     purple:'var(--purple)', teal:'var(--teal)', yellow:'var(--yellow)' };
  return `
  <div class="page-header">
    <h1>📚 Arduino Quick Reference</h1>
    <p>All the essential functions and data types at a glance.</p>
  </div>
  <div class="ref-grid">
    ${REFERENCE.map(cat => `
      <div class="ref-card">
        <h3 style="color:${colorMap[cat.color]||'var(--blue)'}">${cat.title}</h3>
        ${cat.entries.map(e => `
          <div class="ref-entry">
            <div class="ref-sig">${e.sig}</div>
            <div class="ref-desc">${e.desc}</div>
          </div>`).join('')}
      </div>`).join('')}
  </div>`;
}

// ── Achievements ─────────────────────────────────────────
function renderAchievements() {
  const earned = STATE.achievements.length;
  return `
  <div class="page-header">
    <h1>🏆 Achievements</h1>
    <p>${earned} of ${ACHIEVEMENTS.length} unlocked</p>
  </div>
  <div class="ach-grid">
    ${ACHIEVEMENTS.map(ach => {
      const e = STATE.achievements.includes(ach.id);
      return `<div class="ach-card ${e?'earned':''}">
        <div class="ach-icon">${ach.icon}</div>
        <div class="ach-name">${ach.name}</div>
        <div class="ach-desc">${ach.desc}</div>
        <div class="ach-earned-label" style="color:${e?'var(--yellow)':'var(--text3)'}">
          ${e ? '✓ Unlocked' : '🔒 Locked'}
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

// ── Projects ──────────────────────────────────────────────
function renderProjects() {
  return `
  <div class="page-header">
    <h1>🔧 Project Gallery</h1>
    <p>Real-world projects to build once you've mastered the lessons!</p>
  </div>
  <div class="project-grid">
    ${PROJECTS.map(p => `
      <div class="project-card">
        <div class="project-icon">${p.icon}</div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-parts">${p.parts.map(pt => `<span class="part-chip">${pt}</span>`).join('')}</div>
        <div class="project-diff">
          <span class="diff-badge ${p.difficulty}">${p.difficulty}</span>
          <span style="font-size:.75rem;color:var(--text3);margin-left:8px">
            Skills: ${p.skills.join(', ')}
          </span>
        </div>
      </div>`).join('')}
  </div>`;
}

// ── Modal ──────────────────────────────────────────────────
function showModal(title, body, foot) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML    = body;
  document.getElementById('modal-foot').innerHTML   = foot;
  document.getElementById('modal-bg').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal-bg').classList.add('hidden');
}

// ── Reset ─────────────────────────────────────────────────
function confirmReset() {
  showModal('Reset Progress',
    `<p>Reset <strong style="color:var(--red)">all progress</strong>?
     This clears XP, completed lessons, and achievements. This cannot be undone.</p>`,
    `<button class="btn-secondary" onclick="closeModal()">Cancel</button>
     <button class="btn-danger" onclick="doReset()">Reset Everything</button>`);
}
function doReset() {
  STATE = { ...DEFAULT_STATE };
  saveState();
  closeModal();
  ['beginner','intermediate','advanced'].forEach(d => {
    const c = document.getElementById(`nav-${d}`);
    if (c) c.innerHTML = '';
  });
  populateSidebar();
  updateXPBar();
  navigate('home');
}

// ── Sidebar toggle ────────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');
  const collapsed = sidebar.classList.toggle('collapsed');
  content.classList.toggle('full', collapsed);
}

// ── Bootstrap ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Expose globals for onclick handlers
  window.navigate            = navigate;
  window.toggleRun           = toggleRun;
  window.resetCode           = resetCode;
  window.checkStepChallenge  = checkStepChallenge;
  window.explainMistake      = explainMistake;
  window.showStepHint        = showStepHint;
  window.goNextStep          = goNextStep;
  window.goPrevStep          = goPrevStep;
  window.closeModal          = closeModal;
  window.confirmReset        = confirmReset;
  window.doReset             = doReset;

  document.getElementById('ham-btn').addEventListener('click', toggleSidebar);
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-bg').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('reset-btn').addEventListener('click', confirmReset);

  document.querySelectorAll('.nav-item[data-screen]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.screen));
  });

  populateSidebar();
  updateXPBar();
  checkAchievements();
  navigate('home');

  if (window.innerWidth < 900) {
    document.getElementById('sidebar').classList.add('collapsed');
    document.getElementById('content').classList.add('full');
  }

  // ── Touch swipe for step navigation ──────────────────
  let _touchX = 0, _touchY = 0;
  document.addEventListener('touchstart', e => {
    _touchX = e.touches[0].clientX;
    _touchY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - _touchX;
    const dy = e.changedTouches[0].clientY - _touchY;
    // Horizontal swipe only, ignore vertical scrolls
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 52) {
      if (!currentLesson || !currentLesson.steps) return;
      // Don't interfere with CodeMirror or sliders
      if (e.target.closest('.editor-cm-wrap') ||
          e.target.closest('.analog-slider') ||
          e.target.closest('.modal-bg')) return;
      if (dx < 0) {
        // Swipe left → next step
        const btn = document.getElementById('step-next-btn');
        if (btn && !btn.disabled) goNextStep();
      } else {
        // Swipe right → prev step
        goPrevStep();
      }
    }
  }, { passive: true });

  // ── iOS install banner (shown once, on mobile Safari) ──
  const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isStandalone = window.navigator.standalone;
  const bannerDismissed = localStorage.getItem('installBannerDismissed');

  if (isMobile && !isStandalone && !bannerDismissed) {
    setTimeout(() => {
      const banner = document.createElement('div');
      banner.className = 'install-banner';
      banner.id = 'install-banner';
      banner.innerHTML = `
        <span class="install-banner-icon">📲</span>
        <div class="install-banner-text">
          <strong>Install ArduinoLearn</strong>
          Tap <strong>Share</strong> then <strong>"Add to Home Screen"</strong> for the full app experience!
        </div>
        <button class="install-banner-close" onclick="dismissInstallBanner()">✕</button>`;
      document.body.appendChild(banner);
    }, 3000);
  }

  window.showLessonPicker = showLessonPicker;
  window.dismissInstallBanner = () => {
    const b = document.getElementById('install-banner');
    if (b) b.remove();
    localStorage.setItem('installBannerDismissed', '1');
  };
});
