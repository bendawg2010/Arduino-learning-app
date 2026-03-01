/* ─────────────────────────────────────────────────────────
   data.js  –  All lesson content, achievements, projects,
               and reference material for ArduinoLearn.
   ───────────────────────────────────────────────────────── */

// ── Levels ───────────────────────────────────────────────
const LEVELS = [
  { level: 1,  xp: 0,    title: 'Newbie Tinkerer'     },
  { level: 2,  xp: 100,  title: 'Curious Maker'       },
  { level: 3,  xp: 250,  title: 'LED Whisperer'       },
  { level: 4,  xp: 450,  title: 'Circuit Dabbler'     },
  { level: 5,  xp: 700,  title: 'Serial Enthusiast'   },
  { level: 6,  xp: 1000, title: 'Loop Jockey'         },
  { level: 7,  xp: 1400, title: 'Function Wizard'     },
  { level: 8,  xp: 1900, title: 'Array Artisan'       },
  { level: 9,  xp: 2500, title: 'Interrupt Handler'   },
  { level: 10, xp: 3200, title: 'Arduino Master'      },
];

// ── Achievements ──────────────────────────────────────────
const ACHIEVEMENTS = [
  { id: 'first_lesson',    icon: '🚀', name: 'First Steps',     desc: 'Complete your very first lesson.',                  cond: s => s.completedLessons.length >= 1  },
  { id: 'blink_master',    icon: '💡', name: 'Blink Master',    desc: 'Complete the Blink lesson.',                        cond: s => s.completedLessons.includes('blink')  },
  { id: 'quiz_ace',        icon: '🎯', name: 'Quiz Ace',        desc: 'Score 100% on any quiz.',                           cond: s => Object.values(s.quizScores).some(v => v === 100)  },
  { id: 'five_lessons',    icon: '🔥', name: 'On Fire',         desc: 'Complete 5 lessons.',                               cond: s => s.completedLessons.length >= 5  },
  { id: 'all_beginner',    icon: '🌱', name: 'Beginner Graduate',desc: 'Complete all Beginner lessons.',                   cond: s => LESSONS.filter(l=>l.difficulty==='beginner').every(l=>s.completedLessons.includes(l.id))  },
  { id: 'all_intermediate',icon: '⚡', name: 'Intermediate Pro', desc: 'Complete all Intermediate lessons.',               cond: s => LESSONS.filter(l=>l.difficulty==='intermediate').every(l=>s.completedLessons.includes(l.id))  },
  { id: 'all_lessons',     icon: '🏆', name: 'Arduino Master',  desc: 'Complete every single lesson.',                     cond: s => LESSONS.every(l=>s.completedLessons.includes(l.id))  },
  { id: 'speed_coder',     icon: '⏱️', name: 'Speed Coder',     desc: 'Pass a challenge on your first try.',               cond: s => s.firstTryPasses >= 1  },
  { id: 'serial_sender',   icon: '📡', name: 'Signal Sender',   desc: 'Successfully run code that uses Serial.println.',   cond: s => s.serialUsed  },
  { id: 'pwm_artist',      icon: '🎛️', name: 'PWM Artist',      desc: 'Use analogWrite in the simulator.',                 cond: s => s.pwmUsed  },
  { id: 'challenger',      icon: '🏗️', name: 'Challenge Accepted',desc: 'Pass 3 challenges.',                             cond: s => s.challengesPassed >= 3  },
  { id: 'brainiac',        icon: '🧠', name: 'Brainiac',        desc: 'Score 100% on 3 different quizzes.',                cond: s => Object.values(s.quizScores).filter(v=>v===100).length >= 3  },
];

// ── Lessons ───────────────────────────────────────────────
const LESSONS = [
  /* ══════════════════════════════════════════════════════
     BEGINNER TRACK
     ══════════════════════════════════════════════════════ */
  {
    id: 'intro',
    title: 'Introduction to Arduino',
    icon: '🤖',
    difficulty: 'beginner',
    xp: 25,
    desc: 'Discover what Arduino is, how it works, and write your very first sketch.',
    theory: `
<h2>What Is Arduino?</h2>
<p>Arduino is an open-source electronics platform that combines a <strong>microcontroller board</strong> with an easy-to-use programming environment. It was invented in 2005 in Italy and has since powered millions of projects — from blinking LEDs to full robotic systems.</p>

<div class="info-box">
  <strong>💡 Key idea:</strong> Arduino reads inputs (sensors, buttons, signals) and turns them into outputs (LEDs, motors, sounds). You tell it what to do by uploading a <em>sketch</em> (program).
</div>

<h2>The Arduino Uno</h2>
<p>The <strong>Arduino Uno</strong> is the most popular beginner board. Here's what it has:</p>
<ul>
  <li><strong>14 Digital I/O pins</strong> — can be set as INPUT or OUTPUT</li>
  <li><strong>6 Analog input pins</strong> (A0–A5) — read values from sensors</li>
  <li><strong>6 PWM pins</strong> (marked ~) — for dimming LEDs, controlling motors</li>
  <li><strong>32 KB Flash memory</strong> — where your program lives</li>
  <li><strong>16 MHz clock</strong> — executes ~16 million instructions per second</li>
  <li><strong>USB port</strong> — upload sketches and serial communication</li>
</ul>

<h2>Anatomy of a Sketch</h2>
<p>Every Arduino program (called a <code>sketch</code>) has exactly two required functions:</p>
<ul>
  <li><code>setup()</code> — runs <strong>once</strong> when the board powers on or resets</li>
  <li><code>loop()</code> — runs <strong>forever</strong>, over and over, until power off</li>
</ul>
<p>Think of <code>setup()</code> as your morning routine (done once) and <code>loop()</code> as breathing (never stops).</p>

<h2>Comments</h2>
<p>Comments explain your code to humans — the Arduino ignores them completely:</p>
<pre><code>// This is a single-line comment

/* This is a
   multi-line comment */</code></pre>

<div class="info-box tip">
  <strong>✅ Tip:</strong> Comment your code! Future-you will thank present-you.
</div>
`,
    code: `// ArduinoLearn – Lesson 1: Introduction
// Every Arduino sketch has setup() and loop()

void setup() {
  // This runs ONCE when Arduino starts
  Serial.begin(9600);  // Open serial communication at 9600 baud
  Serial.println("Hello, Arduino World!");
  Serial.println("I am ready to learn!");
}

void loop() {
  // This runs FOREVER after setup()
  Serial.println("Still running...");
  delay(2000);  // Wait 2 seconds between prints
}`,
    challenge: {
      desc: 'Change the setup message to print your own name (e.g., "Hello from Alex!") and make the loop print every 1 second instead of 2.',
      hint: 'Change the text in Serial.println() and change delay(2000) to delay(1000).',
      validate: (code, sim) => {
        return sim.serialLines.length >= 1 && sim.serialLines.some(l => l.includes('Hello'));
      },
    },
    quiz: [
      {
        q: 'How many times does setup() run?',
        opts: ['Forever, just like loop()', 'Once, when the board starts', 'Every 1 second', 'Only when a button is pressed'],
        correct: 1,
        explain: 'setup() runs exactly once when the Arduino powers on or resets. Use it for one-time initialization.',
      },
      {
        q: 'What does Serial.begin(9600) do?',
        opts: ['Sets pin 9600 as output', 'Waits 9600 milliseconds', 'Initializes serial communication at 9600 baud rate', 'Turns on an LED'],
        correct: 2,
        explain: 'Serial.begin(baud) opens the serial port at the specified baud rate. 9600 is a common default speed.',
      },
      {
        q: 'What happens when loop() finishes one execution?',
        opts: ['The program stops', 'It immediately starts over from the top', 'It waits for a button press', 'setup() runs again'],
        correct: 1,
        explain: 'The loop() function runs continuously — as soon as it reaches the end, it starts again from the beginning.',
      },
    ],
  },

  // ── Lesson 2: Blink ──────────────────────────────────
  {
    id: 'blink',
    title: 'Blink — Hello, World!',
    icon: '💡',
    difficulty: 'beginner',
    xp: 50,
    desc: 'Make an LED blink — the classic "Hello World" of hardware programming.',
    theory: `
<h2>Your First LED</h2>
<p>The classic first Arduino project is making the built-in LED blink. Every Arduino Uno has a tiny LED connected to <strong>pin 13</strong>, accessible via the constant <code>LED_BUILTIN</code>.</p>

<h2>Key Functions</h2>
<h3>pinMode(pin, mode)</h3>
<p>Configures a pin as either an input or output. You must call this in <code>setup()</code> for any pin you use:</p>
<pre><code>pinMode(13, OUTPUT);       // Pin 13 will send signals OUT
pinMode(LED_BUILTIN, OUTPUT); // Same thing, more readable</code></pre>

<h3>digitalWrite(pin, value)</h3>
<p>Sets a digital pin HIGH (5V) or LOW (0V):</p>
<pre><code>digitalWrite(13, HIGH);  // Turn LED ON  (5 volts)
digitalWrite(13, LOW);   // Turn LED OFF (0 volts)</code></pre>

<h3>delay(milliseconds)</h3>
<p>Pauses the program for the given number of milliseconds. 1000ms = 1 second:</p>
<pre><code>delay(1000);   // Wait 1 second
delay(250);    // Wait 0.25 seconds
delay(50);     // Wait 0.05 seconds (fast!)</code></pre>

<div class="info-box">
  <strong>HIGH vs LOW:</strong> HIGH means the pin outputs 5V (LED on). LOW means 0V (LED off). You can also write <code>1</code> for HIGH and <code>0</code> for LOW.
</div>

<h2>How Blinking Works</h2>
<p>The loop does four things repeatedly: turn ON, wait, turn OFF, wait. By changing the delay values, you control the blink speed!</p>

<div class="info-box tip">
  <strong>🔌 Circuit tip:</strong> An LED needs a resistor (usually 220Ω) in series to limit current. The built-in LED has this built in — external LEDs need an external resistor.
</div>
`,
    code: `// ArduinoLearn – Lesson 2: Blink
// Make the built-in LED blink on and off

void setup() {
  // Set the built-in LED pin as an output
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Blink sketch started!");
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);  // Turn LED ON
  Serial.println("LED ON");
  delay(1000);                      // Wait 1 second

  digitalWrite(LED_BUILTIN, LOW);   // Turn LED OFF
  Serial.println("LED OFF");
  delay(1000);                      // Wait 1 second
}`,
    challenge: {
      desc: 'Modify the sketch so the LED blinks FAST — 250ms on and 250ms off.',
      hint: 'Change both delay(1000) values to delay(250).',
      validate: (code, sim) => {
        return code.includes('delay(250)') || code.includes('delay(200)') || code.includes('delay(100)');
      },
    },
    quiz: [
      {
        q: 'What does LED_BUILTIN refer to?',
        opts: ['A special external LED', 'Pin 13, the onboard LED', 'The power LED', 'Any LED you connect'],
        correct: 1,
        explain: 'LED_BUILTIN is a constant that equals 13 on most Arduino boards. It refers to the small LED soldered directly on the board.',
      },
      {
        q: 'What does delay(500) do?',
        opts: ['Waits 500 microseconds', 'Waits 5 seconds', 'Waits 500 milliseconds (half a second)', 'Blinks 500 times'],
        correct: 2,
        explain: 'delay() takes milliseconds. 500ms = 0.5 seconds. 1000ms = 1 second.',
      },
      {
        q: 'What mode should LED pins be set to?',
        opts: ['INPUT', 'OUTPUT', 'INPUT_PULLUP', 'ANALOG'],
        correct: 1,
        explain: 'Pins that send signals (like to an LED) must be set to OUTPUT. Pins that receive signals (buttons, sensors) are set to INPUT.',
      },
    ],
  },

  // ── Lesson 3: Variables ──────────────────────────────
  {
    id: 'variables',
    title: 'Variables & Data Types',
    icon: '📦',
    difficulty: 'beginner',
    xp: 50,
    desc: 'Store and manage data using variables, constants, and different data types.',
    theory: `
<h2>What Is a Variable?</h2>
<p>A variable is a named storage location in memory. Instead of writing the same number everywhere, you give it a meaningful name:</p>
<pre><code>int ledPin = 13;          // Much better than magic numbers!
int blinkDelay = 500;</code></pre>

<h2>Data Types</h2>
<p>Arduino C++ requires you to declare the <em>type</em> of data each variable holds:</p>
<ul>
  <li><code>int</code> — Integer: whole numbers from -32768 to 32767. Most common type.</li>
  <li><code>long</code> — Large integer: up to 2 billion. Use for <code>millis()</code> values.</li>
  <li><code>float</code> — Decimal number: e.g., <code>3.14</code>, <code>23.7</code></li>
  <li><code>bool</code> / <code>boolean</code> — True or false only</li>
  <li><code>char</code> — A single character: <code>'A'</code>, <code>'z'</code>, <code>'5'</code></li>
  <li><code>String</code> — A sequence of characters: <code>"Hello World"</code></li>
  <li><code>byte</code> — 0 to 255. Great for pin numbers and PWM values.</li>
</ul>

<h2>Constants</h2>
<p>Use <code>const</code> for values that never change. This prevents accidental modifications and makes code more readable:</p>
<pre><code>const int LED_PIN = 13;        // Won't change — use CAPS_CASE
const int BLINK_SPEED = 500;</code></pre>

<h2>Scope</h2>
<p>Where you declare a variable determines where it can be used:</p>
<ul>
  <li><strong>Global</strong> (before setup) — accessible everywhere</li>
  <li><strong>Local</strong> (inside a function) — only accessible in that function</li>
</ul>

<div class="info-box warn">
  <strong>⚠️ Memory matters!</strong> Arduino Uno only has 2KB of RAM. Prefer <code>int</code> over <code>String</code> when possible.
</div>
`,
    code: `// ArduinoLearn – Lesson 3: Variables & Data Types

// --- Global constants (never change) ---
const int LED_PIN = 13;
const int BLINK_DELAY = 500;

// --- Global variables (can change) ---
int blinkCount = 0;
bool ledState = false;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);

  // Local variable (only available in setup)
  String greeting = "Variable demo started!";
  Serial.println(greeting);
}

void loop() {
  // Toggle LED state using the boolean
  ledState = !ledState;
  digitalWrite(LED_PIN, ledState ? HIGH : LOW);

  blinkCount++;

  // Print using different data types
  Serial.print("Blink #");
  Serial.print(blinkCount);
  Serial.print(" | LED: ");
  Serial.print(ledState ? "ON" : "OFF");
  Serial.print(" | Uptime: ");
  Serial.print(millis() / 1000.0, 1);  // float with 1 decimal
  Serial.println("s");

  delay(BLINK_DELAY);
}`,
    challenge: {
      desc: 'Add a float variable called "voltage" set to 3.3, and print it in the loop using Serial.print.',
      hint: 'Declare "float voltage = 3.3;" globally, then add Serial.print(voltage) in loop().',
      validate: (code, sim) => {
        return code.includes('float') && code.includes('voltage') && code.includes('3.3');
      },
    },
    quiz: [
      {
        q: 'Which data type stores the number 3.14?',
        opts: ['int', 'bool', 'float', 'char'],
        correct: 2,
        explain: 'float stores decimal (floating-point) numbers. int only stores whole numbers and would truncate 3.14 to 3.',
      },
      {
        q: 'What does "const" mean in "const int LED = 13"?',
        opts: ['The variable is global', 'The value cannot be changed', 'The variable is local', 'It is a function'],
        correct: 1,
        explain: 'const declares a constant — a value that is set once and never modified. Attempting to change it causes a compile error.',
      },
      {
        q: 'A variable declared inside loop() is:',
        opts: ['Global — accessible everywhere', 'Local — only exists inside loop()', 'A constant', 'Stored in EEPROM'],
        correct: 1,
        explain: 'Variables declared inside a function are local — they exist only during that function\'s execution and are re-created each time the function runs.',
      },
    ],
  },

  // ── Lesson 4: Digital Input ──────────────────────────
  {
    id: 'digital-input',
    title: 'Digital Input — Buttons',
    icon: '🔘',
    difficulty: 'beginner',
    xp: 75,
    desc: 'Read button presses with digitalRead and respond to user input.',
    theory: `
<h2>Reading Digital Inputs</h2>
<p>While <code>digitalWrite</code> sends signals OUT, <code>digitalRead</code> reads signals IN — perfect for buttons and switches.</p>

<h3>digitalRead(pin)</h3>
<p>Returns either <code>HIGH</code> (1) or <code>LOW</code> (0) — it reads the current voltage on a pin:</p>
<pre><code>int state = digitalRead(2);  // Read pin 2
if (state == HIGH) {
  // voltage is 5V — button not pressed (with pull-up)
}</code></pre>

<h2>Pull-Up Resistors</h2>
<p>A button without a resistor creates a "floating" pin — it picks up noise and gives random readings. You need a <strong>pull-up</strong> or <strong>pull-down</strong> resistor:</p>
<ul>
  <li><strong>INPUT_PULLUP</strong> — Arduino's built-in 20kΩ resistor. Pin reads HIGH when floating, LOW when button pressed. This is the easiest option!</li>
  <li><strong>External pull-down</strong> — resistor to GND. Pin reads LOW when floating, HIGH when pressed.</li>
</ul>

<div class="info-box">
  <strong>INPUT_PULLUP logic is inverted:</strong> Not pressed = HIGH (1), Pressed = LOW (0). This surprises many beginners!
</div>

<h2>Wiring a Button</h2>
<p>With <code>INPUT_PULLUP</code>: connect one leg of the button to a digital pin, other leg to GND. That's it — no external resistors needed!</p>

<div class="info-box tip">
  <strong>✅ Tip:</strong> Buttons are noisy! When you press/release, they "bounce" creating multiple rapid transitions. For reliable reading, add a small delay or use software debouncing.
</div>
`,
    code: `// ArduinoLearn – Lesson 4: Digital Input

const int BUTTON_PIN = 2;   // Button connected to pin 2
const int LED_PIN = 13;     // Built-in LED

void setup() {
  pinMode(LED_PIN, OUTPUT);
  // INPUT_PULLUP: uses Arduino's internal 20kΩ resistor
  // Button = LOW when pressed, HIGH when not pressed
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Press the button (simulate by toggling in sidebar)!");
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == LOW) {
    // Button IS pressed (LOW because of INPUT_PULLUP)
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Button PRESSED — LED ON!");
  } else {
    // Button NOT pressed
    digitalWrite(LED_PIN, LOW);
  }

  delay(50);  // Small delay to avoid flooding serial monitor
}`,
    challenge: {
      desc: 'Modify the sketch to count button presses and print the count to the Serial monitor each time the button is pressed.',
      hint: 'Add an int pressCount = 0; variable and increment it when the button is pressed. Use Serial.print to show the count.',
      validate: (code, sim) => {
        return (code.includes('pressCount') || code.includes('count')) && code.includes('++');
      },
    },
    quiz: [
      {
        q: 'With INPUT_PULLUP, what does the pin read when the button is NOT pressed?',
        opts: ['LOW (0)', 'HIGH (1)', 'Random values', '-1'],
        correct: 1,
        explain: 'With INPUT_PULLUP, the internal resistor pulls the pin to 5V (HIGH) when nothing is connected. Pressing the button connects it to GND, giving LOW.',
      },
      {
        q: 'What is "button bounce"?',
        opts: ['The button physically bouncing off the board', 'Rapid on/off signals when a button is pressed', 'A button that doesn\'t respond', 'Buttons wired in parallel'],
        correct: 1,
        explain: 'Button contacts mechanically bounce when pressed, creating many rapid LOW/HIGH transitions in milliseconds. Debouncing filters these out.',
      },
      {
        q: 'Which function reads a digital pin?',
        opts: ['analogRead()', 'digitalRead()', 'pinMode()', 'readPin()'],
        correct: 1,
        explain: 'digitalRead(pin) returns HIGH or LOW based on the current voltage at that pin.',
      },
    ],
  },

  // ── Lesson 5: Analog Input ───────────────────────────
  {
    id: 'analog-input',
    title: 'Analog Input — Sensors',
    icon: '📡',
    difficulty: 'beginner',
    xp: 75,
    desc: 'Read analog sensors like potentiometers and light sensors using analogRead.',
    theory: `
<h2>The Analog World</h2>
<p>Digital signals are either ON or OFF. But the real world isn't binary — temperature, light, humidity, and sound are all <strong>continuous values</strong>. Analog input lets you read these!</p>

<h3>analogRead(pin)</h3>
<p>Reads the voltage on an analog pin (A0–A5) and returns a value from <strong>0 to 1023</strong>:</p>
<ul>
  <li><strong>0V</strong> → returns 0</li>
  <li><strong>2.5V</strong> → returns ~511</li>
  <li><strong>5V</strong> → returns 1023</li>
</ul>
<p>This is a <strong>10-bit ADC</strong> (Analog-to-Digital Converter) — 2<sup>10</sup> = 1024 possible values.</p>

<h2>The map() Function</h2>
<p>Often you need to convert the 0–1023 range to something more useful. <code>map()</code> does this linearly:</p>
<pre><code>// map(value, fromLow, fromHigh, toLow, toHigh)
int percentage = map(sensorValue, 0, 1023, 0, 100);
int angle = map(sensorValue, 0, 1023, 0, 180);
int brightness = map(sensorValue, 0, 1023, 0, 255);</code></pre>

<h2>Common Analog Sensors</h2>
<ul>
  <li><strong>Potentiometer</strong> — variable resistor, 0V to 5V based on knob position</li>
  <li><strong>LDR (Light sensor)</strong> — resistance changes with light</li>
  <li><strong>Temperature sensor (TMP36)</strong> — voltage changes with temperature</li>
  <li><strong>Flex sensor</strong> — resistance changes when bent</li>
</ul>

<div class="info-box">
  <strong>Simulator tip:</strong> Use the A0–A5 sliders on the right to simulate analog sensor values!
</div>
`,
    code: `// ArduinoLearn – Lesson 5: Analog Input

void setup() {
  Serial.begin(9600);
  Serial.println("Analog Input Demo");
  Serial.println("Move the A0 slider to simulate a sensor!");
}

void loop() {
  // Read raw analog value (0–1023)
  int rawValue = analogRead(A0);

  // Map to useful ranges
  int percentage = map(rawValue, 0, 1023, 0, 100);
  float voltage = rawValue * (5.0 / 1023.0);

  // Print all formats
  Serial.print("Raw: ");
  Serial.print(rawValue);
  Serial.print(" | Percentage: ");
  Serial.print(percentage);
  Serial.print("% | Voltage: ");
  Serial.print(voltage, 2);  // 2 decimal places
  Serial.println("V");

  delay(500);  // Read twice per second
}`,
    challenge: {
      desc: 'Read A0 and use map() to convert the value to a range of 0–180 (like a servo angle). Print the angle to Serial.',
      hint: 'Use: int angle = map(rawValue, 0, 1023, 0, 180); then Serial.println(angle);',
      validate: (code, sim) => {
        return code.includes('map') && (code.includes('180') || code.includes('angle'));
      },
    },
    quiz: [
      {
        q: 'What does analogRead() return when 5V is applied?',
        opts: ['5', '255', '1023', '100'],
        correct: 2,
        explain: 'Arduino\'s 10-bit ADC divides 0–5V into 1024 steps (0–1023). 5V maps to 1023.',
      },
      {
        q: 'What does map(512, 0, 1023, 0, 100) return?',
        opts: ['50', '51', '100', '5'],
        correct: 1,
        explain: '512 is approximately halfway through 0–1023. Mapped to 0–100, it returns roughly 50 (actually 50.05, truncated to 50).',
      },
      {
        q: 'Which pins support analogRead on Arduino Uno?',
        opts: ['All 14 digital pins', 'Only pin 13', 'A0 through A5', 'Pins 3, 5, 6, 9, 10, 11'],
        correct: 2,
        explain: 'Arduino Uno has 6 dedicated analog input pins: A0 through A5.',
      },
    ],
  },

  // ── Lesson 6: PWM / Analog Output ───────────────────
  {
    id: 'pwm',
    title: 'PWM — Analog Output',
    icon: '🌈',
    difficulty: 'beginner',
    xp: 75,
    desc: 'Create "analog-like" outputs using Pulse Width Modulation for LED dimming and motor control.',
    theory: `
<h2>What Is PWM?</h2>
<p><strong>Pulse Width Modulation</strong> is a clever trick. Since Arduino can only output 0V or 5V digitally, it rapidly switches the pin ON and OFF to <em>simulate</em> voltages in between. Your eye (or motor) averages this out!</p>

<div class="info-box">
  <strong>Duty cycle:</strong> The percentage of time the signal is HIGH. 50% duty cycle ≈ 2.5V average. 25% ≈ 1.25V.
</div>

<h3>analogWrite(pin, value)</h3>
<p>Writes a PWM value from <strong>0 to 255</strong> to a PWM-capable pin:</p>
<pre><code>analogWrite(9, 0);    // 0% duty cycle  — fully OFF
analogWrite(9, 127);  // 50% duty cycle  — half brightness
analogWrite(9, 255);  // 100% duty cycle — fully ON</code></pre>

<h2>PWM Pins on Arduino Uno</h2>
<p>Only specific pins support PWM — they're marked with a <strong>~</strong> symbol:</p>
<ul>
  <li>Pins <strong>3, 5, 6, 9, 10, 11</strong></li>
</ul>

<h2>Common Uses</h2>
<ul>
  <li>💡 <strong>LED dimming</strong> — vary brightness smoothly</li>
  <li>⚙️ <strong>DC motor speed</strong> — control RPM</li>
  <li>🔊 <strong>Piezo buzzer</strong> — generate tones</li>
  <li>🎛️ <strong>Servo position</strong> — via Servo library</li>
</ul>

<div class="info-box tip">
  <strong>✅ Tip:</strong> You don't need to call <code>pinMode(pin, OUTPUT)</code> before <code>analogWrite()</code> — but it's good practice!
</div>
`,
    code: `// ArduinoLearn – Lesson 6: PWM / Analog Output
// Fade an LED in and out using PWM

const int LED_PIN = 9;  // Must be a PWM pin (marked with ~)

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Fading LED with PWM...");
}

void loop() {
  // Fade IN: 0 to 255
  Serial.println("Fading in...");
  for (int brightness = 0; brightness <= 255; brightness += 5) {
    analogWrite(LED_PIN, brightness);
    delay(20);
  }

  // Fade OUT: 255 to 0
  Serial.println("Fading out...");
  for (int brightness = 255; brightness >= 0; brightness -= 5) {
    analogWrite(LED_PIN, brightness);
    delay(20);
  }

  delay(200);
}`,
    challenge: {
      desc: 'Read the analog value from A0 (use the simulator slider) and use it to control the brightness of the LED on pin 9. Map 0–1023 → 0–255.',
      hint: 'Read analogRead(A0), map it to 0–255, then analogWrite(9, mappedValue).',
      validate: (code, sim) => {
        return code.includes('analogWrite') && code.includes('map') && (code.includes('255') || code.includes('A0'));
      },
    },
    quiz: [
      {
        q: 'What does analogWrite(9, 127) do?',
        opts: ['Writes 127V to pin 9', 'Sets pin 9 to approximately 50% brightness', 'Reads analog pin 9', 'Turns pin 9 fully off'],
        correct: 1,
        explain: 'analogWrite takes values 0–255. 127 is roughly half of 255, creating a ~50% duty cycle and ~50% brightness.',
      },
      {
        q: 'Which of these is a PWM pin on Arduino Uno?',
        opts: ['Pin 2', 'Pin 4', 'Pin 9', 'Pin 12'],
        correct: 2,
        explain: 'PWM pins on Arduino Uno are 3, 5, 6, 9, 10, and 11 — marked with ~ on the board.',
      },
      {
        q: 'What does PWM stand for?',
        opts: ['Power Wire Management', 'Pulse Width Modulation', 'Pin Write Mode', 'Periodic Wave Measure'],
        correct: 1,
        explain: 'Pulse Width Modulation rapidly switches a pin HIGH and LOW to simulate an analog output through the duty cycle.',
      },
    ],
  },

  // ── Lesson 7: Serial Monitor ─────────────────────────
  {
    id: 'serial',
    title: 'Serial Monitor — Debug Like a Pro',
    icon: '📺',
    difficulty: 'beginner',
    xp: 50,
    desc: 'Use the Serial Monitor to send and receive data — your window into the Arduino brain.',
    theory: `
<h2>Why Serial?</h2>
<p>Arduino doesn't have a screen. The Serial Monitor is your <strong>debugging superpower</strong> — it lets you see what's happening inside your code in real time.</p>

<h2>Serial Functions</h2>
<h3>Serial.begin(baud)</h3>
<p>Must be called first. Sets communication speed in bits/second:</p>
<pre><code>Serial.begin(9600);   // Common default
Serial.begin(115200); // Faster — useful for lots of data</code></pre>

<h3>Serial.print() and Serial.println()</h3>
<pre><code>Serial.print("Temperature: ");   // No newline
Serial.print(23.5);
Serial.println(" C");            // With newline at end
// Output: Temperature: 23.5 C</code></pre>

<h3>Printing different types</h3>
<pre><code>Serial.println(42);         // Integer
Serial.println(3.14, 3);    // Float with 3 decimal places
Serial.println("hello");    // String
Serial.println(true);       // Prints "1"
Serial.println('A');        // Character</code></pre>

<h3>Serial.available() and Serial.read()</h3>
<p>Receive data <em>from</em> your computer:</p>
<pre><code>if (Serial.available() > 0) {
  char c = Serial.read();    // Read one character
  Serial.print("Got: ");
  Serial.println(c);
}</code></pre>

<div class="info-box tip">
  <strong>✅ Best practice:</strong> Always use the same baud rate in your code AND in the Serial Monitor dropdown, or you'll see garbled text.
</div>
`,
    code: `// ArduinoLearn – Lesson 7: Serial Monitor

int loopCounter = 0;
float simulatedTemp = 20.0;

void setup() {
  Serial.begin(9600);

  // Header message
  Serial.println("╔══════════════════════════╗");
  Serial.println("║  ArduinoLearn Serial Demo ║");
  Serial.println("╚══════════════════════════╝");
  Serial.println();
  Serial.println("Monitoring sensor data...");
}

void loop() {
  loopCounter++;
  simulatedTemp += 0.1;  // Simulate rising temperature

  // Formatted output
  Serial.print("[Loop ");
  Serial.print(loopCounter);
  Serial.print("] Temp: ");
  Serial.print(simulatedTemp, 1);  // 1 decimal place
  Serial.print("°C | Sensor: ");
  Serial.print(analogRead(A0));
  Serial.println();

  // Warning if temp is "high"
  if (simulatedTemp > 21.0) {
    Serial.println("  ⚠ Temperature above 21°C!");
  }

  delay(1000);
}`,
    challenge: {
      desc: 'Add code that prints "HOT!" when the A0 analog value is greater than 700, and "COLD!" when it is less than 300.',
      hint: 'Read analogRead(A0) into a variable, then use if/else to check the value and Serial.println the appropriate message.',
      validate: (code, sim) => {
        return (code.includes('HOT') || code.includes('COLD')) && code.includes('analogRead');
      },
    },
    quiz: [
      {
        q: 'What is the difference between Serial.print() and Serial.println()?',
        opts: ['println() is faster', 'println() adds a newline character at the end', 'print() can only print numbers', 'There is no difference'],
        correct: 1,
        explain: 'Serial.println() prints the data and then moves to the next line. Serial.print() stays on the same line.',
      },
      {
        q: 'What must you do before using Serial.print()?',
        opts: ['Call Serial.read()', 'Call Serial.begin()', 'Call pinMode()', 'Nothing is needed'],
        correct: 1,
        explain: 'Serial.begin(baud) must be called in setup() to initialize the serial port before sending or receiving data.',
      },
      {
        q: 'Serial.print(3.14159, 2) outputs:',
        opts: ['3.14159', '3.14', '3', '3.1'],
        correct: 1,
        explain: 'The second argument to Serial.print() for floats specifies decimal places. So (3.14159, 2) prints "3.14".',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════
     INTERMEDIATE TRACK
     ══════════════════════════════════════════════════════ */

  // ── Lesson 8: Control Flow ───────────────────────────
  {
    id: 'control-flow',
    title: 'Control Flow — if / else / switch',
    icon: '🔀',
    difficulty: 'intermediate',
    xp: 100,
    desc: 'Make decisions in your code with conditionals, logical operators, and switch statements.',
    theory: `
<h2>Making Decisions</h2>
<p>Control flow lets your Arduino react differently based on conditions — "if the sensor is high, do this; otherwise, do that."</p>

<h2>if / else if / else</h2>
<pre><code>int value = analogRead(A0);

if (value > 800) {
  Serial.println("Very bright!");
} else if (value > 400) {
  Serial.println("Medium light");
} else {
  Serial.println("Dark");
}</code></pre>

<h2>Comparison Operators</h2>
<ul>
  <li><code>==</code> equals (note: NOT the assignment <code>=</code>!)</li>
  <li><code>!=</code> not equals</li>
  <li><code>&lt;</code>  less than</li>
  <li><code>&gt;</code>  greater than</li>
  <li><code>&lt;=</code> less than or equal</li>
  <li><code>&gt;=</code> greater than or equal</li>
</ul>

<h2>Logical Operators</h2>
<ul>
  <li><code>&&</code> AND — both conditions must be true</li>
  <li><code>||</code> OR  — at least one condition is true</li>
  <li><code>!</code>  NOT — inverts the condition</li>
</ul>
<pre><code>if (temp > 20 && temp < 30) {
  Serial.println("Comfortable!");
}</code></pre>

<h2>switch / case</h2>
<p>Cleaner than many if/else chains when checking one variable against multiple values:</p>
<pre><code>int mode = 2;
switch (mode) {
  case 1: Serial.println("Mode 1"); break;
  case 2: Serial.println("Mode 2"); break;
  case 3: Serial.println("Mode 3"); break;
  default: Serial.println("Unknown"); break;
}</code></pre>

<div class="info-box warn">
  <strong>⚠️ Common bug:</strong> Don't forget <code>break;</code> in switch cases! Without it, execution "falls through" to the next case.
</div>
`,
    code: `// ArduinoLearn – Lesson 8: Control Flow
// Traffic light simulator using analog sensor

const int RED_LED    = 11;
const int YELLOW_LED = 10;
const int GREEN_LED  = 9;

void setup() {
  pinMode(RED_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  Serial.begin(9600);
  Serial.println("Traffic Light Simulator");
  Serial.println("Move the A0 slider to change state!");
}

void loop() {
  int sensorValue = analogRead(A0);

  // Turn all off first
  digitalWrite(RED_LED, LOW);
  digitalWrite(YELLOW_LED, LOW);
  digitalWrite(GREEN_LED, LOW);

  // Decide which LED to light
  if (sensorValue < 341) {
    digitalWrite(GREEN_LED, HIGH);
    Serial.println("🟢 GREEN  — Go!");
  } else if (sensorValue < 682) {
    digitalWrite(YELLOW_LED, HIGH);
    Serial.println("🟡 YELLOW — Slow down!");
  } else {
    digitalWrite(RED_LED, HIGH);
    Serial.println("🔴 RED    — Stop!");
  }

  delay(500);
}`,
    challenge: {
      desc: 'Add a fourth condition: if the sensor is between 300-400, print "AMBER" and blink the yellow LED twice.',
      hint: 'Use && to check if the value is in range: if (val >= 300 && val <= 400). Use digitalWrite and delay to blink.',
      validate: (code, sim) => {
        return code.includes('&&') && (code.includes('AMBER') || code.includes('blink'));
      },
    },
    quiz: [
      {
        q: 'What is wrong with: if (x = 5)?',
        opts: ['Nothing, it works fine', '= assigns a value; == compares values. Should be if (x == 5)', 'x should be a float', 'Parentheses are wrong'],
        correct: 1,
        explain: '= is assignment (sets x to 5 and always evaluates to true). == is comparison (checks if x equals 5). This is a very common bug!',
      },
      {
        q: 'What does && mean?',
        opts: ['OR — either condition must be true', 'AND — both conditions must be true', 'NOT — inverts a condition', 'XOR — exactly one must be true'],
        correct: 1,
        explain: '&& is the logical AND operator. Both conditions on either side must be true for the overall expression to be true.',
      },
      {
        q: 'What happens in a switch statement if you forget "break"?',
        opts: ['Compilation error', 'The program crashes', 'Execution falls through to the next case', 'Nothing, break is optional'],
        correct: 2,
        explain: 'Without break, execution continues into the next case automatically — called "fall-through". Usually a bug!',
      },
    ],
  },

  // ── Lesson 9: Loops ──────────────────────────────────
  {
    id: 'loops',
    title: 'Loops — for, while, do-while',
    icon: '🔄',
    difficulty: 'intermediate',
    xp: 100,
    desc: 'Repeat actions efficiently with for loops, while loops, and do-while loops.',
    theory: `
<h2>Why Loops?</h2>
<p>Loops let you repeat code without copy-pasting. Instead of:</p>
<pre><code>digitalWrite(2, HIGH); delay(100); digitalWrite(2, LOW);
digitalWrite(3, HIGH); delay(100); digitalWrite(3, LOW);
// ... 12 more lines</code></pre>
<p>You write:</p>
<pre><code>for (int pin = 2; pin <= 13; pin++) {
  digitalWrite(pin, HIGH);
  delay(100);
  digitalWrite(pin, LOW);
}</code></pre>

<h2>The for Loop</h2>
<p>Best when you know how many times to repeat:</p>
<pre><code>// for (initialize; condition; increment)
for (int i = 0; i < 10; i++) {
  Serial.println(i);    // Prints 0 through 9
}</code></pre>

<h2>The while Loop</h2>
<p>Repeats while a condition is true. Good when you don't know the count:</p>
<pre><code>int count = 0;
while (count < 5) {
  Serial.println(count);
  count++;
}</code></pre>

<h2>The do-while Loop</h2>
<p>Always runs at least ONCE, then checks the condition:</p>
<pre><code>do {
  Serial.println("This runs at least once!");
} while (false);  // Condition checked AFTER first run</code></pre>

<h2>break and continue</h2>
<ul>
  <li><code>break</code> — immediately exits the loop</li>
  <li><code>continue</code> — skips rest of current iteration, goes to next</li>
</ul>
`,
    code: `// ArduinoLearn – Lesson 9: Loops
// LED chaser pattern with multiple loop types

void setup() {
  // for loop to set up 6 pins at once!
  for (int pin = 2; pin <= 7; pin++) {
    pinMode(pin, OUTPUT);
  }
  Serial.begin(9600);
}

void loop() {
  // FOR loop: forward chase
  Serial.println("==> Forward chase");
  for (int pin = 2; pin <= 7; pin++) {
    digitalWrite(pin, HIGH);
    delay(80);
    digitalWrite(pin, LOW);
  }

  // FOR loop: reverse chase
  Serial.println("<== Reverse chase");
  for (int pin = 7; pin >= 2; pin--) {
    digitalWrite(pin, HIGH);
    delay(80);
    digitalWrite(pin, LOW);
  }

  // WHILE loop: flash all 3 times
  Serial.println("*** Flash all ***");
  int flashes = 0;
  while (flashes < 3) {
    for (int pin = 2; pin <= 7; pin++) digitalWrite(pin, HIGH);
    delay(150);
    for (int pin = 2; pin <= 7; pin++) digitalWrite(pin, LOW);
    delay(150);
    flashes++;
  }

  delay(300);
}`,
    challenge: {
      desc: 'Write a for loop that prints the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13...) for the first 10 numbers to the Serial monitor.',
      hint: 'Use two variables (a=0, b=1) and compute next = a + b; then a = b; b = next; in a loop.',
      validate: (code, sim) => {
        return code.includes('for') && (code.includes('fib') || code.includes('Fibonacci') || (code.includes('a') && code.includes('b') && code.includes('next')));
      },
    },
    quiz: [
      {
        q: 'How many times does this run: for(int i=0; i<5; i++)?',
        opts: ['4', '5', '6', 'Infinitely'],
        correct: 1,
        explain: 'i starts at 0 and increments while i < 5. So i = 0,1,2,3,4 — that\'s 5 iterations.',
      },
      {
        q: 'What does "break" do inside a loop?',
        opts: ['Pauses the loop for 1 second', 'Immediately exits the loop', 'Skips to the next iteration', 'Restarts the loop'],
        correct: 1,
        explain: 'break immediately terminates the current loop and continues execution after the loop\'s closing brace.',
      },
      {
        q: 'What is guaranteed about a do-while loop?',
        opts: ['It always runs infinitely', 'It runs at least once', 'It runs exactly 10 times', 'It runs 0 or more times'],
        correct: 1,
        explain: 'A do-while loop executes the body first, THEN checks the condition. This guarantees at least one execution.',
      },
    ],
  },

  // ── Lesson 10: Functions ─────────────────────────────
  {
    id: 'functions',
    title: 'Functions — Organize Your Code',
    icon: '⚙️',
    difficulty: 'intermediate',
    xp: 100,
    desc: 'Write reusable functions with parameters and return values to structure clean code.',
    theory: `
<h2>What Are Functions?</h2>
<p>Functions are named blocks of code you can call multiple times. They make code:</p>
<ul>
  <li><strong>Reusable</strong> — write once, use many times</li>
  <li><strong>Readable</strong> — <code>blinkLED(3)</code> is clearer than 15 lines</li>
  <li><strong>Testable</strong> — test each function independently</li>
</ul>

<h2>Function Syntax</h2>
<pre><code>returnType functionName(parameters) {
  // function body
  return value;  // if returnType is not void
}</code></pre>

<h3>void functions (no return value)</h3>
<pre><code>void blinkLED(int pin, int times) {
  for (int i = 0; i < times; i++) {
    digitalWrite(pin, HIGH);
    delay(200);
    digitalWrite(pin, LOW);
    delay(200);
  }
}</code></pre>

<h3>Functions that return a value</h3>
<pre><code>// Returns the temperature in Celsius
float getTemperature() {
  int raw = analogRead(A0);
  float voltage = raw * (5.0 / 1023.0);
  return (voltage - 0.5) * 100;
}

// In loop():
float temp = getTemperature();
Serial.println(temp);</code></pre>

<div class="info-box">
  <strong>Rule of thumb:</strong> If you're copy-pasting code more than twice, make it a function!
</div>

<h2>Parameters vs Arguments</h2>
<ul>
  <li><strong>Parameters</strong> are variables in the function definition</li>
  <li><strong>Arguments</strong> are the actual values you pass when calling</li>
</ul>
<pre><code>void blink(int times) { ... }  // "times" is a parameter
blink(3);   // 3 is the argument</code></pre>
`,
    code: `// ArduinoLearn – Lesson 10: Functions

const int LED_PIN = 13;

// ── Custom functions ───────────────────

// Blink LED n times at given speed
void blinkLED(int pin, int times, int speed) {
  for (int i = 0; i < times; i++) {
    digitalWrite(pin, HIGH);
    delay(speed);
    digitalWrite(pin, LOW);
    delay(speed);
  }
}

// Check if a number is in range
bool inRange(int val, int lo, int hi) {
  return (val >= lo && val <= hi);
}

// Read "temperature" from A0 and return Celsius estimate
float readTemp() {
  int raw = analogRead(A0);
  float voltage = raw * (5.0 / 1023.0);
  return (voltage - 0.5) * 100.0;
}

// Print a separator line
void printSeparator(char ch, int len) {
  for (int i = 0; i < len; i++) {
    Serial.print(ch);
  }
  Serial.println();
}

// ── Setup & Loop ───────────────────────

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  printSeparator('=', 30);
  Serial.println("  Functions Demo");
  printSeparator('=', 30);
}

void loop() {
  float temp = readTemp();
  Serial.print("Temperature: ");
  Serial.print(temp, 1);
  Serial.println("°C");

  if (inRange(temp, 0, 20)) {
    Serial.println("Cool — slow blink");
    blinkLED(LED_PIN, 1, 500);
  } else if (inRange(temp, 20, 35)) {
    Serial.println("Warm — normal blink");
    blinkLED(LED_PIN, 2, 250);
  } else {
    Serial.println("Hot! — rapid blink");
    blinkLED(LED_PIN, 5, 100);
  }

  delay(500);
}`,
    challenge: {
      desc: 'Write a function called "mapToPercent(int value)" that takes a 0-1023 value and returns a 0-100 int. Call it in loop() and print the result.',
      hint: 'int mapToPercent(int value) { return map(value, 0, 1023, 0, 100); }',
      validate: (code, sim) => {
        return code.includes('mapToPercent') || (code.match(/int\s+\w+\s*\(\s*int\s+\w+\s*\)/));
      },
    },
    quiz: [
      {
        q: 'What does "void" mean in a function declaration?',
        opts: ['The function is empty', 'The function does not return a value', 'The function is global', 'The function runs once'],
        correct: 1,
        explain: 'void means the function has no return value — it performs an action but doesn\'t give anything back to the caller.',
      },
      {
        q: 'Where should custom functions usually be placed?',
        opts: ['Inside the loop() function', 'Before setup()', 'After loop(), outside of it', 'Anywhere outside of setup and loop'],
        correct: 3,
        explain: 'Functions can be defined anywhere in the sketch outside of other functions. Many programmers put them after loop() for readability.',
      },
      {
        q: 'What is the difference between a parameter and an argument?',
        opts: ['They are the same thing', 'Parameters are in the definition; arguments are the values passed when calling', 'Arguments are global; parameters are local', 'Parameters are returned; arguments are received'],
        correct: 1,
        explain: 'Parameters are placeholders in the function definition. Arguments are the actual values you provide when calling the function.',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════
     ADVANCED TRACK
     ══════════════════════════════════════════════════════ */

  // ── Lesson 11: Arrays ────────────────────────────────
  {
    id: 'arrays',
    title: 'Arrays — Collections of Data',
    icon: '📋',
    difficulty: 'advanced',
    xp: 125,
    desc: 'Store and manipulate collections of values using arrays — essential for LED patterns and sensor averages.',
    theory: `
<h2>What Is an Array?</h2>
<p>An array stores multiple values of the same type under one name, accessed by index. Think of it as a row of numbered boxes:</p>
<pre><code>int scores[5];          // 5 empty int slots (indices 0–4)
int leds[] = {2,3,4,5,6};  // Initialized with values</code></pre>

<div class="info-box warn">
  <strong>⚠️ Zero-indexed!</strong> The first element is at index 0, not 1. An array of size 5 has indices 0, 1, 2, 3, 4. Accessing index 5 is a bug!
</div>

<h2>Accessing Elements</h2>
<pre><code>int ledPins[] = {2, 3, 4, 5};
int first = ledPins[0];   // 2
int last  = ledPins[3];   // 5

ledPins[2] = 9;           // Change index 2 from 4 to 9</code></pre>

<h2>Iterating with Loops</h2>
<pre><code>int pins[] = {2, 3, 4, 5, 6};
int numPins = 5;

// Set all as output
for (int i = 0; i < numPins; i++) {
  pinMode(pins[i], OUTPUT);
}</code></pre>

<h2>2D Arrays</h2>
<p>Arrays of arrays — great for LED matrix patterns:</p>
<pre><code>int pattern[2][4] = {
  {1, 0, 1, 0},  // row 0
  {0, 1, 0, 1}   // row 1
};</code></pre>

<h2>Common Uses</h2>
<ul>
  <li>LED pin lists</li>
  <li>Animation sequences</li>
  <li>Rolling sensor averages</li>
  <li>Lookup tables</li>
</ul>
`,
    code: `// ArduinoLearn – Lesson 11: Arrays

// Array of LED pins
int ledPins[] = {2, 3, 4, 5, 6, 7};
int numLEDs = 6;

// Pattern sequences (1 = on, 0 = off)
int patterns[][6] = {
  {1, 0, 0, 0, 0, 1},  // Outer
  {0, 1, 0, 0, 1, 0},  // Second
  {0, 0, 1, 1, 0, 0},  // Center
  {1, 1, 0, 0, 1, 1},  // Pairs
  {1, 1, 1, 1, 1, 1},  // All on
  {0, 0, 0, 0, 0, 0},  // All off
};
int numPatterns = 6;

// Display a pattern from the 2D array
void displayPattern(int patIndex) {
  for (int i = 0; i < numLEDs; i++) {
    digitalWrite(ledPins[i], patterns[patIndex][i]);
  }
}

// Compute average of sensor readings
int rollingAverage(int count) {
  int readings[count];
  for (int i = 0; i < count; i++) {
    readings[i] = analogRead(A0);
    delay(10);
  }
  int sum = 0;
  for (int i = 0; i < count; i++) sum += readings[i];
  return sum / count;
}

void setup() {
  for (int i = 0; i < numLEDs; i++) {
    pinMode(ledPins[i], OUTPUT);
  }
  Serial.begin(9600);
  Serial.println("Array patterns demo!");
}

void loop() {
  for (int p = 0; p < numPatterns; p++) {
    Serial.print("Pattern ");
    Serial.println(p + 1);
    displayPattern(p);
    delay(400);
  }

  int avg = rollingAverage(5);
  Serial.print("Sensor avg (5 samples): ");
  Serial.println(avg);
}`,
    challenge: {
      desc: 'Create an array of 5 sensor readings from A0, then find and print the maximum value in the array.',
      hint: 'Store 5 analogRead(A0) values in an array, then loop through them keeping track of the largest value seen.',
      validate: (code, sim) => {
        return code.includes('[5]') || (code.includes('[]') && code.includes('max'));
      },
    },
    quiz: [
      {
        q: 'int arr[5] — what are the valid indices?',
        opts: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '0, 1, 2, 3, 4, 5', '-2, -1, 0, 1, 2'],
        correct: 1,
        explain: 'Arrays are zero-indexed. int arr[5] has elements at indices 0, 1, 2, 3, and 4. Index 5 does NOT exist — accessing it is a bug.',
      },
      {
        q: 'How do you get the size of "int arr[] = {1,2,3,4};"?',
        opts: ['arr.length()', 'sizeof(arr) / sizeof(arr[0])', 'arr.size', 'length(arr)'],
        correct: 1,
        explain: 'In C++, sizeof(arr)/sizeof(arr[0]) gives the element count. sizeof(arr) returns bytes; sizeof(arr[0]) returns bytes per element.',
      },
      {
        q: 'What does a 2D array look like conceptually?',
        opts: ['A single long list', 'A table with rows and columns', 'A circular buffer', 'A linked list'],
        correct: 1,
        explain: 'A 2D array is like a grid or table — accessed by two indices: row and column (e.g., arr[row][col]).',
      },
    ],
  },

  // ── Lesson 12: millis() ──────────────────────────────
  {
    id: 'millis',
    title: 'Timing with millis() — Non-blocking Code',
    icon: '⏱️',
    difficulty: 'advanced',
    xp: 150,
    desc: 'Ditch blocking delays and write responsive, multi-tasking Arduino code using millis().',
    theory: `
<h2>The Problem with delay()</h2>
<p><code>delay()</code> completely freezes your Arduino. While it's waiting, it can't read buttons, update displays, or do anything else. For simple blink sketches this is fine — for real projects, it's a disaster.</p>

<div class="info-box warn">
  <strong>⚠️ Think of delay() like this:</strong> You're cooking and need to wait 3 minutes. Instead of standing still staring at the pot, you could be doing the dishes, setting the table... delay() is the "staring at the pot" approach.
</div>

<h2>millis() — Your Non-blocking Timer</h2>
<p><code>millis()</code> returns the number of milliseconds since the Arduino started (resets to 0 after ~49 days). Instead of waiting, you check if enough time has passed:</p>

<pre><code>unsigned long previousTime = 0;
const long interval = 1000;

void loop() {
  unsigned long currentTime = millis();

  if (currentTime - previousTime >= interval) {
    previousTime = currentTime;  // Save the last event time
    // Do the thing!
    digitalWrite(LED_PIN, !digitalRead(LED_PIN));
  }
  // Arduino is FREE to do other work here!
}</code></pre>

<h2>Why unsigned long?</h2>
<p>millis() returns an <code>unsigned long</code> — a 32-bit number that counts up to ~4 billion. Always use <code>unsigned long</code> for millis() variables to avoid overflow bugs.</p>

<h2>Multiple Independent Timers</h2>
<p>The real power: run multiple timers simultaneously — something impossible with delay():</p>
<pre><code>unsigned long timerA = 0, timerB = 0;
// LED A blinks every 500ms, LED B every 1300ms
// Both work independently!</code></pre>
`,
    code: `// ArduinoLearn – Lesson 12: millis() Non-blocking Timing
// Two LEDs blinking at different speeds simultaneously!

const int LED_A = 13;   // Blinks every 400ms
const int LED_B = 12;   // Blinks every 1100ms

unsigned long prevA = 0;
unsigned long prevB = 0;

const unsigned long INTERVAL_A = 400;
const unsigned long INTERVAL_B = 1100;

// Track states
bool stateA = false;
bool stateB = false;

void setup() {
  pinMode(LED_A, OUTPUT);
  pinMode(LED_B, OUTPUT);
  Serial.begin(9600);
  Serial.println("Non-blocking dual blink! (impossible with delay!)");
}

void loop() {
  unsigned long now = millis();

  // ── Timer A (400ms) ──────────────────
  if (now - prevA >= INTERVAL_A) {
    prevA = now;
    stateA = !stateA;
    digitalWrite(LED_A, stateA);
    Serial.print("A ");
    Serial.println(stateA ? "ON" : "off");
  }

  // ── Timer B (1100ms) ─────────────────
  if (now - prevB >= INTERVAL_B) {
    prevB = now;
    stateB = !stateB;
    digitalWrite(LED_B, stateB);
    Serial.print("         B ");
    Serial.println(stateB ? "ON" : "off");
  }

  // Arduino is FREE here — could read buttons, sensors, etc.!
}`,
    challenge: {
      desc: 'Add a third timer that reads A0 every 2 seconds and prints the value — all without interfering with the two blinking LEDs.',
      hint: 'Add "unsigned long prevSensor = 0;" and a similar if-block with 2000ms interval that calls analogRead(A0).',
      validate: (code, sim) => {
        const timerCount = (code.match(/millis\(\)/g) || []).length;
        return timerCount >= 2 && code.includes('analogRead');
      },
    },
    quiz: [
      {
        q: 'Why use "unsigned long" for millis() variables?',
        opts: ['It\'s faster', 'millis() returns a large number that can overflow a regular int', 'unsigned long is required by the function', 'For compatibility with float'],
        correct: 1,
        explain: 'millis() can return up to ~4 billion. A regular int only holds up to 32767, causing overflow. unsigned long holds up to ~4.3 billion.',
      },
      {
        q: 'What is the main advantage of millis() over delay()?',
        opts: ['millis() is more accurate', 'millis() doesn\'t block other code from running', 'millis() uses less power', 'millis() works with floats'],
        correct: 1,
        explain: 'delay() blocks ALL code execution. millis() lets you check elapsed time without stopping anything — your code remains responsive.',
      },
      {
        q: 'How often does millis() reset to 0?',
        opts: ['Every second', 'Every minute', 'After about 49 days', 'Never'],
        correct: 2,
        explain: 'millis() uses an unsigned long, which overflows (wraps to 0) after 2^32 milliseconds ≈ 49.7 days. The subtraction trick (now - prev) handles this correctly.',
      },
    ],
  },
];

// ── Reference Data ─────────────────────────────────────
const REFERENCE = [
  {
    title: 'Digital I/O',
    color: 'blue',
    entries: [
      { sig: 'pinMode(pin, mode)',           desc: 'Set pin as INPUT, OUTPUT, or INPUT_PULLUP' },
      { sig: 'digitalWrite(pin, value)',     desc: 'Write HIGH or LOW to a digital pin' },
      { sig: 'digitalRead(pin)',             desc: 'Read HIGH or LOW from a digital pin' },
    ],
  },
  {
    title: 'Analog I/O',
    color: 'green',
    entries: [
      { sig: 'analogRead(pin)',              desc: 'Read analog pin (A0–A5), returns 0–1023' },
      { sig: 'analogWrite(pin, value)',      desc: 'Write PWM to a ~pin, value 0–255' },
      { sig: 'analogReference(type)',        desc: 'Set voltage reference for analogRead' },
    ],
  },
  {
    title: 'Time',
    color: 'orange',
    entries: [
      { sig: 'delay(ms)',                    desc: 'Pause execution for ms milliseconds (blocking)' },
      { sig: 'delayMicroseconds(us)',        desc: 'Pause for us microseconds' },
      { sig: 'millis()',                     desc: 'Returns ms since boot (unsigned long)' },
      { sig: 'micros()',                     desc: 'Returns µs since boot (unsigned long)' },
    ],
  },
  {
    title: 'Math',
    color: 'purple',
    entries: [
      { sig: 'map(val, fL, fH, tL, tH)',    desc: 'Re-map a value from one range to another' },
      { sig: 'constrain(val, lo, hi)',       desc: 'Constrain value to range [lo, hi]' },
      { sig: 'abs(x)',                       desc: 'Absolute value' },
      { sig: 'min(a, b) / max(a, b)',        desc: 'Return smaller or larger of two values' },
      { sig: 'sqrt(x) / pow(x, y)',          desc: 'Square root / power' },
      { sig: 'random(min, max)',             desc: 'Random long in [min, max)' },
    ],
  },
  {
    title: 'Serial',
    color: 'teal',
    entries: [
      { sig: 'Serial.begin(baud)',           desc: 'Initialize serial at baud rate (e.g., 9600)' },
      { sig: 'Serial.print(val)',            desc: 'Print value, no newline' },
      { sig: 'Serial.println(val)',          desc: 'Print value + newline' },
      { sig: 'Serial.available()',           desc: 'Returns bytes waiting to be read' },
      { sig: 'Serial.read()',                desc: 'Read one byte from serial buffer' },
    ],
  },
  {
    title: 'Data Types',
    color: 'yellow',
    entries: [
      { sig: 'int',                          desc: 'Integer: -32768 to 32767 (2 bytes)' },
      { sig: 'long',                         desc: 'Large integer: ±2 billion (4 bytes)' },
      { sig: 'unsigned long',                desc: '0 to ~4.3 billion (4 bytes). Use for millis()' },
      { sig: 'float',                        desc: 'Decimal number, ~6-7 sig digits (4 bytes)' },
      { sig: 'bool / boolean',               desc: 'true or false (1 byte)' },
      { sig: 'byte',                         desc: '0 to 255 (1 byte). Good for pin values' },
      { sig: 'char',                         desc: 'Single character (1 byte)' },
      { sig: 'String',                       desc: 'String object. Use carefully — consumes RAM' },
    ],
  },
];

// ── Projects ──────────────────────────────────────────
const PROJECTS = [
  {
    icon: '🌡️',
    title: 'Weather Station',
    desc: 'Build a temperature and humidity monitor that displays readings on the Serial Monitor and warns you with an LED when temperature exceeds a threshold.',
    parts: ['Arduino Uno', 'DHT11/DHT22 sensor', '1x LED', '220Ω resistor', 'USB cable'],
    difficulty: 'beginner',
    skills: ['analogRead', 'Serial', 'if/else'],
  },
  {
    icon: '🚦',
    title: 'Traffic Light Controller',
    desc: 'Create a full traffic light sequence with red, yellow, and green LEDs. Add a pedestrian button that triggers a walk signal using interrupt handling.',
    parts: ['Arduino Uno', '3x LEDs (R/Y/G)', '3x 220Ω resistors', 'Pushbutton', 'Breadboard'],
    difficulty: 'beginner',
    skills: ['digitalWrite', 'delay', 'digitalRead'],
  },
  {
    icon: '🎵',
    title: 'Melody Player',
    desc: 'Play songs through a piezo buzzer using the tone() function. Program multiple melodies and switch between them with a button.',
    parts: ['Arduino Uno', 'Piezo buzzer', 'Pushbutton', '10kΩ resistor'],
    difficulty: 'intermediate',
    skills: ['tone()', 'Arrays', 'Functions'],
  },
  {
    icon: '🤖',
    title: 'Servo Robot Arm',
    desc: 'Control a servo motor with a potentiometer. Map the pot position (0–1023) to the servo angle (0–180°). Add multiple servos for a full arm.',
    parts: ['Arduino Uno', 'Servo motor', 'Potentiometer', 'External 5V power supply'],
    difficulty: 'intermediate',
    skills: ['Servo library', 'map()', 'analogRead'],
  },
  {
    icon: '📏',
    title: 'Ultrasonic Range Finder',
    desc: 'Measure distances using an HC-SR04 ultrasonic sensor. Display the distance in cm, trigger an LED alert when objects are too close.',
    parts: ['Arduino Uno', 'HC-SR04 sensor', '1x LED', '220Ω resistor', 'Breadboard'],
    difficulty: 'intermediate',
    skills: ['pulseIn()', 'millis()', 'if/else'],
  },
  {
    icon: '🌈',
    title: 'RGB LED Controller',
    desc: 'Control an RGB LED to display any color. Use three potentiometers for R, G, B channels, or auto-cycle through colors with a rainbow effect.',
    parts: ['Arduino Uno', 'RGB LED (common cathode)', '3x 220Ω resistors', '3x potentiometers'],
    difficulty: 'advanced',
    skills: ['analogWrite', 'PWM', 'map()', 'Arrays'],
  },
];
