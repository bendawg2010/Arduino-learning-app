/* ─────────────────────────────────────────────────────────
   app.js  –  Main application controller for ArduinoLearn.
              Handles routing, progress, achievements, UI.
   ───────────────────────────────────────────────────────── */

// ── State ──────────────────────────────────────────────────
const DEFAULT_STATE = {
  xp: 0,
  level: 1,
  completedLessons: [],
  quizScores: {},
  achievements: [],
  challengesPassed: 0,
  firstTryPasses: 0,
  serialUsed: false,
  pwmUsed: false,
};

let STATE = loadState();
let board = null;      // ArduinoBoard instance
let editor = null;     // CodeMirror instance
let currentLesson = null;
let currentScreen = 'home';
let challengeAttempts = 0;

// ── Persistence ────────────────────────────────────────────
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
  const newLevel = getLevel();
  if (newLevel.level > oldLevel.level) {
    showLevelUpToast(newLevel);
  }
  checkAchievements();
}

function getLevel() {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (STATE.xp >= lvl.xp) current = lvl;
  }
  return current;
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
    fill.style.width = pct + '%';
    lbl.textContent  = `${STATE.xp} / ${next.xp} XP`;
  } else {
    fill.style.width = '100%';
    lbl.textContent  = `${STATE.xp} XP — MAX`;
  }
}

// ── Achievements ────────────────────────────────────────────
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (STATE.achievements.includes(ach.id)) return;
    if (ach.cond(STATE)) {
      STATE.achievements.push(ach.id);
      saveState();
      showAchievementToast(ach);
    }
  });
}

// ── Toast / Notifications ───────────────────────────────────
function showAchievementToast(ach) {
  const toast = document.getElementById('achievement-toast');
  document.getElementById('ach-toast-icon').textContent = ach.icon;
  document.getElementById('ach-toast-name').textContent = ach.name;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 4000);
}

function showLevelUpToast(lvl) {
  const toast = document.getElementById('levelup-toast');
  document.getElementById('lvl-sub').textContent = `Level ${lvl.level} — ${lvl.title}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}

// ── Navigation ──────────────────────────────────────────────
function navigate(screen, lessonId) {
  currentScreen = screen;
  // Update nav active state
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
  }
  window.scrollTo(0, 0);
}

// ── Sidebar nav population ──────────────────────────────────
function populateSidebar() {
  ['beginner', 'intermediate', 'advanced'].forEach(diff => {
    const container = document.getElementById(`nav-${diff}`);
    if (!container) return;
    LESSONS.filter(l => l.difficulty === diff).forEach(lesson => {
      const div = document.createElement('div');
      const done = STATE.completedLessons.includes(lesson.id);
      div.className = 'nav-item';
      div.dataset.lesson = lesson.id;
      div.innerHTML = `<span>${lesson.icon}</span>${lesson.title}${done ? '<span class="nav-check">✓</span>' : ''}`;
      div.addEventListener('click', () => navigate('lesson', lesson.id));
      container.appendChild(div);
    });
  });
}

// ── Home Screen ─────────────────────────────────────────────
function renderHome() {
  const total  = LESSONS.length;
  const done   = STATE.completedLessons.length;
  const pct    = total > 0 ? Math.round(done / total * 100) : 0;
  const lvl    = getLevel();

  const nextLesson = LESSONS.find(l => !STATE.completedLessons.includes(l.id)) || LESSONS[0];

  const featuredCards = LESSONS.slice(0, 6).map(l => lessonCard(l)).join('');

  return `
  <div class="dash-hero">
    <h1>Welcome to <span>ArduinoLearn</span> ⚡</h1>
    <p>Learn Arduino coding through interactive lessons, a live simulator, quizzes, and hands-on challenges. From blinking an LED to building real projects!</p>
    <div class="hero-btns">
      <button class="btn-primary" onclick="navigate('lesson','${nextLesson.id}')">
        ${done === 0 ? '🚀 Start Learning' : '▶ Continue Learning'}
      </button>
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
      <div class="stat-label">Total XP Earned</div>
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
      <div class="stat-label">Course Progress</div>
    </div>
  </div>

  <div class="section-header">
    <h2>All Lessons</h2>
  </div>

  <div style="margin-bottom:16px">
    <div style="display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap">
      <span class="diff-badge beginner">Beginner</span>
      <span class="diff-badge intermediate">Intermediate</span>
      <span class="diff-badge advanced">Advanced</span>
    </div>
  </div>

  <div class="lesson-grid">
    ${LESSONS.map(l => lessonCard(l)).join('')}
  </div>
  `;
}

function lessonCard(lesson) {
  const done = STATE.completedLessons.includes(lesson.id);
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
    ${done ? '<div class="card-progress-bar"><div class="card-progress-fill" style="width:100%"></div></div>' : ''}
  </div>`;
}

// ── Lesson Screen ────────────────────────────────────────────
function renderLesson(lessonId) {
  currentLesson = LESSONS.find(l => l.id === lessonId);
  if (!currentLesson) return navigate('home');
  challengeAttempts = 0;

  const lessonIdx  = LESSONS.indexOf(currentLesson);
  const prevLesson = LESSONS[lessonIdx - 1];
  const nextLesson = LESSONS[lessonIdx + 1];
  const done = STATE.completedLessons.includes(currentLesson.id);

  // Mark nav item active
  document.querySelectorAll('.nav-item[data-lesson]').forEach(el => {
    el.classList.toggle('active', el.dataset.lesson === lessonId);
  });

  const content = document.getElementById('content');
  content.innerHTML = `
  <div class="lesson-view">

    <!-- Header -->
    <div class="lesson-header">
      <div>
        <span style="font-size:1.6rem">${currentLesson.icon}</span>
        <h1 style="display:inline;margin-left:10px">${currentLesson.title}</h1>
        <span class="diff-badge ${currentLesson.difficulty}" style="margin-left:12px">${currentLesson.difficulty}</span>
      </div>
      <div class="lesson-nav-btns">
        ${prevLesson ? `<button onclick="navigate('lesson','${prevLesson.id}')">← Previous</button>` : ''}
        <button onclick="navigate('home')">🏠 Home</button>
        ${nextLesson ? `<button onclick="navigate('lesson','${nextLesson.id}')">Next →</button>` : ''}
      </div>
    </div>

    <!-- Left: Theory + Challenge -->
    <div class="theory-panel">
      <div class="panel-tabs">
        <div class="panel-tab active" id="tab-theory" onclick="switchTab('theory')">📖 Theory</div>
        <div class="panel-tab" id="tab-challenge" onclick="switchTab('challenge')">🎯 Challenge</div>
        <div class="panel-tab" id="tab-quiz" onclick="openQuiz()">❓ Quiz</div>
      </div>
      <div class="panel-content" id="panel-content">
        <div id="theory-pane" class="theory-content">${currentLesson.theory}</div>
        <div id="challenge-pane" class="hidden">
          <div class="challenge-box">
            <h3>🎯 Your Challenge</h3>
            <p>${currentLesson.challenge.desc}</p>
            <button class="btn-primary" onclick="checkChallenge()" style="margin-top:8px">✔ Check My Code</button>
            <div class="challenge-hint">
              <span class="text-dim">Stuck? </span>
              <button onclick="showHint()">Show hint</button>
            </div>
            <div id="hint-box" class="info-box hidden" style="margin-top:10px"></div>
            <div class="challenge-result" id="challenge-result"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Editor + Simulator -->
    <div class="editor-panel">
      <div class="editor-toolbar">
        <span class="toolbar-title">sketch.ino</span>
        <button class="run-btn" id="run-btn" onclick="toggleRun()">▶ Run</button>
        <button class="check-btn" onclick="checkChallenge()">✔ Check</button>
        <button class="quiz-btn" onclick="openQuiz()">❓ Quiz</button>
        <button class="reset-code-btn" onclick="resetCode()">↺ Reset</button>
      </div>

      <div class="editor-cm-wrap" id="editor-wrap"></div>

      <!-- Simulator -->
      <div class="sim-panel">
        <div class="sim-header">
          <strong>Simulator</strong>
          <span style="margin-left:8px;font-size:.7rem;color:var(--text3)">
            Use sliders for analog inputs
          </span>
          <div class="sim-status-dot" id="sim-status-dot"></div>
        </div>
        <div class="sim-body" id="sim-body"></div>
      </div>
    </div>

  </div>
  `;

  // Initialize CodeMirror
  const wrap = document.getElementById('editor-wrap');
  editor = CodeMirror(wrap, {
    value: currentLesson.code,
    mode: 'text/x-c++src',
    theme: 'dracula',
    lineNumbers: true,
    indentWithTabs: false,
    tabSize: 2,
    autofocus: true,
    extraKeys: {
      'Ctrl-Enter': toggleRun,
      'Cmd-Enter':  toggleRun,
    },
  });
  editor.setSize('100%', '100%');

  // Initialize board
  const simBody = document.getElementById('sim-body');
  board = new ArduinoBoard(simBody);
}

function switchTab(tab) {
  document.getElementById('tab-theory').classList.toggle('active', tab === 'theory');
  document.getElementById('tab-challenge').classList.toggle('active', tab === 'challenge');
  document.getElementById('theory-pane').classList.toggle('hidden', tab !== 'theory');
  document.getElementById('challenge-pane').classList.toggle('hidden', tab !== 'challenge');
}

function showHint() {
  const box = document.getElementById('hint-box');
  box.textContent = '💡 Hint: ' + currentLesson.challenge.hint;
  box.classList.remove('hidden');
}

// ── Run / Stop ───────────────────────────────────────────────
async function toggleRun() {
  if (!board) return;
  const btn = document.getElementById('run-btn');
  if (board.isRunning()) {
    await board.stop();
    btn.textContent = '▶ Run';
    btn.classList.remove('running');
  } else {
    const code = editor.getValue();
    btn.textContent = '⏹ Stop';
    btn.classList.add('running');
    await board.run(code);
    btn.textContent = '▶ Run';
    btn.classList.remove('running');
    // Update state for serial/pwm achievements
    if (board.sim) {
      if (board.sim.serialUsed) { STATE.serialUsed = true; saveState(); checkAchievements(); }
      if (board.sim.pwmUsed)   { STATE.pwmUsed = true; saveState(); checkAchievements(); }
    }
  }
}

function resetCode() {
  if (!currentLesson || !editor) return;
  editor.setValue(currentLesson.code);
  if (board) board.stop();
}

// ── Challenge checking ────────────────────────────────────────
async function checkChallenge() {
  if (!currentLesson || !editor) return;
  switchTab('challenge');

  const code = editor.getValue();
  const resultEl = document.getElementById('challenge-result');
  if (!resultEl) return;

  // Run the code briefly to get state
  if (!board.isRunning()) {
    await board.run(code);
    await board.stop();
  }

  const simState = board.getState();
  simState.serialLines = board.sim ? board.sim.serialLines : [];

  const passed = currentLesson.challenge.validate(code, simState);
  challengeAttempts++;

  resultEl.className = 'challenge-result ' + (passed ? 'pass' : 'fail');
  if (passed) {
    resultEl.innerHTML = '🎉 Challenge Complete! Great work!';
    if (!STATE.completedLessons.includes(currentLesson.id)) {
      STATE.completedLessons.push(currentLesson.id);
      STATE.challengesPassed++;
      if (challengeAttempts === 1) STATE.firstTryPasses++;
      addXP(currentLesson.xp);
      updateSidebarChecks();
    }
    saveState();
    checkAchievements();
  } else {
    resultEl.innerHTML = '❌ Not quite right yet. Check the hint for guidance!';
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

// ── Quiz ───────────────────────────────────────────────────────
function openQuiz() {
  if (!currentLesson) return;
  const questions = currentLesson.quiz;
  if (!questions || !questions.length) {
    showModal('No Quiz', '<p>No quiz available for this lesson yet.</p>', '');
    return;
  }

  let qIndex = 0;
  let score  = 0;
  const answers = [];

  function renderQ() {
    const q = questions[qIndex];
    const letters = ['A', 'B', 'C', 'D'];
    const body = `
      <div class="quiz-progress">
        ${questions.map((_, i) => `
          <div class="quiz-dot ${i < qIndex ? 'done' : i === qIndex ? 'current' : ''}"></div>
        `).join('')}
      </div>
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-opts" id="quiz-opts">
        ${q.opts.map((opt, i) => `
          <div class="quiz-opt" onclick="selectAnswer(${i})">
            <div class="quiz-opt-letter">${letters[i]}</div>
            <span>${opt}</span>
          </div>
        `).join('')}
      </div>
      <div id="quiz-explain" class="quiz-explanation hidden"></div>
    `;
    document.getElementById('modal-body').innerHTML = body;
    document.getElementById('modal-foot').innerHTML = '';
    window.selectAnswer = (idx) => selectAnswer(q, idx);
  }

  function selectAnswer(q, chosen) {
    const opts  = document.querySelectorAll('.quiz-opt');
    const explain = document.getElementById('quiz-explain');
    opts.forEach((el, i) => {
      el.classList.add('disabled');
      if (i === q.correct) el.classList.add('correct');
      else if (i === chosen && i !== q.correct) el.classList.add('wrong');
    });
    if (chosen === q.correct) {
      score++;
      explain.textContent = '✅ Correct! ' + q.explain;
    } else {
      explain.textContent = '❌ ' + q.explain;
    }
    explain.classList.remove('hidden');
    answers.push(chosen);

    document.getElementById('modal-foot').innerHTML = `
      <button class="btn-primary" onclick="nextQ()">
        ${qIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
      </button>
    `;
    window.nextQ = nextQ;
  }

  function nextQ() {
    qIndex++;
    if (qIndex < questions.length) {
      renderQ();
    } else {
      showResults();
    }
  }

  function showResults() {
    const pct = Math.round(score / questions.length * 100);
    const msgs = ['Keep studying! 💪', 'Good effort! 📚', 'Nice work! 👍', 'Excellent! 🌟', 'Perfect score! 🏆'];
    const msgIdx = Math.floor(pct / 25);

    // Award XP for quiz
    const xpEarned = Math.round(currentLesson.xp * 0.5 * (pct / 100));

    // Save score
    const prev = STATE.quizScores[currentLesson.id];
    if (prev === undefined || pct > prev) {
      STATE.quizScores[currentLesson.id] = pct;
      saveState();
    }
    if (xpEarned > 0) addXP(xpEarned);
    checkAchievements();

    document.getElementById('modal-body').innerHTML = `
      <div class="quiz-score-wrap">
        <div class="quiz-score-num">${score}/${questions.length}</div>
        <div class="quiz-score-sub">${pct}% Correct</div>
        <div class="quiz-score-msg">${msgs[Math.min(msgIdx, 4)]}</div>
        ${xpEarned > 0 ? `<div style="margin-top:12px;color:var(--yellow)">+${xpEarned} XP earned!</div>` : ''}
      </div>
    `;
    document.getElementById('modal-foot').innerHTML = `
      <button class="btn-secondary" onclick="closeModal()">Close</button>
      <button class="btn-primary" onclick="closeModal()">Back to Lesson</button>
    `;
  }

  showModal(`Quiz — ${currentLesson.title}`, '', '');
  renderQ();
}

// ── Reference Screen ─────────────────────────────────────────
function renderReference() {
  return `
  <div class="page-header">
    <h1>📚 Arduino Reference</h1>
    <p>Quick reference for all important Arduino functions and data types.</p>
  </div>
  <div class="ref-grid">
    ${REFERENCE.map(cat => `
      <div class="ref-card">
        <h3 style="color:var(--${cat.color}, var(--blue))">${cat.title}</h3>
        ${cat.entries.map(e => `
          <div class="ref-entry">
            <div class="ref-sig">${e.sig}</div>
            <div class="ref-desc">${e.desc}</div>
          </div>
        `).join('')}
      </div>
    `).join('')}
  </div>
  `;
}

// ── Achievements Screen ──────────────────────────────────────
function renderAchievements() {
  return `
  <div class="page-header">
    <h1>🏆 Achievements</h1>
    <p>${STATE.achievements.length} of ${ACHIEVEMENTS.length} unlocked</p>
  </div>
  <div class="ach-grid">
    ${ACHIEVEMENTS.map(ach => {
      const earned = STATE.achievements.includes(ach.id);
      return `
      <div class="ach-card ${earned ? 'earned' : ''}">
        <div class="ach-icon">${ach.icon}</div>
        <div class="ach-name">${ach.name}</div>
        <div class="ach-desc">${ach.desc}</div>
        ${earned ? '<div class="ach-earned-label">✓ Unlocked</div>' : '<div class="ach-earned-label" style="color:var(--text3)">Locked 🔒</div>'}
      </div>`;
    }).join('')}
  </div>
  `;
}

// ── Projects Screen ───────────────────────────────────────────
function renderProjects() {
  return `
  <div class="page-header">
    <h1>🔧 Project Gallery</h1>
    <p>Real-world projects to build once you've completed the lessons!</p>
  </div>
  <div class="project-grid">
    ${PROJECTS.map(p => `
      <div class="project-card">
        <div class="project-icon">${p.icon}</div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-parts">
          ${p.parts.map(part => `<span class="part-chip">${part}</span>`).join('')}
        </div>
        <div class="project-diff">
          <span class="diff-badge ${p.difficulty}">${p.difficulty}</span>
          <span style="font-size:.75rem;color:var(--text3);margin-left:8px">
            Skills: ${p.skills.join(', ')}
          </span>
        </div>
      </div>
    `).join('')}
  </div>
  `;
}

// ── Modal ──────────────────────────────────────────────────────
function showModal(title, body, foot) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('modal-foot').innerHTML = foot;
  document.getElementById('modal-bg').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal-bg').classList.add('hidden');
}

// ── Reset progress ─────────────────────────────────────────────
function confirmReset() {
  showModal(
    'Reset Progress',
    `<p>Are you sure you want to <strong style="color:var(--red)">reset all progress</strong>? This will clear your XP, completed lessons, and achievements. This cannot be undone.</p>`,
    `<button class="btn-secondary" onclick="closeModal()">Cancel</button>
     <button class="btn-danger" onclick="doReset()">Reset Everything</button>`
  );
  window.doReset = () => {
    STATE = { ...DEFAULT_STATE };
    saveState();
    closeModal();
    populateSidebar();
    navigate('home');
    updateXPBar();
  };
}

// ── Sidebar toggle ─────────────────────────────────────────────
function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const content  = document.getElementById('content');
  sidebar.classList.toggle('collapsed');
  content.classList.toggle('full');
}

// ── Event listeners & bootstrap ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  document.getElementById('ham-btn').addEventListener('click', toggleSidebar);

  // Modal close
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-bg').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Home nav link
  document.querySelector('.nav-home').addEventListener('click', () => navigate('home'));

  // Other nav items (reference, achievements, projects)
  document.querySelectorAll('.nav-item[data-screen]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.screen));
  });

  // Reset button
  document.getElementById('reset-btn').addEventListener('click', confirmReset);

  // Achievements icon in header
  document.querySelectorAll('[data-screen="achievements"]').forEach(el => {
    el.addEventListener('click', () => navigate('achievements'));
  });

  // Expose globals needed by inline handlers
  window.navigate       = navigate;
  window.toggleRun      = toggleRun;
  window.resetCode      = resetCode;
  window.checkChallenge = checkChallenge;
  window.openQuiz       = openQuiz;
  window.switchTab      = switchTab;
  window.showHint       = showHint;
  window.closeModal     = closeModal;
  window.confirmReset   = confirmReset;

  // Init sidebar
  populateSidebar();

  // Init XP bar
  updateXPBar();

  // Check achievements for existing progress
  checkAchievements();

  // Navigate to home
  navigate('home');

  // Responsive sidebar: collapse on small screens by default
  if (window.innerWidth < 900) {
    document.getElementById('sidebar').classList.add('collapsed');
    document.getElementById('content').classList.add('full');
  }
});
