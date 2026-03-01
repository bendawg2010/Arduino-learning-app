#!/usr/bin/env python3
"""Combine all app files into one standalone HTML."""
import re

with open('css/style.css')    as f: css  = f.read()
with open('js/data.js')        as f: data = f.read()
with open('js/simulator.js')   as f: sim  = f.read()
with open('js/app.js')         as f: app  = f.read()

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ArduinoLearn — Interactive Arduino Coding</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/dracula.min.css" />
  <style>
{css}
  </style>
</head>
<body>

  <div id="achievement-toast" class="achievement-toast hidden">
    <div class="ach-toast-icon" id="ach-toast-icon">🏆</div>
    <div class="ach-toast-body">
      <div class="ach-toast-label">Achievement Unlocked!</div>
      <div class="ach-toast-name" id="ach-toast-name"></div>
    </div>
  </div>

  <div id="levelup-toast" class="levelup-toast hidden">
    <div class="lvl-bolt">⚡</div>
    <div>
      <div class="lvl-title">LEVEL UP!</div>
      <div class="lvl-sub" id="lvl-sub">Level 2</div>
    </div>
  </div>

  <div id="app">
    <header class="header">
      <div class="header-left">
        <button class="ham-btn" id="ham-btn" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <div class="logo">
          <span class="logo-bolt">⚡</span>
          <span class="logo-text">Arduino<strong>Learn</strong></span>
        </div>
      </div>
      <div class="header-center">
        <div class="xp-wrap">
          <div class="level-chip" id="level-chip">Lv 1</div>
          <div class="xp-track"><div class="xp-fill" id="xp-fill" style="width:0%"></div></div>
          <div class="xp-label" id="xp-label">0 / 100 XP</div>
        </div>
      </div>
      <div class="header-right">
        <button class="icon-btn" data-screen="achievements" title="Achievements">🏆</button>
        <button class="icon-btn" id="reset-btn" title="Reset Progress">↺</button>
      </div>
    </header>

    <div class="layout">
      <nav class="sidebar" id="sidebar">
        <div class="nav-item nav-home" data-screen="home"><span>🏠</span> Dashboard</div>
        <div class="nav-group-label">Beginner</div>
        <div id="nav-beginner" class="nav-group"></div>
        <div class="nav-group-label">Intermediate</div>
        <div id="nav-intermediate" class="nav-group"></div>
        <div class="nav-group-label">Advanced</div>
        <div id="nav-advanced" class="nav-group"></div>
        <div class="nav-divider"></div>
        <div class="nav-item" data-screen="playground"><span>🧪</span> Playground</div>
        <div class="nav-item" data-screen="projects"><span>🔧</span> Projects</div>
        <div class="nav-item" data-screen="reference"><span>📚</span> Reference</div>
        <div class="nav-item" data-screen="achievements"><span>🏆</span> Achievements</div>
      </nav>
      <main class="content" id="content"></main>
    </div>
  </div>

  <div id="modal-bg" class="modal-bg hidden">
    <div class="modal" id="modal">
      <div class="modal-head">
        <h3 id="modal-title"></h3>
        <button id="modal-close" class="modal-x">✕</button>
      </div>
      <div class="modal-body" id="modal-body"></div>
      <div class="modal-foot" id="modal-foot"></div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/clike/clike.min.js"></script>
  <script>
/* ── data.js ─────────────────────────────────────────── */
{data}
  </script>
  <script>
/* ── simulator.js ───────────────────────────────────── */
{sim}
  </script>
  <script>
/* ── app.js ─────────────────────────────────────────── */
{app}
  </script>
</body>
</html>"""

with open('standalone.html', 'w') as f:
    f.write(html)

print(f"standalone.html written — {len(html):,} chars")
