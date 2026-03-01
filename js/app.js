/* ─────────────────────────────────────────────────────────
   app.js  –  Main application controller for ArduinoLearn.
   ───────────────────────────────────────────────────────── */

// ── State ──────────────────────────────────────────────────
const DEFAULT_STATE = {
  xp: 0, level: 1,
  completedLessons: [], quizScores: {}, achievements: [],
  challengesPassed: 0, firstTryPasses: 0,
  serialUsed: false, pwmUsed: false,
};
let STATE = loadState();
let board = null;
let editor = null;
let currentLesson = null;
let challengeAttempts = 0;

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

// Floating "+50 XP" pop
function showXPPop(amount) {
  const pop = document.createElement('div');
  pop.className = 'xp-pop';
  pop.textContent = `+${amount} XP`;
  document.body.appendChild(pop);
  // position near xp bar
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

// ── Navigation ──────────────────────────────────────────────
async function navigate(screen, lessonId) {
  // Stop board if leaving a lesson
  if (board && board.isRunning()) await board.stop();

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const active = document.querySelector(`.nav-item[data-screen="${screen}"]`);
  if (active) active.classList.add('active');

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
    container.innerHTML = ''; // clear before repopulating
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
    <p>Interactive lessons, a live simulator, quizzes &amp; hands-on challenges.
       Go from zero to Arduino hero!</p>
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
  const score = STATE.quizScores[lesson.id];
  return `
  <div class="lesson-card ${done ? 'completed' : ''}" onclick="navigate('lesson','${lesson.id}')">
    <div class="lesson-card-icon">${lesson.icon}</div>
    <div class="lesson-card-title">${lesson.title}</div>
    <div class="lesson-card-desc">${lesson.desc}</div>
    <div class="lesson-card-meta">
      <span class="diff-badge ${lesson.difficulty}">${lesson.difficulty}</span>
      <span class="xp-badge"><span>+${lesson.xp}</span> XP</span>
      ${score !== undefined ? `<span style="color:var(--yellow);font-size:.72rem">Quiz: ${score}%</span>` : ''}
    </div>
  </div>`;
}

// ── Lesson Screen ────────────────────────────────────────────
function renderLesson(lessonId) {
  currentLesson = LESSONS.find(l => l.id === lessonId);
  if (!currentLesson) return navigate('home');
  challengeAttempts = 0;

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
        ${nxt  ? `<button onclick="navigate('lesson','${nxt.id}')">Next →</button>` : ''}
      </div>
    </div>

    <!-- Left panel -->
    <div class="theory-panel">
      <div class="panel-tabs">
        <div class="panel-tab active" id="tab-theory"    onclick="switchTab('theory')">📖 Theory</div>
        <div class="panel-tab"        id="tab-challenge" onclick="switchTab('challenge')">🎯 Challenge</div>
        <div class="panel-tab quiz-tab-btn"              onclick="openQuiz()">❓ Quiz</div>
      </div>
      <div class="panel-content" id="panel-content">
        <div id="theory-pane" class="theory-content">${currentLesson.theory}</div>
        <div id="challenge-pane" class="hidden">
          <div class="challenge-box">
            <h3>🎯 Your Challenge</h3>
            <p>${currentLesson.challenge.desc}</p>
            <button class="btn-primary" id="check-btn-inner" onclick="checkChallenge()" style="margin-top:10px">
              ✔ Check My Code
            </button>
            <div class="challenge-hint" style="margin-top:10px">
              <span class="text-dim">Stuck?&nbsp;</span>
              <button onclick="showHint()" style="color:var(--yellow);text-decoration:underline;font-size:.82rem">Show hint</button>
            </div>
            <div id="hint-box" class="info-box hidden" style="margin-top:10px"></div>
            <div class="challenge-result" id="challenge-result"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right panel -->
    <div class="editor-panel">
      <div class="editor-toolbar">
        <span class="toolbar-title">sketch.ino&nbsp;<span style="color:var(--text3);font-weight:400;font-size:.72rem">(Ctrl+Enter = Run)</span></span>
        <button class="run-btn"       id="run-btn"   onclick="toggleRun()">▶ Run</button>
        <button class="check-btn"                    onclick="checkChallenge()">✔ Check</button>
        <button class="quiz-btn"                     onclick="openQuiz()">❓ Quiz</button>
        <button class="reset-code-btn"               onclick="resetCode()">↺ Reset</button>
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

  // Init CodeMirror
  const wrap = document.getElementById('editor-wrap');
  if (typeof CodeMirror !== 'undefined') {
    editor = CodeMirror(wrap, {
      value:        currentLesson.code,
      mode:         'text/x-c++src',
      theme:        'dracula',
      lineNumbers:  true,
      indentWithTabs: false,
      tabSize:      2,
      autofocus:    true,
      extraKeys: { 'Ctrl-Enter': toggleRun, 'Cmd-Enter': toggleRun },
    });
    // Refresh once rendered so height is correct
    setTimeout(() => { editor.setSize('100%', '100%'); editor.refresh(); }, 60);
  } else {
    // Fallback textarea if CDN failed
    wrap.innerHTML = `<textarea id="editor-fallback"
      style="width:100%;height:100%;background:#1e1e2e;color:#cdd6f4;font-family:monospace;
             font-size:13px;padding:12px;border:none;resize:none;outline:none;
             line-height:1.6;tab-size:2">${currentLesson.code}</textarea>`;
    editor = {
      getValue: () => document.getElementById('editor-fallback').value,
      setValue: (v) => { document.getElementById('editor-fallback').value = v; },
      setSize:  () => {},
      refresh:  () => {},
    };
  }

  // Init simulator board
  board = new ArduinoBoard(document.getElementById('sim-body'));
}

function switchTab(tab) {
  document.getElementById('tab-theory')?.classList.toggle('active', tab === 'theory');
  document.getElementById('tab-challenge')?.classList.toggle('active', tab === 'challenge');
  document.getElementById('theory-pane')?.classList.toggle('hidden', tab !== 'theory');
  document.getElementById('challenge-pane')?.classList.toggle('hidden', tab !== 'challenge');
}

function showHint() {
  const box = document.getElementById('hint-box');
  if (!box || !currentLesson) return;
  box.textContent = '💡 ' + currentLesson.challenge.hint;
  box.classList.remove('hidden');
}

// ── Free Code Playground ─────────────────────────────────────
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
        <p style="color:var(--text3);font-size:.85rem;margin-bottom:12px">Click a snippet to load it:</p>
        ${[
          ['💡 Blink',      'void setup(){pinMode(13,OUTPUT);Serial.begin(9600);}\nvoid loop(){digitalWrite(13,HIGH);Serial.println("ON");delay(500);digitalWrite(13,LOW);Serial.println("OFF");delay(500);}'],
          ['📡 Serial',     'void setup(){Serial.begin(9600);Serial.println("Hello World!");}\nvoid loop(){Serial.print("Uptime: ");Serial.print(millis()/1000.0,1);Serial.println("s");delay(1000);}'],
          ['🌈 PWM Fade',   'void setup(){pinMode(9,OUTPUT);}\nvoid loop(){for(int b=0;b<=255;b+=5){analogWrite(9,b);delay(15);}for(int b=255;b>=0;b-=5){analogWrite(9,b);delay(15);}}'],
          ['🎛️ Analog Read','void setup(){Serial.begin(9600);}\nvoid loop(){int v=analogRead(A0);int p=map(v,0,1023,0,100);Serial.print("A0=");Serial.print(v);Serial.print(" (");Serial.print(p);Serial.println("%)");delay(500);}'],
          ['⏱️ millis()',   'unsigned long prev=0;\nvoid setup(){Serial.begin(9600);}\nvoid loop(){unsigned long now=millis();if(now-prev>=1000){prev=now;Serial.print("Second: ");Serial.println(now/1000);}}'],
        ].map(([name, code]) => `
          <div class="snippet-chip" onclick='loadSnippet(${JSON.stringify(code)})'>${name}</div>
        `).join('')}
      </div>
    </div>
    <div class="editor-panel">
      <div class="editor-toolbar">
        <span class="toolbar-title">playground.ino&nbsp;<span style="color:var(--text3);font-weight:400;font-size:.72rem">(Ctrl+Enter = Run)</span></span>
        <button class="run-btn" id="run-btn" onclick="toggleRun()">▶ Run</button>
        <button class="reset-code-btn" onclick="resetPlayground()">↺ Clear</button>
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
      value: STARTER,
      mode: 'text/x-c++src', theme: 'dracula',
      lineNumbers: true, indentWithTabs: false, tabSize: 2, autofocus: true,
      extraKeys: { 'Ctrl-Enter': toggleRun, 'Cmd-Enter': toggleRun },
    });
    setTimeout(() => { editor.setSize('100%', '100%'); editor.refresh(); }, 60);
  } else {
    wrap.innerHTML = `<textarea id="editor-fallback" style="width:100%;height:100%;background:#1e1e2e;color:#cdd6f4;font-family:monospace;font-size:13px;padding:12px;border:none;resize:none;outline:none;">${STARTER}</textarea>`;
    editor = {
      getValue: () => document.getElementById('editor-fallback').value,
      setValue: (v) => { document.getElementById('editor-fallback').value = v; },
      setSize: ()=>{}, refresh: ()=>{},
    };
  }
  board = new ArduinoBoard(document.getElementById('sim-body'));
}

window.loadSnippet = (code) => {
  if (editor) editor.setValue(code);
};
window.resetPlayground = () => {
  if (editor) editor.setValue('// Your code here\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // ...\n}');
  if (board) board.stop();
};

// ── Run / Stop ────────────────────────────────────────────────
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

function resetCode() {
  if (!currentLesson || !editor) return;
  if (board) board.stop();
  editor.setValue(currentLesson.code);
  const res = document.getElementById('challenge-result');
  if (res) { res.className = 'challenge-result'; res.innerHTML = ''; }
}

// ── Challenge checking ────────────────────────────────────────
async function checkChallenge() {
  if (!currentLesson || !editor || !board) return;
  switchTab('challenge');

  const resultEl = document.getElementById('challenge-result');
  const btnEl    = document.getElementById('check-btn-inner');
  if (!resultEl) return;

  // Show checking state
  resultEl.className = 'challenge-result';
  resultEl.innerHTML = '<span style="color:var(--text3)">⏳ Checking…</span>';
  if (btnEl) { btnEl.disabled = true; btnEl.textContent = '⏳ Checking…'; }

  const code = editor.getValue();

  // Stop any running sketch, then do a fast validation run
  if (board.isRunning()) await board.stop();
  await board.runForCheck(code);

  // Re-enable button
  if (btnEl) { btnEl.disabled = false; btnEl.textContent = '✔ Check My Code'; }

  const state = board.getState();
  let passed = false;
  try {
    passed = currentLesson.challenge.validate(code, state);
  } catch(e) {
    passed = false;
  }

  challengeAttempts++;
  resultEl.className = 'challenge-result ' + (passed ? 'pass' : 'fail');

  if (passed) {
    resultEl.innerHTML = '🎉 Challenge complete! Great work!';
    if (!STATE.completedLessons.includes(currentLesson.id)) {
      STATE.completedLessons.push(currentLesson.id);
      STATE.challengesPassed++;
      if (challengeAttempts === 1) STATE.firstTryPasses++;
      addXP(currentLesson.xp);
      updateSidebarChecks();
    }
    saveState();
    checkAchievements();
    launchConfetti();
  } else {
    resultEl.innerHTML = '❌ Not quite — check the hint below for guidance!';
  }
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

// Minimal confetti burst
function launchConfetti() {
  const colors = ['#58a6ff','#3fb950','#ffd700','#bc8cff','#f0883e'];
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

// ── Quiz ───────────────────────────────────────────────────────
function openQuiz() {
  if (!currentLesson) return;
  const questions = currentLesson.quiz;
  if (!questions?.length) {
    showModal('No Quiz', '<p>No quiz available for this lesson yet.</p>', '<button class="btn-secondary" onclick="closeModal()">Close</button>');
    return;
  }

  let qIdx = 0, score = 0;

  function renderQ() {
    const q = questions[qIdx];
    const letters = ['A','B','C','D'];
    document.getElementById('modal-body').innerHTML = `
      <div class="quiz-progress">
        ${questions.map((_,i) => `<div class="quiz-dot ${i<qIdx?'done':i===qIdx?'current':''}"></div>`).join('')}
      </div>
      <div style="font-size:.75rem;color:var(--text3);margin-bottom:10px">
        Question ${qIdx+1} of ${questions.length}
      </div>
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-opts" id="quiz-opts">
        ${q.opts.map((opt,i) => `
          <div class="quiz-opt" data-idx="${i}">
            <div class="quiz-opt-letter">${letters[i]}</div>
            <span>${opt}</span>
          </div>`).join('')}
      </div>
      <div id="quiz-explain" class="quiz-explanation hidden"></div>
    `;
    document.getElementById('modal-foot').innerHTML = '';

    // Attach listeners (no global scope pollution)
    document.querySelectorAll('.quiz-opt').forEach(el => {
      el.addEventListener('click', () => handleAnswer(q, parseInt(el.dataset.idx)));
    });
  }

  function handleAnswer(q, chosen) {
    const opts    = document.querySelectorAll('.quiz-opt');
    const explain = document.getElementById('quiz-explain');
    opts.forEach((el, i) => {
      el.classList.add('disabled');
      if (i === q.correct) el.classList.add('correct');
      else if (i === chosen) el.classList.add('wrong');
    });
    if (chosen === q.correct) {
      score++;
      explain.textContent = '✅ Correct! ' + q.explain;
    } else {
      explain.textContent = '❌ ' + q.explain;
    }
    explain.classList.remove('hidden');

    const isLast = qIdx >= questions.length - 1;
    document.getElementById('modal-foot').innerHTML = `
      <button class="btn-primary" id="quiz-next-btn">${isLast ? '🏁 See Results' : 'Next →'}</button>
    `;
    document.getElementById('quiz-next-btn').addEventListener('click', () => {
      qIdx++;
      if (qIdx < questions.length) renderQ();
      else showResults();
    });
  }

  function showResults() {
    const pct   = Math.round(score / questions.length * 100);
    const msgs  = ['Keep studying! 💪','Getting there! 📚','Good work! 👍','Excellent! 🌟','Perfect! 🏆'];
    const xpEarned = Math.round(currentLesson.xp * 0.5 * (pct / 100));

    const prev = STATE.quizScores[currentLesson.id];
    if (prev === undefined || pct > prev) {
      STATE.quizScores[currentLesson.id] = pct;
      saveState();
    }
    if (xpEarned > 0) addXP(xpEarned);
    checkAchievements();

    const emoji = pct === 100 ? '🏆' : pct >= 67 ? '🌟' : pct >= 33 ? '👍' : '💪';
    document.getElementById('modal-body').innerHTML = `
      <div class="quiz-score-wrap">
        <div style="font-size:3rem">${emoji}</div>
        <div class="quiz-score-num">${score}/${questions.length}</div>
        <div class="quiz-score-sub">${pct}% Correct</div>
        <div class="quiz-score-msg">${msgs[Math.min(Math.floor(pct/25), 4)]}</div>
        ${xpEarned>0 ? `<div style="margin-top:14px;color:var(--yellow);font-weight:600">+${xpEarned} XP earned!</div>` : ''}
      </div>`;
    document.getElementById('modal-foot').innerHTML = `
      <button class="btn-secondary" onclick="closeModal()">Close</button>
      <button class="btn-primary" onclick="closeModal()">Back to Lesson</button>
    `;
    if (pct === 100) launchConfetti();
  }

  showModal(`❓ Quiz — ${currentLesson.title}`, '', '');
  renderQ();
}

// ── Reference ─────────────────────────────────────────────────
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

// ── Achievements ─────────────────────────────────────────────
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

// ── Projects ──────────────────────────────────────────────────
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

// ── Modal ──────────────────────────────────────────────────────
function showModal(title, body, foot) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML    = body;
  document.getElementById('modal-foot').innerHTML   = foot;
  document.getElementById('modal-bg').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal-bg').classList.add('hidden');
}

// ── Reset ─────────────────────────────────────────────────────
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
  // Clear nav groups so populateSidebar doesn't double-add
  ['beginner','intermediate','advanced'].forEach(d => {
    const c = document.getElementById(`nav-${d}`);
    if (c) c.innerHTML = '';
  });
  populateSidebar();
  updateXPBar();
  navigate('home');
}

// ── Sidebar toggle ────────────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');
  const collapsed = sidebar.classList.toggle('collapsed');
  content.classList.toggle('full', collapsed);
}

// ── Bootstrap ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Expose globals needed by inline onclick handlers
  window.navigate       = navigate;
  window.toggleRun      = toggleRun;
  window.resetCode      = resetCode;
  window.checkChallenge = checkChallenge;
  window.openQuiz       = openQuiz;
  window.switchTab      = switchTab;
  window.showHint       = showHint;
  window.closeModal     = closeModal;
  window.confirmReset   = confirmReset;
  window.doReset        = doReset;

  document.getElementById('ham-btn').addEventListener('click', toggleSidebar);
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-bg').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('reset-btn').addEventListener('click', confirmReset);

  // Static nav items (home, ref, ach, projects, playground)
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
});
