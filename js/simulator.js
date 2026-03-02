/* ─────────────────────────────────────────────────────────
   simulator.js  –  Arduino → JS transpiler + execution
                    engine + visual board renderer.
   ───────────────────────────────────────────────────────── */

// ── Transpiler ─────────────────────────────────────────────
class ArduinoTranspiler {
  transpile(code) {
    let js = code;

    // Strip preprocessor directives
    js = js.replace(/^\s*#(include|define|pragma|ifndef|endif|ifdef)[^\n]*/gm, '');

    // Unsigned / fixed-width types → let placeholder
    js = js.replace(/\bunsigned\s+(long|int|char|short)\b/g, 'let ___T');
    js = js.replace(/\b(uint8_t|uint16_t|uint32_t|int8_t|int16_t|int32_t|size_t)\b/g, 'let ___T');

    // Standard type declarations before variable names
    js = js.replace(/\b(long|int|float|double|boolean|bool|byte|char|word|short)\s+(?=[a-zA-Z_])/g, 'let ');
    js = js.replace(/\bString\s+(?=[a-zA-Z_])/g, 'let ');

    // Fix "const let" / "let ___T" → const / let
    js = js.replace(/\bconst\s+let\s+/g, 'const ');
    js = js.replace(/\bconst\s+___T\s+/g, 'const ');
    js = js.replace(/\blet\s+___T\s+/g, 'let ');

    // for-loop initializers: "for(int i" → "for(let i"
    js = js.replace(/\bfor\s*\(\s*(?:unsigned\s+)?(?:long|int|float|double|bool|boolean|byte|char|word)\s+/g, 'for (let ');

    // void setup()/loop() → async functions
    js = js.replace(/\bvoid\s+setup\s*\(\s*\)/g,  'async function _setup()');
    js = js.replace(/\bvoid\s+loop\s*\(\s*\)/g,   'async function _loop()');
    js = js.replace(/\bvoid\s+([a-zA-Z_]\w*)\s*\(/g, 'async function $1(');

    // Typed functions (int foo(), float bar(), etc.)
    js = js.replace(/\b(?:int|float|double|long|bool|boolean|byte|char|String|word)\s+([a-zA-Z_]\w*)\s*\(\s*/g,
      'async function $1(');

    // ── Constants ────────────────────────────────────────
    js = js.replace(/\bHIGH\b/g,         '1');
    js = js.replace(/\bLOW\b/g,          '0');
    js = js.replace(/\bOUTPUT\b/g,       '"OUTPUT"');
    js = js.replace(/\bINPUT_PULLUP\b/g, '"INPUT_PULLUP"');
    js = js.replace(/\bINPUT\b/g,        '"INPUT"');
    js = js.replace(/\bLED_BUILTIN\b/g,  '13');
    js = js.replace(/\bPI\b/g,           'Math.PI');
    js = js.replace(/\btrue\b/g,         'true');
    js = js.replace(/\bfalse\b/g,        'false');
    js = js.replace(/\bNULL\b/g,         'null');

    // Analog pin names A0–A5
    js = js.replace(/\bA([0-5])\b/g, 'sim.A$1');

    // ── Serial — println MUST come before print ──────────
    js = js.replace(/\bSerial\.println\s*\(/g,   'sim.println(');
    js = js.replace(/\bSerial\.print\s*\(/g,     'sim.print(');
    js = js.replace(/\bSerial\.begin\s*\(/g,     'sim.serialBegin(');
    js = js.replace(/\bSerial\.available\s*\(/g, 'sim.serialAvailable(');
    js = js.replace(/\bSerial\.read\s*\(/g,      'sim.serialRead(');

    // ── Arduino I/O ──────────────────────────────────────
    js = js.replace(/\bpinMode\s*\(/g,          'sim.pinMode(');
    js = js.replace(/\bdigitalWrite\s*\(/g,      'sim.digitalWrite(');
    js = js.replace(/\bdigitalRead\s*\(/g,       'await sim.digitalRead(');
    js = js.replace(/\banalogWrite\s*\(/g,       'sim.analogWrite(');
    js = js.replace(/\banalogRead\s*\(/g,        'sim.analogRead(');

    // ── Time ─────────────────────────────────────────────
    js = js.replace(/\bdelayMicroseconds\s*\(/g, 'await sim.delayMicroseconds(');
    js = js.replace(/\bdelay\s*\(/g,             'await sim.delay(');
    js = js.replace(/\bmillis\s*\(/g,            'sim.millis(');
    js = js.replace(/\bmicros\s*\(/g,            'sim.micros(');

    // ── Misc Arduino ─────────────────────────────────────
    js = js.replace(/\bmap\s*\(/g,      'sim.map(');
    js = js.replace(/\bconstrain\s*\(/, 'sim.constrain(');
    js = js.replace(/\brandom\s*\(/g,   'sim.random(');
    js = js.replace(/\btone\s*\(/g,     'sim.tone(');
    js = js.replace(/\bnoTone\s*\(/g,   'sim.noTone(');

    // ── Math aliases ─────────────────────────────────────
    js = js.replace(/\babs\s*\(/g,   'Math.abs(');
    js = js.replace(/\bsqrt\s*\(/g,  'Math.sqrt(');
    js = js.replace(/\bpow\s*\(/g,   'Math.pow(');
    js = js.replace(/\bmin\s*\(/g,   'Math.min(');
    js = js.replace(/\bmax\s*\(/g,   'Math.max(');
    js = js.replace(/\bsin\s*\(/g,   'Math.sin(');
    js = js.replace(/\bcos\s*\(/g,   'Math.cos(');
    js = js.replace(/\btan\s*\(/g,   'Math.tan(');
    js = js.replace(/\bsq\s*\(/g,    'sim.sq(');
    js = js.replace(/\bround\s*\(/g, 'Math.round(');
    js = js.replace(/\bfloor\s*\(/g, 'Math.floor(');
    js = js.replace(/\bceil\s*\(/g,  'Math.ceil(');

    // Strip type annotations from function parameters
    // e.g. "async function blink(int pin, int times)" → "async function blink(pin, times)"
    js = js.replace(/(async\s+function\s+\w+\s*\()([^)]*)\)/g, (_, head, params) => {
      const cleaned = params.replace(/\b(?:unsigned\s+)?(?:int|float|double|long|bool|boolean|byte|char|word|String)\s+(\w)/g, '$1');
      return head + cleaned + ')';
    });

    // Two-pass: add await before user-defined async function calls
    const userFuncs = new Set();
    const fnRe = /async\s+function\s+(\w+)\s*\(/g;
    let m;
    while ((m = fnRe.exec(js)) !== null) {
      if (m[1] !== '_setup' && m[1] !== '_loop') userFuncs.add(m[1]);
    }
    userFuncs.forEach(name => {
      // Don't re-add await if already present
      const re = new RegExp(`(?<!await\\s{0,20})(?<!async\\s+function\\s+)\\b${name}\\s*\\(`, 'g');
      js = js.replace(re, `await ${name}(`);
    });

    return js;
  }
}

// ── SimObject — "hardware" seen by transpiled code ─────────
class SimObject {
  constructor(board, fastMode = false) {
    this._board   = board;
    this.running  = false;
    this.fastMode = fastMode;            // fast = no real delays (for challenge check)
    this._startMs = Date.now();
    this._maxLoops = fastMode ? 60 : 16; // 16 visual loops, 60 fast validation loops
    this._loopCount = 0;
    this.serialLines  = [];
    this.serialUsed   = false;
    this.pwmUsed      = false;

    // Analog pin constants
    this.A0 = 100; this.A1 = 101; this.A2 = 102;
    this.A3 = 103; this.A4 = 104; this.A5 = 105;
  }

  // ── Pin I/O ───────────────────────────────────────────
  pinMode(pin, mode) {
    this._board.setPinMode(pin, mode);
  }
  digitalWrite(pin, val) {
    if (!this.running) return;
    this._board.setDigital(pin, val ? 1 : 0);
  }
  analogWrite(pin, val) {
    if (!this.running) return;
    this.pwmUsed = true;
    val = Math.max(0, Math.min(255, Math.round(+val || 0)));
    this._board.setPWM(pin, val);
  }
  analogRead(pin) {
    if (pin >= 100 && pin <= 105) return this._board.getAnalog(pin - 100);
    return 0;
  }
  async digitalRead(pin) {
    return this._board.getDigitalInput(pin);
  }

  // ── Timing ───────────────────────────────────────────
  async delay(ms) {
    if (!this.running) throw new Error('STOPPED');
    if (this.fastMode) {
      // yield to event loop but don't wait
      await new Promise(r => setTimeout(r, 1));
    } else {
      ms = Math.min(+ms || 0, 1500); // cap real delays at 1500ms so large delays are visible
      await new Promise(r => setTimeout(r, ms));
    }
    if (!this.running) throw new Error('STOPPED');
  }
  async delayMicroseconds(us) {
    await this.delay(us / 1000);
  }
  millis() { return Date.now() - this._startMs; }
  micros() { return (Date.now() - this._startMs) * 1000; }

  // ── Serial ────────────────────────────────────────────
  serialBegin(baud) {
    if (!this.fastMode)
      this._board.appendSerial(`Serial started @ ${baud} baud`, 'info');
  }
  print(val) {
    this.serialUsed = true;
    if (val === null || val === undefined) return;
    this._board.appendSerialRaw(String(val));
  }
  println(val) {
    this.serialUsed = true;
    const str = (val === null || val === undefined) ? '' : String(val);
    this._board.flushSerial(str);
  }
  serialAvailable() { return 0; }
  serialRead()      { return -1; }

  // ── Math helpers ──────────────────────────────────────
  map(val, fL, fH, tL, tH) {
    return (val - fL) * (tH - tL) / (fH - fL) + tL;
  }
  constrain(val, lo, hi) { return Math.max(lo, Math.min(hi, val)); }
  random(a, b) {
    if (b === undefined) return Math.floor(Math.random() * a);
    return Math.floor(Math.random() * (b - a)) + a;
  }
  sq(x)     { return x * x; }
  tone(pin, freq, dur) {
    if (!this.fastMode)
      this._board.appendSerial(`♪ tone(pin${pin}, ${freq}Hz${dur ? ', ' + dur + 'ms' : ''})`, 'info');
  }
  noTone() {}
}

// ── ArduinoBoard — visual board + runner ──────────────────
class ArduinoBoard {
  constructor(containerEl) {
    this._el        = containerEl;
    this._pins      = {};
    this._analog    = [512, 512, 512, 512, 512, 512];
    this._serialBuf = '';
    this._btnState  = {}; // pin → 0 (released) or 1 (pressed)
    this.sim        = null;
    this._running   = false;
    this._render();
  }

  // ── Board HTML ────────────────────────────────────────
  _render() {
    this._el.innerHTML = `
      <div class="arduino-board">
        <div class="board-title">⚡ Arduino Uno Simulator</div>

        <div class="main-led-wrap">
          <div class="main-led" id="sim-led-13">○</div>
          <div class="main-led-label">Pin 13 — LED_BUILTIN</div>
        </div>

        <div>
          <div class="pin-row-label">Digital Pins</div>
          <div class="pin-row" id="sim-pin-row">
            ${[2,3,4,5,6,7,8,9,10,11,12].map(p => `
              <div class="pin-item" id="sim-pin-item-${p}" title="Pin ${p}${[3,5,6,9,10,11].includes(p) ? ' (PWM~)' : ''}">
                <div class="pin-led" id="sim-pin-${p}"></div>
                <div class="pin-num">${p}${[3,5,6,9,10,11].includes(p) ? '~' : ''}</div>
              </div>`).join('')}
          </div>
        </div>

        <div id="sim-btn-row-wrap" style="display:none">
          <div class="pin-row-label">Digital Inputs — hold button to press</div>
          <div class="btn-input-row" id="sim-btn-row"></div>
        </div>

        <div>
          <div class="pin-row-label">Analog Inputs — drag to set value</div>
          <div class="analog-row">
            ${[0,1,2,3,4,5].map(i => `
              <div class="analog-item">
                <div class="analog-label-row">
                  <span>A${i}</span>
                  <span id="sim-a${i}-val">512</span>
                </div>
                <input type="range" class="analog-slider" id="sim-a${i}"
                  min="0" max="1023" value="512"
                  oninput="if(window._board){window._board.setAnalogSlider(${i},this.value)}" />
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div class="serial-monitor">
        <div class="serial-head">
          <strong>Serial Monitor</strong>
          <span style="color:var(--text3);font-size:.68rem">&nbsp;@ 9600 baud</span>
          <button class="serial-clear-btn" onclick="if(window._board)window._board.clearSerial()">Clear</button>
        </div>
        <div class="serial-output" id="sim-serial">
          <div class="ser-info">— Simulator ready. Click ▶ Run to execute your sketch. —</div>
        </div>
      </div>
    `;
    window._board = this;
  }

  // ── Interactive button helpers ────────────────────────
  _showButtonForPin(pin) {
    const wrap = document.getElementById('sim-btn-row-wrap');
    const row  = document.getElementById('sim-btn-row');
    if (!wrap || !row) return;
    // Only add if not already present
    if (document.getElementById(`sim-btn-${pin}`)) return;

    const isPullup = this._pins[pin] && this._pins[pin].mode === '"INPUT_PULLUP"';
    const div = document.createElement('div');
    div.className = 'btn-input-item';
    div.id = `sim-btn-${pin}`;
    div.innerHTML = `
      <button class="sim-pushbtn" id="sim-pushbtn-${pin}"
        onmousedown="window._board&&window._board.pressBtn(${pin},true)"
        onmouseup="window._board&&window._board.pressBtn(${pin},false)"
        ontouchstart="window._board&&window._board.pressBtn(${pin},true);event.preventDefault()"
        ontouchend="window._board&&window._board.pressBtn(${pin},false)">
        Hold
      </button>
      <div class="btn-pin-label">Pin ${pin}<br><span id="sim-btn-state-${pin}" class="btn-state-lbl">${isPullup ? 'HIGH' : 'LOW'}</span></div>
    `;
    row.appendChild(div);
    wrap.style.display = '';
    // init state: INPUT_PULLUP → reads HIGH (1) by default; INPUT → LOW (0)
    this._btnState[pin] = isPullup ? 1 : 0;
  }

  pressBtn(pin, down) {
    const isPullup = this._pins[pin] && this._pins[pin].mode === '"INPUT_PULLUP"';
    // With INPUT_PULLUP: pressing connects to GND → reads LOW (0)
    // With INPUT: pressing sends 5V → reads HIGH (1)
    this._btnState[pin] = isPullup ? (down ? 0 : 1) : (down ? 1 : 0);
    const lbl = document.getElementById(`sim-btn-state-${pin}`);
    if (lbl) lbl.textContent = this._btnState[pin] ? 'HIGH' : 'LOW';
    const btn = document.getElementById(`sim-pushbtn-${pin}`);
    if (btn) btn.classList.toggle('pressed', down);
  }

  _clearButtons() {
    this._btnState = {};
    const wrap = document.getElementById('sim-btn-row-wrap');
    const row  = document.getElementById('sim-btn-row');
    if (wrap) wrap.style.display = 'none';
    if (row)  row.innerHTML = '';
  }

  // ── Pin state ─────────────────────────────────────────
  setPinMode(pin, mode) {
    this._pins[pin] = this._pins[pin] || {};
    this._pins[pin].mode = mode;
    // If this is an INPUT pin, show an interactive button
    if (mode === '"INPUT"' || mode === '"INPUT_PULLUP"') {
      this._showButtonForPin(pin);
    }
  }
  setDigital(pin, val) {
    this._pins[pin] = this._pins[pin] || {};
    this._pins[pin].digital = val;
    this._pins[pin].pwm = null;
    this._updatePinEl(pin, val, null);
  }
  setPWM(pin, val) {
    this._pins[pin] = this._pins[pin] || {};
    this._pins[pin].digital = val > 0 ? 1 : 0;
    this._pins[pin].pwm = val;
    this._updatePinEl(pin, null, val);
  }
  getDigital(pin)       { return (this._pins[pin] && this._pins[pin].digital) ? 1 : 0; }
  getDigitalInput(pin)  {
    // If the pin has an interactive button state, use it
    if (pin in this._btnState) return this._btnState[pin];
    // Default: INPUT_PULLUP pins read HIGH, INPUT pins read LOW
    const mode = this._pins[pin] && this._pins[pin].mode;
    return mode === '"INPUT_PULLUP"' ? 1 : 0;
  }
  getAnalog(idx)   { return this._analog[idx] || 0; }

  setAnalogSlider(idx, val) {
    this._analog[idx] = parseInt(val);
    const lbl = document.getElementById(`sim-a${idx}-val`);
    if (lbl) lbl.textContent = val;
  }

  _updatePinEl(pin, digital, pwm) {
    // Special: pin 13 drives the big LED
    if (pin === 13) {
      const el = document.getElementById('sim-led-13');
      if (el) {
        if (pwm !== null) {
          const op = (pwm / 255).toFixed(2);
          el.className = 'main-led pwm-glow';
          el.style.setProperty('--pwm-op', op);
          el.textContent = pwm > 0 ? '💡' : '○';
        } else {
          el.className = `main-led${digital ? ' on' : ''}`;
          el.style.removeProperty('--pwm-op');
          el.textContent = digital ? '💡' : '○';
        }
      }
    }
    // Generic numbered pin LED (2-12)
    const el = document.getElementById(`sim-pin-${pin}`);
    if (!el) return;
    if (pwm !== null) {
      el.style.setProperty('--pwm', (pwm / 255).toFixed(2));
      el.className = 'pin-led pwm';
    } else {
      el.style.removeProperty('--pwm');
      el.className = digital ? 'pin-led high' : 'pin-led';
    }
  }

  // ── Serial output ─────────────────────────────────────
  appendSerial(text, cls = '') {
    const out = document.getElementById('sim-serial');
    if (out) {
      const div = document.createElement('div');
      div.className = cls === 'info' ? 'ser-info' : cls === 'error' ? 'ser-error' : 'ser-line';
      div.textContent = text;
      out.appendChild(div);
      out.scrollTop = out.scrollHeight;
    }
    if (this.sim) this.sim.serialLines.push(text);
  }
  appendSerialRaw(text) {
    this._serialBuf += text;
  }
  flushSerial(extra = '') {
    const line = this._serialBuf + extra;
    this._serialBuf = '';
    this.appendSerial(line);
  }
  clearSerial() {
    const out = document.getElementById('sim-serial');
    if (out) out.innerHTML = '';
    if (this.sim) this.sim.serialLines = [];
  }

  // ── Core run engine ───────────────────────────────────
  async _execute(code, fastMode) {
    if (this._running) await this.stop();

    this._running = true;
    this._resetAllPins();

    this.sim           = new SimObject(this, fastMode);
    this.sim.running   = true;
    this._serialBuf    = '';

    const transpiler = new ArduinoTranspiler();
    let js;
    try {
      js = transpiler.transpile(code);
    } catch (e) {
      this.appendSerial(`[Transpile error] ${e.message}`, 'error');
      this._running = false;
      return;
    }

    const body = `
      ${js}
      if (typeof _setup === 'function') await _setup();
      let _lc = 0;
      const _max = sim._maxLoops;
      while (sim.running && _lc < _max) {
        _lc++;
        if (typeof _loop === 'function') await _loop();
        else break;
        if (_lc % 10 === 0) await new Promise(r => setTimeout(r, 0));
      }
    `;

    let fn;
    try {
      const AF = Object.getPrototypeOf(async function(){}).constructor;
      fn = new AF('sim', body);
    } catch (e) {
      this.appendSerial(`[Syntax error] ${e.message}`, 'error');
      this._running = false;
      this._updateStatus('error');
      return;
    }

    if (!fastMode) this._updateStatus('running');
    try {
      await fn(this.sim);
    } catch (e) {
      if (e.message !== 'STOPPED') {
        this.appendSerial(`[Runtime error] ${e.message}`, 'error');
        if (!fastMode) this._updateStatus('error');
      }
    }

    // Flush any trailing print() without println()
    if (this._serialBuf) this.flushSerial();

    this._running = false;
    this.sim.running = false;
    if (!fastMode) this._updateStatus('idle');
  }

  // ── Public API ────────────────────────────────────────

  /** Visual run — real delays (capped), ~8 loop iterations */
  async run(code) {
    this.clearSerial();
    await this._execute(code, false);
  }

  /** Fast validation run — no delays, 40 iterations, no DOM spam */
  async runForCheck(code) {
    const prevSerial = document.getElementById('sim-serial')?.innerHTML;
    await this._execute(code, true);
    // Restore serial display after fast run so user still sees previous output
    const out = document.getElementById('sim-serial');
    if (out && prevSerial) out.innerHTML = prevSerial;
  }

  async stop() {
    if (this.sim) this.sim.running = false;
    this._running = false;
    await new Promise(r => setTimeout(r, 150));
    this._updateStatus('idle');
  }

  isRunning() { return this._running; }

  getState() {
    return {
      pins:        JSON.parse(JSON.stringify(this._pins)),
      serialLines: this.sim ? [...this.sim.serialLines] : [],
      serialUsed:  this.sim ? this.sim.serialUsed : false,
      pwmUsed:     this.sim ? this.sim.pwmUsed    : false,
    };
  }

  // ── Helpers ───────────────────────────────────────────
  _resetAllPins() {
    this._pins = {};
    this._clearButtons();
    const led13 = document.getElementById('sim-led-13');
    if (led13) { led13.className = 'main-led'; led13.textContent = '○'; led13.style.removeProperty('--pwm-op'); }
    [2,3,4,5,6,7,8,9,10,11,12].forEach(p => {
      const el = document.getElementById(`sim-pin-${p}`);
      if (el) { el.className = 'pin-led'; el.style.removeProperty('--pwm'); }
    });
  }

  _updateStatus(state) {
    const dot = document.getElementById('sim-status-dot');
    if (dot) dot.className = `sim-status-dot ${state}`;
    const label = document.getElementById('sim-status-label');
    const map = { running: '● Running', idle: '○ Idle', error: '✕ Error' };
    if (label) label.textContent = map[state] || '';
  }
}
