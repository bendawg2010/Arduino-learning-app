/* ─────────────────────────────────────────────────────────
   simulator.js  –  Arduino code transpiler + execution
                    engine + visual board renderer.
   ───────────────────────────────────────────────────────── */

// ── Transpiler ─────────────────────────────────────────────
class ArduinoTranspiler {
  transpile(code) {
    let js = code;

    // ── Strip #include / #define directives ──────────────
    js = js.replace(/^\s*#(include|define|pragma)[^\n]*/gm, '// (preprocessor removed)');

    // ── C++ type declarations → let / const ─────────────
    // unsigned variants first
    js = js.replace(/\bunsigned\s+(long|int|char|short)\b/g, 'let ___unsigned');
    js = js.replace(/\b(uint8_t|uint16_t|uint32_t|int8_t|int16_t|int32_t|size_t)\b/g, 'let ___int');
    // standard types before variables
    js = js.replace(/\b(long|int|float|double|boolean|bool|byte|char|word|short)\s+(?=[a-zA-Z_])/g, 'let ');
    js = js.replace(/\bString\s+(?=[a-zA-Z_])/g, 'let ');
    // Fix "const let" → "const"
    js = js.replace(/\bconst\s+let\s+/g, 'const ');
    js = js.replace(/\bconst\s+___\w+\s+/g, 'const ');
    js = js.replace(/\blet\s+___\w+\s+/g, 'let ');
    // for-loop initializers
    js = js.replace(/\bfor\s*\(\s*(unsigned\s+)?(long|int|float|double|bool|boolean|byte|char|word)\s+/g, 'for (let ');

    // ── void functions → async functions ─────────────────
    js = js.replace(/\bvoid\s+(setup)\s*\(\s*\)/g, 'async function _setup()');
    js = js.replace(/\bvoid\s+(loop)\s*\(\s*\)/g, 'async function _loop()');
    js = js.replace(/\bvoid\s+([a-zA-Z_]\w*)\s*\(/g, 'async function $1(');
    // typed functions (int, float, etc.)
    js = js.replace(/\b(?:int|float|double|long|bool|boolean|byte|char|String|word)\s+([a-zA-Z_]\w*)\s*\(/g, 'async function $1(');
    // typed function parameters – remove type from params
    // (handled via generic param stripping below)

    // ── Constants ────────────────────────────────────────
    js = js.replace(/\bHIGH\b/g, '1');
    js = js.replace(/\bLOW\b/g,  '0');
    js = js.replace(/\bOUTPUT\b/g,       '"OUTPUT"');
    js = js.replace(/\bINPUT_PULLUP\b/g, '"INPUT_PULLUP"');
    js = js.replace(/\bINPUT\b/g,        '"INPUT"');
    js = js.replace(/\bLED_BUILTIN\b/g,  '13');
    js = js.replace(/\bPI\b/g,           'Math.PI');
    js = js.replace(/\bTWO_PI\b/g,       '(2*Math.PI)');
    js = js.replace(/\bHALF_PI\b/g,      '(Math.PI/2)');
    js = js.replace(/\btrue\b/g,         'true');
    js = js.replace(/\bfalse\b/g,        'false');
    js = js.replace(/\bNULL\b/g,         'null');

    // ── Analog pin names A0-A5 ───────────────────────────
    js = js.replace(/\bA([0-5])\b/g, 'sim.A$1');

    // ── Arduino functions → sim.* ─────────────────────────
    js = js.replace(/\bpinMode\s*\(/g,             'sim.pinMode(');
    js = js.replace(/\bdigitalWrite\s*\(/g,         'sim.digitalWrite(');
    js = js.replace(/\bdigitalRead\s*\(/g,          'await sim.digitalRead(');
    js = js.replace(/\banalogWrite\s*\(/g,          'sim.analogWrite(');
    js = js.replace(/\banalogRead\s*\(/g,           'sim.analogRead(');
    js = js.replace(/\bdelay\s*\(/g,                'await sim.delay(');
    js = js.replace(/\bdelayMicroseconds\s*\(/g,    'await sim.delayMicroseconds(');
    js = js.replace(/\bmillis\s*\(/g,               'sim.millis(');
    js = js.replace(/\bmicros\s*\(/g,               'sim.micros(');
    js = js.replace(/\bSerial\.begin\s*\(/g,        'sim.serialBegin(');
    js = js.replace(/\bSerial\.print\b(?!ln)/g,     'sim.print');
    js = js.replace(/\bSerial\.println\s*\(/g,      'sim.println(');
    js = js.replace(/\bSerial\.print\s*\(/g,        'sim.print(');
    js = js.replace(/\bSerial\.available\s*\(/g,    'sim.serialAvailable(');
    js = js.replace(/\bSerial\.read\s*\(/g,         'sim.serialRead(');
    js = js.replace(/\bmap\s*\(/g,                  'sim.map(');
    js = js.replace(/\bconstrain\s*\(/g,            'sim.constrain(');
    js = js.replace(/\brandom\s*\(/g,               'sim.random(');
    js = js.replace(/\btone\s*\(/g,                 'sim.tone(');
    js = js.replace(/\bnoTone\s*\(/g,               'sim.noTone(');

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

    // ── Remove typed function parameters ─────────────────
    // e.g. "async function blink(int pin, int times)" → "async function blink(pin, times)"
    js = js.replace(/async\s+function\s+\w+\s*\([^)]*\)/g, (match) => {
      return match.replace(/\b(?:unsigned\s+)?(?:int|float|double|long|bool|boolean|byte|char|word|String)\s+(\w)/g, '$1');
    });

    // ── Two-pass: add await to user-defined async calls ──
    // First collect user function names
    const userFuncs = new Set();
    const fnRe = /async\s+function\s+(\w+)\s*\(/g;
    let fm;
    while ((fm = fnRe.exec(js)) !== null) {
      if (fm[1] !== '_setup' && fm[1] !== '_loop') {
        userFuncs.add(fm[1]);
      }
    }
    // Then prefix calls with await (if not already)
    userFuncs.forEach(name => {
      const re = new RegExp(`(?<!await\\s{0,15})(?<!async\\s+function\\s+)\\b${name}\\s*\\(`, 'g');
      js = js.replace(re, `await ${name}(`);
    });

    return js;
  }
}

// ── SimObject — the "hardware" seen by transpiled code ─────
class SimObject {
  constructor(board) {
    this._board = board;    // reference to ArduinoBoard
    this.running  = false;
    this._startMs = Date.now();
    this._maxLoops = 5000;
    this._loopCount = 0;
    this.serialLines = [];
    this.serialUsed   = false;
    this.pwmUsed      = false;

    // Analog pin constants
    this.A0 = 100; this.A1 = 101; this.A2 = 102;
    this.A3 = 103; this.A4 = 104; this.A5 = 105;
  }

  // ── Pin ──────────────────────────────────────────────
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
    val = Math.max(0, Math.min(255, Math.round(val)));
    this._board.setPWM(pin, val);
  }
  analogRead(pin) {
    // Pin 100-105 → A0-A5
    if (pin >= 100 && pin <= 105) {
      return this._board.getAnalog(pin - 100);
    }
    return 0;
  }
  async digitalRead(pin) {
    return this._board.getDigital(pin);
  }

  // ── Time ─────────────────────────────────────────────
  async delay(ms) {
    if (!this.running) throw new Error('STOPPED');
    ms = Math.min(ms, 5000); // cap at 5s to prevent lockup
    await new Promise(r => setTimeout(r, ms));
    if (!this.running) throw new Error('STOPPED');
  }
  async delayMicroseconds(us) {
    await this.delay(us / 1000);
  }
  millis() { return Date.now() - this._startMs; }
  micros() { return (Date.now() - this._startMs) * 1000; }

  // ── Serial ───────────────────────────────────────────
  serialBegin(baud) {
    this._board.appendSerial(`Serial started at ${baud} baud`, 'info');
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
  serialRead() { return -1; }

  // ── Math helpers ──────────────────────────────────────
  map(val, fL, fH, tL, tH) {
    return (val - fL) * (tH - tL) / (fH - fL) + tL;
  }
  constrain(val, lo, hi) { return Math.max(lo, Math.min(hi, val)); }
  random(a, b) {
    if (b === undefined) return Math.floor(Math.random() * a);
    return Math.floor(Math.random() * (b - a)) + a;
  }
  sq(x) { return x * x; }
  tone(pin, freq, dur) {
    this._board.appendSerial(`tone(pin${pin}, ${freq}Hz${dur ? ', '+dur+'ms' : ''})`, 'info');
  }
  noTone(pin) {}
}

// ── ArduinoBoard — visual board + runner ──────────────────
class ArduinoBoard {
  constructor(containerEl) {
    this._el = containerEl;
    this._pins = {};      // pin → { mode, digital, pwm }
    this._analog = [512, 512, 512, 512, 512, 512]; // A0–A5
    this._serialBuf = ''; // current line buffer
    this.sim = null;
    this._running = false;
    this._stopFn  = null;
    this._render();
  }

  // ── Board rendering ───────────────────────────────────
  _render() {
    this._el.innerHTML = `
      <div class="arduino-board">
        <div class="board-title">⚡ Arduino Uno Simulator</div>

        <div class="main-led-wrap">
          <div class="main-led" id="sim-led-13">💡</div>
          <div class="main-led-label">Pin 13 — LED_BUILTIN</div>
        </div>

        <div>
          <div class="pin-row-label">Digital Pins</div>
          <div class="pin-row" id="sim-pin-row">
            ${[2,3,4,5,6,7,8,9,10,11,12].map(p => `
              <div class="pin-item">
                <div class="pin-led" id="sim-pin-${p}"></div>
                <div class="pin-num">${p}${[3,5,6,9,10,11].includes(p)?'~':''}</div>
              </div>`).join('')}
          </div>
        </div>

        <div>
          <div class="pin-row-label">Analog Inputs (drag sliders)</div>
          <div class="analog-row">
            ${[0,1,2,3,4,5].map(i => `
              <div class="analog-item">
                <div class="analog-label-row">
                  <span>A${i}</span>
                  <span id="sim-a${i}-val">512</span>
                </div>
                <input type="range" class="analog-slider" id="sim-a${i}"
                  min="0" max="1023" value="512"
                  oninput="window._board.setAnalogSlider(${i}, this.value)" />
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div class="serial-monitor">
        <div class="serial-head">
          <strong>Serial Monitor</strong>
          <span style="color:var(--text3);font-size:.68rem"> @ 9600 baud</span>
          <button class="serial-clear-btn" onclick="window._board.clearSerial()">Clear</button>
        </div>
        <div class="serial-output" id="sim-serial"></div>
      </div>
    `;
    window._board = this;
  }

  // ── Pin state management ──────────────────────────────
  setPinMode(pin, mode) {
    this._pins[pin] = this._pins[pin] || {};
    this._pins[pin].mode = mode;
  }
  setDigital(pin, val) {
    this._pins[pin] = this._pins[pin] || {};
    this._pins[pin].digital = val;
    this._pins[pin].pwm = null;
    this._updatePin(pin, val, null);
  }
  setPWM(pin, val) {
    this._pins[pin] = this._pins[pin] || {};
    this._pins[pin].digital = val > 0 ? 1 : 0;
    this._pins[pin].pwm = val;
    this._updatePin(pin, null, val);
  }
  getDigital(pin) {
    return (this._pins[pin] && this._pins[pin].digital) ? 1 : 0;
  }
  getAnalog(idx) { return this._analog[idx]; }

  setAnalogSlider(idx, val) {
    this._analog[idx] = parseInt(val);
    const lbl = document.getElementById(`sim-a${idx}-val`);
    if (lbl) lbl.textContent = val;
  }

  _updatePin(pin, digital, pwm) {
    if (pin === 13) {
      const el = document.getElementById('sim-led-13');
      if (!el) return;
      if (pwm !== null) {
        const op = (pwm / 255).toFixed(2);
        el.className = `main-led pwm-glow`;
        el.style.setProperty('--pwm-op', op);
        el.textContent = pwm > 0 ? '💡' : '○';
      } else {
        el.className = `main-led${digital ? ' on' : ''}`;
        el.style.removeProperty('--pwm-op');
        el.textContent = digital ? '💡' : '○';
      }
    } else if (pin === 12) {
      // treat pin 12 like any other pin (handled below)
    }
    // Generic pin LED
    const el = document.getElementById(`sim-pin-${pin}`);
    if (!el) return;
    if (pwm !== null) {
      const op = pwm / 255;
      el.style.setProperty('--pwm', op.toFixed(2));
      el.className = 'pin-led pwm';
    } else {
      el.style.removeProperty('--pwm');
      el.className = digital ? 'pin-led high' : 'pin-led';
    }
  }

  // ── Serial output ─────────────────────────────────────
  appendSerial(text, cls = '') {
    const out = document.getElementById('sim-serial');
    if (!out) return;
    const div = document.createElement('div');
    div.className = cls === 'info' ? 'ser-info' : (cls === 'error' ? 'ser-error' : 'ser-line');
    div.textContent = text;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
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

  // ── Execution ─────────────────────────────────────────
  async run(code) {
    if (this._running) await this.stop();

    this._running = true;
    this.clearSerial();
    this._resetAllPins();

    this.sim = new SimObject(this);
    this.sim.running = true;
    this.sim.serialLines = [];

    // Transpile
    const transpiler = new ArduinoTranspiler();
    let js;
    try {
      js = transpiler.transpile(code);
    } catch (e) {
      this.appendSerial(`[Transpile error] ${e.message}`, 'error');
      this._running = false;
      return;
    }

    // Build execution body
    const body = `
      ${js}
      if (typeof _setup === 'function') { await _setup(); }
      let _lc = 0;
      while (sim.running && _lc < sim._maxLoops) {
        _lc++;
        if (typeof _loop === 'function') { await _loop(); }
        else { break; }
        if (_lc % 200 === 0) await new Promise(r => setTimeout(r, 0));
      }
    `;

    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    let fn;
    try {
      fn = new AsyncFunction('sim', body);
    } catch (e) {
      this.appendSerial(`[Compile error] ${e.message}`, 'error');
      this._running = false;
      return;
    }

    this._updateStatus('running');

    try {
      await fn(this.sim);
    } catch (e) {
      if (e.message !== 'STOPPED') {
        this.appendSerial(`[Runtime error] ${e.message}`, 'error');
      }
    }

    this._running = false;
    this.sim.running = false;
    this._updateStatus('idle');
    if (this._serialBuf) this.flushSerial();
  }

  async stop() {
    if (this.sim) this.sim.running = false;
    this._running = false;
    await new Promise(r => setTimeout(r, 120));
    this._updateStatus('idle');
  }

  _resetAllPins() {
    this._pins = {};
    // Reset LED 13
    const led13 = document.getElementById('sim-led-13');
    if (led13) { led13.className = 'main-led'; led13.textContent = '○'; }
    // Reset other pins
    [2,3,4,5,6,7,8,9,10,11,12].forEach(p => {
      const el = document.getElementById(`sim-pin-${p}`);
      if (el) el.className = 'pin-led';
    });
  }

  _updateStatus(state) {
    const dot = document.getElementById('sim-status-dot');
    if (!dot) return;
    dot.className = `sim-status-dot ${state}`;
  }

  isRunning() { return this._running; }

  // ── Snapshot for challenge validation ─────────────────
  getState() {
    return {
      pins: JSON.parse(JSON.stringify(this._pins)),
      serialLines: this.sim ? [...this.sim.serialLines] : [],
      serialUsed: this.sim ? this.sim.serialUsed : false,
      pwmUsed: this.sim ? this.sim.pwmUsed : false,
    };
  }
}
