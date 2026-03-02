/* ─────────────────────────────────────────────────────────
   data.js  –  Step-by-step lesson content for ArduinoLearn.
   Each lesson has a "steps" array walked one at a time.
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
  { id: 'quiz_ace',        icon: '🎯', name: 'Quiz Ace',        desc: 'Answer a quiz question correctly.',                 cond: s => Object.values(s.quizScores).some(v => v >= 100)  },
  { id: 'five_lessons',    icon: '🔥', name: 'On Fire',         desc: 'Complete 5 lessons.',                               cond: s => s.completedLessons.length >= 5  },
  { id: 'all_lessons',     icon: '🎓', name: 'Graduate',        desc: 'Complete all 16 lessons.',                          cond: s => s.completedLessons.length >= 16 },
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
<p>Two ways to wire a button:</p>
<div class="info-box">
  <strong>INPUT</strong> — needs an external 10kΩ pull-down resistor to work reliably<br>
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
        code: `// Wiring test: see what digitalRead returns
void setup() {
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
        type: 'run', title: 'Try the Simulator Button!', icon: '▶',
        content: `
<h2>Press the Virtual Button! 🔘</h2>
<p>Click <strong>▶ Run</strong> — the simulator will show a <strong>green button for Pin 2</strong> in the "Digital Inputs" section!</p>
<div class="info-box tip">
  🖱️ <strong>Hold the green button</strong> while the sketch is running to simulate pressing a real button.<br><br>
  Watch the Serial Monitor — when you hold the button, the value drops from <strong>1 → 0</strong> (because INPUT_PULLUP inverts the logic).
</div>
<p>The button area appears automatically when your sketch calls <code>pinMode(pin, INPUT_PULLUP)</code>. Try holding it and releasing it — see the values change live!</p>`,
        code: `void setup() {
  pinMode(2, INPUT_PULLUP);  // Built-in pull-up resistor
  Serial.begin(9600);
  Serial.println("Reading pin 2...");
}

void loop() {
  int state = digitalRead(2);
  Serial.print("Pin 2 = ");
  Serial.println(state);  // 1 = released, 0 = pressed
  delay(500);
}`,
      },
      {
        type: 'run', title: 'Button Controls an LED!', icon: '💡',
        content: `
<h2>Connect Input to Output!</h2>
<p>Now let's make something useful: <strong>hold the button → LED turns on</strong>. Release the button → LED turns off.</p>
<p>Click <strong>▶ Run</strong>, then <strong>hold the Pin 2 button</strong> in the simulator to see the LED light up!</p>
<div class="info-box">
  📋 <strong>Pattern:</strong><br>
  • Read button with <code>digitalRead(2)</code><br>
  • If result is <code>LOW</code> (pressed) → turn LED on<br>
  • If result is <code>HIGH</code> (released) → turn LED off
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
<h2>Remembering State Between Loops</h2>
<p>What if you want to count how many times a button is pressed? You need to detect the <em>moment</em> it changes — called detecting an <strong>edge</strong>.</p>
<p>The trick: remember the <em>previous</em> button state, and only count when it transitions from HIGH → LOW:</p>
<pre><code>int lastState = HIGH;  // remember previous state

void loop() {
  int currentState = digitalRead(2);

  if (lastState == HIGH && currentState == LOW) {
    // Just pressed! Count it.
    count++;
  }

  lastState = currentState;  // update memory
  delay(50);
}</code></pre>
<div class="info-box tip">
  💡 This is called <strong>edge detection</strong>. It's used everywhere — counting objects on a conveyor belt, detecting door opens, tracking button taps, etc.
</div>`,
        code: `int count = 0;
int lastState = HIGH;  // Track previous button state

void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Press counter ready!");
}

void loop() {
  int currentState = digitalRead(2);

  // Detect HIGH → LOW transition = button just pressed
  if (lastState == HIGH && currentState == LOW) {
    count++;
    Serial.print("Button pressed! Count = ");
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
  🖱️ After clicking "Check My Code", hold the <strong>Pin 2 button</strong> in the simulator to test it visually!
</div>
<div class="info-box">
  Checker looks for: <code>INPUT_PULLUP</code>, <code>digitalRead</code>, <code>Serial.println</code>, and <code>digitalWrite(13</code>
</div>`,
        code: `void setup() {
  // Set up pins here
}

void loop() {
  // Read pin 2 and control the LED
  // Also print the button state to Serial
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

  // ── 13. Traffic Light ───────────────────────────────────
  {
    id: 'traffic-light', title: 'Traffic Light Controller', icon: '🚦',
    difficulty: 'beginner', xp: 55,
    desc: 'Control multiple LEDs in sequence to simulate a real traffic light.',
    steps: [
      {
        type: 'learn', title: 'Multiple Outputs at Once', icon: '🚦',
        content: `
<h2>Controlling More Than One LED!</h2>
<p>So far you've used pin 13's built-in LED. Real projects use <strong>many pins at once</strong>. Let's build a traffic light!</p>
<p>A traffic light has three LEDs:</p>
<ul>
  <li>🔴 <strong>Red</strong> → pin 11 — Stop!</li>
  <li>🟡 <strong>Yellow</strong> → pin 10 — Get ready</li>
  <li>🟢 <strong>Green</strong> → pin 9 — Go!</li>
</ul>
<div class="info-box tip">
  💡 In the simulator, watch the pin LEDs in the <strong>Digital Pins</strong> row light up in sequence. Green circles = HIGH.
</div>
<p>Each pin must be set as <code>OUTPUT</code> in <code>setup()</code> before you can control it.</p>
<div class="info-box">
<pre><code>void setup() {
  pinMode(11, OUTPUT);  // Red
  pinMode(10, OUTPUT);  // Yellow
  pinMode(9,  OUTPUT);  // Green
}</code></pre>
</div>`,
      },
      {
        type: 'learn', title: 'The Traffic Light Sequence', icon: '🔄',
        content: `
<h2>Planning the Sequence</h2>
<p>A real traffic light follows a strict sequence:</p>
<ol>
  <li>🔴 <strong>Red</strong> for 3 seconds → cars must stop</li>
  <li>🟡 <strong>Yellow</strong> for 1 second → get ready</li>
  <li>🟢 <strong>Green</strong> for 3 seconds → cars may go</li>
  <li>🟡 <strong>Yellow</strong> for 1 second → slow down</li>
  <li>Back to 🔴 Red...</li>
</ol>
<p>Each phase: turn one LED on, wait, turn it off, move to next.</p>
<div class="info-box tip">
  💡 Good practice: use <strong>constants</strong> or <strong>variables</strong> for pin numbers. Changing <code>RED_PIN = 11</code> in one place is much easier than hunting down every <code>11</code> in your code!
</div>
<pre><code>const int RED   = 11;
const int AMBER = 10;
const int GREEN = 9;</code></pre>`,
        code: `const int RED   = 11;
const int AMBER = 10;
const int GREEN = 9;

void setup() {
  pinMode(RED,   OUTPUT);
  pinMode(AMBER, OUTPUT);
  pinMode(GREEN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Traffic light ready!");
}

void loop() {
  // Red phase
  digitalWrite(RED, HIGH);
  Serial.println("RED - Stop!");
  delay(3000);
  digitalWrite(RED, LOW);

  // Amber (pre-green)
  digitalWrite(AMBER, HIGH);
  Serial.println("AMBER - Get ready...");
  delay(1000);
  digitalWrite(AMBER, LOW);

  // Green phase
  digitalWrite(GREEN, HIGH);
  Serial.println("GREEN - Go!");
  delay(3000);
  digitalWrite(GREEN, LOW);

  // Amber (pre-red)
  digitalWrite(AMBER, HIGH);
  Serial.println("AMBER - Slow down...");
  delay(1000);
  digitalWrite(AMBER, LOW);
}`,
      },
      {
        type: 'run', title: 'Run the Traffic Light!', icon: '▶',
        content: `
<h2>Watch the Lights Change! 🚦</h2>
<p>Click <strong>▶ Run</strong> and watch pins 9, 10, 11 in the simulator light up in sequence!</p>
<div class="info-box tip">
  👀 <strong>Watch pins 9, 10, 11</strong> in the Digital Pins row. They should light up in the traffic light sequence. The Serial Monitor also tells you which phase is active.
</div>
<p>The delays are long (1–3 seconds) but the simulator shows each state clearly. This is the same pattern used in real traffic control systems!</p>`,
        code: `const int RED   = 11;
const int AMBER = 10;
const int GREEN = 9;

void setup() {
  pinMode(RED,   OUTPUT);
  pinMode(AMBER, OUTPUT);
  pinMode(GREEN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Traffic light ready!");
}

void loop() {
  digitalWrite(RED, HIGH);
  Serial.println("RED - Stop!");
  delay(1000);
  digitalWrite(RED, LOW);

  digitalWrite(AMBER, HIGH);
  Serial.println("AMBER - Get ready...");
  delay(500);
  digitalWrite(AMBER, LOW);

  digitalWrite(GREEN, HIGH);
  Serial.println("GREEN - Go!");
  delay(1000);
  digitalWrite(GREEN, LOW);

  digitalWrite(AMBER, HIGH);
  Serial.println("AMBER - Slow down...");
  delay(500);
  digitalWrite(AMBER, LOW);
}`,
      },
      {
        type: 'modify', title: 'Add a Pedestrian Button', icon: '✏️',
        content: `
<h2>Make It Interactive!</h2>
<p>Real traffic lights have a <strong>pedestrian button</strong>. When pressed, it speeds up to red so pedestrians can cross!</p>
<p>Add a button on pin 2 (<code>INPUT_PULLUP</code>). When pressed during the green phase, cut the green time short and go straight to red.</p>
<div class="info-box tip">
  🖱️ Run the sketch, then hold the <strong>Pin 2 button</strong> in the simulator to trigger the pedestrian crossing!
</div>
<p>Try modifying the code on the right — add <code>pinMode(2, INPUT_PULLUP)</code> in setup, then check <code>digitalRead(2)</code> during the green phase.</p>`,
        code: `const int RED   = 11;
const int AMBER = 10;
const int GREEN = 9;

void setup() {
  pinMode(RED,   OUTPUT);
  pinMode(AMBER, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(2, INPUT_PULLUP);  // Pedestrian button
  Serial.begin(9600);
}

void loop() {
  // Red phase
  digitalWrite(RED, HIGH);
  Serial.println("RED - Stop");
  delay(1000);
  digitalWrite(RED, LOW);

  // Amber
  digitalWrite(AMBER, HIGH);
  delay(500);
  digitalWrite(AMBER, LOW);

  // Green — check for pedestrian button press
  digitalWrite(GREEN, HIGH);
  Serial.println("GREEN - Go");
  for (int i = 0; i < 10; i++) {
    delay(200);
    if (digitalRead(2) == LOW) {
      Serial.println("Pedestrian crossing!");
      break;  // Cut green short!
    }
  }
  digitalWrite(GREEN, LOW);

  // Amber
  digitalWrite(AMBER, HIGH);
  delay(500);
  digitalWrite(AMBER, LOW);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Build the Traffic Light', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Build a traffic light controller that:</p>
<ol>
  <li>Uses <strong>3 different pins</strong> for red, amber, and green LEDs</li>
  <li>Cycles through: red → amber → green → amber → (repeat)</li>
  <li>Prints each phase name to <code>Serial</code></li>
  <li>Uses <code>delay()</code> between each phase</li>
</ol>
<div class="info-box">
  Checker looks for: at least 3 different <code>digitalWrite</code> pin numbers, <code>Serial.println</code>, and at least 3 <code>delay()</code> calls.
</div>`,
        code: `// Define your LED pins
const int RED   = 11;
const int AMBER = 10;
const int GREEN = 9;

void setup() {
  // Set up your pins and Serial
}

void loop() {
  // Implement the traffic light sequence!
}`,
        validate: (code, _sim) => {
          const pins = new Set((code.match(/digitalWrite\s*\(\s*(\d+)/g) || [])
            .map(m => m.match(/\d+/)[0]));
          const delays = (code.match(/\bdelay\s*\(/g) || []).length;
          return pins.size >= 2 && delays >= 3 && /Serial\.println/.test(code);
        },
        hint: 'In setup: pinMode(11,OUTPUT); pinMode(10,OUTPUT); pinMode(9,OUTPUT);  In loop: turn RED on, delay, off; AMBER on, delay, off; GREEN on, delay, off; AMBER on, delay, off.',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'In a traffic light sketch, why do we use named constants like "const int RED = 11" instead of just writing 11 everywhere?',
        opts: [
          'Constants make the code run faster',
          'It uses less memory on the Arduino',
          'Makes code readable and easy to change pin numbers in one place',
          'You must use constants for OUTPUT pins',
        ],
        correct: 2,
        explain: 'Named constants make code self-documenting ("RED" is clearer than "11") and easy to maintain. If you rewire to pin 12, you only change one line!',
      },
    ],
  },

  // ── 14. Buzzer & Tone ───────────────────────────────────
  {
    id: 'buzzer', title: 'Buzzer & Sound with tone()', icon: '🎵',
    difficulty: 'beginner', xp: 55,
    desc: 'Make sounds and melodies using the tone() function with a piezo buzzer.',
    steps: [
      {
        type: 'learn', title: 'Making Sound with Arduino', icon: '🎵',
        content: `
<h2>Arduino Can Make Noise!</h2>
<p>A <strong>piezo buzzer</strong> is a tiny speaker that vibrates when you send it electrical pulses. Arduino's built-in <code>tone()</code> function makes this super easy!</p>
<div class="info-box">
  <code>tone(pin, frequency)</code> — play a note on a pin<br>
  <code>tone(pin, frequency, duration)</code> — play for a set time<br>
  <code>noTone(pin)</code> — stop the sound
</div>
<p><strong>Frequency</strong> determines the pitch:</p>
<ul>
  <li>261 Hz → Middle C</li>
  <li>330 Hz → E</li>
  <li>392 Hz → G</li>
  <li>523 Hz → High C</li>
  <li>Higher number = higher pitch</li>
</ul>
<div class="info-box tip">
  🔊 In the simulator, <code>tone()</code> calls show up in the Serial Monitor so you can see what note would play on real hardware!
</div>`,
      },
      {
        type: 'run', title: 'Play Your First Note', icon: '▶',
        content: `
<h2>Beep! Boop! 🎵</h2>
<p>Click <strong>▶ Run</strong> to "play" some tones. The simulator shows each tone call in the Serial Monitor.</p>
<div class="info-box tip">
  💡 On a real Arduino with a piezo buzzer connected to pin 8, you'd actually hear these notes playing!
</div>
<p>Notice how we use <code>delay()</code> to control how long each note sounds, then <code>noTone()</code> to silence it before the next note.</p>`,
        code: `void setup() {
  Serial.begin(9600);
  Serial.println("Playing tones...");
}

void loop() {
  tone(8, 262, 300);   // C  - 262 Hz for 300ms
  delay(350);
  tone(8, 330, 300);   // E  - 330 Hz
  delay(350);
  tone(8, 392, 300);   // G  - 392 Hz
  delay(350);
  tone(8, 523, 600);   // C5 - 523 Hz (longer)
  delay(700);
  noTone(8);
  delay(1000);         // Rest between loops
}`,
      },
      {
        type: 'learn', title: 'Playing a Melody', icon: '🎼',
        content: `
<h2>Notes, Durations, and Arrays</h2>
<p>To play a real melody, store the notes and durations in <strong>arrays</strong>:</p>
<pre><code>int melody[] = {262, 294, 330, 262};     // C D E C
int durations[] = {400, 400, 400, 800};  // ms each</code></pre>
<p>Then loop through them with a <code>for</code> loop:</p>
<pre><code>for (int i = 0; i < 4; i++) {
  tone(8, melody[i], durations[i]);
  delay(durations[i] + 50);  // tiny gap between notes
  noTone(8);
}</code></pre>
<div class="info-box tip">
  🎵 The 50ms gap between notes prevents them from blending together — it creates a clear distinction between notes (called an "articulation gap").
</div>
<p>The sketch on the right plays a simple 4-note tune. Try changing the frequencies to make your own melody!</p>`,
        code: `// "Frère Jacques" opening phrase
int melody[]    = {262, 294, 330, 262, 262, 294, 330, 262};
int durations[] = {400, 400, 400, 400, 400, 400, 400, 400};

void setup() {
  Serial.begin(9600);
  Serial.println("Playing melody...");
}

void loop() {
  for (int i = 0; i < 8; i++) {
    Serial.print("Note: ");
    Serial.print(melody[i]);
    Serial.println(" Hz");
    tone(8, melody[i], durations[i]);
    delay(durations[i] + 50);
    noTone(8);
  }
  delay(1500);  // Pause between repeats
}`,
      },
      {
        type: 'modify', title: 'Button-Triggered Beep', icon: '✏️',
        content: `
<h2>Press Button → Play Sound!</h2>
<p>Combine buttons and sound: press the button on pin 2 to trigger a beep.</p>
<div class="info-box tip">
  🖱️ Run the sketch, then <strong>hold the Pin 2 button</strong> in the simulator to trigger the tone. Watch the Serial Monitor confirm it!
</div>
<p>Try modifying the frequency or the melody pattern. What note sounds like an alarm? What sounds like a game pickup?</p>`,
        code: `void setup() {
  pinMode(2, INPUT_PULLUP);  // Button on pin 2
  Serial.begin(9600);
  Serial.println("Press button to beep!");
}

void loop() {
  if (digitalRead(2) == LOW) {
    // Button pressed - play a beep!
    Serial.println("Beep!");
    tone(8, 1000, 200);  // 1000 Hz for 200ms
    delay(250);
  }
}`,
      },
      {
        type: 'challenge', title: 'Challenge: SOS Alarm!', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Create an SOS alarm that plays the Morse code pattern: <strong>3 short, 3 long, 3 short</strong> beeps.</p>
<ul>
  <li>Short beep: <code>tone(8, 800, 150)</code> + <code>delay(200)</code></li>
  <li>Long beep: <code>tone(8, 800, 400)</code> + <code>delay(500)</code></li>
  <li>Pause between S and O: <code>delay(300)</code></li>
  <li>Pause between SOS repeats: <code>delay(1500)</code></li>
</ul>
<div class="info-box">
  Checker looks for: <code>tone(</code> called at least 9 times (or in a loop), and <code>delay(</code> called at multiple different values.
</div>`,
        code: `void setup() {
  Serial.begin(9600);
  Serial.println("SOS Alarm!");
}

void loop() {
  // S = 3 short beeps
  // O = 3 long beeps
  // S = 3 short beeps
  // Then pause before repeating
}`,
        validate: (code, _sim) => {
          const tones = (code.match(/\btone\s*\(/g) || []).length;
          const delays = (code.match(/\bdelay\s*\(/g) || []).length;
          // Either 9+ tone() calls, or uses a loop (for/while) with tone
          const hasLoop = /\b(for|while)\s*\(/.test(code);
          return (tones >= 6 || (hasLoop && tones >= 2)) && delays >= 4;
        },
        hint: 'Copy "tone(8,800,150); delay(200);" 3 times for S. Then "tone(8,800,400); delay(500);" 3 times for O. Then 3 more short. Add delay(1500) at the end.',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What does the frequency parameter in tone(pin, frequency) control?',
        opts: [
          'How loud the sound is',
          'How long the sound plays',
          'The pitch (musical note) of the sound',
          'Which pin the buzzer is connected to',
        ],
        correct: 2,
        explain: 'Frequency controls pitch — 262 Hz sounds like middle C, 523 Hz is an octave higher. Higher frequency = higher-pitched sound. Volume is controlled by the hardware (resistors), and duration is controlled by delay() or the optional 3rd parameter.',
      },
    ],
  },

  // ── 15. switch/case ─────────────────────────────────────
  {
    id: 'switch-case', title: 'switch/case Control Flow', icon: '🔀',
    difficulty: 'intermediate', xp: 65,
    desc: 'Use switch/case statements to handle multiple conditions cleanly.',
    steps: [
      {
        type: 'learn', title: 'The Problem with Many if/else', icon: '🔀',
        content: `
<h2>When if/else Gets Messy</h2>
<p>Imagine checking a menu value that could be 1, 2, 3, 4, or 5. With if/else:</p>
<pre><code>if (choice == 1) { ... }
else if (choice == 2) { ... }
else if (choice == 3) { ... }
else if (choice == 4) { ... }
else if (choice == 5) { ... }
else { ... }</code></pre>
<p>That works, but it's repetitive. <strong>switch/case</strong> is cleaner for this pattern:</p>
<pre><code>switch (choice) {
  case 1: /* do thing 1 */ break;
  case 2: /* do thing 2 */ break;
  case 3: /* do thing 3 */ break;
  default: /* anything else */ break;
}</code></pre>
<div class="info-box tip">
  ⚠️ Always add <code>break;</code> at the end of each case! Without it, execution "falls through" to the next case — usually a bug.
</div>`,
      },
      {
        type: 'learn', title: 'switch/case Syntax', icon: '📖',
        content: `
<h2>How switch/case Works</h2>
<p>Arduino evaluates the <em>expression</em> in <code>switch()</code> and jumps to the matching <code>case</code>:</p>
<div class="info-box">
<pre><code>switch (expression) {
  case value1:
    // code if expression == value1
    break;
  case value2:
    // code if expression == value2
    break;
  default:
    // code if NO case matches
    break;
}</code></pre>
</div>
<p>Key rules:</p>
<ul>
  <li><code>case</code> values must be <strong>constants</strong> (numbers or characters)</li>
  <li><code>break</code> stops execution and exits the switch</li>
  <li><code>default</code> is optional but good practice</li>
  <li>Multiple cases can share code (fall-through on purpose)</li>
</ul>
<div class="info-box tip">
  💡 switch/case is faster than if/else chains for many conditions, and is much more readable!
</div>`,
        code: `// Example: LED brightness levels using switch/case
int level = 2;  // Try changing this to 1, 2, 3, or 4!

void setup() {
  pinMode(9, OUTPUT);
  Serial.begin(9600);

  switch (level) {
    case 1:
      analogWrite(9, 64);
      Serial.println("Level 1: 25% brightness");
      break;
    case 2:
      analogWrite(9, 128);
      Serial.println("Level 2: 50% brightness");
      break;
    case 3:
      analogWrite(9, 192);
      Serial.println("Level 3: 75% brightness");
      break;
    case 4:
      analogWrite(9, 255);
      Serial.println("Level 4: 100% brightness");
      break;
    default:
      analogWrite(9, 0);
      Serial.println("Unknown level — LED off");
      break;
  }
}

void loop() {}`,
      },
      {
        type: 'run', title: 'Mode Selector', icon: '▶',
        content: `
<h2>Switch Between Modes!</h2>
<p>Click <strong>▶ Run</strong> to see a mode-selector sketch. The variable <code>mode</code> determines what the LED does.</p>
<p>Try changing the <code>mode</code> variable to 1, 2, or 3 and re-running to see different behaviors!</p>
<div class="info-box tip">
  💡 This pattern is used in almost every real-world device — a washing machine's cycle selector, a game's difficulty setting, a device's operating mode.
</div>`,
        code: `int mode = 2;  // Change to 1, 2, or 3 and re-run!

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.print("Running mode: ");
  Serial.println(mode);
}

void loop() {
  switch (mode) {
    case 1:
      // Fast blink
      digitalWrite(13, HIGH); delay(100);
      digitalWrite(13, LOW);  delay(100);
      break;

    case 2:
      // Slow pulse
      digitalWrite(13, HIGH); delay(800);
      digitalWrite(13, LOW);  delay(800);
      break;

    case 3:
      // SOS pattern
      for (int i = 0; i < 3; i++) {
        digitalWrite(13, HIGH); delay(150);
        digitalWrite(13, LOW);  delay(150);
      }
      delay(500);
      break;

    default:
      // Mode unknown — LED off
      digitalWrite(13, LOW);
      Serial.println("Unknown mode!");
      delay(1000);
      break;
  }
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Selector Switch', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Write a sketch that uses <code>switch/case</code> to select between at least 3 different LED behaviors based on a variable called <code>mode</code>:</p>
<ol>
  <li>Declare <code>int mode = 1;</code> (or any value 1–3)</li>
  <li>Use <code>switch(mode)</code> with at least 3 cases</li>
  <li>Each case does something different with an LED</li>
  <li>Include a <code>default</code> case</li>
  <li>Print the current mode to <code>Serial</code></li>
</ol>
<div class="info-box">
  Checker looks for: <code>switch</code>, at least 3 <code>case</code>s, <code>default</code>, <code>break</code>, and <code>Serial.println</code>.
</div>`,
        code: `int mode = 1;  // Try 1, 2, or 3

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  // Print the mode here
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
        hint: 'switch(mode) { case 1: digitalWrite(13,HIGH); delay(200); digitalWrite(13,LOW); delay(200); break; case 2: ... case 3: ... default: Serial.println("?"); break; }',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What happens if you forget to write "break;" at the end of a case in a switch statement?',
        opts: [
          'The sketch will not compile',
          'Only that case is skipped',
          'Execution falls through and runs the next case\'s code too',
          'The Arduino resets automatically',
        ],
        correct: 2,
        explain: '"Fall-through" means execution continues into the next case without stopping. This is sometimes intentional (to share code between cases) but is usually a bug. Always add break; unless you specifically want fall-through!',
      },
    ],
  },

  // ── 16. RGB LED ─────────────────────────────────────────
  {
    id: 'rgb-led', title: 'RGB LED — Full Color Control', icon: '🌈',
    difficulty: 'intermediate', xp: 75,
    desc: 'Mix red, green, and blue channels with PWM to create any color.',
    steps: [
      {
        type: 'learn', title: 'What is an RGB LED?', icon: '🌈',
        content: `
<h2>One LED, Millions of Colors!</h2>
<p>An <strong>RGB LED</strong> is actually <em>three LEDs in one package</em>: Red, Green, and Blue. By controlling the brightness of each channel with PWM, you can mix any color!</p>
<div class="info-box">
  🔴 Red   → connect to PWM pin (e.g., pin 11)<br>
  🟢 Green → connect to PWM pin (e.g., pin 10)<br>
  🔵 Blue  → connect to PWM pin (e.g., pin 9)
</div>
<p>Color mixing with light (additive color):</p>
<ul>
  <li>Red + Green = Yellow 🟡</li>
  <li>Red + Blue = Magenta 🟣</li>
  <li>Green + Blue = Cyan 🩵</li>
  <li>Red + Green + Blue = White ⚪</li>
  <li>None = Off / Black ⚫</li>
</ul>
<div class="info-box tip">
  💡 Each channel gets a value 0–255 (from analogWrite). 0 = fully off, 255 = full brightness.
</div>`,
      },
      {
        type: 'learn', title: 'Setting Colors with PWM', icon: '🎨',
        content: `
<h2>analogWrite() for Each Channel</h2>
<p>We use <code>analogWrite()</code> to control the brightness of each channel:</p>
<pre><code>// Set RGB LED to any color
void setColor(int red, int green, int blue) {
  analogWrite(11, red);    // Red channel
  analogWrite(10, green);  // Green channel
  analogWrite(9,  blue);   // Blue channel
}</code></pre>
<p>Then call it with RGB values (0–255 each):</p>
<div class="info-box">
<pre><code>setColor(255, 0,   0);    // Pure Red
setColor(0,   255, 0);    // Pure Green
setColor(0,   0,   255);  // Pure Blue
setColor(255, 165, 0);    // Orange!
setColor(128, 0,   128);  // Purple</code></pre>
</div>
<div class="info-box tip">
  🌐 These are exactly the same values as CSS colors on web pages! <code>rgb(255, 165, 0)</code> is orange on a webpage and an orange LED!
</div>`,
        code: `// Helper function to set RGB color
void setColor(int r, int g, int b) {
  analogWrite(11, r);
  analogWrite(10, g);
  analogWrite(9,  b);
}

void setup() {
  pinMode(11, OUTPUT);  // Red
  pinMode(10, OUTPUT);  // Green
  pinMode(9,  OUTPUT);  // Blue
  Serial.begin(9600);
}

void loop() {
  Serial.println("Red");
  setColor(255, 0, 0);
  delay(800);

  Serial.println("Green");
  setColor(0, 255, 0);
  delay(800);

  Serial.println("Blue");
  setColor(0, 0, 255);
  delay(800);

  Serial.println("Yellow");
  setColor(255, 200, 0);
  delay(800);

  Serial.println("Purple");
  setColor(128, 0, 128);
  delay(800);

  Serial.println("White");
  setColor(255, 255, 255);
  delay(800);
}`,
      },
      {
        type: 'run', title: 'Color Cycle in Action!', icon: '▶',
        content: `
<h2>Watch the Colors Change! 🌈</h2>
<p>Click <strong>▶ Run</strong> to see colors cycle through. Watch the pin LEDs for pins 9, 10, and 11 change brightness!</p>
<div class="info-box tip">
  👀 The simulator shows PWM values as glowing green dots on each pin. When all three glow together (white mode), you'll see all three pins lit at once.
</div>
<p>The sketch auto-fades through a rainbow — this is the same technique used in colorful LED strips, smart bulbs, and RGB gaming keyboards!</p>`,
        code: `void setColor(int r, int g, int b) {
  analogWrite(11, r);
  analogWrite(10, g);
  analogWrite(9,  b);
}

void setup() {
  pinMode(11, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(9,  OUTPUT);
  Serial.begin(9600);
  Serial.println("Rainbow cycle...");
}

void loop() {
  // Fade red → yellow → green → cyan → blue → magenta → red
  for (int i = 0; i < 256; i++) { setColor(255, i, 0);       delay(4); } // R→Y
  for (int i = 0; i < 256; i++) { setColor(255-i, 255, 0);   delay(4); } // Y→G
  for (int i = 0; i < 256; i++) { setColor(0, 255, i);       delay(4); } // G→C
  for (int i = 0; i < 256; i++) { setColor(0, 255-i, 255);   delay(4); } // C→B
  for (int i = 0; i < 256; i++) { setColor(i, 0, 255);       delay(4); } // B→M
  for (int i = 0; i < 256; i++) { setColor(255, 0, 255-i);   delay(4); } // M→R
}`,
      },
      {
        type: 'modify', title: 'Potentiometer Color Mixer', icon: '✏️',
        content: `
<h2>Mix Colors with Sliders!</h2>
<p>Use the <strong>analog sliders (A0, A1, A2)</strong> in the simulator to mix your own colors in real-time!</p>
<div class="info-box tip">
  🎛️ Drag the <strong>A0, A1, A2 sliders</strong> while the sketch runs to mix red, green, and blue. The Serial Monitor shows the current RGB values.
</div>
<p>The sketch reads A0 for red, A1 for green, A2 for blue. Since <code>analogRead</code> returns 0–1023 and <code>analogWrite</code> needs 0–255, we use <code>map()</code> to convert.</p>`,
        code: `void setup() {
  pinMode(11, OUTPUT);  // Red
  pinMode(10, OUTPUT);  // Green
  pinMode(9,  OUTPUT);  // Blue
  Serial.begin(9600);
  Serial.println("Drag A0/A1/A2 sliders to mix color!");
}

void loop() {
  // Read 0-1023 from sliders, map to 0-255 for PWM
  int r = map(analogRead(A0), 0, 1023, 0, 255);
  int g = map(analogRead(A1), 0, 1023, 0, 255);
  int b = map(analogRead(A2), 0, 1023, 0, 255);

  analogWrite(11, r);
  analogWrite(10, g);
  analogWrite(9,  b);

  Serial.print("RGB(");
  Serial.print(r); Serial.print(", ");
  Serial.print(g); Serial.print(", ");
  Serial.print(b); Serial.println(")");

  delay(200);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: RGB Controller', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Create an RGB LED controller that:</p>
<ol>
  <li>Sets pins 9, 10, 11 as <code>OUTPUT</code></li>
  <li>Uses <code>analogWrite()</code> on all three pins with <strong>different values</strong></li>
  <li>Creates at least 3 distinct colors in sequence</li>
  <li>Prints each color name to <code>Serial.println</code></li>
  <li>Uses <code>delay()</code> between colors</li>
</ol>
<div class="info-box">
  Checker looks for: <code>analogWrite</code> on 3+ different pins, <code>Serial.println</code>, and 3+ <code>delay()</code> calls.
</div>`,
        code: `void setup() {
  // Set up your LED pins
  Serial.begin(9600);
}

void loop() {
  // Show at least 3 different colors using analogWrite()
  // Print each color name to Serial
}`,
        validate: (code, _sim) => {
          const awPins = new Set((code.match(/analogWrite\s*\(\s*(\d+)/g) || [])
            .map(m => m.match(/\d+/)[0]));
          const delays = (code.match(/\bdelay\s*\(/g) || []).length;
          return awPins.size >= 2 && delays >= 3 && /Serial\.println/.test(code) && /analogWrite/.test(code);
        },
        hint: 'In loop: analogWrite(11, 255); analogWrite(10, 0); analogWrite(9, 0); Serial.println("Red"); delay(800);  Then repeat for Green and Blue with different values.',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What RGB values would you use to create the color YELLOW?',
        opts: [
          'Red=255, Green=255, Blue=0',
          'Red=0, Green=255, Blue=255',
          'Red=255, Green=0, Blue=255',
          'Red=128, Green=128, Blue=128',
        ],
        correct: 0,
        explain: 'Yellow is made by mixing full Red and full Green with no Blue — just like mixing paint! Red(255) + Green(255) + Blue(0) = Yellow. This is additive color mixing, which works with light (not paint).',
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
