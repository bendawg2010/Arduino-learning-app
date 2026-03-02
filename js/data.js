/* ─────────────────────────────────────────────────────────
   data.js  –  Step-by-step lesson content for ArduinoLearn.
   Each lesson has a "steps" array walked one at a time.
   ───────────────────────────────────────────────────────── */

// ── Levels ───────────────────────────────────────────────
const LEVELS = [
  { level: 1,  xp: 0,    title: 'Newbie Tinkerer'     },
  { level: 2,  xp: 50,   title: 'Curious Maker'       },
  { level: 3,  xp: 120,  title: 'LED Whisperer'       },
  { level: 4,  xp: 220,  title: 'Circuit Dabbler'     },
  { level: 5,  xp: 350,  title: 'Serial Enthusiast'   },
  { level: 6,  xp: 500,  title: 'Loop Jockey'         },
  { level: 7,  xp: 700,  title: 'Function Wizard'     },
  { level: 8,  xp: 950,  title: 'Array Artisan'       },
  { level: 9,  xp: 1250, title: 'Interrupt Handler'   },
  { level: 10, xp: 1600, title: 'Arduino Master'      },
];

// ── Achievements ──────────────────────────────────────────
const ACHIEVEMENTS = [
  { id: 'first_lesson',    icon: '🚀', name: 'First Steps',     desc: 'Complete your very first lesson.',                  cond: s => s.completedLessons.length >= 1  },
  { id: 'blink_master',    icon: '💡', name: 'Blink Master',    desc: 'Complete the Blink lesson.',                        cond: s => s.completedLessons.includes('blink')  },
  { id: 'quiz_ace',        icon: '🎯', name: 'Quiz Ace',        desc: 'Answer a quiz question correctly.',                 cond: s => Object.values(s.quizScores).some(v => v >= 100)  },
  { id: 'five_lessons',    icon: '🔥', name: 'On Fire',         desc: 'Complete 5 lessons.',                               cond: s => s.completedLessons.length >= 5  },
  { id: 'all_lessons',     icon: '🎓', name: 'Graduate',        desc: 'Complete all 21 lessons.',                          cond: s => s.completedLessons.length >= 21 },
  { id: 'serial_user',     icon: '📡', name: 'Talker',          desc: 'Use Serial.println() in your code.',                cond: s => s.serialUsed  },
  { id: 'pwm_user',        icon: '🌈', name: 'Fader',           desc: 'Use analogWrite() for PWM.',                        cond: s => s.pwmUsed     },
  { id: 'first_challenge', icon: '💪', name: 'Challenger',      desc: 'Pass your first challenge.',                        cond: s => s.challengesPassed >= 1  },
  { id: 'five_challenges', icon: '🏋️', name: 'Iron Coder',     desc: 'Pass 5 challenges.',                                cond: s => s.challengesPassed >= 5  },
  { id: 'first_try',       icon: '⚡', name: 'First Try!',      desc: 'Pass a challenge on the first attempt.',            cond: s => s.firstTryPasses >= 1    },
  { id: 'xp_500',          icon: '⭐', name: 'XP Grinder',      desc: 'Earn 500 total XP.',                                cond: s => s.xp >= 500   },
  { id: 'xp_1000',         icon: '🌟', name: 'XP Master',       desc: 'Earn 1000 total XP.',                               cond: s => s.xp >= 1000  },
];

// ── Lessons ───────────────────────────────────────────────
const LESSONS = [

  // ── 1. Introduction ─────────────────────────────────────
  {
    id: 'intro', title: 'Introduction to Arduino', icon: '🤖',
    difficulty: 'beginner', xp: 30,
    desc: 'Learn what Arduino is and write your very first sketch.',
    steps: [
      {
        type: 'learn', title: 'What is an Arduino?', icon: '🤖',
        content: `
<h2>Welcome to ArduinoLearn! 🎉</h2>
<p>An <strong>Arduino</strong> is a small, affordable computer you can program to control the physical world — lights, motors, sensors, robots, and more!</p>
<p>Think of it like this:</p>
<div class="info-box">
  🧠 <strong>Regular computer</strong> → runs apps, plays videos<br>
  ⚡ <strong>Arduino</strong> → controls real-world electronics
</div>
<p>The most popular board is the <strong>Arduino Uno</strong>. It has:</p>
<ul>
  <li>14 <strong>digital pins</strong> — can be ON or OFF (like light switches)</li>
  <li>6 <strong>analog pins</strong> — can read a range of values (like a dimmer)</li>
  <li>A <strong>USB port</strong> to upload your programs</li>
</ul>
<p>The code you write is called a <strong>sketch</strong>. Let's learn how one is structured!</p>`,
      },
      {
        type: 'learn', title: 'The Two Magic Functions', icon: '🔄',
        content: `
<h2>setup() and loop() — The Heart of Every Sketch</h2>
<p>Every Arduino sketch must have exactly <strong>two functions</strong>:</p>
<div class="info-box tip">
  <strong>setup()</strong> — runs <em>once</em> when the Arduino powers on.<br>
  Use it to configure pins and initialize things.
</div>
<div class="info-box" style="margin-top:10px">
  <strong>loop()</strong> — runs <em>over and over forever</em>.<br>
  This is where your main program logic lives!
</div>
<p>Imagine a vending machine:</p>
<ul>
  <li><code>setup()</code> → "Power on, load prices, check inventory"</li>
  <li><code>loop()</code> → Wait for coin → Dispense drink → Wait for coin → ...</li>
</ul>
<p>Look at the code on the right — that's the skeleton of every Arduino sketch you'll ever write. Click <strong>Next</strong> to run it!</p>`,
        code: `// Every Arduino sketch has this exact structure!

void setup() {
  // Runs ONCE when Arduino powers on
  Serial.begin(9600);  // Start Serial communication
  Serial.println("Arduino is awake!");
}

void loop() {
  // Runs OVER AND OVER FOREVER
  Serial.println("Hello from loop()!");
  delay(1000);  // Wait 1 second (1000 ms)
}`,
      },
      {
        type: 'run', title: 'Run Your First Sketch!', icon: '▶',
        content: `
<h2>Time to Run It! 🚀</h2>
<p>The sketch on the right is ready. Click <strong>▶ Run</strong> and watch the <strong>Serial Monitor</strong> below the simulator!</p>
<div class="info-box tip">
  💡 <strong>What to expect:</strong><br>
  • "Arduino is awake!" appears <em>once</em> (from setup)<br>
  • "Hello from loop()!" appears <em>every second</em> (from loop)
</div>
<p>After running, notice how <code>setup()</code> only printed one message, while <code>loop()</code> kept printing forever. That's the fundamental rhythm of all Arduino programs!</p>
<p>🎉 You just ran your first Arduino sketch!</p>`,
        code: `void setup() {
  Serial.begin(9600);
  Serial.println("Arduino is awake!");
}

void loop() {
  Serial.println("Hello from loop()!");
  delay(1000);
}`,
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: `<p>Let's make sure you've got the basics down!</p>`,
        q: 'What does the loop() function do in an Arduino sketch?',
        opts: [
          'Runs once when the Arduino powers on',
          'Runs over and over forever',
          'Reads values from sensors only',
          'Stops the program after one cycle',
        ],
        correct: 1,
        explain: "loop() runs repeatedly forever — it's the heartbeat of your Arduino program! setup() is the one that runs only once.",
      },
    ],
  },

  // ── 2. Blink ─────────────────────────────────────────────
  {
    id: 'blink', title: 'Blink an LED', icon: '💡',
    difficulty: 'beginner', xp: 50,
    desc: 'Make an LED blink — the "Hello World" of hardware!',
    steps: [
      {
        type: 'learn', title: 'LEDs and Digital Pins', icon: '💡',
        content: `
<h2>Your First Physical Output — The LED!</h2>
<p>An <strong>LED</strong> (Light Emitting Diode) is the simplest output device. On the Arduino Uno, <strong>Pin 13</strong> has a built-in LED — no wiring needed!</p>
<div class="info-box">
  📍 <strong>Pin 13</strong> = the built-in LED on every Arduino Uno<br>
  Also available as the constant: <code>LED_BUILTIN</code>
</div>
<p>Digital pins are like light switches. They're either:</p>
<ul>
  <li><strong>HIGH</strong> = 5 volts = LED <em>ON</em> ✅</li>
  <li><strong>LOW</strong> = 0 volts = LED <em>OFF</em> ❌</li>
</ul>
<p>Before using a pin, you must tell Arduino its direction:</p>
<ul>
  <li><code>pinMode(13, OUTPUT)</code> — this pin <em>sends</em> signals out</li>
  <li><code>pinMode(2, INPUT)</code> — this pin <em>receives</em> signals in</li>
</ul>`,
      },
      {
        type: 'learn', title: 'digitalWrite() and delay()', icon: '⚡',
        content: `
<h2>Turning Pins On and Off</h2>
<p>Two functions control LED state:</p>
<div class="info-box tip">
  <code>digitalWrite(pin, HIGH)</code> → sets pin to 5V (ON)<br>
  <code>digitalWrite(pin, LOW)</code> → sets pin to 0V (OFF)
</div>
<p>And to create pauses between states:</p>
<div class="info-box">
  <code>delay(ms)</code> → pause for <em>ms</em> milliseconds<br>
  1000 ms = 1 second &nbsp;|&nbsp; 500 ms = half a second
</div>
<p>Put them together:</p>
<pre><code>digitalWrite(13, HIGH);  // Turn ON
delay(1000);             // Wait 1 second
digitalWrite(13, LOW);   // Turn OFF
delay(1000);             // Wait 1 second
// (loop repeats this forever)</code></pre>
<p>The code on the right is the famous "Blink" sketch. Ready to run it?</p>`,
        code: `void setup() {
  pinMode(13, OUTPUT);  // Set pin 13 as output
}

void loop() {
  digitalWrite(13, HIGH);  // LED ON
  delay(1000);             // Wait 1 second
  digitalWrite(13, LOW);   // LED OFF
  delay(1000);             // Wait 1 second
}`,
      },
      {
        type: 'run', title: 'Make It Blink!', icon: '▶',
        content: `
<h2>Blink Time! 💡</h2>
<p>Hit <strong>▶ Run</strong> and watch the big LED in the simulator blink on and off!</p>
<div class="info-box tip">
  👀 <strong>Watch for:</strong> The large circle labeled "Pin 13 — LED_BUILTIN" should glow yellow (ON), pause, go dark (OFF), pause, repeat!
</div>
<p>This is the most famous Arduino program in history. Every single Arduino learner writes this first — and now you have too! 🎉</p>
<p>After watching it blink a few times, move to the next step to <em>modify the speed</em>.</p>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`,
      },
      {
        type: 'modify', title: 'Change the Speed', icon: '✏️',
        content: `
<h2>Make It Faster (or Slower)! ⚡</h2>
<p>Try changing the <code>delay()</code> values to adjust the blink speed:</p>
<ul>
  <li>Try <code>delay(100)</code> for a super fast strobe!</li>
  <li>Try <code>delay(2000)</code> for a slow, lazy blink</li>
  <li>Try <em>different</em> values for ON vs OFF — the LED will spend more time in one state</li>
</ul>
<div class="info-box tip">
  💡 <strong>Try this:</strong> <code>delay(100)</code> for ON and <code>delay(900)</code> for OFF — the LED flashes briefly but is mostly off. Like a heartbeat!
</div>
<p>Play around, then click <strong>Next</strong> when you're ready for the challenge!</p>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(500);   // ← change me!
  digitalWrite(13, LOW);
  delay(500);   // ← and me!
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Triple Blink!', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Make the LED blink <strong>3 times quickly</strong>, then pause for <strong>1 second</strong>, then repeat.</p>
<div class="info-box">
  Pattern: <strong>blink, blink, blink … long pause … blink, blink, blink …</strong><br><br>
  Quick blink = <code>delay(150)</code> &nbsp;|&nbsp; Long pause = <code>delay(1000)</code>
</div>
<p>You'll need 3 ON/OFF pairs with short delays, then a long delay at the end of <code>loop()</code>.</p>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  // 3 quick blinks, then a 1-second pause

}`,
        validate: (code, _sim) => {
          const hi = (code.match(/digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/g) || []).length;
          const lo = (code.match(/digitalWrite\s*\(\s*13\s*,\s*LOW\s*\)/g) || []).length;
          const longPause = /delay\s*\(\s*[89]\d{2}|delay\s*\(\s*[1-9]\d{3}/.test(code);
          return hi >= 3 && lo >= 3 && longPause;
        },
        hint: 'Copy the "digitalWrite HIGH + delay(150) + digitalWrite LOW + delay(150)" block 3 times, then add delay(1000) at the end.',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What does digitalWrite(13, HIGH) do?',
        opts: [
          'Turns pin 13 off (0 volts)',
          'Sets pin 13 as an output pin',
          'Turns pin 13 on (5 volts)',
          'Reads the current value of pin 13',
        ],
        correct: 2,
        explain: 'digitalWrite(pin, HIGH) sets the pin to 5 volts — which supplies power to the LED and turns it on!',
      },
    ],
  },

  // ── 3. Variables ─────────────────────────────────────────
  {
    id: 'variables', title: 'Variables & Data Types', icon: '📦',
    difficulty: 'beginner', xp: 40,
    desc: 'Store and use data with named variables.',
    steps: [
      {
        type: 'learn', title: 'What Are Variables?', icon: '📦',
        content: `
<h2>Variables — Labeled Boxes for Your Data</h2>
<p>A <strong>variable</strong> is like a labeled box where you store information your program can use and change.</p>
<div class="info-box">
  📦 <code>int ledPin = 13;</code><br>
  Creates a box called <strong>ledPin</strong> that holds the number <strong>13</strong>.
</div>
<p>Instead of writing <code>13</code> everywhere, you write <code>ledPin</code>. If you later want to switch to pin 12, you change it in <em>one place</em>!</p>
<p>Arduino uses <strong>typed</strong> variables — you must declare what kind of data you're storing:</p>
<ul>
  <li><code>int</code> — whole numbers: <code>0</code>, <code>42</code>, <code>-100</code></li>
  <li><code>float</code> — decimal numbers: <code>3.14</code>, <code>-0.5</code></li>
  <li><code>boolean</code> — only <code>true</code> or <code>false</code></li>
  <li><code>char</code> — a single character: <code>'A'</code>, <code>'z'</code></li>
  <li><code>String</code> — text: <code>"Hello World"</code></li>
</ul>`,
      },
      {
        type: 'run', title: 'Variables in Action', icon: '▶',
        content: `
<h2>See Variables Working!</h2>
<p>This sketch uses variables to control blink speed. Hit <strong>▶ Run</strong> and watch the Serial Monitor!</p>
<div class="info-box tip">
  💡 Notice how easy it would be to tweak the speed — just change <code>onTime</code> or <code>offTime</code> at the top, and it affects the whole program!
</div>`,
        code: `int ledPin  = 13;    // Which pin the LED is on
int onTime  = 300;   // How long LED stays ON (ms)
int offTime = 700;   // How long LED stays OFF (ms)
int count   = 0;     // Count how many blinks

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Starting variable blink!");
}

void loop() {
  count = count + 1;
  Serial.print("Blink #");
  Serial.println(count);

  digitalWrite(ledPin, HIGH);
  delay(onTime);
  digitalWrite(ledPin, LOW);
  delay(offTime);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Configurable Blink', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Create a sketch that:</p>
<ol>
  <li>Declares a variable called <code>blinkSpeed</code> set to <strong>250</strong></li>
  <li>Blinks pin 13 using <code>blinkSpeed</code> as the delay for <em>both</em> ON and OFF</li>
  <li>Prints <code>"Blinking!"</code> to Serial each time</li>
</ol>
<div class="info-box">
  Checker looks for: <code>blinkSpeed = 250</code>, <code>delay(blinkSpeed)</code>, and <code>Serial.println</code>
</div>`,
        code: `// Declare blinkSpeed here!

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Blink using blinkSpeed for both delays
}`,
        validate: (code, _sim) => {
          return /\bblinkSpeed\s*=\s*250\b/.test(code) &&
                 /delay\s*\(\s*blinkSpeed\s*\)/.test(code) &&
                 /Serial\.println/.test(code);
        },
        hint: 'Declare: int blinkSpeed = 250;  Then use delay(blinkSpeed) in loop(). Add Serial.println("Blinking!");',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'Which data type would you use to store the number 3.14?',
        opts: ['int', 'boolean', 'float', 'char'],
        correct: 2,
        explain: 'float stores decimal numbers like 3.14. int only stores whole numbers, boolean is true/false only, and char is a single character.',
      },
    ],
  },

  // ── 4. Digital Input ─────────────────────────────────────
  {
    id: 'digital-input', title: 'Buttons & Digital Input', icon: '🔘',
    difficulty: 'beginner', xp: 60,
    desc: 'Read button presses with digitalRead() and react in your sketch.',
    steps: [
      {
        type: 'learn', title: 'From Outputs to Inputs', icon: '🔘',
        content: `
<h2>Making Arduino Listen to the World!</h2>
<p>So far your Arduino has only <em>talked</em> — blinking LEDs, writing to Serial. Now it's time to make it <em>listen</em>!</p>
<p>The most common input device is a <strong>pushbutton</strong>. When pressed, it completes an electrical circuit.</p>
<div class="info-box">
  🔘 A pushbutton is like a light switch — it's either <strong>open</strong> (no connection) or <strong>closed</strong> (connected).
</div>
<p>Digital inputs read only two states:</p>
<ul>
  <li><strong>HIGH (1)</strong> — 5 volts (no connection / button not pressed)</li>
  <li><strong>LOW (0)</strong> — 0 volts / ground (button pressed)</li>
</ul>
<p>The key function for reading a pin is <code>digitalRead(pin)</code>. It returns either <code>HIGH</code> (1) or <code>LOW</code> (0).</p>`,
      },
      {
        type: 'learn', title: 'INPUT_PULLUP — The Easy Button Trick', icon: '⬆️',
        content: `
<h2>Why INPUT_PULLUP Makes Life Easier</h2>
<p>Without a resistor, an unconnected input pin "floats" — it can randomly read HIGH or LOW, causing erratic behavior. That's bad!</p>
<p>Two ways to configure a button pin:</p>
<div class="info-box">
  <strong>INPUT</strong> — needs an external 10kΩ resistor to work reliably<br>
  → Button pressed = HIGH, released = LOW
</div>
<div class="info-box tip" style="margin-top:10px">
  <strong>INPUT_PULLUP</strong> — uses Arduino's built-in resistor. No extra parts! ✅<br>
  → Button pressed = <strong>LOW</strong>, released = <strong>HIGH</strong> (logic is flipped!)
</div>
<pre><code>pinMode(2, INPUT_PULLUP);  // Enable built-in pull-up
int state = digitalRead(2);
// state == HIGH when button is NOT pressed
// state == LOW  when button IS pressed</code></pre>
<p>Always use <code>INPUT_PULLUP</code> when possible — it's simpler and more reliable!</p>`,
        code: `void setup() {
  pinMode(2, INPUT_PULLUP);  // Built-in pull-up resistor
  Serial.begin(9600);
  Serial.println("Reading pin 2...");
}

void loop() {
  int state = digitalRead(2);
  Serial.print("Pin 2 = ");
  Serial.println(state);  // 1 = HIGH (released), 0 = LOW (pressed)
  delay(500);
}`,
      },
      {
        type: 'run', title: 'Press the Simulator Button!', icon: '▶',
        content: `
<h2>Try It — A Button Appears! 🔘</h2>
<p>Click <strong>▶ Run</strong> — because the sketch calls <code>pinMode(2, INPUT_PULLUP)</code>, a <strong>PUSH button</strong> automatically appears in the simulator panel!</p>
<div class="info-box tip">
  🖱️ <strong>Click and hold the PUSH button</strong> while the sketch runs.<br><br>
  Watch the Serial Monitor — the value drops from <strong>1 → 0</strong> (INPUT_PULLUP: pressed = LOW).
</div>
<p>This is exactly how real hardware behaves. Press and hold to simulate a button being held down!</p>`,
        code: `void setup() {
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Hold the button!");
}

void loop() {
  int state = digitalRead(2);
  Serial.print("Pin 2 = ");
  Serial.println(state);  // 1 = released, 0 = pressed
  delay(400);
}`,
      },
      {
        type: 'run', title: 'Button Controls an LED!', icon: '💡',
        content: `
<h2>Connect Input to Output!</h2>
<p>Now let's make something useful: <strong>hold the button → LED turns on</strong>. Release → LED turns off.</p>
<p>Click <strong>▶ Run</strong>, then <strong>hold the Pin 2 button</strong> to see pin 13 light up!</p>
<div class="info-box">
  📋 <strong>Pattern:</strong><br>
  • Read button: <code>digitalRead(2)</code><br>
  • If <code>LOW</code> (pressed) → LED on<br>
  • If <code>HIGH</code> (released) → LED off
</div>
<div class="info-box tip" style="margin-top:8px">
  💡 Notice we check for <code>LOW</code> to mean "pressed" — that's the INPUT_PULLUP flip!
</div>`,
        code: `void setup() {
  pinMode(13, OUTPUT);      // LED output
  pinMode(2, INPUT_PULLUP); // Button input
  Serial.begin(9600);
}

void loop() {
  int buttonState = digitalRead(2);

  if (buttonState == LOW) {
    // LOW = button pressed (INPUT_PULLUP inverts logic)
    digitalWrite(13, HIGH);
    Serial.println("Button pressed! LED ON.");
  } else {
    // HIGH = button released
    digitalWrite(13, LOW);
    Serial.println("Waiting for button...");
  }

  delay(200);
}`,
      },
      {
        type: 'learn', title: 'Counting Button Presses', icon: '🔢',
        content: `
<h2>Detecting a Single Press (Edge Detection)</h2>
<p>What if you want to count button presses — not how long it's held? You need to detect the <em>exact moment</em> it changes state. This is called <strong>edge detection</strong>.</p>
<p>The trick: remember the <em>previous</em> button state and only act when it transitions HIGH → LOW:</p>
<pre><code>int lastState = HIGH;

void loop() {
  int currentState = digitalRead(2);

  if (lastState == HIGH && currentState == LOW) {
    // Just pressed! (falling edge)
    count++;
  }

  lastState = currentState;  // update memory
  delay(50);
}</code></pre>
<div class="info-box tip">
  💡 This technique is used everywhere — counting people through a doorway, detecting clicks on a game button, tracking how many times a sensor triggers.
</div>`,
        code: `int count = 0;
int lastState = HIGH;

void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Press counter ready!");
}

void loop() {
  int currentState = digitalRead(2);

  if (lastState == HIGH && currentState == LOW) {
    count++;
    Serial.print("Count = ");
    Serial.println(count);
    digitalWrite(13, HIGH);
    delay(100);
    digitalWrite(13, LOW);
  }

  lastState = currentState;
  delay(50);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Button Controlled LED', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Write a sketch that:</p>
<ol>
  <li>Sets pin 13 as <code>OUTPUT</code> and pin 2 as <code>INPUT_PULLUP</code></li>
  <li>Reads the button state with <code>digitalRead(2)</code></li>
  <li>Turns LED on when button pressed (<code>LOW</code>), off when released</li>
  <li>Prints the state to Serial with <code>Serial.println</code></li>
</ol>
<div class="info-box tip">
  🖱️ After clicking "Check My Code", hold the <strong>Pin 2 button</strong> in the simulator to test visually!
</div>
<div class="info-box">
  Checker looks for: <code>INPUT_PULLUP</code>, <code>digitalRead</code>, <code>Serial.println</code>, and <code>digitalWrite(13</code>
</div>`,
        code: `void setup() {
  // Set up pins here
}

void loop() {
  // Read pin 2, control LED, print the state
}`,
        validate: (code, _sim) => {
          return /INPUT_PULLUP/.test(code) &&
                 /digitalRead/.test(code) &&
                 /Serial\.println/.test(code) &&
                 /digitalWrite\s*\(\s*13/.test(code);
        },
        hint: 'In setup: pinMode(13,OUTPUT); pinMode(2,INPUT_PULLUP);  In loop: int btn=digitalRead(2); if(btn==LOW){digitalWrite(13,HIGH);}else{digitalWrite(13,LOW);} Serial.println(btn);',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'With INPUT_PULLUP configured, what does the pin read when the button IS pressed?',
        opts: ['HIGH (1)', 'LOW (0)', 'It depends on the battery', '512'],
        correct: 1,
        explain: 'With INPUT_PULLUP, pressing the button connects the pin to ground (0V), so it reads LOW. It reads HIGH when the button is NOT pressed — the logic is inverted!',
      },
    ],
  },

  // ── 5. Analog Input ──────────────────────────────────────
  {
    id: 'analog-input', title: 'Analog Sensors', icon: '🎛️',
    difficulty: 'beginner', xp: 50,
    desc: 'Read sensors that produce a range of values.',
    steps: [
      {
        type: 'learn', title: 'Analog vs Digital', icon: '🎛️',
        content: `
<h2>The Real World Isn't Just ON/OFF!</h2>
<p>A light sensor gets brighter gradually. A temperature sensor changes slowly. For these, we need <strong>analog input</strong>!</p>
<p><strong>Digital:</strong> Only 0 or 1 (like a light switch)</p>
<p><strong>Analog:</strong> A range of values (like a dimmer knob)</p>
<div class="info-box">
  Arduino Uno has 6 analog input pins: <strong>A0, A1, A2, A3, A4, A5</strong><br><br>
  <code>analogRead(A0)</code> returns a value from <strong>0</strong> (0V) to <strong>1023</strong> (5V)
</div>
<p>Common analog sensors you'll use:</p>
<ul>
  <li>🌡️ Temperature sensor (TMP36)</li>
  <li>💡 Light sensor (LDR / photoresistor)</li>
  <li>🎛️ Potentiometer (variable resistor knob)</li>
  <li>🔊 Microphone / sound sensor</li>
</ul>`,
      },
      {
        type: 'learn', title: 'The map() Function', icon: '🗺️',
        content: `
<h2>Mapping Values to Useful Ranges</h2>
<p>You get a raw value of 0–1023, but you might want 0–100% or 0–255. The <code>map()</code> function converts between ranges!</p>
<div class="info-box tip">
  <code>map(value, fromLow, fromHigh, toLow, toHigh)</code><br><br>
  Example: <code>map(sensorVal, 0, 1023, 0, 100)</code><br>
  Converts 0–1023 → 0–100 (a percentage!)
</div>
<p>The code on the right reads A0 and converts it to a percentage. After running, try moving the <strong>A0 slider</strong> in the simulator to see different values!</p>`,
        code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  int raw = analogRead(A0);               // Read 0-1023
  int pct = map(raw, 0, 1023, 0, 100);   // Convert to 0-100%

  Serial.print("Raw: ");
  Serial.print(raw);
  Serial.print("  Percent: ");
  Serial.print(pct);
  Serial.println("%");

  delay(500);
}`,
      },
      {
        type: 'run', title: 'Read a Sensor!', icon: '▶',
        content: `
<h2>Analog Read in Action!</h2>
<p>Click <strong>▶ Run</strong> and watch the Serial Monitor.</p>
<p>The A0 slider in the simulator starts at 512 (middle value). The output will show both the raw reading and the percentage.</p>
<div class="info-box tip">
  💡 In a real project, this same code could read a light sensor, temperature, or a knob position — only the sensor hardware changes!
</div>`,
        code: `void setup() {
  Serial.begin(9600);
  Serial.println("Analog sensor reader ready!");
}

void loop() {
  int raw = analogRead(A0);
  int pct = map(raw, 0, 1023, 0, 100);

  Serial.print("Sensor A0: ");
  Serial.print(raw);
  Serial.print(" -> ");
  Serial.print(pct);
  Serial.println("%");

  delay(500);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Sensor Monitor', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Write a sketch that reads <strong>A0</strong>, maps it to 0–100, and prints <em>both</em> the raw value and the percentage to Serial on the same line.</p>
<div class="info-box">
  Checker needs: <code>analogRead</code>, <code>map(</code>, and at least 2 <code>Serial.print</code>/<code>println</code> calls
</div>`,
        code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  // Read A0, map it to 0-100, print both values

  delay(500);
}`,
        validate: (code, _sim) => {
          return /analogRead/.test(code) &&
                 /\bmap\s*\(/.test(code) &&
                 (code.match(/Serial\.(print|println)/g) || []).length >= 2;
        },
        hint: 'int raw = analogRead(A0); int pct = map(raw, 0, 1023, 0, 100); Serial.print(raw); Serial.print(" -> "); Serial.println(pct);',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What range of values does analogRead() return on an Arduino Uno?',
        opts: ['0 to 255', '0 to 1023', '0 to 100', '0 to 5'],
        correct: 1,
        explain: 'analogRead() returns 0 to 1023 because the Arduino Uno has a 10-bit ADC (Analog-to-Digital Converter). 2^10 = 1024 steps, so 0–1023.',
      },
    ],
  },

  // ── 6. PWM ───────────────────────────────────────────────
  {
    id: 'pwm', title: 'PWM & Fading LEDs', icon: '🌈',
    difficulty: 'intermediate', xp: 60,
    desc: 'Use analogWrite() to dim LEDs and control speed.',
    steps: [
      {
        type: 'learn', title: 'What is PWM?', icon: '🌈',
        content: `
<h2>Faking Analog Output with Pulse Width Modulation</h2>
<p>Digital pins can only be fully ON or fully OFF. But what if you want to dim an LED to 50%? That's where <strong>PWM</strong> comes in!</p>
<p>PWM rapidly flickers the pin ON and OFF — so fast (490 times per second) that your eye sees it as a dimmer level. The longer each pulse is ON vs OFF, the brighter it appears.</p>
<div class="info-box">
  This ON/OFF ratio is called the <strong>duty cycle</strong>:<br>
  50% duty cycle → LED appears at half brightness
</div>
<p>On the Arduino Uno, the PWM pins are marked with a <strong>~</strong> symbol: <strong>3, 5, 6, 9, 10, 11</strong></p>
<div class="info-box warn">
  ⚠️ Only use <code>analogWrite()</code> on PWM pins (marked ~)! Using it on other pins won't work correctly.
</div>`,
      },
      {
        type: 'run', title: 'Fade an LED!', icon: '▶',
        content: `
<h2>Smooth Fading!</h2>
<p>Click <strong>▶ Run</strong> to see a smooth fade effect on pin 9!</p>
<div class="info-box tip">
  <code>analogWrite(pin, value)</code><br>
  value: <strong>0</strong> = fully off &nbsp;|&nbsp; <strong>128</strong> = 50% &nbsp;|&nbsp; <strong>255</strong> = fully on
</div>
<p>Watch pin 9~ in the simulator light up at different intensities as brightness increases then decreases!</p>`,
        code: `void setup() {
  pinMode(9, OUTPUT);  // Pin 9 is a PWM pin (~)
  Serial.begin(9600);
}

void loop() {
  // Fade IN: 0 to 255
  for (int b = 0; b <= 255; b += 5) {
    analogWrite(9, b);
    Serial.print("Brightness: ");
    Serial.println(b);
    delay(20);
  }

  // Fade OUT: 255 to 0
  for (int b = 255; b >= 0; b -= 5) {
    analogWrite(9, b);
    delay(20);
  }
}`,
      },
      {
        type: 'challenge', title: 'Challenge: PWM Fade', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Write a sketch that uses <code>analogWrite</code> on pin <strong>9</strong> to fade an LED. Your code must:</p>
<ol>
  <li>Use <code>analogWrite(9, ...)</code></li>
  <li>Use a <code>for</code> loop to change brightness through a range</li>
  <li>Print the brightness value to Serial</li>
</ol>`,
        code: `void setup() {
  pinMode(9, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Fade the LED using analogWrite and a for loop

}`,
        validate: (code, sim) => {
          return /analogWrite\s*\(\s*9/.test(code) &&
                 /\bfor\s*\(/.test(code) &&
                 /Serial\.(print|println)/.test(code) &&
                 (sim.pwmUsed || /analogWrite/.test(code));
        },
        hint: 'for (int b = 0; b <= 255; b += 5) { analogWrite(9, b); Serial.println(b); delay(20); }',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What value in analogWrite() makes a pin 100% fully on?',
        opts: ['100', '1023', '255', '5'],
        correct: 2,
        explain: 'analogWrite() uses 8-bit values: 0 = fully off, 255 = fully on (100%). Note: this is different from analogRead which returns 0–1023!',
      },
    ],
  },

  // ── 7. Serial ────────────────────────────────────────────
  {
    id: 'serial', title: 'Serial Communication', icon: '📡',
    difficulty: 'intermediate', xp: 60,
    desc: 'Send data between your Arduino and computer.',
    steps: [
      {
        type: 'learn', title: 'Talking to Your Computer', icon: '📡',
        content: `
<h2>Serial — Your Arduino's Megaphone</h2>
<p><strong>Serial communication</strong> lets your Arduino send text and numbers to your computer. It's your primary tool for debugging and monitoring!</p>
<div class="info-box">
  <strong>The key functions:</strong><br>
  <code>Serial.begin(9600)</code> — start serial at 9600 baud (in setup)<br>
  <code>Serial.print("Hello")</code> — print without newline<br>
  <code>Serial.println("Hello")</code> — print WITH newline
</div>
<p><strong>Baud rate</strong> = how fast data is sent. 9600 is standard for learning.</p>
<p>You can print all types:</p>
<ul>
  <li>Text: <code>Serial.println("Temperature:")</code></li>
  <li>Numbers: <code>Serial.println(42)</code></li>
  <li>Variables: <code>Serial.println(sensorValue)</code></li>
  <li>Decimals: <code>Serial.println(3.14, 2)</code> — 2 decimal places</li>
</ul>`,
      },
      {
        type: 'run', title: 'Serial in Action', icon: '▶',
        content: `
<h2>Watch the Data Flow!</h2>
<p>Click <strong>▶ Run</strong> to see formatted data streaming in the Serial Monitor. This is exactly what you'd see in the Arduino IDE!</p>`,
        code: `void setup() {
  Serial.begin(9600);
  Serial.println("=== Arduino Data Logger ===");
  Serial.println("Monitoring started!");
}

void loop() {
  int sensorVal = analogRead(A0);
  float voltage = sensorVal * (5.0 / 1023.0);

  Serial.print("Raw: ");
  Serial.print(sensorVal);
  Serial.print("  Voltage: ");
  Serial.print(voltage, 2);  // 2 decimal places
  Serial.println("V");

  delay(500);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Data Logger', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Create a serial data logger that prints a formatted message with:</p>
<ol>
  <li>A label like <code>"Reading:"</code> using <code>Serial.print</code></li>
  <li>A sensor value from <code>analogRead(A0)</code> using <code>Serial.println</code></li>
</ol>
<div class="info-box">
  Checker needs: <code>Serial.begin</code>, <code>Serial.print</code>, <code>Serial.println</code>, and <code>analogRead</code>
</div>`,
        code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  // Read a sensor and print a formatted message

  delay(500);
}`,
        validate: (code, _sim) => {
          return /Serial\.begin/.test(code) &&
                 /Serial\.print\b/.test(code) &&
                 /Serial\.println/.test(code) &&
                 /analogRead/.test(code);
        },
        hint: 'Serial.print("Reading: "); Serial.println(analogRead(A0));',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What is the difference between Serial.print() and Serial.println()?',
        opts: [
          'println() is faster than print()',
          'println() adds a new line at the end; print() does not',
          'print() is for numbers; println() is for text',
          'There is no difference',
        ],
        correct: 1,
        explain: 'println() adds a newline character (\\n) at the end, so the next output starts on a new line. print() continues on the same line.',
      },
    ],
  },

  // ── 8. Control Flow ──────────────────────────────────────
  {
    id: 'control-flow', title: 'if / else Control Flow', icon: '🔀',
    difficulty: 'intermediate', xp: 60,
    desc: 'Make decisions in your code with if/else.',
    steps: [
      {
        type: 'learn', title: 'Making Decisions', icon: '🔀',
        content: `
<h2>if / else — Your Code Makes Choices</h2>
<p>Real programs make decisions: "If it's dark, turn on the light." In Arduino, you use <strong>if</strong> and <strong>else</strong>:</p>
<pre><code>if (condition) {
  // runs if condition is TRUE
} else {
  // runs if condition is FALSE
}</code></pre>
<p>Comparison operators for conditions:</p>
<ul>
  <li><code>==</code> equals &nbsp; <code>!=</code> not equal</li>
  <li><code>&gt;</code> greater than &nbsp; <code>&lt;</code> less than</li>
  <li><code>&gt;=</code> greater or equal &nbsp; <code>&lt;=</code> less or equal</li>
</ul>
<div class="info-box warn">
  ⚠️ <strong>Most common mistake!</strong><br>
  Using <code>=</code> (assigns a value) instead of <code>==</code> (compares values)<br>
  <code>if (x = 5)</code> ❌ &nbsp;&nbsp; <code>if (x == 5)</code> ✅
</div>`,
      },
      {
        type: 'run', title: 'if/else in Action', icon: '▶',
        content: `
<h2>Light-Level Decision Making!</h2>
<p>This sketch reads A0 (imagine it's a light sensor) and uses if/else to decide what to do. Click <strong>▶ Run</strong> and watch the Serial Monitor!</p>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int light = analogRead(A0);  // 0-1023

  if (light < 300) {
    digitalWrite(13, HIGH);
    Serial.println("Dark! LED ON");
  } else if (light < 700) {
    digitalWrite(13, LOW);
    Serial.println("Medium light — LED off");
  } else {
    digitalWrite(13, LOW);
    Serial.println("Very bright — LED off");
  }

  Serial.print("Light value: ");
  Serial.println(light);
  delay(500);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Smart Light', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Write a sketch using <code>if/else</code> that:</p>
<ul>
  <li>If <code>analogRead(A0)</code> is <strong>greater than 512</strong>: turn LED on, print "LED ON"</li>
  <li>Otherwise: turn LED off, print "LED OFF"</li>
</ul>
<div class="info-box">
  Checker needs: <code>if</code>, <code>else</code>, <code>analogRead</code>, <code>digitalWrite(13</code>, <code>Serial.println</code>
</div>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(A0);

  // Add if/else here

  delay(200);
}`,
        validate: (code, _sim) => {
          return /\bif\s*\(/.test(code) &&
                 /\belse\b/.test(code) &&
                 /analogRead/.test(code) &&
                 /digitalWrite\s*\(\s*13/.test(code) &&
                 /Serial\.println/.test(code);
        },
        hint: 'if (value > 512) { digitalWrite(13, HIGH); Serial.println("LED ON"); } else { digitalWrite(13, LOW); Serial.println("LED OFF"); }',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What operator do you use to CHECK if two values are equal inside an if() condition?',
        opts: ['= (single equals)', '== (double equals)', '!= (not equals)', '>= (greater or equal)'],
        correct: 1,
        explain: '== is the comparison operator. A single = is assignment (it sets a value). Always use == when comparing inside if conditions!',
      },
    ],
  },

  // ── 9. Loops ─────────────────────────────────────────────
  {
    id: 'loops', title: 'for & while Loops', icon: '🔁',
    difficulty: 'intermediate', xp: 70,
    desc: 'Repeat actions efficiently with loops.',
    steps: [
      {
        type: 'learn', title: 'The for Loop', icon: '🔁',
        content: `
<h2>Repeat a Set Number of Times with for</h2>
<p>A <code>for</code> loop repeats code a specific number of times. Perfect for counting, fading, or doing something N times!</p>
<pre><code>for (start; condition; increment) {
  // code to repeat
}</code></pre>
<p>Example — blink 5 times:</p>
<pre><code>for (int i = 0; i &lt; 5; i++) {
  digitalWrite(13, HIGH); delay(200);
  digitalWrite(13, LOW);  delay(200);
}</code></pre>
<ul>
  <li><code>int i = 0</code> — start at 0</li>
  <li><code>i &lt; 5</code> — keep going while i is less than 5</li>
  <li><code>i++</code> — add 1 to i after each run (shorthand for i = i + 1)</li>
</ul>`,
      },
      {
        type: 'learn', title: 'The while Loop', icon: '🔄',
        content: `
<h2>Repeat While Something is True</h2>
<p>A <code>while</code> loop keeps going as long as a condition stays true. Good when you don't know the count ahead of time!</p>
<pre><code>while (condition) {
  // repeats while condition is true
}</code></pre>
<p>Example — count up until 5:</p>
<pre><code>int count = 0;
while (count &lt; 5) {
  Serial.println(count);
  count++;  // Don't forget this!
}</code></pre>
<div class="info-box warn">
  ⚠️ Always make sure your condition will eventually become false, or you'll create an <strong>infinite loop</strong> that freezes your sketch!
</div>
<p>The code on the right shows both loops. Click <strong>Next</strong> to run it!</p>`,
        code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  // for loop: count 1 to 5
  Serial.println("--- for loop ---");
  for (int i = 1; i <= 5; i++) {
    Serial.print("i = ");
    Serial.println(i);
  }

  // while loop: count down from 3
  Serial.println("--- while loop ---");
  int n = 3;
  while (n > 0) {
    Serial.print("n = ");
    Serial.println(n);
    n--;
  }

  delay(2000);
}`,
      },
      {
        type: 'run', title: 'See Both Loops!', icon: '▶',
        content: `
<h2>Run and Watch!</h2>
<p>Click <strong>▶ Run</strong> to see both loops working in the Serial Monitor!</p>
<div class="info-box tip">
  Notice the for loop counts UP and the while loop counts DOWN — and both finish before the delay and repeat.
</div>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  Serial.println("=== for loop: blink 5 times ===");
  for (int i = 0; i < 5; i++) {
    digitalWrite(13, HIGH); delay(100);
    digitalWrite(13, LOW);  delay(100);
    Serial.print("Blink "); Serial.println(i + 1);
  }

  Serial.println("=== while loop: count to 3 ===");
  int n = 1;
  while (n <= 3) {
    Serial.print("Count: "); Serial.println(n);
    n++;
  }

  delay(1000);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Countdown!', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Use a <strong>for loop</strong> to count <em>DOWN</em> from 10 to 1, printing each number to Serial. After the loop, print <code>"BLAST OFF!"</code></p>
<div class="info-box">
  Hint: start i at 10, keep going while <code>i >= 1</code>, and decrement with <code>i--</code>
</div>`,
        code: `void setup() {
  Serial.begin(9600);

  // Write your countdown for loop here!


}

void loop() {
  // Empty - our countdown runs once in setup
}`,
        validate: (code, _sim) => {
          const hasFor = /\bfor\s*\(/.test(code);
          const hasDecrement = /i--|i\s*-=\s*1|i\s*=\s*i\s*-\s*1/.test(code);
          const hasBlastOff = /BLAST\s*OFF/.test(code);
          const hasSerial = /Serial\.println/.test(code);
          return hasFor && hasDecrement && hasBlastOff && hasSerial;
        },
        hint: 'for (int i = 10; i >= 1; i--) { Serial.println(i); }  Serial.println("BLAST OFF!");',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'In this loop: for(int i = 0; i < 5; i++) — how many times does the body run?',
        opts: ['4 times', '5 times', '6 times', 'Forever'],
        correct: 1,
        explain: 'i starts at 0 and runs while i < 5, so i = 0, 1, 2, 3, 4 — that\'s exactly 5 times!',
      },
    ],
  },

  // ── 10. Functions ────────────────────────────────────────
  {
    id: 'functions', title: 'Writing Functions', icon: '🧩',
    difficulty: 'advanced', xp: 80,
    desc: 'Organize your code into reusable, named blocks.',
    steps: [
      {
        type: 'learn', title: 'What are Functions?', icon: '🧩',
        content: `
<h2>Functions — Write Once, Use Anywhere</h2>
<p>A <strong>function</strong> is a named block of code you can call whenever you need it. You already know two: <code>setup()</code> and <code>loop()</code>!</p>
<p>Why write your own functions?</p>
<ul>
  <li><strong>Don't repeat yourself</strong> — write the code once, call it 10 times</li>
  <li><strong>Readable code</strong> — <code>blinkSOS()</code> is clearer than 15 raw lines</li>
  <li><strong>Easy to fix</strong> — change the function in one place, fixed everywhere</li>
</ul>
<div class="info-box tip">
  <strong>Syntax:</strong><br>
  <code>void myFunction() { /* code */ }</code><br><br>
  <code>int add(int a, int b) { return a + b; }</code><br>
  (functions can take <strong>parameters</strong> as inputs and <strong>return</strong> values!)
</div>
<p><code>void</code> means the function returns nothing. Use <code>int</code>, <code>float</code>, etc. if it should return a value.</p>`,
      },
      {
        type: 'run', title: 'Custom Functions in Action', icon: '▶',
        content: `
<h2>See How Clean Functions Make Code!</h2>
<p>Click <strong>▶ Run</strong> to see custom functions at work. Notice how <code>loop()</code> becomes simple and readable!</p>`,
        code: `// A function that blinks a pin N times at a speed
void blinkTimes(int pin, int times, int speed) {
  for (int i = 0; i < times; i++) {
    digitalWrite(pin, HIGH); delay(speed);
    digitalWrite(pin, LOW);  delay(speed);
  }
}

// A function that returns a value
int readPercent() {
  int raw = analogRead(A0);
  return map(raw, 0, 1023, 0, 100);
}

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Functions demo!");
}

void loop() {
  Serial.println("3 fast blinks...");
  blinkTimes(13, 3, 100);

  Serial.println("2 slow blinks...");
  blinkTimes(13, 2, 500);

  int pct = readPercent();
  Serial.print("A0 level: ");
  Serial.print(pct);
  Serial.println("%");

  delay(1000);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Write a Function', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Write a function called <code>flashSOS()</code> that blinks pin 13 quickly <strong>3 times</strong>. Then call it from <code>loop()</code>.</p>
<div class="info-box">
  Your code must have:<br>
  • <code>void flashSOS()</code> function definition<br>
  • <code>flashSOS()</code> called inside loop()<br>
  • At least 3 <code>digitalWrite</code> calls inside the function
</div>`,
        code: `// Define flashSOS() here!


void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Call your function here

  delay(1000);
}`,
        validate: (code, _sim) => {
          const hasFunc = /void\s+flashSOS\s*\(\s*\)/.test(code);
          const callsFunc = (code.replace(/void\s+flashSOS[^}]*\}/, '')).includes('flashSOS()');
          const hasDigital = (code.match(/digitalWrite/g) || []).length >= 3;
          return hasFunc && callsFunc && hasDigital;
        },
        hint: 'void flashSOS() { for (int i = 0; i < 3; i++) { digitalWrite(13, HIGH); delay(150); digitalWrite(13, LOW); delay(150); } }',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What does "void" mean in "void myFunction()"?',
        opts: [
          'The function is empty (no code)',
          'The function returns no value',
          'The function only runs once',
          'The function takes no parameters',
        ],
        correct: 1,
        explain: '"void" means the function doesn\'t return a value. If it returned an integer, you\'d write "int myFunction()" instead.',
      },
    ],
  },

  // ── 11. Arrays ───────────────────────────────────────────
  {
    id: 'arrays', title: 'Arrays', icon: '📋',
    difficulty: 'advanced', xp: 80,
    desc: 'Store multiple values in a single variable.',
    steps: [
      {
        type: 'learn', title: 'What are Arrays?', icon: '📋',
        content: `
<h2>Arrays — Lists of Values Under One Name</h2>
<p>What if you want to control 5 LEDs? You <em>could</em> create 5 variables... or use an <strong>array</strong>!</p>
<p>An array stores multiple values of the same type under one name:</p>
<pre><code>int ledPins[] = {2, 3, 4, 5, 6};
//               ^  ^  ^  ^  ^
//         index: 0  1  2  3  4</code></pre>
<div class="info-box">
  Access by index: <code>ledPins[0]</code> → 2 &nbsp;|&nbsp; <code>ledPins[2]</code> → 4<br><br>
  <strong>⚠️ Arrays always start at index 0, not 1!</strong>
</div>
<p>To get the number of elements:</p>
<pre><code>int len = sizeof(ledPins) / sizeof(ledPins[0]);</code></pre>
<p>Combine arrays with <code>for</code> loops to process all elements at once!</p>`,
      },
      {
        type: 'run', title: 'Arrays + Loops = Power!', icon: '▶',
        content: `
<h2>Control Many Pins with One Loop!</h2>
<p>This sketch uses an array to manage multiple pins. Notice how the setup and loop code stays short even though it handles many pins — that's the power of arrays!</p>
<p>Click <strong>▶ Run</strong> and watch the Serial Monitor!</p>`,
        code: `int ledPins[] = {2, 3, 4, 5, 6};
int numLeds = 5;

void setup() {
  // Set ALL pins as output with one loop!
  for (int i = 0; i < numLeds; i++) {
    pinMode(ledPins[i], OUTPUT);
  }
  Serial.begin(9600);
  Serial.println("Array demo — turning LEDs on one at a time");
}

void loop() {
  for (int i = 0; i < numLeds; i++) {
    Serial.print("LED on pin ");
    Serial.print(ledPins[i]);
    Serial.println(" ON");
    digitalWrite(ledPins[i], HIGH);
    delay(200);
    digitalWrite(ledPins[i], LOW);
  }
  Serial.println("--- Round complete ---");
  delay(500);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Array of Messages', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Create a <code>String</code> array with at least <strong>3 messages</strong>, then loop through and print each one to Serial.</p>
<div class="info-box">
  Example: <code>String msgs[] = {"Hello", "World", "Arduino"};</code><br><br>
  Checker needs: an array declaration, a for loop, and Serial.println
</div>`,
        code: `void setup() {
  Serial.begin(9600);

  // Create your String array and loop through it here!


}

void loop() {
  // Empty
}`,
        validate: (code, _sim) => {
          const hasArray = /String\s+\w+\s*\[/.test(code) || /\w+\s+\w+\s*\[\s*\]\s*=\s*\{/.test(code);
          const hasFor = /\bfor\s*\(/.test(code);
          const hasSerial = /Serial\.println/.test(code);
          return hasArray && hasFor && hasSerial;
        },
        hint: 'String messages[] = {"Hello", "Arduino", "World"}; for (int i = 0; i < 3; i++) { Serial.println(messages[i]); }',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'In this array: int nums[] = {10, 20, 30} — what is nums[1]?',
        opts: ['10', '20', '30', 'Error — index out of range'],
        correct: 1,
        explain: 'Arrays are zero-indexed! nums[0]=10, nums[1]=20, nums[2]=30. The first element is always at index 0.',
      },
    ],
  },

  // ── 12. millis ───────────────────────────────────────────
  {
    id: 'millis', title: 'Non-Blocking Timing with millis()', icon: '⏱️',
    difficulty: 'advanced', xp: 100,
    desc: 'Do multiple things at once — without freezing with delay().',
    steps: [
      {
        type: 'learn', title: 'The Problem with delay()', icon: '⏳',
        content: `
<h2>delay() Freezes Everything</h2>
<p>When you use <code>delay(1000)</code>, your Arduino <strong>completely stops</strong> for 1 second. It can't read buttons, update displays, or do anything else during that time!</p>
<div class="info-box warn">
  ⚠️ Imagine a car dashboard that freezes for 1 second every time it updates the speedometer. You couldn't steer during that second — dangerous!
</div>
<p>For simple blink sketches, <code>delay()</code> is perfectly fine. But for real projects where you need to:</p>
<ul>
  <li>Blink an LED AND read a button at the same time</li>
  <li>Run multiple timers at different speeds</li>
  <li>Stay responsive to user input while doing other work</li>
</ul>
<p>...you need <strong>millis()</strong>!</p>`,
      },
      {
        type: 'learn', title: 'The millis() Pattern', icon: '⏱️',
        content: `
<h2>millis() — Check Time, Don't Wait for It</h2>
<p><code>millis()</code> returns how many milliseconds have passed since the Arduino powered on. It keeps counting forever!</p>
<p>The pattern — instead of WAITING, you CHECK if enough time has passed:</p>
<pre><code>unsigned long previousTime = 0;
const int INTERVAL = 1000;

void loop() {
  unsigned long now = millis();

  if (now - previousTime >= INTERVAL) {
    previousTime = now;   // Reset the clock
    // Do your timed action here!
  }
  // Everything else runs at FULL SPEED
}</code></pre>
<p>This way, your loop keeps running — checking conditions, reading sensors — while also watching for timer events!</p>`,
        code: `unsigned long prevBlink  = 0;
unsigned long prevSensor = 0;
bool ledState = false;

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  unsigned long now = millis();

  // Blink every 500ms
  if (now - prevBlink >= 500) {
    prevBlink = now;
    ledState = !ledState;
    digitalWrite(13, ledState ? HIGH : LOW);
    Serial.println(ledState ? "LED ON" : "LED OFF");
  }

  // Print sensor every 2000ms
  if (now - prevSensor >= 2000) {
    prevSensor = now;
    Serial.print("Sensor: ");
    Serial.println(analogRead(A0));
  }
}`,
      },
      {
        type: 'run', title: 'Two Timers at Once!', icon: '▶',
        content: `
<h2>Non-Blocking Magic!</h2>
<p>Click <strong>▶ Run</strong> to see TWO independent timers running at the same time — the LED blinks every 500ms AND the sensor reads every 1500ms!</p>
<div class="info-box tip">
  💡 With delay() you could only do <em>one</em> thing at a time. With millis(), you can do <em>many</em>!
</div>`,
        code: `unsigned long prevBlink  = 0;
unsigned long prevReport = 0;
bool ledState = false;

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Two independent timers!");
}

void loop() {
  unsigned long now = millis();

  // Timer 1: Blink every 500ms
  if (now - prevBlink >= 500) {
    prevBlink = now;
    ledState = !ledState;
    digitalWrite(13, ledState ? HIGH : LOW);
  }

  // Timer 2: Report every 1500ms
  if (now - prevReport >= 1500) {
    prevReport = now;
    Serial.print("Time: ");
    Serial.print(now / 1000);
    Serial.print("s  LED: ");
    Serial.println(ledState ? "ON" : "off");
  }
}`,
      },
      {
        type: 'challenge', title: 'Final Challenge: millis() Timer', icon: '🎯',
        content: `
<h2>🎯 Final Challenge!</h2>
<p>Write a sketch using <code>millis()</code> (not <code>delay()</code>!) that blinks pin 13 every <strong>300ms</strong>.</p>
<div class="info-box">
  Your code must use:<br>
  • <code>unsigned long</code> variable for the previous time<br>
  • <code>millis()</code> to get current time<br>
  • <code>digitalWrite(13, ...)</code> to control the LED<br>
  • <strong>No</strong> <code>delay()</code> calls!
</div>`,
        code: `unsigned long previousMillis = 0;
bool ledOn = false;

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Use millis() to blink without delay!

}`,
        validate: (code, _sim) => {
          const hasMillis  = /millis\s*\(\s*\)/.test(code);
          const hasULong   = /unsigned\s+long/.test(code);
          const hasDigital = /digitalWrite\s*\(\s*13/.test(code);
          const noDelay    = !/\bdelay\s*\(/.test(code);
          return hasMillis && hasULong && hasDigital && noDelay;
        },
        hint: 'if (millis() - previousMillis >= 300) { previousMillis = millis(); ledOn = !ledOn; digitalWrite(13, ledOn ? HIGH : LOW); }',
      },
      {
        type: 'quiz', title: 'Final Quiz', icon: '❓',
        content: '',
        q: 'What is the main advantage of millis() over delay()?',
        opts: [
          'millis() is more precise than delay()',
          'millis() lets the rest of loop() keep running while "waiting"',
          'millis() uses less memory than delay()',
          'millis() works on more Arduino models',
        ],
        correct: 1,
        explain: 'millis() is non-blocking — your program keeps running. delay() freezes everything. That\'s the key difference!',
      },
    ],
  },

  // ── 13. Push Button ──────────────────────────────────────
  {
    id: 'button_input', title: 'Push Button Input', icon: '🔘',
    difficulty: 'beginner', xp: 40,
    desc: 'Read a push button and control an LED — learn digitalRead() and INPUT_PULLUP.',
    components: [{ type: 'button', pin: 2 }],
    steps: [
      {
        type: 'learn', title: 'Reading Digital Inputs', icon: '🔘',
        content: `
<h2>Buttons — The Simplest Input</h2>
<p>So far we've only used <strong>outputs</strong> (LEDs). Now let's read <strong>inputs</strong>!</p>
<p>A push button is either pressed (ON) or not pressed (OFF). We read it with <code>digitalRead(pin)</code>.</p>
<div class="info-box">
  <strong>INPUT_PULLUP</strong> — the magic mode!<br>
  When you use <code>pinMode(2, INPUT_PULLUP)</code>, the pin reads <strong>HIGH</strong> normally and <strong>LOW</strong> when the button is pressed.<br>
  This prevents a "floating" pin that gives random readings.
</div>
<p>The pattern is:</p>
<pre><code>void setup() {
  pinMode(2, INPUT_PULLUP);  // Button on pin 2
  pinMode(13, OUTPUT);       // LED on pin 13
}

void loop() {
  int buttonState = digitalRead(2);
  if (buttonState == LOW) {    // LOW = pressed!
    digitalWrite(13, HIGH);   // LED on
  } else {
    digitalWrite(13, LOW);    // LED off
  }
}</code></pre>
<p>👆 See the <strong>Push Button</strong> in the simulator below? Click it to press it!</p>`,
        code: `void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(2);
  if (buttonState == LOW) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}`,
      },
      {
        type: 'run', title: 'Try the Button!', icon: '🖱️',
        content: `
<h2>Press the Button!</h2>
<p>Click <strong>▶ Run</strong> then <strong>click the PUSH button</strong> in the simulator to control the LED.</p>
<ul>
  <li>Button not pressed → LED is OFF</li>
  <li>Button pressed → LED is ON</li>
</ul>
<p>Notice pin 13 (LED_BUILTIN) lights up when you hold the button!</p>`,
        code: `void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int btn = digitalRead(2);
  if (btn == LOW) {
    digitalWrite(13, HIGH);
    Serial.println("Button pressed!");
  } else {
    digitalWrite(13, LOW);
  }
  delay(50);
}`,
      },
      {
        type: 'learn', title: 'Toggle with a Button', icon: '🔄',
        content: `
<h2>Toggle Mode — Click to Flip</h2>
<p>Instead of "hold to ON", let's make the button <strong>toggle</strong> the LED on each click.</p>
<p>The trick: detect when the button <em>first</em> gets pressed (the transition from HIGH to LOW):</p>
<pre><code>bool ledOn = false;
int lastBtn = HIGH;  // Remember previous state

void loop() {
  int btn = digitalRead(2);

  // Detect the moment it transitions to pressed
  if (btn == LOW && lastBtn == HIGH) {
    ledOn = !ledOn;            // Flip the LED
    digitalWrite(13, ledOn);
    delay(50);                 // Debounce
  }

  lastBtn = btn;  // Save for next loop
}</code></pre>
<p>This technique is called <strong>edge detection</strong> — catching the moment state changes.</p>`,
        code: `bool ledOn = false;
int lastBtn = HIGH;

void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int btn = digitalRead(2);

  if (btn == LOW && lastBtn == HIGH) {
    ledOn = !ledOn;
    digitalWrite(13, ledOn ? HIGH : LOW);
    Serial.println(ledOn ? "LED ON" : "LED OFF");
    delay(50);
  }

  lastBtn = btn;
}`,
      },
      {
        type: 'challenge', title: 'Button Challenge', icon: '🎯',
        content: `
<h2>Challenge: Button Counter</h2>
<p>Create a sketch that counts how many times the button is pressed and prints the count to Serial Monitor.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Use <code>pinMode(2, INPUT_PULLUP)</code></li>
  <li>Each button press increments a counter</li>
  <li>Print the count using <code>Serial.println()</code></li>
  <li>Use edge detection so it counts once per press (not while held)</li>
</ul>`,
        code: `int count = 0;
int lastBtn = HIGH;

void setup() {
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  // Your code here: count button presses!

}`,
        validate: (code, sim) => {
          const hasInputPullup = /INPUT_PULLUP/.test(code);
          const hasDigitalRead = /digitalRead\s*\(\s*2\s*\)/.test(code);
          const hasPrint = /Serial\.(print|println)/.test(code);
          const hasCounter = /\+\+|count\s*[+]=\s*1|count\s*=\s*count\s*\+/.test(code);
          const hasSerialUsed = sim.serialUsed;
          return hasInputPullup && hasDigitalRead && hasPrint && hasCounter;
        },
        hint: 'Use a variable like "count" and increment it (count++) when you detect a LOW-to-HIGH transition. Then Serial.println(count).',
        explainFn: (code, sim, errType) => {
          if (errType === 'logic') {
            const tips = [];
            if (!/INPUT_PULLUP/.test(code)) tips.push('Set the button pin mode to <code>INPUT_PULLUP</code> in setup()');
            if (!/digitalRead\s*\(\s*2\s*\)/.test(code)) tips.push('Read the button with <code>digitalRead(2)</code>');
            if (!/Serial\.print/.test(code)) tips.push('Print your counter with <code>Serial.println(count)</code>');
            if (!/\+\+|count\s*[+]=/.test(code)) tips.push('Increment your counter with <code>count++</code> when the button is pressed');
            return `<h3>Button Counter Tips</h3><ul>${tips.map(t=>'<li>'+t+'</li>').join('')}</ul>`;
          }
          return null;
        },
      },
    ],
  },

  // ── 14. Servo Motor ──────────────────────────────────────
  {
    id: 'servo_motor', title: 'Servo Motor Control', icon: '⚙️',
    difficulty: 'beginner', xp: 50,
    desc: 'Control a servo motor with the Servo library — sweep, position, and map!',
    components: [{ type: 'servo', pin: 9 }],
    steps: [
      {
        type: 'learn', title: 'What is a Servo?', icon: '⚙️',
        content: `
<h2>Servo Motors — Precise Positioning</h2>
<p>A <strong>servo motor</strong> rotates to a specific angle (0°–180°) and holds that position. Unlike regular motors that just spin, servos give you precise control!</p>
<p>Real-world uses:</p>
<ul>
  <li>🤖 Robot arms and joints</li>
  <li>✈️ Airplane wing flaps (RC planes)</li>
  <li>🚗 Steering in RC cars</li>
  <li>📷 Camera pan/tilt rigs</li>
</ul>
<div class="info-box">
  The <strong>Servo library</strong> makes this super easy!<br>
  <code>#include &lt;Servo.h&gt;</code><br>
  <code>Servo myServo;</code><br>
  <code>myServo.attach(9);  // Connect to pin 9</code><br>
  <code>myServo.write(90);  // Go to 90 degrees</code>
</div>
<p>The servo in the simulator shows the arm angle visually — watch it move!</p>`,
        code: `#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
  Serial.begin(9600);
  Serial.println("Servo ready!");
}

void loop() {
  myServo.write(0);    // Go to 0 degrees
  delay(1000);
  myServo.write(90);   // Go to 90 degrees
  delay(1000);
  myServo.write(180);  // Go to 180 degrees
  delay(1000);
}`,
      },
      {
        type: 'run', title: 'Watch it Sweep!', icon: '▶',
        content: `
<h2>Run the Servo Sweep</h2>
<p>Click <strong>▶ Run</strong> and watch the servo arm in the simulator rotate through positions!</p>
<p>The sketch:</p>
<ol>
  <li>Goes to <strong>0°</strong> (far left)</li>
  <li>Goes to <strong>90°</strong> (center)</li>
  <li>Goes to <strong>180°</strong> (far right)</li>
</ol>
<p>Check the Serial Monitor too — it logs every position!</p>`,
        code: `#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
  Serial.begin(9600);
}

void loop() {
  for (int angle = 0; angle <= 180; angle += 10) {
    myServo.write(angle);
    Serial.print("Angle: ");
    Serial.println(angle);
    delay(200);
  }
  for (int angle = 180; angle >= 0; angle -= 10) {
    myServo.write(angle);
    Serial.print("Angle: ");
    Serial.println(angle);
    delay(200);
  }
}`,
      },
      {
        type: 'challenge', title: 'Servo Challenge', icon: '🎯',
        content: `
<h2>Challenge: Slow Sweep</h2>
<p>Write a sketch that slowly sweeps the servo from <strong>0° to 180°</strong> and back, one degree at a time.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Include the Servo library: <code>#include &lt;Servo.h&gt;</code></li>
  <li>Attach the servo to pin 9</li>
  <li>Use a <code>for</code> loop to go from 0 to 180</li>
  <li>Use another loop to go from 180 back to 0</li>
  <li>Use <code>delay(15)</code> between each step</li>
</ul>`,
        code: `#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
}

void loop() {
  // Sweep from 0 to 180

  // Sweep back from 180 to 0

}`,
        validate: (code, sim) => {
          const hasServo = /Servo\s+\w+/.test(code) || /createServo/.test(code);
          const hasAttach = /\.attach\s*\(\s*9\s*\)/.test(code);
          const hasWrite = /\.write\s*\(/.test(code);
          const hasLoop = /for\s*\(/.test(code);
          return hasServo && hasAttach && hasWrite && hasLoop;
        },
        hint: 'for (int i = 0; i <= 180; i++) { myServo.write(i); delay(15); }  then another loop going backwards.',
      },
    ],
  },

  // ── 15. Buzzer & Tones ───────────────────────────────────
  {
    id: 'buzzer_tones', title: 'Buzzer & Tones', icon: '🔊',
    difficulty: 'beginner', xp: 40,
    desc: 'Make noise! Use tone() to play musical notes and create melodies.',
    components: [{ type: 'buzzer', pin: 8 }],
    steps: [
      {
        type: 'learn', title: 'Making Sound with tone()', icon: '🔊',
        content: `
<h2>Piezo Buzzers — Making Noise!</h2>
<p>A <strong>piezo buzzer</strong> vibrates at specific frequencies to make sound. Connect it to a digital pin and use <code>tone()</code>!</p>
<div class="info-box">
  <code>tone(pin, frequency)</code> — start a tone<br>
  <code>tone(pin, frequency, duration)</code> — play for duration ms<br>
  <code>noTone(pin)</code> — stop the tone
</div>
<p><strong>Musical note frequencies (Hz):</strong></p>
<table style="width:100%;border-collapse:collapse;font-size:.85rem">
  <tr><th style="text-align:left;padding:4px;border-bottom:1px solid var(--border)">Note</th><th style="padding:4px;border-bottom:1px solid var(--border)">Frequency</th></tr>
  <tr><td style="padding:4px">C4 (Middle C)</td><td style="padding:4px;text-align:center">262 Hz</td></tr>
  <tr><td style="padding:4px">E4</td><td style="padding:4px;text-align:center">330 Hz</td></tr>
  <tr><td style="padding:4px">G4</td><td style="padding:4px;text-align:center">392 Hz</td></tr>
  <tr><td style="padding:4px">A4</td><td style="padding:4px;text-align:center">440 Hz</td></tr>
  <tr><td style="padding:4px">C5</td><td style="padding:4px;text-align:center">523 Hz</td></tr>
</table>
<p>Watch the buzzer icon in the simulator — it lights up when making sound!</p>`,
        code: `void setup() {
  Serial.begin(9600);
  Serial.println("Playing notes...");

  tone(8, 262, 500);  // C4 - 500ms
  delay(600);
  tone(8, 330, 500);  // E4
  delay(600);
  tone(8, 392, 500);  // G4
  delay(600);
  noTone(8);
  Serial.println("Done!");
}

void loop() {}`,
      },
      {
        type: 'run', title: 'Play a Melody!', icon: '▶',
        content: `
<h2>Mary Had a Little Lamb 🐑</h2>
<p>Run this classic melody and watch the buzzer in the simulator!</p>
<p>The Serial Monitor will show each note as it plays.</p>`,
        code: `// Mary Had a Little Lamb
// Note frequencies
int E = 330, D = 294, C = 262, G = 392;

void playNote(int freq, int dur) {
  tone(8, freq, dur);
  delay(dur + 50);
  noTone(8);
}

void setup() {
  Serial.begin(9600);
  // Mary had a little lamb
  playNote(E, 300);
  playNote(D, 300);
  playNote(C, 300);
  playNote(D, 300);
  playNote(E, 300);
  playNote(E, 300);
  playNote(E, 600);
  Serial.println("Mary had a little lamb!");
}

void loop() {}`,
      },
      {
        type: 'challenge', title: 'Tone Challenge', icon: '🎯',
        content: `
<h2>Challenge: Play Three Notes</h2>
<p>Write a sketch that plays <strong>three different notes</strong> on the buzzer (pin 8), one after another.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Use <code>tone(8, frequency, duration)</code> at least 3 times</li>
  <li>Use different frequencies for each note (e.g., 262, 330, 392)</li>
  <li>Use <code>delay()</code> between notes</li>
  <li>Call <code>noTone(8)</code> when done</li>
</ul>`,
        code: `void setup() {
  // Play three different notes!
  // tone(8, frequency, duration_ms)


}

void loop() {}`,
        validate: (code, sim) => {
          const toneMatches = (code.match(/\btone\s*\(/g) || []).length;
          const hasNoTone = /noTone\s*\(/.test(code);
          const hasDelay = /\bdelay\s*\(/.test(code);
          return toneMatches >= 3 && hasDelay;
        },
        hint: 'tone(8, 262, 400); delay(500); tone(8, 330, 400); delay(500); tone(8, 392, 400); delay(500); noTone(8);',
      },
    ],
  },

  // ── 16. RGB LED ──────────────────────────────────────────
  {
    id: 'rgb_led', title: 'RGB LED Color Mixing', icon: '🌈',
    difficulty: 'intermediate', xp: 55,
    desc: 'Mix red, green, and blue to create any color using PWM!',
    components: [{ type: 'rgb', pins: { r: 9, g: 10, b: 11 } }],
    steps: [
      {
        type: 'learn', title: 'How RGB LEDs Work', icon: '🌈',
        content: `
<h2>RGB LEDs — A Light in Every Color!</h2>
<p>An <strong>RGB LED</strong> is actually <em>three LEDs in one</em> — Red, Green, and Blue. By mixing these three colors at different brightnesses, you can make <strong>any color</strong>!</p>
<div class="info-box">
  <strong>Common Cathode RGB:</strong><br>
  • Pin 9 → Red channel<br>
  • Pin 10 → Green channel<br>
  • Pin 11 → Blue channel<br>
  Use <code>analogWrite(pin, 0-255)</code> to set brightness.
</div>
<p>Color recipes:</p>
<ul>
  <li>🔴 Red: R=255, G=0, B=0</li>
  <li>🟢 Green: R=0, G=255, B=0</li>
  <li>🔵 Blue: R=0, G=0, B=255</li>
  <li>🟡 Yellow: R=255, G=255, B=0</li>
  <li>🟣 Purple: R=255, G=0, B=255</li>
  <li>⚪ White: R=255, G=255, B=255</li>
</ul>
<p>Watch the RGB circle in the simulator change color as you run code!</p>`,
        code: `void setup() {
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
  Serial.begin(9600);
}

void setColor(int r, int g, int b) {
  analogWrite(9, r);
  analogWrite(10, g);
  analogWrite(11, b);
}

void loop() {
  setColor(255, 0, 0);    // Red
  Serial.println("Red");
  delay(800);
  setColor(0, 255, 0);    // Green
  Serial.println("Green");
  delay(800);
  setColor(0, 0, 255);    // Blue
  Serial.println("Blue");
  delay(800);
}`,
      },
      {
        type: 'run', title: 'Color Cycle!', icon: '▶',
        content: `
<h2>Watch the Colors Blend!</h2>
<p>Click <strong>▶ Run</strong> and watch the RGB circle cycle through primary colors.</p>
<p>Try modifying the values and running again — can you make purple or orange?</p>`,
        code: `void setup() {
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
}

void setColor(int r, int g, int b) {
  analogWrite(9, r);
  analogWrite(10, g);
  analogWrite(11, b);
}

void loop() {
  setColor(255, 0, 0);    delay(600);  // Red
  setColor(255, 165, 0);  delay(600);  // Orange
  setColor(255, 255, 0);  delay(600);  // Yellow
  setColor(0, 255, 0);    delay(600);  // Green
  setColor(0, 0, 255);    delay(600);  // Blue
  setColor(128, 0, 255);  delay(600);  // Purple
  setColor(255, 255, 255); delay(600); // White
  setColor(0, 0, 0);      delay(600);  // Off
}`,
      },
      {
        type: 'challenge', title: 'RGB Challenge', icon: '🎯',
        content: `
<h2>Challenge: Make Yellow</h2>
<p>Yellow is red + green! Write a sketch that makes the RGB LED show a <strong>pure yellow</strong> color.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Use <code>analogWrite(9, value)</code> for red (pin 9)</li>
  <li>Use <code>analogWrite(10, value)</code> for green (pin 10)</li>
  <li>Use <code>analogWrite(11, value)</code> for blue (pin 11)</li>
  <li>Yellow = full red (255) + full green (255) + no blue (0)</li>
</ul>`,
        code: `void setup() {
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);

  // Make the RGB LED show YELLOW
  // Yellow = Red + Green, no Blue

}

void loop() {}`,
        validate: (code, sim) => {
          const pins = sim.pins || {};
          // Check red pin 9 = high, green pin 10 = high, blue pin 11 = 0
          const rPin = pins[9];
          const gPin = pins[10];
          const bPin = pins[11];
          // Be lenient: check if code sets pin 9 and 10 to positive values and pin 11 to 0
          const hasRed   = /analogWrite\s*\(\s*9\s*,\s*2[0-9]{2}\s*\)/.test(code);
          const hasGreen = /analogWrite\s*\(\s*10\s*,\s*2[0-9]{2}\s*\)/.test(code);
          const hasBlueOff = /analogWrite\s*\(\s*11\s*,\s*0\s*\)/.test(code) || !/analogWrite\s*\(\s*11/.test(code);
          return hasRed && hasGreen && hasBlueOff;
        },
        hint: 'analogWrite(9, 255);  // Full red\nanalogWrite(10, 255); // Full green\nanalogWrite(11, 0);   // No blue = YELLOW!',
      },
    ],
  },

  // ── 17. Potentiometer ────────────────────────────────────
  {
    id: 'potentiometer', title: 'Potentiometer & Analog Input', icon: '🎛️',
    difficulty: 'beginner', xp: 40,
    desc: 'Read a potentiometer and use map() to control LED brightness.',
    steps: [
      {
        type: 'learn', title: 'Analog Sensors', icon: '🎛️',
        content: `
<h2>Reading the Physical World</h2>
<p>A <strong>potentiometer</strong> (pot) is a variable resistor — like a volume knob. As you turn it, the voltage changes from 0V to 5V.</p>
<p>The Arduino reads it with <code>analogRead(A0)</code> — returns a value from <strong>0 to 1023</strong>.</p>
<div class="info-box">
  0V → <strong>0</strong><br>
  2.5V → <strong>512</strong><br>
  5V → <strong>1023</strong>
</div>
<p>Then use <code>map()</code> to convert to a useful range:</p>
<pre><code>int pot = analogRead(A0);              // 0-1023
int brightness = map(pot, 0, 1023, 0, 255); // → 0-255
analogWrite(9, brightness);            // PWM LED</code></pre>
<p>Try the <strong>A0 slider</strong> in the simulator — drag it and watch the Serial Monitor!</p>`,
        code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  int pot = analogRead(A0);
  Serial.print("Pot value: ");
  Serial.println(pot);
  delay(200);
}`,
      },
      {
        type: 'run', title: 'Drag the Slider!', icon: '🎛️',
        content: `
<h2>Control LED Brightness with the Pot</h2>
<p>Run this sketch, then drag the <strong>A0 slider</strong> in the simulator. The LED on pin 9 should change brightness!</p>
<p>The <code>map()</code> function converts 0–1023 to 0–255 so we can use it with <code>analogWrite()</code>.</p>`,
        code: `void setup() {
  pinMode(9, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int pot = analogRead(A0);
  int brightness = map(pot, 0, 1023, 0, 255);
  analogWrite(9, brightness);
  Serial.print("Pot: ");
  Serial.print(pot);
  Serial.print("  Brightness: ");
  Serial.println(brightness);
  delay(100);
}`,
      },
      {
        type: 'challenge', title: 'Sensor Challenge', icon: '🎯',
        content: `
<h2>Challenge: Analog LED Dimmer</h2>
<p>Write a sketch that reads the potentiometer (A0) and uses <code>map()</code> to control the brightness of pin 9.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Read <code>analogRead(A0)</code></li>
  <li>Use <code>map()</code> to convert 0–1023 to 0–255</li>
  <li>Use <code>analogWrite(9, brightness)</code> to dim the LED</li>
  <li>Print the brightness value to Serial</li>
</ul>`,
        code: `void setup() {
  pinMode(9, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Read pot and dim LED

}`,
        validate: (code, sim) => {
          const hasAnalogRead = /analogRead\s*\(\s*(A0|sim\.A0|100)\s*\)/.test(code);
          const hasMap = /\bmap\s*\(/.test(code);
          const hasAnalogWrite = /analogWrite\s*\(\s*9/.test(code);
          return hasAnalogRead && hasMap && hasAnalogWrite;
        },
        hint: 'int pot = analogRead(A0); int bright = map(pot, 0, 1023, 0, 255); analogWrite(9, bright);',
      },
    ],
  },

  // ── 18. String Operations ────────────────────────────────
  {
    id: 'string_ops', title: 'Working with Strings', icon: '📝',
    difficulty: 'intermediate', xp: 50,
    desc: 'Build, combine, and manipulate text strings for displays and Serial output.',
    steps: [
      {
        type: 'learn', title: 'String Basics', icon: '📝',
        content: `
<h2>Strings — Working with Text</h2>
<p>The Arduino <code>String</code> class lets you work with text easily.</p>
<div class="info-box">
  <code>String name = "Arduino";</code><br>
  <code>String msg = "Hello, " + name;</code> → "Hello, Arduino"<br>
  <code>msg.length()</code> → 14<br>
  <code>msg.toUpperCase()</code> → "HELLO, ARDUINO"<br>
  <code>msg.indexOf("Arduino")</code> → 7 (position)<br>
</div>
<p><strong>Useful String methods:</strong></p>
<ul>
  <li><code>str.length()</code> — how many characters</li>
  <li><code>str.charAt(i)</code> — character at position i</li>
  <li><code>str.toUpperCase() / toLowerCase()</code></li>
  <li><code>str.substring(start, end)</code> — extract part</li>
  <li><code>str.replace("old", "new")</code></li>
  <li><code>str.toInt()</code> — convert to number</li>
</ul>`,
        code: `void setup() {
  Serial.begin(9600);

  String name = "Arduino";
  String greeting = "Hello, " + name + "!";

  Serial.println(greeting);
  Serial.print("Length: ");
  Serial.println(greeting.length());
  Serial.println(greeting.toUpperCase());
}

void loop() {}`,
      },
      {
        type: 'run', title: 'String Builder', icon: '▶',
        content: `
<h2>Build Dynamic Messages</h2>
<p>Run this sketch to see how strings combine with numbers to create useful messages like sensor readouts!</p>`,
        code: `void setup() {
  Serial.begin(9600);
  Serial.println("=== String Operations Demo ===");
}

void loop() {
  int temperature = random(18, 35);
  int humidity = random(30, 90);

  String msg = "Temp: " + String(temperature) + "C  Humidity: " + String(humidity) + "%";
  Serial.println(msg);

  if (temperature > 30) {
    Serial.println("WARNING: High temperature!");
  }
  delay(500);
}`,
      },
      {
        type: 'challenge', title: 'String Challenge', icon: '🎯',
        content: `
<h2>Challenge: Status Message Builder</h2>
<p>Write a sketch that builds and prints a status message combining text and numbers.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Create at least one <code>String</code> variable</li>
  <li>Use the <code>+</code> operator to concatenate strings</li>
  <li>Include a number (like a counter or sensor value) in the string</li>
  <li>Print the result with <code>Serial.println()</code></li>
</ul>`,
        code: `void setup() {
  Serial.begin(9600);
  int count = 42;

  // Build a string that includes the count variable
  // e.g., "Count is: 42 items"

}

void loop() {}`,
        validate: (code, sim) => {
          const hasString = /String\s+\w+/.test(code);
          const hasConcat = /\+/.test(code);
          const hasPrint = /Serial\.(print|println)/.test(code);
          return hasString && hasConcat && hasPrint && sim.serialUsed;
        },
        hint: 'String msg = "Count is: " + String(count) + " items"; Serial.println(msg);',
      },
    ],
  },

  // ── 19. Traffic Light State Machine ──────────────────────
  {
    id: 'traffic_light', title: 'Traffic Light State Machine', icon: '🚦',
    difficulty: 'intermediate', xp: 65,
    desc: 'Build a traffic light controller using a state machine pattern.',
    steps: [
      {
        type: 'learn', title: 'State Machines', icon: '🚦',
        content: `
<h2>State Machines — Organized Logic</h2>
<p>A <strong>state machine</strong> is a programming pattern where your program is always in one of several <em>states</em>, and it transitions between them based on events or time.</p>
<p>A traffic light is a perfect example!</p>
<div class="info-box">
  States: <strong>RED → GREEN → YELLOW → RED → ...</strong><br>
  Each state has a timer. When it expires, move to the next state.
</div>
<p>We represent states with an <code>enum</code> (or just integers):</p>
<pre><code>int state = 0;  // 0=RED, 1=GREEN, 2=YELLOW

void loop() {
  if (state == 0) {
    // Red light behavior...
  } else if (state == 1) {
    // Green light behavior...
  }
}</code></pre>
<p>We'll use pins 11=Red, 10=Yellow, 9=Green for our traffic light.</p>`,
        code: `// Pin assignments
int RED_PIN = 11;
int YEL_PIN = 10;
int GRN_PIN = 9;

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(YEL_PIN, OUTPUT);
  pinMode(GRN_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Traffic Light Ready!");
}

void allOff() {
  digitalWrite(RED_PIN, LOW);
  digitalWrite(YEL_PIN, LOW);
  digitalWrite(GRN_PIN, LOW);
}

void loop() {
  // Red
  allOff();
  digitalWrite(RED_PIN, HIGH);
  Serial.println("RED - Stop!");
  delay(500);

  // Green
  allOff();
  digitalWrite(GRN_PIN, HIGH);
  Serial.println("GREEN - Go!");
  delay(500);

  // Yellow
  allOff();
  digitalWrite(YEL_PIN, HIGH);
  Serial.println("YELLOW - Slow...");
  delay(250);
}`,
      },
      {
        type: 'run', title: 'Run the Traffic Light', icon: '▶',
        content: `
<h2>Watch the Light Sequence!</h2>
<p>Click <strong>▶ Run</strong> and watch pins 9, 10, 11 cycle through the traffic light sequence in the simulator.</p>
<p>Check the Serial Monitor to see the state transitions!</p>`,
        code: `int RED_PIN = 11;
int YEL_PIN = 10;
int GRN_PIN = 9;

int state = 0;
unsigned long lastChange = 0;
int durations[] = {600, 500, 250};  // RED, GREEN, YELLOW ms

void allOff() {
  digitalWrite(RED_PIN, LOW);
  digitalWrite(YEL_PIN, LOW);
  digitalWrite(GRN_PIN, LOW);
}

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(YEL_PIN, OUTPUT);
  pinMode(GRN_PIN, OUTPUT);
  Serial.begin(9600);
  lastChange = millis();
}

void loop() {
  allOff();
  if (state == 0) { digitalWrite(RED_PIN, HIGH); Serial.println("RED"); }
  else if (state == 1) { digitalWrite(GRN_PIN, HIGH); Serial.println("GREEN"); }
  else { digitalWrite(YEL_PIN, HIGH); Serial.println("YELLOW"); }

  delay(durations[state]);
  state = (state + 1) % 3;
}`,
      },
      {
        type: 'challenge', title: 'Traffic Light Challenge', icon: '🎯',
        content: `
<h2>Challenge: Full Traffic Light</h2>
<p>Create a traffic light that cycles through Red → Green → Yellow → Red.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Use pin 11 for Red, pin 10 for Yellow, pin 9 for Green</li>
  <li>Set each pin as OUTPUT in setup()</li>
  <li>Cycle through all three colors in loop()</li>
  <li>Use delay() between state changes</li>
  <li>Print the current state to Serial</li>
</ul>`,
        code: `void setup() {
  pinMode(9, OUTPUT);   // Green
  pinMode(10, OUTPUT);  // Yellow
  pinMode(11, OUTPUT);  // Red
  Serial.begin(9600);
}

void loop() {
  // Red phase

  // Green phase

  // Yellow phase

}`,
        validate: (code, sim) => {
          const pins = sim.pins || {};
          const hasPin9  = /digitalWrite\s*\(\s*9/.test(code);
          const hasPin10 = /digitalWrite\s*\(\s*10/.test(code);
          const hasPin11 = /digitalWrite\s*\(\s*11/.test(code);
          const hasDelay = /\bdelay\s*\(/.test(code);
          const hasPrint = /Serial\.(print|println)/.test(code);
          return hasPin9 && hasPin10 && hasPin11 && hasDelay && hasPrint;
        },
        hint: 'Pattern: digitalWrite(11, HIGH); delay(500); digitalWrite(11, LOW); — repeat for each light color.',
      },
    ],
  },

  // ── 20. Button + LED State Toggle ───────────────────────
  {
    id: 'state_toggle', title: 'Button & LED State Toggle', icon: '🔁',
    difficulty: 'intermediate', xp: 60,
    desc: 'Combine buttons and LEDs to build a multi-state toggle system.',
    components: [{ type: 'button', pin: 2 }],
    steps: [
      {
        type: 'learn', title: 'Multi-State Toggle', icon: '🔁',
        content: `
<h2>Multiple States, One Button</h2>
<p>What if one button could cycle through 4 different LED patterns? That's a state machine with button input!</p>
<div class="info-box">
  Press button → state changes:<br>
  State 0: All LEDs off<br>
  State 1: Pin 9 ON<br>
  State 2: Pin 10 ON<br>
  State 3: Pins 9+10 blinking (use millis!)
</div>
<p>The key pattern:</p>
<pre><code>int mode = 0;
int lastBtn = HIGH;

void loop() {
  int btn = digitalRead(2);
  if (btn == LOW && lastBtn == HIGH) {
    mode = (mode + 1) % 4;  // Cycle 0→1→2→3→0
    delay(50);
  }
  lastBtn = btn;

  // Act based on mode
  if (mode == 0) { /* off */ }
  else if (mode == 1) { /* pin 9 on */ }
  // ...
}</code></pre>`,
        code: `int mode = 0;
int lastBtn = HIGH;
unsigned long lastBlink = 0;
bool blinkState = false;

void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int btn = digitalRead(2);
  if (btn == LOW && lastBtn == HIGH) {
    mode = (mode + 1) % 4;
    Serial.print("Mode: ");
    Serial.println(mode);
    delay(50);
  }
  lastBtn = btn;

  digitalWrite(9, LOW);
  digitalWrite(10, LOW);

  if (mode == 1) {
    digitalWrite(9, HIGH);
  } else if (mode == 2) {
    digitalWrite(10, HIGH);
  } else if (mode == 3) {
    if (millis() - lastBlink > 200) {
      lastBlink = millis();
      blinkState = !blinkState;
      digitalWrite(9, blinkState);
      digitalWrite(10, !blinkState);
    }
  }
}`,
      },
      {
        type: 'run', title: 'Click Through States', icon: '▶',
        content: `
<h2>Run It and Click the Button!</h2>
<p>Click <strong>▶ Run</strong>, then <strong>click the button</strong> in the simulator repeatedly.</p>
<p>Watch pins 9 and 10 cycle through the 4 modes! The Serial Monitor shows which mode is active.</p>`,
        code: `int mode = 0;
int lastBtn = HIGH;
unsigned long lastBlink = 0;
bool blinkState = false;

void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  Serial.begin(9600);
  Serial.println("Press button to change mode!");
}

void loop() {
  int btn = digitalRead(2);
  if (btn == LOW && lastBtn == HIGH) {
    mode = (mode + 1) % 4;
    String names[] = {"OFF", "LED1 ON", "LED2 ON", "BLINK"};
    Serial.print("Mode: ");
    Serial.println(names[mode]);
    delay(50);
  }
  lastBtn = btn;
  digitalWrite(9, LOW);
  digitalWrite(10, LOW);
  if (mode == 1) { digitalWrite(9, HIGH); }
  else if (mode == 2) { digitalWrite(10, HIGH); }
  else if (mode == 3) {
    if (millis() - lastBlink > 200) {
      lastBlink = millis();
      blinkState = !blinkState;
      digitalWrite(9, blinkState);
    }
  }
}`,
      },
      {
        type: 'challenge', title: 'State Toggle Challenge', icon: '🎯',
        content: `
<h2>Challenge: Two-State Toggle</h2>
<p>Write a sketch where pressing the button on pin 2 toggles an LED on pin 9 (on/off each press).</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>Use <code>INPUT_PULLUP</code> for the button on pin 2</li>
  <li>Each button press should toggle pin 9 LED on/off</li>
  <li>Use edge detection (don't toggle while held)</li>
  <li>Print "LED ON" or "LED OFF" to Serial</li>
</ul>`,
        code: `bool ledState = false;
int lastBtn = HIGH;

void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(9, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Detect button press and toggle LED

}`,
        validate: (code, sim) => {
          const hasInputPullup = /INPUT_PULLUP/.test(code);
          const hasDigitalRead = /digitalRead\s*\(\s*2\s*\)/.test(code);
          const hasDigitalWrite = /digitalWrite\s*\(\s*9/.test(code);
          const hasPrint = /Serial\.(print|println)/.test(code);
          const hasToggle = /!\s*led|led.*!|=\s*!/.test(code);
          return hasInputPullup && hasDigitalRead && hasDigitalWrite && hasPrint;
        },
        hint: 'if (btn == LOW && lastBtn == HIGH) { ledState = !ledState; digitalWrite(9, ledState); Serial.println(ledState ? "LED ON" : "LED OFF"); }',
      },
    ],
  },

  // ── 21. switch/case ─────────────────────────────────────
  {
    id: 'switch-case', title: 'switch / case Control Flow', icon: '🔀',
    difficulty: 'intermediate', xp: 65,
    desc: 'Use switch/case to handle multiple conditions cleanly — cleaner than many if/else chains.',
    components: [{ type: 'button', pin: 2 }],
    steps: [
      {
        type: 'learn', title: 'When if/else Gets Messy', icon: '🔀',
        content: `
<h2>A Cleaner Way to Handle Many Options</h2>
<p>Imagine checking a menu value that could be 1, 2, 3, 4, or 5. With if/else:</p>
<pre><code>if (choice == 1) { ... }
else if (choice == 2) { ... }
else if (choice == 3) { ... }
else if (choice == 4) { ... }
else if (choice == 5) { ... }
else { ... }</code></pre>
<p>That works, but it's repetitive. <strong>switch/case</strong> is cleaner:</p>
<div class="info-box">
<pre><code>switch (choice) {
  case 1: /* do thing 1 */ break;
  case 2: /* do thing 2 */ break;
  case 3: /* do thing 3 */ break;
  default: /* anything else */ break;
}</code></pre>
</div>
<div class="info-box tip">
  ⚠️ Always add <code>break;</code> at the end of each case! Without it, execution "falls through" into the next case — usually a bug.
</div>`,
      },
      {
        type: 'learn', title: 'switch/case Syntax', icon: '📖',
        content: `
<h2>How switch/case Works</h2>
<p>Arduino evaluates the expression in <code>switch()</code> and jumps to the matching <code>case</code>:</p>
<div class="info-box">
<pre><code>switch (expression) {
  case value1:
    // code if expression == value1
    break;
  case value2:
    // code if expression == value2
    break;
  default:
    // code if no case matches
    break;
}</code></pre>
</div>
<p>Key rules:</p>
<ul>
  <li><code>case</code> values must be <strong>integer constants</strong></li>
  <li><code>break</code> stops execution and exits the switch</li>
  <li><code>default</code> is optional — runs if no case matches</li>
  <li>Multiple cases can intentionally share code (fall-through)</li>
</ul>`,
        code: `// LED brightness levels via switch/case
int level = 2;  // Try changing to 1, 2, 3, or 4!

void setup() {
  pinMode(9, OUTPUT);
  Serial.begin(9600);

  switch (level) {
    case 1:
      analogWrite(9, 64);
      Serial.println("Level 1: 25%");
      break;
    case 2:
      analogWrite(9, 128);
      Serial.println("Level 2: 50%");
      break;
    case 3:
      analogWrite(9, 192);
      Serial.println("Level 3: 75%");
      break;
    case 4:
      analogWrite(9, 255);
      Serial.println("Level 4: 100%");
      break;
    default:
      analogWrite(9, 0);
      Serial.println("Unknown level");
      break;
  }
}
void loop() {}`,
      },
      {
        type: 'run', title: 'Button Mode Selector', icon: '▶',
        content: `
<h2>Press Button to Cycle Modes!</h2>
<p>Click <strong>▶ Run</strong>, then <strong>press the button</strong> to cycle through 3 LED modes. A <code>switch</code> statement selects the behaviour for each mode.</p>
<div class="info-box tip">
  💡 Switch/case is the perfect tool for device modes — think washing machine cycles, game difficulty levels, instrument settings.
</div>`,
        code: `int mode = 0;
int lastBtn = HIGH;

void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Press button to change mode!");
}

void loop() {
  int btn = digitalRead(2);
  if (btn == LOW && lastBtn == HIGH) {
    mode = (mode + 1) % 3;  // cycle 0 → 1 → 2 → 0
    delay(50);
  }
  lastBtn = btn;

  switch (mode) {
    case 0:
      // Slow blink
      digitalWrite(13, HIGH); delay(600);
      digitalWrite(13, LOW);  delay(600);
      Serial.println("Mode 0: Slow blink");
      break;
    case 1:
      // Fast blink
      digitalWrite(13, HIGH); delay(100);
      digitalWrite(13, LOW);  delay(100);
      Serial.println("Mode 1: Fast blink");
      break;
    case 2:
      // Always on
      digitalWrite(13, HIGH);
      Serial.println("Mode 2: Solid ON");
      delay(400);
      break;
  }
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Mode Selector', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Write a sketch that uses <code>switch/case</code> to select between at least <strong>3 different LED behaviors</strong>:</p>
<ol>
  <li>Declare <code>int mode = 1;</code></li>
  <li>Use <code>switch(mode)</code> with at least 3 <code>case</code>s</li>
  <li>Each case does something different with pin 13</li>
  <li>Include a <code>default</code> case that turns the LED off</li>
  <li>Print the current mode to <code>Serial.println</code></li>
</ol>
<div class="info-box">
  Checker looks for: <code>switch</code>, 3+ <code>case</code>s, <code>default</code>, <code>break</code>, and <code>Serial.println</code>.
</div>`,
        code: `int mode = 1;  // Try 1, 2, or 3

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Use switch/case to do something different for each mode
}`,
        validate: (code, _sim) => {
          const cases = (code.match(/\bcase\s+\d+/g) || []).length;
          return /\bswitch\s*\(/.test(code) &&
                 cases >= 3 &&
                 /\bdefault\s*:/.test(code) &&
                 /\bbreak\s*;/.test(code) &&
                 /Serial\.println/.test(code);
        },
        hint: 'switch(mode) { case 1: digitalWrite(13,HIGH); delay(200); digitalWrite(13,LOW); delay(200); Serial.println("Mode 1"); break; case 2: ... case 3: ... default: digitalWrite(13,LOW); break; }',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What happens if you forget to write "break;" at the end of a case?',
        opts: [
          'The sketch will not compile',
          'Only that case is skipped entirely',
          'Execution falls through and runs the next case\'s code too',
          'The Arduino resets automatically',
        ],
        correct: 2,
        explain: '"Fall-through" means execution continues into the next case without stopping. This is sometimes intentional (to share code between cases) but is usually a bug. Always add break; unless you specifically want fall-through!',
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
    desc: 'Create a full traffic light sequence with red, yellow, and green LEDs. Add a pedestrian button that triggers a walk signal.',
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
    desc: 'Control a servo motor with a potentiometer. Map the pot position (0–1023) to servo angle (0–180°).',
    parts: ['Arduino Uno', 'Servo motor', 'Potentiometer', 'External 5V power supply'],
    difficulty: 'intermediate',
    skills: ['Servo library', 'map()', 'analogRead'],
  },
  {
    icon: '📏',
    title: 'Ultrasonic Range Finder',
    desc: 'Measure distances using an HC-SR04 sensor. Display the distance in cm and trigger an LED when objects are too close.',
    parts: ['Arduino Uno', 'HC-SR04 sensor', '1x LED', '220Ω resistor', 'Breadboard'],
    difficulty: 'intermediate',
    skills: ['pulseIn()', 'millis()', 'if/else'],
  },
  {
    icon: '🌈',
    title: 'RGB LED Color Mixer',
    desc: 'Control an RGB LED to display any color using three potentiometers for R, G, B channels, or auto-cycle through a rainbow.',
    parts: ['Arduino Uno', 'RGB LED (common cathode)', '3x 220Ω resistors', '3x potentiometers'],
    difficulty: 'advanced',
    skills: ['analogWrite', 'PWM', 'map()', 'Arrays'],
  },
];
