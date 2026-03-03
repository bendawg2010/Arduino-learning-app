/* ─────────────────────────────────────────────────────────
   simulator.js  –  Arduino → JS transpiler + execution
                    engine + visual board renderer.
                    Supports: buttons, servos, buzzers, RGB LEDs.
   ───────────────────────────────────────────────────────── */

// ── Transpiler ─────────────────────────────────────────────
class ArduinoTranspiler {
  transpile(code) {
    let js = code;

    // Strip preprocessor directives
    js = js.replace(/^\s*#(include|define|pragma|ifndef|endif|ifdef)[^\n]*/gm, '');

    // Servo library: "Servo myServo;" → "let myServo = sim.createServo();"
    js = js.replace(/\bServo\s+(\w+)\s*;/g, 'let $1 = sim.createServo();');

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
    js = js.replace(/\bpulseIn\s*\(/g,  'await sim.pulseIn(');

    // ── Wire (I2C) library stubs ──────────────────────────
    js = js.replace(/Wire\.begin\s*\(/g,            'sim.wireBegin(');
    js = js.replace(/Wire\.beginTransmission\s*\(/g,'sim.wireBeginTransmission(');
    js = js.replace(/Wire\.write\s*\(/g,            'sim.wireWrite(');
    js = js.replace(/Wire\.endTransmission\s*\(/g,  'sim.wireEndTransmission(');
    js = js.replace(/Wire\.requestFrom\s*\(/g,      'sim.wireRequestFrom(');
    js = js.replace(/Wire\.read\s*\(/g,             'sim.wireRead(');
    js = js.replace(/Wire\.available\s*\(/g,        'sim.wireAvailable(');

    // ── Stepper library ───────────────────────────────────
    // "Stepper myStepper(steps, p1, p2, p3, p4);" → let myStepper = sim.createStepper(steps,p1,p2,p3,p4);
    js = js.replace(/\bStepper\s+(\w+)\s*\(/g, 'let $1 = sim.createStepper(');

    // ── LCD library (LiquidCrystal & LiquidCrystal_I2C) ──
    js = js.replace(/LiquidCrystal_I2C\s+(\w+)\s*\([^)]*\)\s*;/g, 'let $1 = sim.createLCD();');
    js = js.replace(/LiquidCrystal\s+(\w+)\s*\([^)]*\)\s*;/g,     'let $1 = sim.createLCD();');

    // ── DHT sensor library ────────────────────────────────
    js = js.replace(/\bDHT\s+(\w+)\s*\([^)]*\)\s*;/g, 'let $1 = sim.createDHT();');

    // ── Arduino functions ─────────────────────────────────
    js = js.replace(/\bshiftOut\s*\(/g, 'sim.shiftOut(');
    js = js.replace(/\bisnan\s*\(/g,    'isNaN(');
    js = js.replace(/\bbitRead\s*\(/g,  'sim.bitRead(');

    // ── Constants ─────────────────────────────────────────
    js = js.replace(/\bMSBFIRST\b/g, '1');
    js = js.replace(/\bLSBFIRST\b/g, '0');
    js = js.replace(/\bDHT11\b/g, '11');
    js = js.replace(/\bDHT22\b/g, '22');

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
    this.fastMode = fastMode;
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
    return this._board.getDigital(pin);
  }

  // ── Servo library ─────────────────────────────────────
  createServo() {
    const board = this._board;
    const srv = {
      _pin: null,
      attach(pin) { this._pin = pin; board.servoAttach(pin); },
      write(angle) { board.setServoAngle(this._pin, angle); },
      read() { return board._servoAngles[this._pin] || 0; },
    };
    return srv;
  }

  // ── Timing ───────────────────────────────────────────
  async delay(ms) {
    if (!this.running) throw new Error('STOPPED');
    if (this.fastMode) {
      await new Promise(r => setTimeout(r, 1));
    } else {
      ms = Math.min(+ms || 0, 1500); // cap at 1500ms so longer delays are still visible
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
  sq(x) { return x * x; }

  // ── Audio ─────────────────────────────────────────────
  tone(pin, freq, dur) {
    this._board.showBuzzerActive(pin, freq, true);
    if (!this.fastMode)
      this._board.appendSerial(`♪ tone(pin${pin}, ${freq}Hz${dur ? ', ' + dur + 'ms' : ''})`, 'info');
  }
  noTone(pin) {
    this._board.showBuzzerActive(pin, 0, false);
  }

  // ── shiftOut ──────────────────────────────────────────
  shiftOut(dataPin, clockPin, bitOrder, val) {
    val = (val | 0) & 0xFF;
    for (let i = 0; i < 8; i++) {
      const bit = (bitOrder === 1) // MSBFIRST=1
        ? (val >> (7 - i)) & 1
        : (val >> i) & 1;
      this._board.setDigital(dataPin, bit);
      this._board.setDigital(clockPin, 1);
      this._board.setDigital(clockPin, 0);
    }
  }

  // ── Bit helpers ───────────────────────────────────────
  bitRead(val, bit) { return (val >> bit) & 1; }

  // ── pulseIn (ultrasonic echo simulation) ──────────────
  async pulseIn(pin, level) {
    const dist = this._board.getUltrasonicDist();
    const us = Math.round(dist * 58); // ~58 µs per cm round trip
    await this.delayMicroseconds(us);
    return us;
  }

  // ── Wire (I2C) library stubs ──────────────────────────
  wireBegin() {}
  wireBeginTransmission(addr) { this._wireAddr = addr; }
  wireWrite(b) { this._wireTxBuf = this._wireTxBuf || []; this._wireTxBuf.push(b); }
  wireEndTransmission() { return 0; }
  wireRequestFrom(addr, count) {
    // Return simulated 6-byte accel packet (X,Y,Z 16-bit each) from analog sliders A0–A2
    const mapVal = v => Math.round(((v / 1023) * 32768) - 16384);
    const toBytes = v => { const n = v & 0xFFFF; return [(n >> 8) & 0xFF, n & 0xFF]; };
    const ax = mapVal(this._board.getAnalog(0));
    const ay = mapVal(this._board.getAnalog(1));
    const az = mapVal(this._board.getAnalog(2));
    this._wireRxBuf = [...toBytes(ax), ...toBytes(ay), ...toBytes(az)];
    this._wireRxIdx = 0;
    return count;
  }
  wireRead() {
    if (!this._wireRxBuf || this._wireRxIdx >= this._wireRxBuf.length) return 0;
    return this._wireRxBuf[this._wireRxIdx++];
  }
  wireAvailable() {
    if (!this._wireRxBuf) return 0;
    return Math.max(0, this._wireRxBuf.length - (this._wireRxIdx || 0));
  }

  // ── Stepper library stub ──────────────────────────────
  createStepper(stepsPerRev, p1, p2, p3, p4) {
    const board = this._board;
    const pins = [p1, p2, p3, p4];
    // 4-step full-step sequence: {IN1,IN2,IN3,IN4}
    const seq = [[1,0,1,0],[0,1,1,0],[0,1,0,1],[1,0,0,1]];
    let stepIdx = 0;
    const applyStep = () => {
      seq[stepIdx].forEach((v, i) => board.setDigital(pins[i], v));
    };
    return {
      setSpeed(rpm) { /* visual only */ },
      step(n) {
        const dir = n > 0 ? 1 : -1;
        const count = Math.abs(n);
        for (let i = 0; i < count; i++) {
          stepIdx = (stepIdx + dir + 4) % 4;
          applyStep();
        }
      }
    };
  }

  // ── LCD library stub ──────────────────────────────────
  createLCD() {
    const board = this._board;
    const blank = () => '                ';
    const lcd = {
      _text:   [blank(), blank()],
      _cursor: { col: 0, row: 0 },
      init()             { board.setLCDBacklight(false); board.updateLCD(this._text); },
      begin(cols, rows)  { board.updateLCD(this._text); },
      backlight()        { board.setLCDBacklight(true); },
      noBacklight()      { board.setLCDBacklight(false); },
      clear() {
        this._text = [blank(), blank()];
        this._cursor = { col: 0, row: 0 };
        board.updateLCD(this._text);
      },
      home()              { this._cursor = { col: 0, row: 0 }; },
      setCursor(col, row) { this._cursor = { col: Math.max(0, col|0), row: Math.max(0, Math.min(1, row|0)) }; },
      print(val) {
        const str = String(val);
        const row = this._cursor.row;
        let arr = this._text[row].split('');
        for (let i = 0; i < str.length; i++) {
          const c = this._cursor.col + i;
          if (c < 16) arr[c] = str[i];
        }
        this._text[row] = arr.join('');
        this._cursor.col = Math.min(16, this._cursor.col + str.length);
        board.updateLCD(this._text);
      },
      println(val)    { this.print(val); },
      createChar()    { /* stub */ },
      scrollDisplayLeft()  { /* stub */ },
      scrollDisplayRight() { /* stub */ },
    };
    return lcd;
  }

  // ── DHT sensor stub ───────────────────────────────────
  createDHT() {
    const board = this._board;
    return {
      begin() {},
      readTemperature() {
        // Map A0 slider (0-1023) to 0-50°C
        return Math.round((board.getAnalog(0) / 1023) * 50);
      },
      readHumidity() {
        // Map A1 slider (0-1023) to 20-90% RH
        return Math.round(20 + (board.getAnalog(1) / 1023) * 70);
      },
      computeHeatIndex(temp, hum, isFahrenheit) {
        // Simplified Steadman formula
        if (isFahrenheit === false) {
          const t = temp * 9 / 5 + 32;
          const hi = -42.379 + 2.04901523*t + 10.14333127*hum
            - 0.22475541*t*hum - 0.00683783*t*t - 0.05481717*hum*hum
            + 0.00122874*t*t*hum + 0.00085282*t*hum*hum - 0.00000199*t*t*hum*hum;
          return Math.round((hi - 32) * 5 / 9 * 10) / 10;
        }
        return Math.round((temp + hum * 0.1) * 10) / 10;
      },
    };
  }
}

// ── ArduinoBoard — visual board + runner ──────────────────
class ArduinoBoard {
  constructor(containerEl, components = []) {
    this._el           = containerEl;
    this._pins         = {};
    this._analog       = [512, 512, 512, 512, 512, 512];
    this._serialBuf    = '';
    this.sim           = null;
    this._running      = false;
    this._components   = components;
    this._buttonStates = {};   // pin → bool (true = pressed)
    this._servoAngles  = {};   // pin → degrees 0-180
    this._buzzers      = {};   // pin → {active, freq}
    this._lastError    = null;
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
              <div class="pin-item" title="Pin ${p}${[3,5,6,9,10,11].includes(p) ? ' (PWM~)' : ''}">
                <div class="pin-led" id="sim-pin-${p}"></div>
                <div class="pin-num">${p}${[3,5,6,9,10,11].includes(p) ? '~' : ''}</div>
              </div>`).join('')}
          </div>
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

        <div id="sim-components" class="sim-components"></div>
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
    this._renderComponents();
  }

  // ── Component rendering ───────────────────────────────
  _renderComponents() {
    if (!this._components || this._components.length === 0) return;
    const el = document.getElementById('sim-components');
    if (!el) return;

    let html = '<div class="sim-comp-label">Hardware Components</div><div class="sim-comp-row">';

    this._components.forEach(comp => {
      if (comp.type === 'button') {
        html += `
          <div class="comp-item">
            <div class="comp-button" data-pin="${comp.pin}"
              onmousedown="if(window._board)window._board.setButtonPress(${comp.pin},true)"
              onmouseup="if(window._board)window._board.setButtonPress(${comp.pin},false)"
              onmouseleave="if(window._board)window._board.setButtonPress(${comp.pin},false)"
              ontouchstart="event.preventDefault();if(window._board)window._board.setButtonPress(${comp.pin},true)"
              ontouchend="event.preventDefault();if(window._board)window._board.setButtonPress(${comp.pin},false)">
              <div class="btn-cap">PUSH</div>
            </div>
            <div class="comp-label">Button · Pin ${comp.pin}</div>
          </div>`;
      } else if (comp.type === 'servo') {
        html += `
          <div class="comp-item">
            <div class="comp-servo" data-pin="${comp.pin}">
              <div class="servo-body">
                <div class="servo-hub"></div>
                <div class="servo-arm" id="servo-arm-${comp.pin}"></div>
              </div>
              <div class="servo-angle" id="servo-angle-${comp.pin}">0°</div>
            </div>
            <div class="comp-label">Servo · Pin ${comp.pin}</div>
          </div>`;
      } else if (comp.type === 'buzzer') {
        html += `
          <div class="comp-item">
            <div class="comp-buzzer" data-pin="${comp.pin}" id="buzzer-${comp.pin}">
              <div class="buzzer-icon">🔊</div>
              <div class="buzzer-freq" id="buzzer-freq-${comp.pin}">—</div>
            </div>
            <div class="comp-label">Buzzer · Pin ${comp.pin}</div>
          </div>`;
      } else if (comp.type === 'rgb') {
        const {r, g, b} = comp.pins;
        html += `
          <div class="comp-item">
            <div class="comp-rgb-led" id="rgb-led-comp">
              <div class="rgb-circle" id="rgb-circle" style="background:rgb(0,0,0)"></div>
              <div class="rgb-vals">
                <span id="rgb-r-val">R:0</span>
                <span id="rgb-g-val">G:0</span>
                <span id="rgb-b-val">B:0</span>
              </div>
            </div>
            <div class="comp-label">RGB LED · R:${r} G:${g} B:${b}</div>
          </div>`;
        // Store pin mapping for RGB updates
        this._rgbPins = {r, g, b};
      } else if (comp.type === 'ultrasonic') {
        this._ultrasonicDist = 50; // default 50 cm
        html += `
          <div class="comp-item">
            <div class="comp-ultrasonic" id="ultra-${comp.echoPin}">
              <div class="ultra-icon">📡</div>
              <div class="ultra-readout">
                <span class="ultra-dist" id="ultra-dist-${comp.echoPin}">50</span>
                <span class="ultra-cm">cm</span>
              </div>
              <input type="range" class="ultra-slider" id="ultra-slider-${comp.echoPin}"
                min="2" max="400" value="50"
                oninput="if(window._board)window._board.setUltrasonicDist(this.value,${comp.echoPin})" />
            </div>
            <div class="comp-label">HC-SR04 · Trig:${comp.trigPin} Echo:${comp.echoPin}</div>
          </div>`;
      } else if (comp.type === 'motor') {
        this._motorPins = {enablePin: comp.enablePin, in1Pin: comp.in1Pin, in2Pin: comp.in2Pin};
        html += `
          <div class="comp-item">
            <div class="comp-motor" id="motor-${comp.enablePin}">
              <div class="motor-icon">⚙️</div>
              <div class="motor-bar-bg">
                <div class="motor-bar" id="motor-bar-${comp.enablePin}" style="width:0%"></div>
              </div>
              <div class="motor-stats">
                <span class="motor-speed" id="motor-speed-${comp.enablePin}">0%</span>
                <span class="motor-dir" id="motor-dir-${comp.enablePin}">Coast</span>
              </div>
            </div>
            <div class="comp-label">DC Motor · EN:${comp.enablePin} IN1:${comp.in1Pin} IN2:${comp.in2Pin}</div>
          </div>`;
      } else if (comp.type === 'stepper') {
        this._stepperPins = comp.pins;
        this._stepperCount = 0;
        html += `
          <div class="comp-item">
            <div class="comp-stepper" id="stepper-${comp.pins[0]}">
              <div class="stepper-coils">
                ${comp.pins.map((p, i) => `
                  <div class="stepper-coil" id="stepper-coil-${comp.pins[0]}-${i}">
                    <span>C${i+1}</span>
                  </div>`).join('')}
              </div>
              <div class="stepper-info" id="stepper-step-${comp.pins[0]}">Step: 0</div>
            </div>
            <div class="comp-label">Stepper · Pins ${comp.pins.join(', ')}</div>
          </div>`;
      } else if (comp.type === 'imu') {
        html += `
          <div class="comp-item comp-imu-item">
            <div class="comp-imu" id="comp-imu">
              <div class="imu-title">🔵 IMU / Accel</div>
              <div class="imu-rows">
                <div class="imu-row">
                  <span class="imu-axis x">X</span>
                  <input type="range" class="imu-slider" min="0" max="1023" value="512"
                    oninput="if(window._board){window._board.setAnalogSlider(0,this.value);window._board.updateIMUDisplay();}" />
                  <span class="imu-val" id="imu-x-val">0°</span>
                </div>
                <div class="imu-row">
                  <span class="imu-axis y">Y</span>
                  <input type="range" class="imu-slider" min="0" max="1023" value="512"
                    oninput="if(window._board){window._board.setAnalogSlider(1,this.value);window._board.updateIMUDisplay();}" />
                  <span class="imu-val" id="imu-y-val">0°</span>
                </div>
                <div class="imu-row">
                  <span class="imu-axis z">Z</span>
                  <input type="range" class="imu-slider" min="0" max="1023" value="512"
                    oninput="if(window._board){window._board.setAnalogSlider(2,this.value);window._board.updateIMUDisplay();}" />
                  <span class="imu-val" id="imu-z-val">0°</span>
                </div>
              </div>
            </div>
            <div class="comp-label">IMU · I2C (SDA:A4 SCL:A5)</div>
          </div>`;
      } else if (comp.type === 'lcd') {
        this._lcdText = ['                ', '                '];
        html += `
          <div class="comp-item comp-lcd-item">
            <div class="comp-lcd" id="sim-lcd-comp">
              <div class="lcd-screen" id="sim-lcd-display">
                <div class="lcd-row" id="lcd-row-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div class="lcd-row" id="lcd-row-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              </div>
            </div>
            <div class="comp-label">LCD 16×2 · I2C 0x27</div>
          </div>`;
      }
    });

    html += '</div>';
    el.innerHTML = html;
  }

  // ── Ultrasonic sensor ─────────────────────────────────
  setUltrasonicDist(cm, echoPin) {
    this._ultrasonicDist = parseInt(cm);
    const lbl = document.getElementById(`ultra-dist-${echoPin}`);
    if (lbl) lbl.textContent = cm;
  }
  getUltrasonicDist() { return this._ultrasonicDist || 50; }

  // ── DC Motor display ──────────────────────────────────
  _tryUpdateMotor(pin) {
    if (!this._motorPins) return;
    const mp = this._motorPins;
    if (pin !== mp.enablePin && pin !== mp.in1Pin && pin !== mp.in2Pin) return;
    const rawPwm = this._pins[mp.enablePin];
    const speed = rawPwm?.pwm ?? (rawPwm?.digital ? 255 : 0);
    const in1 = this._pins[mp.in1Pin]?.digital ?? 0;
    const in2 = this._pins[mp.in2Pin]?.digital ?? 0;
    const pct = Math.round((speed / 255) * 100);
    let dir = 'Coast';
    if (in1 && !in2)  dir = '▶ Fwd';
    else if (!in1 && in2) dir = '◀ Rev';
    else if (in1 && in2)  dir = '■ Brake';
    const speedEl = document.getElementById(`motor-speed-${mp.enablePin}`);
    const dirEl   = document.getElementById(`motor-dir-${mp.enablePin}`);
    const barEl   = document.getElementById(`motor-bar-${mp.enablePin}`);
    if (speedEl) speedEl.textContent = `${pct}%`;
    if (dirEl)   dirEl.textContent   = dir;
    if (barEl)   barEl.style.width   = `${pct}%`;
    const motorEl = document.getElementById(`motor-${mp.enablePin}`);
    if (motorEl) motorEl.classList.toggle('running', pct > 0);
  }

  // ── Stepper coil display ──────────────────────────────
  _tryUpdateStepper(pin) {
    if (!this._stepperPins || !this._stepperPins.includes(pin)) return;
    const pins = this._stepperPins;
    let changed = false;
    pins.forEach((p, i) => {
      const el = document.getElementById(`stepper-coil-${pins[0]}-${i}`);
      const active = !!(this._pins[p]?.digital);
      if (el) {
        const was = el.classList.contains('active');
        el.classList.toggle('active', active);
        if (active && !was) changed = true;
      }
    });
    if (changed) {
      this._stepperCount = (this._stepperCount || 0) + 1;
      const lbl = document.getElementById(`stepper-step-${pins[0]}`);
      if (lbl) lbl.textContent = `Step: ${this._stepperCount}`;
    }
  }

  // ── LCD display ───────────────────────────────────────
  updateLCD(text) {
    this._lcdText = [...text];
    for (let r = 0; r < 2; r++) {
      const el = document.getElementById(`lcd-row-${r}`);
      if (el) el.textContent = (text[r] || '').padEnd(16).substring(0, 16);
    }
  }
  setLCDBacklight(on) {
    const el = document.getElementById('sim-lcd-comp');
    if (el) el.classList.toggle('on', on);
  }

  // ── IMU display ───────────────────────────────────────
  updateIMUDisplay() {
    const toAngle = v => Math.round(((v - 512) / 512) * 90);
    const x = toAngle(this._analog[0]);
    const y = toAngle(this._analog[1]);
    const z = toAngle(this._analog[2]);
    const ex = document.getElementById('imu-x-val');
    const ey = document.getElementById('imu-y-val');
    const ez = document.getElementById('imu-z-val');
    if (ex) ex.textContent = `${x}°`;
    if (ey) ey.textContent = `${y}°`;
    if (ez) ez.textContent = `${z}°`;
  }

  // ── Button control ────────────────────────────────────
  setButtonPress(pin, pressed) {
    this._buttonStates[pin] = pressed;
    const el = document.querySelector(`.comp-button[data-pin="${pin}"]`);
    if (el) el.classList.toggle('pressed', pressed);
  }

  // ── Servo control ─────────────────────────────────────
  servoAttach(pin) {
    this._servoAngles[pin] = 0;
    this._updateServoEl(pin);
  }

  setServoAngle(pin, angle) {
    if (pin === null || pin === undefined) return;
    angle = Math.max(0, Math.min(180, Math.round(+angle || 0)));
    this._servoAngles[pin] = angle;
    this._updateServoEl(pin);
  }

  _updateServoEl(pin) {
    const arm = document.getElementById(`servo-arm-${pin}`);
    if (arm) {
      const angle = this._servoAngles[pin] || 0;
      arm.style.transform = `rotate(${angle - 90}deg)`;
    }
    const lbl = document.getElementById(`servo-angle-${pin}`);
    if (lbl) lbl.textContent = `${this._servoAngles[pin] || 0}°`;
  }

  // ── Buzzer control ────────────────────────────────────
  showBuzzerActive(pin, freq, active) {
    const el = document.getElementById(`buzzer-${pin}`);
    if (el) el.classList.toggle('active', active);
    const lbl = document.getElementById(`buzzer-freq-${pin}`);
    if (lbl) lbl.textContent = active ? `${freq} Hz` : '—';
  }

  // ── RGB LED control ───────────────────────────────────
  _updateRGBLed() {
    if (!this._rgbPins) return;
    const r = this._pins[this._rgbPins.r]?.pwm ?? 0;
    const g = this._pins[this._rgbPins.g]?.pwm ?? 0;
    const b = this._pins[this._rgbPins.b]?.pwm ?? 0;
    const circle = document.getElementById('rgb-circle');
    if (circle) circle.style.backgroundColor = `rgb(${r},${g},${b})`;
    const rv = document.getElementById('rgb-r-val');
    const gv = document.getElementById('rgb-g-val');
    const bv = document.getElementById('rgb-b-val');
    if (rv) rv.textContent = `R:${r}`;
    if (gv) gv.textContent = `G:${g}`;
    if (bv) bv.textContent = `B:${b}`;
  }

  // ── Pin state ─────────────────────────────────────────
  setPinMode(pin, mode) {
    this._pins[pin] = this._pins[pin] || {};
    this._pins[pin].mode = mode;
    // Initialize button pin as HIGH (INPUT_PULLUP = not pressed)
    if ((mode === '"INPUT_PULLUP"' || mode === '"INPUT"') && this._buttonStates[pin] === undefined) {
      this._buttonStates[pin] = false;
      // Auto-add a button widget in the sim-components area if not already declared
      const alreadyDeclared = this._components.some(c => c.type === 'button' && c.pin === pin);
      if (!alreadyDeclared) this._addAutoButton(pin, mode === '"INPUT_PULLUP"');
    }
  }

  // Dynamically add a button widget to the sim-components panel
  _addAutoButton(pin, isPullup) {
    const el = document.getElementById('sim-components');
    if (!el) return;
    if (document.getElementById(`auto-btn-${pin}`)) return; // already added
    // Ensure the header label exists
    if (!el.querySelector('.sim-comp-label')) {
      el.innerHTML = '<div class="sim-comp-label">Hardware Components</div><div class="sim-comp-row" id="sim-comp-row"></div>';
    }
    let row = document.getElementById('sim-comp-row');
    if (!row) { row = el.querySelector('.sim-comp-row'); }
    if (!row) return;
    const div = document.createElement('div');
    div.className = 'comp-item';
    div.id = `auto-btn-${pin}`;
    div.innerHTML = `
      <div class="comp-button" data-pin="${pin}"
        onmousedown="if(window._board)window._board.setButtonPress(${pin},true)"
        onmouseup="if(window._board)window._board.setButtonPress(${pin},false)"
        onmouseleave="if(window._board)window._board.setButtonPress(${pin},false)"
        ontouchstart="event.preventDefault();if(window._board)window._board.setButtonPress(${pin},true)"
        ontouchend="event.preventDefault();if(window._board)window._board.setButtonPress(${pin},false)">
        <div class="btn-cap">PUSH</div>
      </div>
      <div class="comp-label">Button · Pin ${pin}${isPullup ? '<br><small>(INPUT_PULLUP)</small>' : ''}</div>`;
    row.appendChild(div);
  }
  setDigital(pin, val) {
    this._pins[pin] = this._pins[pin] || {};
    this._pins[pin].digital = val;
    this._pins[pin].pwm = null;
    this._updatePinEl(pin, val, null);
    this._tryUpdateMotor(pin);
    this._tryUpdateStepper(pin);
  }
  setPWM(pin, val) {
    this._pins[pin] = this._pins[pin] || {};
    this._pins[pin].digital = val > 0 ? 1 : 0;
    this._pins[pin].pwm = val;
    this._updatePinEl(pin, null, val);
    // Update servo if this pin has a servo attached
    if (pin in this._servoAngles) {
      const angle = Math.round((val / 255) * 180);
      this._servoAngles[pin] = angle;
      this._updateServoEl(pin);
    }
    // Update RGB LED if any RGB pin
    if (this._rgbPins && (pin === this._rgbPins.r || pin === this._rgbPins.g || pin === this._rgbPins.b)) {
      this._updateRGBLed();
    }
    this._tryUpdateMotor(pin);
  }
  getDigital(pin) {
    // Button with INPUT_PULLUP: pressed = LOW (0), released = HIGH (1)
    if (pin in this._buttonStates) {
      return this._buttonStates[pin] ? 0 : 1;
    }
    return (this._pins[pin] && this._pins[pin].digital) ? 1 : 0;
  }
  getAnalog(idx)   { return this._analog[idx] || 0; }

  setAnalogSlider(idx, val) {
    this._analog[idx] = parseInt(val);
    const lbl = document.getElementById(`sim-a${idx}-val`);
    if (lbl) lbl.textContent = val;
  }

  _updatePinEl(pin, digital, pwm) {
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

  // ── Error tracking ────────────────────────────────────
  getLastError() { return this._lastError; }

  // ── Core run engine ───────────────────────────────────
  async _execute(code, fastMode) {
    if (this._running) await this.stop();

    this._lastError    = null;
    this._running      = true;
    this._resetAllPins();

    this.sim           = new SimObject(this, fastMode);
    this.sim.running   = true;
    this._serialBuf    = '';

    const transpiler = new ArduinoTranspiler();
    let js;
    try {
      js = transpiler.transpile(code);
    } catch (e) {
      this._lastError = `Transpile error: ${e.message}`;
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
      this._lastError = `Syntax error: ${e.message}`;
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
        this._lastError = `Runtime error: ${e.message}`;
        this.appendSerial(`[Runtime error] ${e.message}`, 'error');
        if (!fastMode) this._updateStatus('error');
      }
    }

    if (this._serialBuf) this.flushSerial();

    this._running = false;
    this.sim.running = false;
    if (!fastMode) this._updateStatus('idle');
  }

  // ── Public API ────────────────────────────────────────
  async run(code) {
    this.clearSerial();
    await this._execute(code, false);
  }

  async runForCheck(code) {
    const prevSerial = document.getElementById('sim-serial')?.innerHTML;
    await this._execute(code, true);
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
    const led13 = document.getElementById('sim-led-13');
    if (led13) { led13.className = 'main-led'; led13.textContent = '○'; led13.style.removeProperty('--pwm-op'); }
    [2,3,4,5,6,7,8,9,10,11,12].forEach(p => {
      const el = document.getElementById(`sim-pin-${p}`);
      if (el) { el.className = 'pin-led'; el.style.removeProperty('--pwm'); }
    });
    // Reset servo visuals
    Object.keys(this._servoAngles).forEach(pin => {
      this._servoAngles[pin] = 0;
      this._updateServoEl(pin);
    });
    // Reset buzzer visuals
    this._components.forEach(c => {
      if (c.type === 'buzzer') this.showBuzzerActive(c.pin, 0, false);
    });
    // Reset motor display
    if (this._motorPins) {
      const mp = this._motorPins;
      const sEl = document.getElementById(`motor-speed-${mp.enablePin}`);
      const dEl = document.getElementById(`motor-dir-${mp.enablePin}`);
      const bEl = document.getElementById(`motor-bar-${mp.enablePin}`);
      const mEl = document.getElementById(`motor-${mp.enablePin}`);
      if (sEl) sEl.textContent = '0%';
      if (dEl) dEl.textContent = 'Coast';
      if (bEl) bEl.style.width = '0%';
      if (mEl) mEl.classList.remove('running');
    }
    // Reset stepper display
    if (this._stepperPins) {
      this._stepperCount = 0;
      const lbl = document.getElementById(`stepper-step-${this._stepperPins[0]}`);
      if (lbl) lbl.textContent = 'Step: 0';
      this._stepperPins.forEach((p, i) => {
        const el = document.getElementById(`stepper-coil-${this._stepperPins[0]}-${i}`);
        if (el) el.classList.remove('active');
      });
    }
    // Reset RGB
    this._rgbPins = this._rgbPins || null;
    const circle = document.getElementById('rgb-circle');
    if (circle) circle.style.backgroundColor = 'rgb(0,0,0)';
    const rv = document.getElementById('rgb-r-val');
    const gv = document.getElementById('rgb-g-val');
    const bv = document.getElementById('rgb-b-val');
    if (rv) rv.textContent = 'R:0';
    if (gv) gv.textContent = 'G:0';
    if (bv) bv.textContent = 'B:0';
    // Reset LCD
    this._lcdText = ['                ', '                '];
    for (let r = 0; r < 2; r++) {
      const el = document.getElementById(`lcd-row-${r}`);
      if (el) el.textContent = '                ';
    }
    const lcdComp = document.getElementById('sim-lcd-comp');
    if (lcdComp) lcdComp.classList.remove('on');
  }

  _updateStatus(state) {
    const dot = document.getElementById('sim-status-dot');
    if (dot) dot.className = `sim-status-dot ${state}`;
    const label = document.getElementById('sim-status-label');
    const map = { running: '● Running', idle: '○ Idle', error: '✕ Error' };
    if (label) label.textContent = map[state] || '';
  }
}
