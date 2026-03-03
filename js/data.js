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
  { id: 'first_lesson',    icon: '🚀', name: 'First Steps',       desc: 'Complete your very first lesson.',                    cond: s => s.completedLessons.length >= 1   },
  { id: 'blink_master',    icon: '💡', name: 'Blink Master',      desc: 'Complete the Blink lesson.',                          cond: s => s.completedLessons.includes('blink')  },
  { id: 'quiz_ace',        icon: '🎯', name: 'Quiz Ace',          desc: 'Answer a quiz question correctly.',                   cond: s => Object.values(s.quizScores).some(v => v >= 100)  },
  { id: 'five_lessons',    icon: '🔥', name: 'On Fire',           desc: 'Complete 5 lessons.',                                 cond: s => s.completedLessons.length >= 5   },
  { id: 'ten_lessons',     icon: '🎖️', name: 'Committed',        desc: 'Complete 10 lessons.',                                cond: s => s.completedLessons.length >= 10  },
  { id: 'halfway',         icon: '🏅', name: 'Halfway There',     desc: 'Complete 24 lessons (half the course).',              cond: s => s.completedLessons.length >= 24  },
  { id: 'all_lessons',     icon: '🎓', name: 'Graduate',          desc: 'Complete all 48 lessons.',                            cond: s => s.completedLessons.length >= 48  },
  { id: 'hardware_fan',    icon: '🔌', name: 'Hardware Fan',      desc: 'Complete 5 real-hardware lessons.',                   cond: s => ['ultrasonic_sensor','dc_motor_hbridge','stepper_motor','imu_sensor','ir_remote','servo_potentiometer','rotary_encoder','ir_sensor','pir_motion','microphone_sensor','joystick','lcd_i2c','continuous_servo','dht11_sensor','relay_module','shift_register','keypad_matrix'].filter(id => s.completedLessons.includes(id)).length >= 5  },
  { id: 'hardware_master', icon: '🤖', name: 'Hardware Master',   desc: 'Complete all 17 real-hardware lessons.',              cond: s => ['ultrasonic_sensor','dc_motor_hbridge','stepper_motor','imu_sensor','ir_remote','servo_potentiometer','rotary_encoder','ir_sensor','pir_motion','microphone_sensor','joystick','lcd_i2c','continuous_servo','dht11_sensor','relay_module','shift_register','keypad_matrix'].every(id => s.completedLessons.includes(id))  },
  { id: 'serial_user',     icon: '📡', name: 'Talker',            desc: 'Use Serial.println() in your code.',                  cond: s => s.serialUsed  },
  { id: 'pwm_user',        icon: '🌈', name: 'Fader',             desc: 'Use analogWrite() for PWM.',                          cond: s => s.pwmUsed     },
  { id: 'first_challenge', icon: '💪', name: 'Challenger',        desc: 'Pass your first challenge.',                          cond: s => s.challengesPassed >= 1  },
  { id: 'five_challenges', icon: '🏋️', name: 'Iron Coder',       desc: 'Pass 5 challenges.',                                  cond: s => s.challengesPassed >= 5  },
  { id: 'ten_challenges',  icon: '🦾', name: 'Challenge Beast',   desc: 'Pass 10 challenges.',                                 cond: s => s.challengesPassed >= 10 },
  { id: 'first_try',       icon: '⚡', name: 'First Try!',        desc: 'Pass a challenge on the first attempt.',              cond: s => s.firstTryPasses >= 1    },
  { id: 'xp_500',          icon: '⭐', name: 'XP Grinder',        desc: 'Earn 500 total XP.',                                  cond: s => s.xp >= 500   },
  { id: 'xp_1000',         icon: '🌟', name: 'XP Master',         desc: 'Earn 1000 total XP.',                                 cond: s => s.xp >= 1000  },
  { id: 'xp_2000',         icon: '💎', name: 'XP Legend',         desc: 'Earn 2000 total XP.',                                 cond: s => s.xp >= 2000  },
];

// ── Lessons ───────────────────────────────────────────────
const LESSONS = [

  // ── 1. Introduction ─────────────────────────────────────
  /* COMPLETELY REWRITTEN FOR ZERO-EXPERIENCE BEGINNERS */
  {
    id: 'intro', title: 'Introduction to Arduino', icon: '🤖',
    difficulty: 'beginner', xp: 30,
    desc: 'Learn what Arduino is and write your very first sketch.',
    steps: [
      {
        type: 'learn', title: 'Welcome! What is Arduino?', icon: '🤖',
        content: `
<h2>Welcome to ArduinoLearn! 🎉</h2>
<p>You don't need any experience to start here. We'll go step by step, and everything will be explained clearly.</p>
<p>So — what is an <strong>Arduino</strong>?</p>
<p>An Arduino is a tiny, cheap computer about the size of a credit card. Unlike a laptop that runs apps and games, an Arduino controls <strong>real-world electronics</strong>:</p>
<div class="info-box">
  💡 Turn lights on and off<br>
  🔊 Make sounds and music<br>
  🤖 Move robot arms<br>
  🌡️ Read temperature sensors<br>
  🚗 Control motors in toy cars
</div>
<p>The most popular model is the <strong>Arduino Uno</strong>. It has pins along the edges that you can connect wires to — those pins let it talk to the outside world.</p>
<p>The programs you write for an Arduino are called <strong>sketches</strong>. You write them on your computer, then send them to the Arduino over USB.</p>
<p>Don't worry — our simulator (on the right side of this screen) lets you test everything without real hardware!</p>`,
      },
      {
        type: 'learn', title: 'The Arduino\'s Pins', icon: '📍',
        content: `
<h2>What Are Pins?</h2>
<p>Look at the sides of an Arduino Uno — there are rows of metal holes called <strong>pins</strong>. You plug wires into these to connect electronics.</p>
<p>There are two kinds of pins you'll use a lot:</p>
<div class="info-box">
  <strong>Digital Pins (0–13)</strong><br>
  These are like light switches — either fully ON or fully OFF.<br>
  Great for LEDs, buttons, buzzers.
</div>
<div class="info-box tip" style="margin-top:10px">
  <strong>Analog Pins (A0–A5)</strong><br>
  These can read a whole range of values, not just on/off.<br>
  Great for sensors, potentiometers (knobs), microphones.
</div>
<p>You'll also see <strong>GND</strong> (ground — the negative side of your circuit) and <strong>5V</strong> (power output) pins.</p>
<p>In the simulator on the right, you'll see a circle labeled "Pin 13 — LED_BUILTIN". Pin 13 is special — it has a tiny built-in LED on the board itself. We'll use it a lot!</p>`,
      },
      {
        type: 'learn', title: 'Your First Sketch Structure', icon: '📝',
        content: `
<h2>setup() and loop() — Every Sketch Has These</h2>
<p>Every single Arduino program (called a sketch) must have exactly <strong>two special blocks</strong>:</p>
<div class="info-box">
  <strong>void setup() { }</strong><br>
  Runs exactly <em>once</em>, the moment the Arduino turns on.<br>
  Use it to get things ready — like setting up which pins to use.
</div>
<div class="info-box tip" style="margin-top:10px">
  <strong>void loop() { }</strong><br>
  Runs <em>over and over forever</em>, as fast as possible.<br>
  This is where your main program lives!
</div>
<p>Think of it like working at a coffee shop:</p>
<ul>
  <li><code>setup()</code> → "Arrive at work, turn on the machines, set up the counter" (done once)</li>
  <li><code>loop()</code> → "Take order → Make drink → Serve customer → Take order → ..." (forever!)</li>
</ul>
<p>Let's look at the code on the right. Notice the curly braces <code>{ }</code> — they mark the start and end of each block. Click <strong>Next</strong> when you're ready to run it!</p>`,
        code: `// This is a COMMENT — the computer ignores lines starting with //
// Comments are notes to yourself and other humans

void setup() {
  // This runs ONCE when Arduino powers on
  Serial.begin(9600);          // Start talking to the computer
  Serial.println("Arduino is awake!");  // Print a message
}

void loop() {
  // This runs OVER AND OVER FOREVER
  Serial.println("Hello! I am looping...");
  delay(1000);  // Wait 1 second (1000 milliseconds = 1 second)
}`,
      },
      {
        type: 'run', title: 'Run Your First Sketch!', icon: '▶',
        content: `
<h2>Time to Run It! 🚀</h2>
<p>Click <strong>▶ Run</strong> (the green button above the code) and watch the <strong>Serial Monitor</strong> panel below the simulator.</p>
<div class="info-box">
  <strong>What you should see:</strong><br>
  • "Arduino is awake!" — appears just <em>once</em> (that's setup())<br>
  • "Hello from loop()!" — appears <em>again and again</em> every second (that's loop())
</div>
<p>See how setup() only fired once, but loop() keeps repeating? That's the heartbeat of every Arduino program.</p>
<div class="info-box tip">
  💡 The <strong>Serial Monitor</strong> is like a text message window between your computer and the Arduino. The function <code>Serial.println()</code> sends a line of text to it.
</div>
<p>🎉 Congratulations — you just ran your first Arduino sketch!</p>`,
        code: `void setup() {
  Serial.begin(9600);
  Serial.println("Arduino is awake!");
}

void loop() {
  Serial.println("Hello from loop()!");
  delay(1000);  // Wait 1 second, then repeat
}`,
      },
      {
        type: 'learn', title: 'Reading the Code', icon: '🔍',
        content: `
<h2>Let's Decode What You Just Ran</h2>
<p>Let's go through each line of that sketch — every single part has a purpose!</p>
<div class="info-box">
  <code>void setup() {</code><br>
  → Starts the setup block. <code>void</code> means it gives nothing back. The <code>{</code> opens the block.
</div>
<div class="info-box" style="margin-top:8px">
  <code>Serial.begin(9600);</code><br>
  → Turns on the "text line" between Arduino and your computer. 9600 is the speed (you'll always use this number). The <code>;</code> ends every statement — like a period at the end of a sentence.
</div>
<div class="info-box" style="margin-top:8px">
  <code>Serial.println("Arduino is awake!");</code><br>
  → Sends the text inside the quotes to the Serial Monitor. <code>println</code> means "print line" — it adds a new line after the text.
</div>
<div class="info-box" style="margin-top:8px">
  <code>}</code> → Closes the setup block.<br><br>
  <code>void loop() {</code> → Starts the loop block (runs forever).<br><br>
  <code>delay(1000);</code> → Pauses for 1000 milliseconds = 1 second.<br><br>
  <code>}</code> → Closes the loop block. Then it repeats from the top!
</div>
<p>Every semicolon <code>;</code>, every curly brace <code>{ }</code> matters. The computer is very precise — missing one will cause an error. Don't worry though, it will tell you where the problem is!</p>`,
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
        explain: "loop() runs repeatedly forever — it's the heartbeat of your Arduino program! setup() is the one that runs only once at the start.",
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
        type: 'learn', title: 'What is an LED?', icon: '💡',
        content: `
<h2>LED — The Simplest Output Device</h2>
<p>An <strong>LED</strong> (Light Emitting Diode) is a tiny light that turns on when electricity flows through it. You see LEDs everywhere — in TV remotes, traffic lights, phone screens.</p>
<p>The great news: the Arduino Uno has a <strong>built-in LED</strong> right on the board, connected to <strong>Pin 13</strong>. No wiring needed for this lesson!</p>
<div class="info-box">
  📍 <strong>Pin 13</strong> = the built-in LED on every Arduino Uno<br>
  You can also write <code>LED_BUILTIN</code> instead of <code>13</code> — they mean the same thing!
</div>
<p>In the simulator on the right, look for the big circle labeled <strong>"Pin 13 — LED_BUILTIN"</strong>. That's the LED we'll be controlling. When it glows yellow — it's on!</p>
<p>Digital pins are like light switches. They have exactly two states:</p>
<ul>
  <li><strong>HIGH</strong> = 5 volts flowing = LED turns <em>ON</em> 💡</li>
  <li><strong>LOW</strong> = 0 volts = LED turns <em>OFF</em> ⬛</li>
</ul>`,
      },
      {
        type: 'learn', title: 'Setting Up a Pin', icon: '⚙️',
        content: `
<h2>Step 1: Tell Arduino What the Pin Will Do</h2>
<p>Before you can use a pin, you must tell the Arduino whether it will be <strong>sending</strong> signals or <strong>receiving</strong> them. This is called setting the <strong>pin mode</strong>.</p>
<p>You do this in <code>setup()</code> using the <code>pinMode()</code> function:</p>
<div class="info-box">
  <code>pinMode(13, OUTPUT);</code><br><br>
  Breaking this down:<br>
  • <code>pinMode</code> = the function name<br>
  • <code>13</code> = which pin we're talking about<br>
  • <code>OUTPUT</code> = this pin will SEND signals (like turning on an LED)<br>
  • <code>;</code> = semicolon — ends every instruction (like a period ends a sentence!)
</div>
<p>If you forget <code>pinMode()</code>, the pin might behave unpredictably. Always set it up first!</p>
<p>The opposite of OUTPUT is <code>INPUT</code> — for when we want to receive signals (like from a button). We'll learn that later.</p>`,
      },
      {
        type: 'learn', title: 'Turning the LED On and Off', icon: '⚡',
        content: `
<h2>Step 2: Control the Pin with digitalWrite()</h2>
<p>Once a pin is set as OUTPUT, you control it with <code>digitalWrite()</code>:</p>
<div class="info-box tip">
  <code>digitalWrite(13, HIGH);</code> → turns pin 13 ON (LED glows!) 💡<br>
  <code>digitalWrite(13, LOW);</code> → turns pin 13 OFF (LED dark) ⬛
</div>
<p>And to create a pause between on and off:</p>
<div class="info-box">
  <code>delay(1000);</code> → pauses for 1000 milliseconds = <strong>1 second</strong><br><br>
  1000 ms = 1 second<br>
  500 ms = half a second<br>
  100 ms = one tenth of a second (very fast!)
</div>
<p>Put it all together to make the LED blink:</p>
<pre><code>digitalWrite(13, HIGH);  // Turn LED on
delay(1000);             // Wait 1 second
digitalWrite(13, LOW);   // Turn LED off
delay(1000);             // Wait 1 second
// Then loop() repeats this forever!</code></pre>
<p>That's the famous <strong>Blink sketch</strong> — the very first program almost every Arduino programmer ever writes. Let's run it!</p>`,
        code: `void setup() {
  // Set pin 13 as an OUTPUT (it will SEND signals)
  pinMode(13, OUTPUT);
}

void loop() {
  // Turn the LED ON
  digitalWrite(13, HIGH);
  delay(1000);            // Wait 1 second

  // Turn the LED OFF
  digitalWrite(13, LOW);
  delay(1000);            // Wait 1 second

  // loop() repeats, so this blinks forever!
}`,
      },
      {
        type: 'run', title: 'Make It Blink! 💡', icon: '▶',
        content: `
<h2>Your Turn — Run the Blink Sketch!</h2>
<p>Click <strong>▶ Run</strong> and watch the simulator!</p>
<div class="info-box">
  👀 <strong>What to look for:</strong><br>
  The big circle labeled "Pin 13 — LED_BUILTIN" will:<br>
  • Glow <strong>yellow/bright</strong> when LED is ON<br>
  • Go <strong>dark</strong> when LED is OFF<br>
  • Repeat every second
</div>
<p>This is the most famous Arduino program in history. Every Arduino programmer starts here — and now you have too! 🎉</p>
<p>Watch it blink a few times, then move on to make it faster or slower.</p>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);  // ON
  delay(1000);
  digitalWrite(13, LOW);   // OFF
  delay(1000);
}`,
      },
      {
        type: 'modify', title: 'Change the Speed', icon: '✏️',
        content: `
<h2>Make It Faster or Slower!</h2>
<p>The speed of the blink is controlled by the <code>delay()</code> values. Let's experiment!</p>
<p>The code on the right has <code>delay(500)</code> — that's half a second. Try changing the numbers:</p>
<ul>
  <li><code>delay(100)</code> → very fast flicker (like a strobe!)</li>
  <li><code>delay(2000)</code> → slow, lazy blink (2 seconds on, 2 seconds off)</li>
  <li>Use <em>different</em> values for ON and OFF — e.g., <code>delay(100)</code> on and <code>delay(900)</code> off gives a quick flash with a long gap</li>
</ul>
<div class="info-box tip">
  💡 <strong>Try this pattern:</strong><br>
  ON for <code>100ms</code>, OFF for <code>900ms</code> — looks like a heartbeat monitor!
</div>
<p>Change the numbers, click <strong>▶ Run</strong>, and see what happens. There's no wrong answer here — just explore!</p>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(500);   // ← try changing this number!
  digitalWrite(13, LOW);
  delay(500);   // ← and this one!
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Triple Blink!', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Make the LED blink <strong>3 times quickly</strong>, then pause for <strong>1 second</strong>, then repeat the whole pattern forever.</p>
<div class="info-box">
  The pattern: <em>blink, blink, blink … long pause … blink, blink, blink …</em><br><br>
  • Quick blink: use <code>delay(150)</code><br>
  • Long pause: use <code>delay(1000)</code>
</div>
<p><strong>How to do it:</strong></p>
<ol>
  <li>Write one ON/OFF pair with <code>delay(150)</code></li>
  <li>Copy that pair 2 more times (so 3 pairs total)</li>
  <li>Add a <code>delay(1000)</code> after the 3 pairs</li>
  <li>All of this goes inside <code>loop()</code></li>
</ol>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  // Blink 1
  digitalWrite(13, HIGH);
  delay(150);
  digitalWrite(13, LOW);
  delay(150);

  // Blink 2 — copy the above

  // Blink 3 — copy it again

  // Long pause at the end
  delay(1000);
}`,
        validate: (code, _sim) => {
          const hi = (code.match(/digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/g) || []).length;
          const lo = (code.match(/digitalWrite\s*\(\s*13\s*,\s*LOW\s*\)/g) || []).length;
          const longPause = /delay\s*\(\s*[89]\d{2}|delay\s*\(\s*[1-9]\d{3}/.test(code);
          return hi >= 3 && lo >= 3 && longPause;
        },
        hint: 'You need 3 sets of: digitalWrite(13,HIGH); delay(150); digitalWrite(13,LOW); delay(150);  Then at the very end of loop(), add: delay(1000);',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What does digitalWrite(13, HIGH) do?',
        opts: [
          'Turns pin 13 off (gives it 0 volts)',
          'Sets pin 13 as an output pin',
          'Turns pin 13 on (gives it 5 volts, lighting the LED)',
          'Reads the current value of pin 13',
        ],
        correct: 2,
        explain: 'digitalWrite(pin, HIGH) sets the pin to 5 volts — electricity flows through the LED, making it light up! LOW sets it to 0 volts (off).',
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
        type: 'learn', title: 'What is a Variable?', icon: '📦',
        content: `
<h2>Variables — Labeled Boxes for Your Data</h2>
<p>Imagine you have a box, you put the number 13 inside it, and you write "ledPin" on the outside. That's a <strong>variable</strong>!</p>
<p>A variable is a named storage location that holds a value your program can use and change.</p>
<div class="info-box">
  <code>int ledPin = 13;</code><br><br>
  Breaking this down word by word:<br>
  • <code>int</code> = this box holds a whole number (integer)<br>
  • <code>ledPin</code> = the name of the box<br>
  • <code>=</code> = "put this value inside"<br>
  • <code>13</code> = the value to store<br>
  • <code>;</code> = end of statement
</div>
<p><strong>Why bother?</strong> Instead of writing <code>13</code> in 10 different places in your code, you write <code>ledPin</code>. Later if you want pin 12 instead, you change it in ONE place and it updates everywhere!</p>`,
      },
      {
        type: 'learn', title: 'Types of Variables', icon: '📊',
        content: `
<h2>What Kind of Data are You Storing?</h2>
<p>Arduino needs to know what <em>kind</em> of data a variable will hold. You always write the type first:</p>
<div class="info-box">
  <strong>int</strong> — whole numbers (integers)<br>
  <code>int age = 25;</code> <code>int count = 0;</code> <code>int pin = 13;</code><br><br>
  Range: about -32,000 to +32,000
</div>
<div class="info-box tip" style="margin-top:8px">
  <strong>float</strong> — decimal numbers<br>
  <code>float temperature = 23.5;</code> <code>float pi = 3.14;</code><br><br>
  Use when you need decimal precision
</div>
<div class="info-box" style="margin-top:8px">
  <strong>boolean</strong> — only true or false<br>
  <code>boolean isOn = true;</code> <code>boolean buttonPressed = false;</code>
</div>
<div class="info-box tip" style="margin-top:8px">
  <strong>String</strong> — text (words, sentences)<br>
  <code>String name = "Arduino";</code> <code>String msg = "Hello!";</code>
</div>
<p>The most common type you'll use in early lessons is <code>int</code>!</p>`,
      },
      {
        type: 'learn', title: 'Variables Save Time', icon: '⏱️',
        content: `
<h2>Why Variables Make Everything Easier</h2>
<p>Compare these two versions of the same program:</p>
<div class="info-box warn">
  <strong>Without variables (hard to change):</strong><br>
  <code>pinMode(13, OUTPUT);</code><br>
  <code>digitalWrite(13, HIGH);</code><br>
  <code>delay(500);</code><br>
  <code>digitalWrite(13, LOW);</code><br>
  <code>delay(500);</code><br>
  ← If you want to change pin 13 to pin 9, you have to change it in MULTIPLE places!
</div>
<div class="info-box tip" style="margin-top:8px">
  <strong>With variables (easy to change):</strong><br>
  <code>int ledPin = 13;  // ← change JUST this line</code><br>
  <code>int speed = 500;  // ← or this line for speed</code><br>
  <code>pinMode(ledPin, OUTPUT);</code><br>
  <code>digitalWrite(ledPin, HIGH);</code><br>
  <code>delay(speed);</code><br>
  <code>digitalWrite(ledPin, LOW);</code><br>
  <code>delay(speed);</code>
</div>
<p>Variables also make code <em>readable</em> — <code>onTime</code> and <code>offTime</code> tell you what they mean, while raw numbers like <code>300</code> and <code>700</code> don't explain themselves.</p>`,
      },
      {
        type: 'run', title: 'Variables in Action', icon: '▶',
        content: `
<h2>See Variables Working!</h2>
<p>Click <strong>▶ Run</strong> and watch the Serial Monitor. The sketch uses variables to control blink speed AND count how many times the LED has blinked.</p>
<div class="info-box tip">
  💡 Notice <code>count = count + 1;</code> — this takes the current value of count, adds 1, and stores it back. So count grows from 0 to 1, then 2, then 3... each time the loop runs!
</div>
<p>Try changing <code>onTime</code> from 300 to 100 and clicking Run again — only one number changed, but the whole program speeds up!</p>`,
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
  count = count + 1;        // count goes up by 1 each loop
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
  <li>Declares a variable called <code>blinkSpeed</code> and sets it to <strong>250</strong></li>
  <li>Blinks pin 13 using <code>blinkSpeed</code> as the delay value for <em>both</em> ON and OFF</li>
  <li>Prints <code>"Blinking!"</code> to Serial each time the LED blinks</li>
</ol>
<div class="info-box">
  <strong>Step by step:</strong><br>
  1. Before <code>void setup()</code>, write: <code>int blinkSpeed = 250;</code><br>
  2. In <code>loop()</code>, use <code>delay(blinkSpeed)</code> instead of a number<br>
  3. In <code>loop()</code>, add <code>Serial.println("Blinking!");</code>
</div>`,
        code: `// Step 1: Declare blinkSpeed here (before setup)!
int blinkSpeed = 250;  // ← this is already done for you!

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Step 2: Use blinkSpeed in your delay() calls
  digitalWrite(13, HIGH);
  delay(blinkSpeed);   // ← using the variable!
  digitalWrite(13, LOW);
  delay(blinkSpeed);

  // Step 3: Add Serial.println("Blinking!"); here

}`,
        validate: (code, _sim) => {
          return /\bblinkSpeed\s*=\s*250\b/.test(code) &&
                 /delay\s*\(\s*blinkSpeed\s*\)/.test(code) &&
                 /Serial\.println/.test(code);
        },
        hint: 'The variable declaration and delay() calls are already in the starter code. Just add Serial.println("Blinking!"); inside the loop() block.',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'Which data type would you use to store the number 3.14 (a decimal number)?',
        opts: ['int', 'boolean', 'float', 'char'],
        correct: 2,
        explain: 'float stores decimal numbers like 3.14. int only stores whole numbers (no decimals), boolean is only true or false, and char is a single character like "A".',
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
<h2>How to Dim an LED (When Pins Are Only ON or OFF)</h2>
<p>Here's a puzzle: digital pins can only be fully ON (5V) or fully OFF (0V). But dimmer switches in your house can set lights to 50% brightness. How?</p>
<p>The answer: <strong>PWM</strong> (Pulse Width Modulation). It's a clever trick where the pin flickers between ON and OFF very fast — so fast (490 times per second!) that your eye can't see the flickering. Instead, you just see a dimmer light.</p>
<div class="info-box">
  Think of it like a fan's speed settings:<br>
  • Full speed = always on<br>
  • 50% speed = on half the time, off half the time (switches so fast it seems slower)<br>
  • 25% speed = on 25% of the time
</div>
<p>The on/off ratio is called the <strong>duty cycle</strong>. A 50% duty cycle = LED at half brightness.</p>
<p>On the Arduino Uno, only certain pins support PWM. Look for the <strong>~</strong> symbol: pins <strong>3, 5, 6, 9, 10, 11</strong>.</p>
<div class="info-box warn">
  ⚠️ Only use analogWrite() on ~ pins! Pins without ~ can't do PWM. We'll use pin 9 in this lesson.
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
        type: 'learn', title: 'Making Decisions in Code', icon: '🔀',
        content: `
<h2>if / else — How Your Program Makes Choices</h2>
<p>In real life, you make decisions all the time:</p>
<p><em>"If it's raining, take an umbrella. Otherwise, leave it at home."</em></p>
<p>Arduino code can make decisions too! Here's the structure:</p>
<div class="info-box">
<pre><code>if (condition) {
  // runs if condition is TRUE
} else {
  // runs if condition is FALSE
}</code></pre>
</div>
<p>Let's read this like English:</p>
<ul>
  <li><strong>if</strong> → "If..."</li>
  <li><strong>(condition)</strong> → the thing we're checking</li>
  <li><strong>{ }</strong> → "...then do this"</li>
  <li><strong>else { }</strong> → "...otherwise do this instead"</li>
</ul>
<p>Here's a real example: if a sensor reading is low (dark room), turn on the LED:</p>
<div class="info-box tip">
<pre><code>if (sensorValue < 300) {
  digitalWrite(13, HIGH);  // It's dark! Turn on LED
} else {
  digitalWrite(13, LOW);   // Bright enough, LED off
}</code></pre>
</div>`,
      },
      {
        type: 'learn', title: 'Comparison Operators', icon: '⚖️',
        content: `
<h2>How to Write Conditions</h2>
<p>The <em>condition</em> inside the <code>if ()</code> parentheses is a comparison that is either <strong>true</strong> or <strong>false</strong>.</p>
<p>Here are the comparison symbols (called <strong>operators</strong>):</p>
<div class="info-box">
  <code>==</code> &nbsp; equals &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>x == 5</code> → "is x equal to 5?"<br>
  <code>!=</code> &nbsp; not equal &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>x != 5</code> → "is x NOT equal to 5?"<br>
  <code>&gt;</code> &nbsp;&nbsp; greater than &nbsp;&nbsp;&nbsp; <code>x &gt; 5</code> → "is x more than 5?"<br>
  <code>&lt;</code> &nbsp;&nbsp; less than &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>x &lt; 5</code> → "is x less than 5?"<br>
  <code>&gt;=</code> &nbsp; greater or equal &nbsp;<code>x &gt;= 5</code> → "is x 5 or more?"<br>
  <code>&lt;=</code> &nbsp; less or equal &nbsp;&nbsp;&nbsp;<code>x &lt;= 5</code> → "is x 5 or less?"
</div>
<div class="info-box warn" style="margin-top:10px">
  ⚠️ <strong>Most common beginner mistake!</strong><br>
  <code>=</code> means "assign" (put a value in a variable)<br>
  <code>==</code> means "compare" (check if two things are equal)<br><br>
  <code>if (x = 5)</code> ❌ This sets x to 5 instead of checking!<br>
  <code>if (x == 5)</code> ✅ This checks if x equals 5.
</div>`,
      },
      {
        type: 'run', title: 'Light Level Decision Making', icon: '▶',
        content: `
<h2>Watch the if/else in Action!</h2>
<p>This sketch reads A0 (imagine a light sensor) and decides what to do based on the value. Click <strong>▶ Run</strong> and watch the Serial Monitor!</p>
<div class="info-box tip">
  💡 The A0 slider in the simulator starts at 512 (middle). Notice how the code reads different sections of the if/else chain depending on the value!
</div>
<p>Look at the three possible outcomes printed:
<ul>
  <li>"Dark! LED ON" — when A0 is below 300</li>
  <li>"Medium light" — when A0 is 300-699</li>
  <li>"Very bright" — when A0 is 700+</li>
</ul>
</p>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Light sensor ready!");
}

void loop() {
  int light = analogRead(A0);  // Read sensor (0-1023)

  if (light < 300) {
    // Less than 300 = dark
    digitalWrite(13, HIGH);
    Serial.println("Dark! LED ON");
  } else if (light < 700) {
    // 300-699 = medium brightness
    digitalWrite(13, LOW);
    Serial.println("Medium light — LED off");
  } else {
    // 700+ = very bright
    digitalWrite(13, LOW);
    Serial.println("Very bright — LED off");
  }

  delay(500);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Smart Light', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Write a sketch using <code>if/else</code> that does this:</p>
<ul>
  <li>Read the sensor: <code>int value = analogRead(A0);</code></li>
  <li><strong>If</strong> value is greater than 512: turn LED on and print "LED ON"</li>
  <li><strong>Otherwise</strong> (else): turn LED off and print "LED OFF"</li>
</ul>
<div class="info-box">
  <strong>Template:</strong><br>
  <code>if (value &gt; 512) {</code><br>
  &nbsp;&nbsp;<code>digitalWrite(13, HIGH);</code><br>
  &nbsp;&nbsp;<code>Serial.println("LED ON");</code><br>
  <code>} else {</code><br>
  &nbsp;&nbsp;<code>digitalWrite(13, LOW);</code><br>
  &nbsp;&nbsp;<code>Serial.println("LED OFF");</code><br>
  <code>}</code>
</div>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(A0);

  // Add your if/else here!
  // if value > 512 → LED on + print "LED ON"
  // else → LED off + print "LED OFF"

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
        opts: ['= (single equals sign)', '== (double equals sign)', '!= (exclamation equals)', '>= (greater or equal)'],
        correct: 1,
        explain: '== is the comparison operator. A single = is assignment (it stores a value). This is one of the most common mistakes for beginners — always use == when comparing inside if conditions!',
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
        type: 'learn', title: 'Why Do We Need Loops?', icon: '🤔',
        content: `
<h2>The Problem: Copy-Pasting is Bad!</h2>
<p>Imagine you want to blink an LED 10 times. Without loops, you'd write this:</p>
<div class="info-box warn">
<pre><code>digitalWrite(13, HIGH); delay(200);
digitalWrite(13, LOW);  delay(200);
digitalWrite(13, HIGH); delay(200);
digitalWrite(13, LOW);  delay(200);
// ... repeated 10 times! 😱</code></pre>
</div>
<p>That's 20 lines of code just for 10 blinks! And what if you want 100 blinks? Or 1000?</p>
<p>The solution is a <strong>loop</strong> — a way to run the same code multiple times automatically:</p>
<div class="info-box tip">
<pre><code>for (int i = 0; i < 10; i++) {
  digitalWrite(13, HIGH); delay(200);
  digitalWrite(13, LOW);  delay(200);
}
// Just 4 lines — does 10 blinks! 🎉</code></pre>
</div>
<p>Loops are one of the most powerful tools in all of programming!</p>`,
      },
      {
        type: 'learn', title: 'The for Loop Explained', icon: '🔁',
        content: `
<h2>Anatomy of a for Loop</h2>
<p>A <code>for</code> loop repeats code a <em>specific number of times</em>. Let's dissect it piece by piece:</p>
<div class="info-box">
<pre><code>for (int i = 0; i &lt; 5; i++) {
  // code to repeat
}</code></pre>
</div>
<p>The three parts inside the parentheses, separated by semicolons:</p>
<div class="info-box">
  <strong>Part 1: <code>int i = 0</code></strong><br>
  → "Start with a counter variable <code>i</code> equal to 0"<br>
  (Runs once at the beginning)
</div>
<div class="info-box tip" style="margin-top:8px">
  <strong>Part 2: <code>i &lt; 5</code></strong><br>
  → "Keep looping while i is less than 5"<br>
  (Checked before each repetition)
</div>
<div class="info-box" style="margin-top:8px">
  <strong>Part 3: <code>i++</code></strong><br>
  → "After each repetition, add 1 to i"<br>
  (<code>i++</code> is shorthand for <code>i = i + 1</code>)
</div>
<p>So i goes: 0, 1, 2, 3, 4 — and stops before 5. That's <strong>5 repetitions</strong>!</p>`,
      },
      {
        type: 'learn', title: 'The while Loop', icon: '🔄',
        content: `
<h2>The while Loop — Repeat Until Done</h2>
<p>A <code>while</code> loop is simpler than a for loop. It just keeps going as long as a condition is true:</p>
<div class="info-box">
<pre><code>while (condition) {
  // runs over and over while condition is true
}</code></pre>
</div>
<p>Example — counting down from 5:</p>
<div class="info-box tip">
<pre><code>int countdown = 5;
while (countdown > 0) {
  Serial.println(countdown);
  countdown--;      // Don't forget to change the variable!
}
Serial.println("DONE!");</code></pre>
</div>
<div class="info-box warn">
  ⚠️ <strong>Danger: Infinite Loops!</strong><br>
  If the condition never becomes false, the loop runs forever and freezes your Arduino. Always make sure something changes inside the loop that will eventually make the condition false!<br><br>
  <code>while (true) { }</code> → infinite loop (intentional in Arduino's loop())<br>
  <code>while (x > 0) { }</code> → but forgetting x-- = accidental infinite loop!
</div>`,
        code: `void setup() {
  Serial.begin(9600);

  // for loop example
  Serial.println("Counting up with for loop:");
  for (int i = 1; i <= 5; i++) {
    Serial.print("i = ");
    Serial.println(i);
  }

  // while loop example
  Serial.println("Counting down with while loop:");
  int countdown = 5;
  while (countdown > 0) {
    Serial.print("countdown = ");
    Serial.println(countdown);
    countdown--;
  }
  Serial.println("Done!");
}

void loop() {
  // Empty — our demo runs once in setup
}`,
      },
      {
        type: 'run', title: 'See Both Loops in Action!', icon: '▶',
        content: `
<h2>Run and Watch!</h2>
<p>Click <strong>▶ Run</strong> to see both loops working in the Serial Monitor AND see the LED blink!</p>
<div class="info-box tip">
  Notice the for loop counts UP (blinks 5 times) while the while loop counts UP too, but they both finish completely before the next one starts!
</div>
<p>After seeing the pattern in the Serial Monitor, notice how the for loop is used to blink the LED exactly 5 times, then the while loop counts 1-3 in Serial.</p>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // for loop: blink LED 5 times
  Serial.println("=== Blinking 5 times ===");
  for (int i = 0; i < 5; i++) {
    digitalWrite(13, HIGH); delay(150);
    digitalWrite(13, LOW);  delay(150);
    Serial.print("Blink #");
    Serial.println(i + 1);    // i+1 because i starts at 0
  }

  // while loop: count to 3
  Serial.println("=== Counting to 3 ===");
  int n = 1;
  while (n <= 3) {
    Serial.print("Count: ");
    Serial.println(n);
    n++;
  }

  delay(1000);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Countdown!', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Use a <strong>for loop</strong> to count <em>DOWN</em> from 10 to 1, printing each number to the Serial Monitor. After the loop finishes, print <code>"BLAST OFF!"</code></p>
<div class="info-box">
  <strong>Hints for your for loop:</strong><br>
  • Start: <code>int i = 10</code> (count from 10)<br>
  • Condition: <code>i >= 1</code> (keep going while i is at least 1)<br>
  • Change: <code>i--</code> (subtract 1 each time, opposite of i++)<br><br>
  Put your loop inside <code>setup()</code> — it should only run once!
</div>`,
        code: `void setup() {
  Serial.begin(9600);
  Serial.println("Launch countdown:");

  // Write your countdown for loop here!
  // for (int i = 10; ...)



  Serial.println("BLAST OFF!");
}

void loop() {
  // Empty — countdown only needs to run once
}`,
        validate: (code, _sim) => {
          const hasFor = /\bfor\s*\(/.test(code);
          const hasDecrement = /i--|i\s*-=\s*1|i\s*=\s*i\s*-\s*1/.test(code);
          const hasBlastOff = /BLAST\s*OFF/.test(code);
          const hasSerial = /Serial\.println/.test(code);
          return hasFor && hasDecrement && hasBlastOff && hasSerial;
        },
        hint: 'for (int i = 10; i >= 1; i--) { Serial.println(i); }  After the closing brace, add: Serial.println("BLAST OFF!");',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'In this loop: for(int i = 0; i < 5; i++) — how many times does the body run?',
        opts: ['4 times (0, 1, 2, 3)', '5 times (0, 1, 2, 3, 4)', '6 times (0, 1, 2, 3, 4, 5)', 'Forever'],
        correct: 1,
        explain: 'i starts at 0 and the loop runs while i < 5. So i = 0, 1, 2, 3, 4 — that\'s exactly 5 runs! When i reaches 5, the condition (i < 5) becomes false and the loop stops.',
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
        type: 'learn', title: 'What is a Function?', icon: '🧩',
        content: `
<h2>Functions — Your Own Custom Commands</h2>
<p>You already know functions — you've been using them this whole time! <code>digitalWrite()</code>, <code>delay()</code>, <code>Serial.println()</code> — those are all <strong>functions</strong> that someone else wrote for you.</p>
<p>Now it's time to <strong>write your own functions</strong>!</p>
<p>Imagine you have a recipe for making tea:</p>
<ol>
  <li>Boil water</li>
  <li>Put in tea bag</li>
  <li>Wait 3 minutes</li>
  <li>Remove tea bag</li>
</ol>
<p>Instead of writing those 4 steps everywhere in your cookbook, you'd just say "make tea" and refer to the recipe. That's exactly what a function is — a <strong>named recipe</strong> you can call anytime!</p>
<div class="info-box tip">
  Without functions, if you want to blink 3 times in 5 different places, you write 15 lines × 5 = 75 lines.<br><br>
  With a <code>blink3Times()</code> function, you write 5 lines once and call it 5 times — just 5 short lines!
</div>`,
      },
      {
        type: 'learn', title: 'How to Write a Function', icon: '📝',
        content: `
<h2>Creating Your Own Function</h2>
<p>Here's the structure for writing a simple function:</p>
<div class="info-box">
<pre><code>void functionName() {
  // code that runs when this function is called
}</code></pre>
</div>
<p>Breaking it down:</p>
<ul>
  <li><code>void</code> → this function gives nothing back (it just does stuff)</li>
  <li><code>functionName</code> → you make up the name (like a variable name)</li>
  <li><code>()</code> → empty parentheses mean no inputs needed</li>
  <li><code>{ }</code> → the function's code goes inside these braces</li>
</ul>
<p>Example — a function that blinks the LED 3 times:</p>
<div class="info-box tip">
<pre><code>void blink3() {
  digitalWrite(13, HIGH); delay(150);
  digitalWrite(13, LOW);  delay(150);
  digitalWrite(13, HIGH); delay(150);
  digitalWrite(13, LOW);  delay(150);
  digitalWrite(13, HIGH); delay(150);
  digitalWrite(13, LOW);  delay(150);
}

void loop() {
  blink3();      // Just call the name!
  delay(1000);
}</code></pre>
</div>
<p>Notice: you <strong>define</strong> the function outside of loop(), but you <strong>call</strong> it from inside loop().</p>`,
      },
      {
        type: 'learn', title: 'Functions with Inputs (Parameters)', icon: '🎛️',
        content: `
<h2>Making Functions More Flexible with Parameters</h2>
<p>A function that always does the exact same thing is useful, but a function you can <em>customize</em> is even better!</p>
<p>You pass information <em>into</em> a function using <strong>parameters</strong> (also called arguments):</p>
<div class="info-box">
<pre><code>void blinkTimes(int times, int speed) {
  for (int i = 0; i < times; i++) {
    digitalWrite(13, HIGH); delay(speed);
    digitalWrite(13, LOW);  delay(speed);
  }
}</code></pre>
</div>
<p>Now you can call it with different values:</p>
<div class="info-box tip">
<pre><code>blinkTimes(3, 100);   // Blink 3 times, fast
blinkTimes(5, 500);   // Blink 5 times, slow
blinkTimes(1, 1000);  // Blink once, very slow</code></pre>
</div>
<p>The parameters <code>times</code> and <code>speed</code> act like variables inside the function. When you call <code>blinkTimes(3, 100)</code>, it's like saying <code>int times = 3; int speed = 100;</code> automatically!</p>`,
        code: `// A flexible function that blinks N times at a given speed
void blinkTimes(int times, int speed) {
  for (int i = 0; i < times; i++) {
    digitalWrite(13, HIGH); delay(speed);
    digitalWrite(13, LOW);  delay(speed);
  }
}

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  Serial.println("3 fast blinks...");
  blinkTimes(3, 100);    // 3 blinks at 100ms each

  delay(500);

  Serial.println("2 slow blinks...");
  blinkTimes(2, 500);    // 2 blinks at 500ms each

  delay(1000);
}`,
      },
      {
        type: 'run', title: 'Functions in Action!', icon: '▶',
        content: `
<h2>Watch the Power of Functions!</h2>
<p>Click <strong>▶ Run</strong> and watch the LED and Serial Monitor. Notice how clean and readable <code>loop()</code> is — it just calls functions and describes what it wants in plain English-like names!</p>
<div class="info-box tip">
  💡 The magic: <code>loop()</code> only has a few short lines, but those lines trigger complex behavior because each function does the hard work internally. This is how professional programmers keep code organized!
</div>`,
        code: `void blinkTimes(int pin, int times, int speed) {
  for (int i = 0; i < times; i++) {
    digitalWrite(pin, HIGH); delay(speed);
    digitalWrite(pin, LOW);  delay(speed);
  }
}

int readPercent() {
  int raw = analogRead(A0);
  return map(raw, 0, 1023, 0, 100);  // Convert 0-1023 to 0-100%
}

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Functions demo starting!");
}

void loop() {
  Serial.println("3 fast blinks:");
  blinkTimes(13, 3, 100);

  Serial.println("2 slow blinks:");
  blinkTimes(13, 2, 500);

  int pct = readPercent();
  Serial.print("A0 sensor: ");
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
  <strong>Step by step:</strong><br>
  1. Before <code>void setup()</code>, write: <code>void flashSOS() {</code><br>
  2. Inside it, write 3 ON/OFF pairs (use delay(150))<br>
  3. Close with <code>}</code><br>
  4. In <code>loop()</code>, type: <code>flashSOS();</code><br>
  5. Add a <code>delay(1000);</code> after it in loop()
</div>
<p>The checker will look for: the function definition, the function call in loop(), and at least 3 digitalWrite() calls inside the function.</p>`,
        code: `// Write your flashSOS() function here!
void flashSOS() {
  // 3 quick ON/OFF pairs



}

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  Serial.println("SOS!");
  flashSOS();    // Call your function here!
  delay(1000);   // Pause between SOS signals
}`,
        validate: (code, _sim) => {
          const hasFunc = /void\s+flashSOS\s*\(\s*\)/.test(code);
          const callsFunc = (code.replace(/void\s+flashSOS[^}]*\}/, '')).includes('flashSOS()');
          const hasDigital = (code.match(/digitalWrite/g) || []).length >= 3;
          return hasFunc && callsFunc && hasDigital;
        },
        hint: 'Inside flashSOS(), write: digitalWrite(13,HIGH); delay(150); digitalWrite(13,LOW); delay(150); — and repeat that 3 times total.',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'What does "void" mean in "void myFunction()"?',
        opts: [
          'The function\'s code block is empty',
          'The function does not give back (return) any value',
          'The function only runs once',
          'The function is not yet defined',
        ],
        correct: 1,
        explain: '"void" means the function doesn\'t return a value — it just does stuff. If your function should give back a number, you\'d write "int myFunction()" instead of "void".',
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
        type: 'learn', title: 'What is an Array?', icon: '📋',
        content: `
<h2>Arrays — A List of Values with One Name</h2>
<p>Imagine you need to store 5 pin numbers. You could make 5 separate variables:</p>
<div class="info-box warn">
<pre><code>int pin1 = 2;
int pin2 = 3;
int pin3 = 4;
int pin4 = 5;
int pin5 = 6;  // Messy! Hard to loop through</code></pre>
</div>
<p>Or you could use an <strong>array</strong> — a single variable that holds a whole list:</p>
<div class="info-box tip">
<pre><code>int ledPins[] = {2, 3, 4, 5, 6};
//               ^  ^  ^  ^  ^
//         index: 0  1  2  3  4</code></pre>
</div>
<p>Key things to know about arrays:</p>
<ul>
  <li>All values must be the <em>same type</em> (all <code>int</code>, all <code>float</code>, etc.)</li>
  <li>The first item is at <strong>index 0</strong> (not 1!). This trips up every beginner at least once.</li>
  <li>Access any item with square brackets: <code>ledPins[0]</code> = 2, <code>ledPins[2]</code> = 4</li>
</ul>
<p>The real power: you can loop through every item automatically!</p>`,
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
<h2>Why delay() Can Be a Problem</h2>
<p>So far, you've been using <code>delay(1000)</code> to wait 1 second. This works fine for simple programs, but there's a hidden problem: <strong>delay() completely freezes your Arduino</strong>!</p>
<p>During a <code>delay(1000)</code>, your Arduino literally does nothing for 1 full second. It can't:</p>
<ul>
  <li>Read a button press (you might miss it!)</li>
  <li>Update a display</li>
  <li>Check a sensor</li>
  <li>Do anything else at all</li>
</ul>
<div class="info-box warn">
  ⚠️ Imagine a store cashier who, after scanning each item, stands completely frozen for 10 seconds before scanning the next. They can't answer questions or accept payment during those 10 seconds. That's what delay() is like!
</div>
<p>For simple blink programs, this is fine. But for real projects where multiple things need to happen simultaneously, you need a better approach!</p>`,
      },
      {
        type: 'learn', title: 'Meet millis()', icon: '⏱️',
        content: `
<h2>millis() — Arduino's Built-In Stopwatch</h2>
<p><code>millis()</code> is a function that returns how many milliseconds have passed since your Arduino turned on. It keeps counting up forever in the background!</p>
<div class="info-box tip">
  Think of <code>millis()</code> like a clock on the wall. Instead of <em>waiting</em> for time to pass, you <em>glance at the clock</em> and check if enough time has gone by.
</div>
<p>The key insight: instead of freezing and waiting, you check the clock every loop and only act when enough time has passed:</p>
<div class="info-box">
<pre><code>unsigned long lastTime = 0;   // "When did I last do it?"

void loop() {
  unsigned long now = millis();  // "What time is it now?"

  if (now - lastTime >= 1000) {  // "Has 1 second passed?"
    lastTime = now;               // "Reset my stopwatch"
    // DO THE THING!
  }
  // Everything else keeps running normally!
}</code></pre>
</div>
<p>Note: <code>unsigned long</code> is a special number type that can hold very large numbers (up to 4 billion). We need it because millis() can count to 49 days before resetting!</p>`,
      },
      {
        type: 'learn', title: 'The millis() Pattern Step by Step', icon: '📋',
        content: `
<h2>Three Things You Always Need</h2>
<p>Every time you use the millis() technique, you need these three ingredients:</p>
<div class="info-box">
  <strong>1. A "last time" variable</strong> (outside of loop, so it remembers between loops)<br>
  <code>unsigned long lastBlink = 0;</code>
</div>
<div class="info-box tip" style="margin-top:8px">
  <strong>2. Get current time at start of loop</strong><br>
  <code>unsigned long now = millis();</code>
</div>
<div class="info-box" style="margin-top:8px">
  <strong>3. Check if interval has passed</strong><br>
<pre><code>if (now - lastBlink >= 500) {  // 500ms = half second
  lastBlink = now;              // Reset the stopwatch!
  // ... do your timed action ...
}</code></pre>
</div>
<p>The formula <code>now - lastBlink</code> calculates how long ago the last action happened. When that exceeds your interval (500ms, 1000ms, etc.), it's time to act again!</p>
<p>The beauty: everything outside the <code>if</code> block runs at FULL SPEED, constantly. You can have multiple timers checking different intervals all in the same loop!</p>`,
        code: `unsigned long lastBlink = 0;   // When did we last blink?
bool ledState = false;          // Is LED on or off?

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Non-blocking blink ready!");
}

void loop() {
  unsigned long now = millis();   // Check the clock

  // Every 500ms, toggle the LED
  if (now - lastBlink >= 500) {
    lastBlink = now;              // Reset stopwatch
    ledState = !ledState;         // Flip LED state (on/off)
    digitalWrite(13, ledState ? HIGH : LOW);
    Serial.println(ledState ? "LED ON" : "LED OFF");
  }

  // This runs CONSTANTLY — the loop is NOT frozen!
  // (In a real project, you'd read buttons or sensors here)
}`,
      },
      {
        type: 'run', title: 'Two Timers at Once!', icon: '▶',
        content: `
<h2>The Real Power: Multiple Timers!</h2>
<p>Click <strong>▶ Run</strong> to see TWO independent timers running <em>simultaneously</em>:</p>
<ul>
  <li>Timer 1: LED blinks every <strong>500ms</strong></li>
  <li>Timer 2: Sensor report every <strong>1500ms</strong></li>
</ul>
<p>Both timers run independently — neither blocks the other!</p>
<div class="info-box tip">
  💡 With <code>delay()</code> you could only do ONE thing at a time. With <code>millis()</code> you can do MANY things on their own schedules. This is how professional embedded systems work!
</div>`,
        code: `unsigned long prevBlink  = 0;   // For LED timer
unsigned long prevReport = 0;   // For sensor timer
bool ledState = false;

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Two timers running at once!");
}

void loop() {
  unsigned long now = millis();

  // Timer 1: Blink LED every 500ms
  if (now - prevBlink >= 500) {
    prevBlink = now;
    ledState = !ledState;
    digitalWrite(13, ledState ? HIGH : LOW);
  }

  // Timer 2: Print sensor value every 1500ms
  if (now - prevReport >= 1500) {
    prevReport = now;
    Serial.print("Time: ");
    Serial.print(now / 1000);   // Convert ms to seconds
    Serial.print("s  LED: ");
    Serial.println(ledState ? "ON" : "off");
  }

  // Nothing is blocked — this loop runs THOUSANDS of times per second!
}`,
      },
      {
        type: 'challenge', title: 'Final Challenge: millis() Blink', icon: '🎯',
        content: `
<h2>🎯 Your Challenge</h2>
<p>Write a sketch that uses <code>millis()</code> (NOT <code>delay()</code>!) to blink pin 13 every <strong>300 milliseconds</strong>.</p>
<div class="info-box">
  <strong>Checklist:</strong><br>
  ✅ Declare <code>unsigned long</code> variable for previous time<br>
  ✅ Use <code>millis()</code> to get current time<br>
  ✅ Check if 300ms has passed<br>
  ✅ Toggle the LED with <code>digitalWrite(13, ...)</code><br>
  ❌ <strong>Do NOT use any delay() calls!</strong>
</div>
<p>The starter code has the variables ready. Fill in the <code>if</code> block in loop()!</p>`,
        code: `unsigned long previousMillis = 0;  // When did we last toggle?
bool ledOn = false;                // Track LED state

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  unsigned long now = millis();   // Get current time

  // Check if 300ms has passed since last toggle
  if (now - previousMillis >= 300) {
    previousMillis = now;    // Reset the stopwatch
    ledOn = !ledOn;          // Flip: true→false or false→true

    // Write the LED state here!

  }
}`,
        validate: (code, _sim) => {
          const hasMillis  = /millis\s*\(\s*\)/.test(code);
          const hasULong   = /unsigned\s+long/.test(code);
          const hasDigital = /digitalWrite\s*\(\s*13/.test(code);
          const noDelay    = !/\bdelay\s*\(/.test(code);
          return hasMillis && hasULong && hasDigital && noDelay;
        },
        hint: 'Inside the if block, after ledOn = !ledOn; add: digitalWrite(13, ledOn ? HIGH : LOW);  That\'s it — the rest is already there!',
      },
      {
        type: 'quiz', title: 'Final Quiz', icon: '❓',
        content: '',
        q: 'What is the main advantage of using millis() instead of delay()?',
        opts: [
          'millis() counts more precisely than delay()',
          'millis() lets the rest of your loop() keep running while timing — it does NOT freeze',
          'millis() uses less electricity than delay()',
          'millis() works on more Arduino board models',
        ],
        correct: 1,
        explain: 'millis() is "non-blocking" — your loop() keeps running thousands of times per second while you wait. delay() is "blocking" — it freezes EVERYTHING for the duration. This makes millis() essential for projects that need to do multiple things at once!',
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

  // ── 22. Debouncing ───────────────────────────────────────
  {
    id: 'debouncing', title: 'Debouncing Buttons', icon: '🔧',
    difficulty: 'intermediate', xp: 70,
    desc: 'Fix "bouncy" button reads that cause multiple triggers from a single press.',
    components: [{ type: 'button', pin: 2 }],
    steps: [
      {
        type: 'learn', title: 'Why Buttons "Bounce"', icon: '🔧',
        content: `
<h2>The Hidden Problem with Buttons</h2>
<p>Here's something surprising: when you press a physical button, it doesn't just go from OFF to ON cleanly. The metal contacts inside physically <em>bounce</em> against each other for a few milliseconds, creating a rapid series of ON-OFF-ON-OFF signals before settling.</p>
<div class="info-box warn">
  ⚠️ Without debouncing, one button press might be read as 3, 5, or even 10 presses! Imagine a counter that jumps from 0 to 5 on a single click — that's button bounce.
</div>
<p>In the simulator this is less visible, but on real hardware it's a real problem. Learning to debounce is essential for any project with buttons.</p>
<p>There are two main solutions:</p>
<ul>
  <li><strong>Hardware debouncing</strong> — add a capacitor to the circuit</li>
  <li><strong>Software debouncing</strong> — use code to ignore rapid changes (free!)</li>
</ul>
<p>We'll use software debouncing with <code>millis()</code>.</p>`,
      },
      {
        type: 'learn', title: 'The Debounce Technique', icon: '⏱️',
        content: `
<h2>Software Debounce with millis()</h2>
<p>The idea: when the button state changes, <strong>wait a short time</strong> (usually 20-50ms) and only accept the new state if it's still the same after that delay.</p>
<div class="info-box">
<pre><code>int btnPin = 2;
int lastStableState = HIGH;
int lastRawState    = HIGH;
unsigned long lastChangeTime = 0;
const int DEBOUNCE_DELAY = 30;  // ms

void loop() {
  int rawState = digitalRead(btnPin);

  if (rawState != lastRawState) {
    lastChangeTime = millis();  // Button state changed — start timer
    lastRawState = rawState;
  }

  if (millis() - lastChangeTime > DEBOUNCE_DELAY) {
    // State has been stable for 30ms — it's real!
    if (rawState != lastStableState) {
      lastStableState = rawState;
      if (rawState == LOW) {
        // A genuine button press!
      }
    }
  }
}</code></pre>
</div>
<p>This filters out the rapid bouncing because bounces happen in microseconds — much shorter than our 30ms window!</p>`,
        code: `int btnPin = 2;
int lastStableState = HIGH;
int lastRawState    = HIGH;
unsigned long lastChangeTime = 0;
const int DEBOUNCE_DELAY = 30;
int pressCount = 0;

void setup() {
  pinMode(btnPin, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Debounced button ready!");
}

void loop() {
  int rawState = digitalRead(btnPin);

  if (rawState != lastRawState) {
    lastChangeTime = millis();
    lastRawState = rawState;
  }

  if (millis() - lastChangeTime > DEBOUNCE_DELAY) {
    if (rawState != lastStableState) {
      lastStableState = rawState;
      if (rawState == LOW) {
        pressCount++;
        Serial.print("Debounced press #");
        Serial.println(pressCount);
        digitalWrite(13, HIGH); delay(100); digitalWrite(13, LOW);
      }
    }
  }
}`,
      },
      {
        type: 'run', title: 'Press the Button!', icon: '▶',
        content: `
<h2>Test the Debounced Button</h2>
<p>Click <strong>▶ Run</strong>, then <strong>click the button</strong> in the simulator. Each click should count as exactly ONE press!</p>
<div class="info-box tip">
  💡 In real hardware, an un-debounced button might count 3-10 presses per physical click. With software debouncing, you always get exactly 1 per press.
</div>
<p>The Serial Monitor shows the count. Try clicking quickly several times and see how accurate the count is!</p>`,
        code: `int btnPin = 2;
int lastStableState = HIGH;
int lastRawState    = HIGH;
unsigned long lastChangeTime = 0;
const int DEBOUNCE_DELAY = 30;
int pressCount = 0;

void setup() {
  pinMode(btnPin, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Click the button!");
}

void loop() {
  int rawState = digitalRead(btnPin);
  if (rawState != lastRawState) {
    lastChangeTime = millis();
    lastRawState = rawState;
  }
  if (millis() - lastChangeTime > DEBOUNCE_DELAY) {
    if (rawState != lastStableState) {
      lastStableState = rawState;
      if (rawState == LOW) {
        pressCount++;
        Serial.print("Press #");
        Serial.println(pressCount);
        digitalWrite(13, HIGH);
        delay(80);
        digitalWrite(13, LOW);
      }
    }
  }
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Reliable Counter', icon: '🎯',
        content: `
<h2>🎯 Challenge: Debounced Press Counter</h2>
<p>Write a debounced button sketch. Your code must use:</p>
<ul>
  <li><code>millis()</code> for timing (not delay)</li>
  <li>A debounce window of at least 20ms</li>
  <li>A counter that only increments once per real press</li>
  <li><code>Serial.println</code> to print the count</li>
</ul>`,
        code: `int lastRawState    = HIGH;
int lastStableState = HIGH;
unsigned long lastChangeTime = 0;
int pressCount = 0;

void setup() {
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  int raw = digitalRead(2);

  // Add debounce logic here!
  // When a stable press is detected, increment pressCount
  // and Serial.println it

}`,
        validate: (code, _sim) => {
          return /millis\s*\(\s*\)/.test(code) &&
                 /digitalRead\s*\(\s*2\s*\)/.test(code) &&
                 /Serial\.println/.test(code) &&
                 /\+\+|count\s*[+]=/.test(code);
        },
        hint: 'if (raw != lastRawState) { lastChangeTime = millis(); lastRawState = raw; } if (millis() - lastChangeTime > 25 && raw != lastStableState) { lastStableState = raw; if (raw == LOW) { pressCount++; Serial.println(pressCount); } }',
      },
    ],
  },

  // ── 23. LED Chaser ───────────────────────────────────────
  {
    id: 'led_chaser', title: 'LED Chaser Effect', icon: '✨',
    difficulty: 'intermediate', xp: 65,
    desc: 'Create a running light effect across multiple LEDs using arrays and loops.',
    steps: [
      {
        type: 'learn', title: 'Running Lights with Arrays', icon: '✨',
        content: `
<h2>The LED Chaser — Arrays + Loops in Action</h2>
<p>A <strong>LED chaser</strong> (also called a "running light" or "Knight Rider effect") lights up LEDs one at a time in sequence, creating the illusion of movement.</p>
<p>This is a perfect example of arrays and loops working together. Without them, controlling 5 LEDs would need 50+ lines of code. With them, it's just a few!</p>
<div class="info-box">
  <strong>The plan:</strong><br>
  1. Store all LED pin numbers in an array<br>
  2. Use a for loop to turn each one on, pause, then off<br>
  3. Loop forward, then backward for the full effect
</div>
<p>We'll use pins 9, 10, 11, 12, and 13 in the simulator. In real hardware you'd wire up 5 actual LEDs!</p>`,
        code: `int leds[] = {9, 10, 11, 12, 13};  // Our 5 LED pins
int numLeds = 5;
int speed = 100;  // ms between each LED

void setup() {
  for (int i = 0; i < numLeds; i++) {
    pinMode(leds[i], OUTPUT);
  }
  Serial.begin(9600);
}

void loop() {
  // Chase forward
  for (int i = 0; i < numLeds; i++) {
    digitalWrite(leds[i], HIGH);
    Serial.print("LED "); Serial.print(i+1); Serial.println(" ON");
    delay(speed);
    digitalWrite(leds[i], LOW);
  }
  // Chase backward
  for (int i = numLeds - 1; i >= 0; i--) {
    digitalWrite(leds[i], HIGH);
    delay(speed);
    digitalWrite(leds[i], LOW);
  }
}`,
      },
      {
        type: 'run', title: 'Watch the Chaser!', icon: '▶',
        content: `
<h2>See the Running Light!</h2>
<p>Click <strong>▶ Run</strong> and watch pins 9-13 light up one at a time! The Serial Monitor shows each step.</p>
<div class="info-box tip">
  💡 Try changing <code>speed = 100</code> to <code>speed = 50</code> for a faster chase, or <code>speed = 300</code> for slow and dramatic!
</div>`,
        code: `int leds[] = {9, 10, 11, 12, 13};
int numLeds = 5;
int speed = 100;

void setup() {
  for (int i = 0; i < numLeds; i++) {
    pinMode(leds[i], OUTPUT);
  }
  Serial.begin(9600);
  Serial.println("LED Chaser running!");
}

void loop() {
  for (int i = 0; i < numLeds; i++) {
    digitalWrite(leds[i], HIGH);
    delay(speed);
    digitalWrite(leds[i], LOW);
  }
  for (int i = numLeds - 1; i >= 0; i--) {
    digitalWrite(leds[i], HIGH);
    delay(speed);
    digitalWrite(leds[i], LOW);
  }
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Bouncing Light', icon: '🎯',
        content: `
<h2>🎯 Challenge: Bouncing Chaser</h2>
<p>Create an LED chaser using an array of at least <strong>3 pins</strong>. It must go forward AND backward (bounce back and forth).</p>
<ul>
  <li>Declare an <code>int</code> array with at least 3 pin numbers</li>
  <li>Use a <code>for</code> loop going forward (0 to last)</li>
  <li>Use a <code>for</code> loop going backward (last to 0)</li>
  <li>Each LED should be on briefly then off before moving to the next</li>
</ul>`,
        code: `int leds[] = {11, 12, 13};  // Add more pins if you like!
int numLeds = 3;

void setup() {
  for (int i = 0; i < numLeds; i++) {
    pinMode(leds[i], OUTPUT);
  }
  Serial.begin(9600);
}

void loop() {
  // Forward chase here

  // Backward chase here

}`,
        validate: (code, _sim) => {
          const hasArray = /int\s+\w+\s*\[\s*\]\s*=\s*\{/.test(code);
          const forLoops = (code.match(/\bfor\s*\(/g) || []).length;
          const hasWrite = /digitalWrite/.test(code);
          return hasArray && forLoops >= 2 && hasWrite;
        },
        hint: 'Forward: for (int i = 0; i < numLeds; i++) { digitalWrite(leds[i], HIGH); delay(100); digitalWrite(leds[i], LOW); }   Backward: for (int i = numLeds-1; i >= 0; i--) { same code }',
      },
      {
        type: 'quiz', title: 'Quick Check', icon: '❓',
        content: '',
        q: 'In "int leds[] = {9, 10, 11}", what is leds[2]?',
        opts: ['9', '10', '11', 'Error — out of range'],
        correct: 2,
        explain: 'Arrays are zero-indexed: leds[0]=9, leds[1]=10, leds[2]=11. Index 2 is the third element.',
      },
    ],
  },

  // ── 24. Light Meter ──────────────────────────────────────
  {
    id: 'light_meter', title: 'Light Meter & Thresholds', icon: '☀️',
    difficulty: 'beginner', xp: 55,
    desc: 'Read a light sensor and trigger different behaviors at different brightness levels.',
    steps: [
      {
        type: 'learn', title: 'Reading a Light Sensor', icon: '☀️',
        content: `
<h2>Sensing Light with an LDR</h2>
<p>A <strong>Light Dependent Resistor (LDR)</strong> — also called a photoresistor — changes its resistance based on how much light hits it. In bright light, resistance drops. In darkness, resistance rises.</p>
<p>Connect one to the Arduino's analog pin and <code>analogRead()</code> gives you a value:</p>
<div class="info-box">
  🌑 <strong>Dark room</strong> → high resistance → low voltage → analogRead gives ~0–200<br>
  ☀️ <strong>Bright light</strong> → low resistance → high voltage → analogRead gives ~800–1023
</div>
<p>In our simulator, the <strong>A0 slider</strong> represents the light level. Drag it left for dark, right for bright!</p>
<p>We can use thresholds to decide what to do:</p>
<div class="info-box tip">
  <code>if (light < 300)</code> → It's dark, turn on the LED<br>
  <code>else if (light < 700)</code> → Medium, dim the LED<br>
  <code>else</code> → Bright, turn LED off
</div>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Light meter ready!");
}

void loop() {
  int light = analogRead(A0);  // 0 = dark, 1023 = bright

  Serial.print("Light level: ");
  Serial.print(light);

  if (light < 300) {
    Serial.println(" → DARK — LED ON");
    digitalWrite(13, HIGH);
  } else if (light < 700) {
    Serial.println(" → DIM — LED off");
    digitalWrite(13, LOW);
  } else {
    Serial.println(" → BRIGHT — LED off");
    digitalWrite(13, LOW);
  }

  delay(400);
}`,
      },
      {
        type: 'run', title: 'Drag the Light Slider!', icon: '▶',
        content: `
<h2>Control the Light Level!</h2>
<p>Click <strong>▶ Run</strong>, then drag the <strong>A0 slider</strong> in the simulator left (dark) and right (bright). Watch the LED and Serial Monitor respond!</p>
<div class="info-box tip">
  💡 This is exactly how automatic street lights work — a light sensor reads brightness, and when it gets dark enough, the lights turn on automatically!
</div>`,
        code: `void setup() {
  pinMode(9, OUTPUT);   // PWM pin for dimming
  pinMode(13, OUTPUT);  // On/off LED
  Serial.begin(9600);
}

void loop() {
  int light = analogRead(A0);
  int brightness = map(light, 0, 1023, 255, 0);  // Invert: dark=bright LED

  analogWrite(9, brightness);  // Dim LED inversely to light

  if (light < 300) {
    digitalWrite(13, HIGH);
    Serial.println("DARK: lights on!");
  } else {
    digitalWrite(13, LOW);
    Serial.print("Light: "); Serial.println(light);
  }

  delay(200);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Three-Level Light Meter', icon: '🎯',
        content: `
<h2>🎯 Challenge: Three Brightness Zones</h2>
<p>Write a sketch that reads <code>analogRead(A0)</code> and prints a different message for 3 light zones:</p>
<ul>
  <li>0–340: print <code>"Zone: DARK"</code> and turn LED on</li>
  <li>341–680: print <code>"Zone: DIM"</code> and turn LED off</li>
  <li>681–1023: print <code>"Zone: BRIGHT"</code> and turn LED off</li>
</ul>`,
        code: `void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int light = analogRead(A0);

  // Add your three-zone if/else if/else here!

  delay(300);
}`,
        validate: (code, _sim) => {
          return /analogRead/.test(code) &&
                 /else\s+if/.test(code) &&
                 /DARK/.test(code) && /BRIGHT/.test(code) &&
                 /Serial\.println/.test(code);
        },
        hint: 'if (light <= 340) { Serial.println("Zone: DARK"); digitalWrite(13,HIGH); } else if (light <= 680) { Serial.println("Zone: DIM"); digitalWrite(13,LOW); } else { Serial.println("Zone: BRIGHT"); digitalWrite(13,LOW); }',
      },
    ],
  },

  // ── 25. Reaction Game ────────────────────────────────────
  {
    id: 'reaction_game', title: 'Reaction Time Game', icon: '⚡',
    difficulty: 'advanced', xp: 85,
    desc: 'Build a game that measures how fast you can press a button after an LED lights up.',
    components: [{ type: 'button', pin: 2 }],
    steps: [
      {
        type: 'learn', title: 'How the Game Works', icon: '⚡',
        content: `
<h2>Building Your First Game!</h2>
<p>Here's the plan for our reaction time game:</p>
<ol>
  <li>Arduino waits a random amount of time</li>
  <li>LED turns ON — this is your signal!</li>
  <li>Player presses the button as fast as possible</li>
  <li>Arduino measures how many milliseconds passed</li>
  <li>Print the reaction time to Serial</li>
</ol>
<p>We'll need a few new tools:</p>
<div class="info-box">
  <code>random(min, max)</code> — returns a random number between min and max-1<br>
  Example: <code>random(2000, 5000)</code> → random number from 2000 to 4999
</div>
<div class="info-box tip" style="margin-top:8px">
  <code>millis()</code> — we'll record the time when the LED turns on, then calculate elapsed time when the button is pressed
</div>
<p>The game uses a <strong>state machine</strong>: the program is either WAITING (LED off, waiting to start) or READY (LED on, waiting for button press).</p>`,
        code: `// States
int STATE_WAITING = 0;
int STATE_READY   = 1;
int gameState = STATE_WAITING;

unsigned long ledOnTime = 0;

void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  randomSeed(analogRead(A1));  // Seed random with noise
  Serial.println("Reaction Game Ready!");
  Serial.println("Watch for the LED, then press the button!");
}

void loop() {
  if (gameState == STATE_WAITING) {
    // Wait a random time, then turn on LED
    unsigned long waitTime = random(2000, 5000);
    Serial.print("Get ready... (waiting ");
    Serial.print(waitTime / 1000.0, 1);
    Serial.println("s)");
    delay(waitTime);  // Suspense!
    digitalWrite(13, HIGH);
    ledOnTime = millis();
    gameState = STATE_READY;
    Serial.println("NOW! Press the button!");
  }

  if (gameState == STATE_READY) {
    if (digitalRead(2) == LOW) {
      unsigned long reaction = millis() - ledOnTime;
      digitalWrite(13, LOW);
      Serial.print("Reaction time: ");
      Serial.print(reaction);
      Serial.println(" ms!");
      if (reaction < 200) Serial.println("AMAZING! 🏆");
      else if (reaction < 400) Serial.println("Great! 👍");
      else Serial.println("Keep practicing!");
      delay(1500);
      gameState = STATE_WAITING;
    }
  }
}`,
      },
      {
        type: 'run', title: 'Play the Game!', icon: '▶',
        content: `
<h2>Test Your Reflexes!</h2>
<p>Click <strong>▶ Run</strong>. The sketch will:</p>
<ol>
  <li>Wait a random 2-5 seconds (watch the Serial Monitor for the countdown)</li>
  <li>Turn on the LED — press the button IMMEDIATELY!</li>
  <li>Print your reaction time in milliseconds</li>
</ol>
<div class="info-box tip">
  💡 Average human reaction time is around 200-300ms. Under 200ms is exceptional! Pro gamers average ~150ms.
</div>
<p>Click the <strong>PUSH button</strong> in the simulator as fast as you can after the LED lights up!</p>`,
        code: `int gameState = 0;  // 0=waiting, 1=ready
unsigned long ledOnTime = 0;

void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("=== REACTION GAME ===");
  Serial.println("Watch for the LED, then hit the button!");
  delay(1000);
}

void loop() {
  if (gameState == 0) {
    int waitSecs = random(2, 5);
    Serial.print("Waiting ");
    Serial.print(waitSecs);
    Serial.println(" seconds...");
    delay(waitSecs * 1000);
    digitalWrite(13, HIGH);
    ledOnTime = millis();
    gameState = 1;
    Serial.println(">>> GO! Press the button! <<<");
  }

  if (gameState == 1 && digitalRead(2) == LOW) {
    long reaction = millis() - ledOnTime;
    digitalWrite(13, LOW);
    Serial.print("Your time: ");
    Serial.print(reaction);
    Serial.println("ms");
    if (reaction < 200)      Serial.println("INCREDIBLE! 🏆");
    else if (reaction < 350) Serial.println("Great! 👍");
    else if (reaction < 600) Serial.println("Not bad!");
    else                     Serial.println("Keep practicing!");
    delay(2000);
    gameState = 0;
  }
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Add a Cheat Detector', icon: '🎯',
        content: `
<h2>🎯 Challenge: No Cheating!</h2>
<p>Extend the reaction game to detect if the player <strong>presses the button before the LED turns on</strong> (cheating!). If they press too early, print "CHEATED!" and restart.</p>
<ul>
  <li>During the waiting phase, check if button is pressed</li>
  <li>If pressed early: print "Too early! Cheater!" and reset</li>
  <li>If pressed after LED: normal reaction time display</li>
</ul>`,
        code: `int gameState = 0;
unsigned long ledOnTime = 0;

void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("No cheating allowed!");
}

void loop() {
  if (gameState == 0) {
    // Waiting phase — check for cheating!
    int wait = random(2000, 4000);
    unsigned long start = millis();
    while (millis() - start < wait) {
      // Add cheat detection here!
      // If button pressed during wait → cheat!
    }
    // Turn LED on
    digitalWrite(13, HIGH);
    ledOnTime = millis();
    gameState = 1;
  }

  if (gameState == 1 && digitalRead(2) == LOW) {
    long t = millis() - ledOnTime;
    digitalWrite(13, LOW);
    Serial.print("Time: "); Serial.print(t); Serial.println("ms");
    delay(1500);
    gameState = 0;
  }
}`,
        validate: (code, _sim) => {
          return /cheat|early|too soon/i.test(code) &&
                 /digitalRead\s*\(\s*2\s*\)/.test(code) &&
                 /Serial\.print/.test(code) &&
                 /millis/.test(code);
        },
        hint: 'Inside the while loop: if (digitalRead(2) == LOW) { Serial.println("CHEATED! Too early!"); gameState = 0; return; }',
      },
    ],
  },

  // ── 26. Morse Code ───────────────────────────────────────
  {
    id: 'morse_code', title: 'Morse Code Transmitter', icon: '📡',
    difficulty: 'intermediate', xp: 75,
    desc: 'Encode messages in Morse code using LED flashes and buzzer beeps.',
    components: [{ type: 'buzzer', pin: 8 }],
    steps: [
      {
        type: 'learn', title: 'What is Morse Code?', icon: '📡',
        content: `
<h2>Morse Code — The Original Digital Language</h2>
<p>Invented in the 1830s, Morse code is a way to send text using just two signals: <strong>dots (·)</strong> and <strong>dashes (—)</strong>. It powered the telegraph system and saved countless lives at sea.</p>
<p>Each letter maps to a pattern of dots and dashes:</p>
<div class="info-box">
  A = · —&nbsp;&nbsp; B = — · · ·&nbsp;&nbsp; C = — · — ·<br>
  S = · · ·&nbsp;&nbsp; O = — — —&nbsp;&nbsp; S-O-S = · · · — — — · · ·<br><br>
  <strong>Timing rules:</strong><br>
  · (dot) = 1 unit on, 1 unit off<br>
  — (dash) = 3 units on, 1 unit off<br>
  Space between letters = 3 units off<br>
  Space between words = 7 units off
</div>
<p>We'll transmit Morse code using the LED <em>and</em> the buzzer — both flash/beep in the same pattern!</p>`,
        code: `const int LED = 13;
const int BZR = 8;
const int DOT  = 150;   // dot duration in ms
const int DASH = 450;   // dash = 3x dot
const int GAP  = 150;   // gap between signals

void playSignal(int duration) {
  digitalWrite(LED, HIGH);
  tone(BZR, 800, duration);
  delay(duration);
  digitalWrite(LED, LOW);
  noTone(BZR);
  delay(GAP);
}

void dot()  { playSignal(DOT);  }
void dash() { playSignal(DASH); }
void letterGap() { delay(DOT * 2); }  // extra gap between letters
void wordGap()   { delay(DOT * 6); }  // gap between words

void morseS() { dot(); dot(); dot(); letterGap(); }
void morseO() { dash(); dash(); dash(); letterGap(); }

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
  Serial.println("SOS in Morse code:");
  Serial.println("S = . . .   O = - - -   S = . . .");
}

void loop() {
  morseS();  // S = ...
  morseO();  // O = ---
  morseS();  // S = ...
  wordGap();
}`,
      },
      {
        type: 'run', title: 'Transmit SOS!', icon: '▶',
        content: `
<h2>Watch (and hear!) the SOS Signal</h2>
<p>Click <strong>▶ Run</strong> and watch the LED flash the international distress signal SOS: <strong>· · · — — — · · ·</strong></p>
<p>The buzzer icon in the simulator lights up with each beep. The Serial Monitor shows the letter pattern.</p>
<div class="info-box tip">
  💡 SOS was chosen as the distress signal because it's the simplest Morse pattern to recognize — 3 shorts, 3 longs, 3 shorts!
</div>`,
        code: `const int LED = 13, BZR = 8;
const int DOT = 200, DASH = 600, GAP = 200;

void signal(int ms) {
  digitalWrite(LED, HIGH); tone(BZR, 800, ms); delay(ms);
  digitalWrite(LED, LOW);  noTone(BZR);        delay(GAP);
}

void S_letter() { signal(DOT); signal(DOT); signal(DOT); delay(400); }
void O_letter() { signal(DASH); signal(DASH); signal(DASH); delay(400); }

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
  Serial.println("Sending SOS...");
}

void loop() {
  Serial.print("S"); S_letter();
  Serial.print("O"); O_letter();
  Serial.print("S"); S_letter();
  Serial.println(" (SOS complete)");
  delay(2000);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Morse Your Name', icon: '🎯',
        content: `
<h2>🎯 Challenge: Transmit a Letter</h2>
<p>Write a function that sends the Morse code for <strong>the letter "A" (· —)</strong>, then call it repeatedly from loop().</p>
<ul>
  <li>Define helper functions: <code>void dot()</code> and <code>void dash()</code></li>
  <li>Each plays the LED + tone for the right duration</li>
  <li>Create <code>void letterA()</code> that calls <code>dot()</code> then <code>dash()</code></li>
  <li>Call <code>letterA()</code> from loop() with a gap between repeats</li>
</ul>`,
        code: `const int LED = 13, BZR = 8;

void dot() {
  // Turn LED on, play tone for 200ms, turn off, gap

}

void dash() {
  // Turn LED on, play tone for 600ms, turn off, gap

}

void letterA() {
  dot();   // A = . -
  dash();
}

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  Serial.println("A");
  letterA();
  delay(1000);  // Gap between repeats
}`,
        validate: (code, _sim) => {
          return /void\s+dot\s*\(/.test(code) &&
                 /void\s+dash\s*\(/.test(code) &&
                 /void\s+letter/.test(code) &&
                 /digitalWrite/.test(code) &&
                 /tone\s*\(/.test(code);
        },
        hint: 'void dot() { digitalWrite(LED,HIGH); tone(BZR,800,200); delay(200); digitalWrite(LED,LOW); noTone(BZR); delay(200); }  void dash() is the same but with 600ms instead of 200ms.',
      },
    ],
  },

  // ── 27. Stopwatch ────────────────────────────────────────
  {
    id: 'stopwatch', title: 'Stopwatch with millis()', icon: '⏱️',
    difficulty: 'advanced', xp: 80,
    desc: 'Build a start/stop stopwatch using millis() and a button.',
    components: [{ type: 'button', pin: 2 }],
    steps: [
      {
        type: 'learn', title: 'How a Stopwatch Works', icon: '⏱️',
        content: `
<h2>Building a Digital Stopwatch</h2>
<p>A stopwatch has two states: <strong>running</strong> and <strong>stopped</strong>. Pressing a button toggles between them.</p>
<p>The key insight: we don't track "elapsed time" directly. Instead, we record <em>when we started</em>, then calculate elapsed time on demand:</p>
<div class="info-box">
<pre><code>unsigned long startTime = 0;
bool running = false;
unsigned long elapsed = 0;

// When START button pressed:
startTime = millis();
running = true;

// When STOP button pressed:
elapsed = millis() - startTime;
running = false;

// While running, to display current time:
unsigned long currentElapsed = millis() - startTime;
Serial.println(currentElapsed / 1000.0);</code></pre>
</div>
<p>This is exactly how real stopwatches work — record the start timestamp, then subtract from "now" to get elapsed time!</p>`,
        code: `unsigned long startTime = 0;
bool running = false;
unsigned long lastElapsed = 0;
int lastBtn = HIGH;
unsigned long lastPrint = 0;

void setup() {
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Stopwatch ready!");
  Serial.println("Press button to START/STOP");
}

void loop() {
  int btn = digitalRead(2);

  // Detect button press
  if (btn == LOW && lastBtn == HIGH) {
    if (!running) {
      startTime = millis();
      running = true;
      Serial.println("▶ STARTED");
    } else {
      lastElapsed = millis() - startTime;
      running = false;
      Serial.print("⏹ STOPPED — Time: ");
      Serial.print(lastElapsed / 1000.0, 2);
      Serial.println("s");
    }
    delay(50);  // debounce
  }
  lastBtn = btn;

  // Print while running every 500ms
  if (running && millis() - lastPrint >= 500) {
    lastPrint = millis();
    float elapsed = (millis() - startTime) / 1000.0;
    Serial.print("Running: ");
    Serial.print(elapsed, 1);
    Serial.println("s");
  }
}`,
      },
      {
        type: 'run', title: 'Use Your Stopwatch!', icon: '▶',
        content: `
<h2>Start and Stop!</h2>
<p>Click <strong>▶ Run</strong>, then click the <strong>PUSH button</strong> to start the stopwatch. Click again to stop it!</p>
<div class="info-box tip">
  💡 The Serial Monitor shows elapsed time while running (every 0.5s) and displays the final time when stopped.
</div>
<p>Try starting and stopping multiple times — each time gives you a fresh measurement!</p>`,
        code: `unsigned long startTime = 0;
bool running = false;
int lastBtn = HIGH;
unsigned long lastPrint = 0;

void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("=== STOPWATCH ===");
  Serial.println("Click button: START/STOP");
}

void loop() {
  int btn = digitalRead(2);
  if (btn == LOW && lastBtn == HIGH) {
    running = !running;
    if (running) {
      startTime = millis();
      digitalWrite(13, HIGH);
      Serial.println("▶ Running...");
    } else {
      float t = (millis() - startTime) / 1000.0;
      digitalWrite(13, LOW);
      Serial.print("STOPPED: "); Serial.print(t, 2); Serial.println("s");
    }
    delay(50);
  }
  lastBtn = btn;

  if (running && millis() - lastPrint >= 500) {
    lastPrint = millis();
    float t = (millis() - startTime) / 1000.0;
    Serial.print(t, 1); Serial.println("s");
  }
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Lap Timer', icon: '🎯',
        content: `
<h2>🎯 Challenge: Simple Lap Timer</h2>
<p>Modify the stopwatch to also record and print a <strong>lap time</strong> when the button is pressed while running (instead of stopping, it records the lap then keeps running).</p>
<p>For simplicity: use TWO button presses — first press starts, second records a lap, third stops.</p>
<ul>
  <li>State 0: idle → button → start (state 1)</li>
  <li>State 1: running → button → print lap time, keep running (state 2)</li>
  <li>State 2: running → button → print total time, stop (state 0)</li>
</ul>`,
        code: `int state = 0;  // 0=idle, 1=first lap, 2=second lap
unsigned long startTime = 0;
unsigned long lapTime = 0;
int lastBtn = HIGH;

void setup() {
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Lap Timer! Press 3 times.");
}

void loop() {
  int btn = digitalRead(2);
  if (btn == LOW && lastBtn == HIGH) {
    // Handle state transitions here!
    delay(50);
  }
  lastBtn = btn;
}`,
        validate: (code, _sim) => {
          return /millis\s*\(\s*\)/.test(code) &&
                 /state/.test(code) &&
                 /Serial\.print/.test(code) &&
                 /digitalRead\s*\(\s*2\s*\)/.test(code);
        },
        hint: 'if (state == 0) { startTime = millis(); state = 1; Serial.println("Go!"); } else if (state == 1) { Serial.print("Lap: "); Serial.println((millis()-startTime)/1000.0, 2); lapTime = millis(); state = 2; } else { Serial.print("Total: "); Serial.println((millis()-startTime)/1000.0, 2); state = 0; }',
      },
    ],
  },

  // ── 28. Alarm System ─────────────────────────────────────
  {
    id: 'alarm_system', title: 'Simple Alarm System', icon: '🚨',
    difficulty: 'intermediate', xp: 70,
    desc: 'Build an alarm that triggers when a sensor threshold is crossed.',
    components: [{ type: 'buzzer', pin: 8 }, { type: 'button', pin: 2 }],
    steps: [
      {
        type: 'learn', title: 'How Alarms Work', icon: '🚨',
        content: `
<h2>Building an Alarm System</h2>
<p>Real alarm systems follow a simple pattern:</p>
<ol>
  <li><strong>Monitor</strong> — constantly read a sensor</li>
  <li><strong>Detect</strong> — check if value exceeds a threshold</li>
  <li><strong>Alert</strong> — trigger buzzer, LEDs, notifications</li>
  <li><strong>Reset</strong> — turn off when cleared or button pressed</li>
</ol>
<p>We'll build a "intruder alarm" where the A0 sensor represents a motion sensor. When A0 goes above 800, the alarm triggers. Press the button to silence it.</p>
<div class="info-box">
  This is a <strong>state machine</strong> with 2 states:<br>
  • <code>MONITORING</code> — normal operation, watching sensor<br>
  • <code>ALARMING</code> — alarm triggered, wait for reset button
</div>
<p>The same pattern works for: temperature alarms, water leak detectors, door sensors, and many more real applications!</p>`,
        code: `const int BUZZER = 8;
const int LED    = 13;
const int BTN    = 2;
const int THRESHOLD = 700;  // Trigger when A0 > this

int alarming = false;

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BTN, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Alarm system armed!");
  Serial.print("Threshold: "); Serial.println(THRESHOLD);
}

void loop() {
  int sensorVal = analogRead(A0);

  if (!alarming) {
    // Monitoring
    if (sensorVal > THRESHOLD) {
      alarming = true;
      Serial.println("⚠️ ALARM TRIGGERED!");
    }
  } else {
    // Alarming
    tone(BUZZER, 1000, 200);
    digitalWrite(LED, HIGH);  delay(200);
    noTone(BUZZER);
    digitalWrite(LED, LOW);   delay(200);

    if (digitalRead(BTN) == LOW) {
      alarming = false;
      noTone(BUZZER);
      digitalWrite(LED, LOW);
      Serial.println("✅ Alarm silenced.");
      delay(500);
    }
  }
}`,
      },
      {
        type: 'run', title: 'Trigger the Alarm!', icon: '▶',
        content: `
<h2>Arm the Alarm!</h2>
<p>Click <strong>▶ Run</strong>. Then:</p>
<ol>
  <li>Drag the <strong>A0 slider</strong> above 700 — the alarm triggers!</li>
  <li>Watch the LED flash and the buzzer icon activate</li>
  <li>Press the <strong>PUSH button</strong> to silence the alarm</li>
</ol>
<div class="info-box tip">
  💡 Notice how the alarm keeps going even if you move A0 back below 700 — it only resets with the button. This is important for real alarms, so they don't self-reset!
</div>`,
        code: `const int BUZZER = 8, LED = 13, BTN = 2;
const int THRESHOLD = 700;
bool alarming = false;

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BTN, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("ALARM SYSTEM ARMED");
  Serial.println("Drag A0 above 700 to trigger. Button to silence.");
}

void loop() {
  int sensor = analogRead(A0);

  if (!alarming && sensor > THRESHOLD) {
    alarming = true;
    Serial.print("!!! ALARM at sensor="); Serial.println(sensor);
  }

  if (alarming) {
    digitalWrite(LED, HIGH); tone(BUZZER, 900, 150); delay(150);
    digitalWrite(LED, LOW);  noTone(BUZZER);         delay(150);
    if (digitalRead(BTN) == LOW) {
      alarming = false;
      Serial.println("Alarm reset by button.");
      delay(300);
    }
  } else {
    Serial.print("Monitoring. Sensor="); Serial.println(sensor);
    delay(500);
  }
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Countdown Alarm', icon: '🎯',
        content: `
<h2>🎯 Challenge: Delay Before Alarm</h2>
<p>Real alarms give you time to enter a code before triggering. Add a <strong>5-second countdown</strong> after threshold is crossed. If the button is pressed during the countdown, cancel the alarm. If not, it triggers!</p>
<ul>
  <li>When sensor > 700, print "INTRUDER! 5 seconds to disarm..."</li>
  <li>Count down 5 seconds (use millis())</li>
  <li>If button pressed during countdown: print "DISARMED" and reset</li>
  <li>If countdown finishes: trigger buzzer alarm</li>
</ul>`,
        code: `const int BUZZER = 8, LED = 13, BTN = 2;
bool alarming = false;
bool counting = false;
unsigned long countStart = 0;

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BTN, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Enter delay alarm system");
}

void loop() {
  int sensor = analogRead(A0);

  // Add your countdown alarm logic here!
  // 1. Detect threshold crossing → start countdown
  // 2. During countdown → check button to disarm
  // 3. Countdown expired → alarming = true
  // 4. When alarming → flash LED + buzz

}`,
        validate: (code, _sim) => {
          return /millis\s*\(\s*\)/.test(code) &&
                 /analogRead/.test(code) &&
                 /digitalRead\s*\(\s*BTN|digitalRead\s*\(\s*2/.test(code) &&
                 /tone\s*\(/.test(code) &&
                 /Serial\.print/.test(code);
        },
        hint: 'if (!alarming && !counting && sensor > 700) { counting = true; countStart = millis(); Serial.println("5 seconds!"); } if (counting) { if (digitalRead(BTN)==LOW) { counting=false; Serial.println("DISARMED"); } else if (millis()-countStart > 5000) { counting=false; alarming=true; } }',
      },
    ],
  },

  // ── 29. Temperature Monitor ──────────────────────────────
  {
    id: 'temp_monitor', title: 'Temperature Monitor', icon: '🌡️',
    difficulty: 'intermediate', xp: 65,
    desc: 'Simulate a temperature sensor, display readings, and alert when too hot.',
    steps: [
      {
        type: 'learn', title: 'Simulating a Temperature Sensor', icon: '🌡️',
        content: `
<h2>Reading Temperature (Simulated)</h2>
<p>A real temperature sensor like the <strong>TMP36</strong> outputs a voltage proportional to temperature. We read it with <code>analogRead()</code> and convert to Celsius using math.</p>
<p>For the TMP36:</p>
<div class="info-box">
<pre><code>float voltage = analogRead(A0) * (5.0 / 1023.0);
float tempC   = (voltage - 0.5) * 100.0;</code></pre>
  <br>
  At 0°C → sensor outputs 0.5V<br>
  At 25°C → 0.75V&nbsp;&nbsp;|&nbsp;&nbsp;At 100°C → 1.5V
</div>
<p>In our simulator, we'll use <code>map()</code> to treat the A0 slider as temperature (-10 to 60°C range):</p>
<div class="info-box tip">
<pre><code>int raw = analogRead(A0);
int tempC = map(raw, 0, 1023, -10, 60);</code></pre>
  Slider at 0 = -10°C (freezing), slider at max = 60°C (very hot)
</div>
<p>Drag the A0 slider to simulate different temperatures!</p>`,
        code: `void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);  // Alert LED
  Serial.println("Temperature Monitor Starting...");
}

void loop() {
  int raw = analogRead(A0);
  int tempC = map(raw, 0, 1023, -10, 60);

  Serial.print("Temp: ");
  Serial.print(tempC);
  Serial.print("°C  ");

  if (tempC < 0) {
    Serial.println("❄️ FREEZING");
    digitalWrite(13, LOW);
  } else if (tempC < 25) {
    Serial.println("😊 Comfortable");
    digitalWrite(13, LOW);
  } else if (tempC < 40) {
    Serial.println("😓 Warm");
    digitalWrite(13, LOW);
  } else {
    Serial.println("🔥 HOT! ALERT!");
    digitalWrite(13, HIGH);  // LED on when hot!
  }

  delay(600);
}`,
      },
      {
        type: 'run', title: 'Drag to Change Temperature!', icon: '▶',
        content: `
<h2>Simulate Different Temperatures!</h2>
<p>Click <strong>▶ Run</strong>, then drag the <strong>A0 slider</strong> to simulate different temperatures:</p>
<ul>
  <li>Far left → -10°C (freezing)</li>
  <li>Middle → ~25°C (comfortable)</li>
  <li>Far right → 60°C (alert! LED turns on)</li>
</ul>
<div class="info-box tip">
  💡 Real projects use this same pattern — read sensor, convert to meaningful units, display or trigger alerts based on thresholds. The same code structure works for humidity, pressure, CO2 levels, and more!
</div>`,
        code: `void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  Serial.println("=== Temp Monitor ===");
  Serial.println("Drag A0 slider to set temperature");
}

void loop() {
  int raw = analogRead(A0);
  int tempC = map(raw, 0, 1023, -10, 60);
  int tempF = tempC * 9 / 5 + 32;

  Serial.print(tempC); Serial.print("°C / ");
  Serial.print(tempF); Serial.print("°F");

  if (tempC >= 40) {
    Serial.println("  *** OVERHEAT ALERT ***");
    digitalWrite(13, HIGH);
  } else {
    Serial.println("  OK");
    digitalWrite(13, LOW);
  }

  delay(500);
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Temp Logger', icon: '🎯',
        content: `
<h2>🎯 Challenge: Min/Max Temperature Logger</h2>
<p>Write a sketch that tracks the <strong>minimum and maximum</strong> temperatures seen during the session and prints them alongside the current reading.</p>
<ul>
  <li>Initialize <code>int minTemp = 100;</code> and <code>int maxTemp = -100;</code></li>
  <li>Each loop, update min/max if current temp is lower/higher</li>
  <li>Print: current temp, min seen, max seen</li>
  <li>Drag the A0 slider to different values to see min/max update!</li>
</ul>`,
        code: `int minTemp = 100;   // Start very high so first reading beats it
int maxTemp = -100;  // Start very low so first reading beats it

void setup() {
  Serial.begin(9600);
  Serial.println("Min/Max Temperature Logger");
}

void loop() {
  int raw = analogRead(A0);
  int tempC = map(raw, 0, 1023, -10, 60);

  // Update min and max here!


  // Print current, min, max
  Serial.print("Now: "); Serial.print(tempC);
  Serial.print("°C  Min: "); Serial.print(minTemp);
  Serial.print("°C  Max: "); Serial.print(maxTemp);
  Serial.println("°C");

  delay(500);
}`,
        validate: (code, _sim) => {
          return /analogRead/.test(code) &&
                 /\bmap\s*\(/.test(code) &&
                 /minTemp|min_temp/.test(code) &&
                 /maxTemp|max_temp/.test(code) &&
                 /Serial\.print/.test(code);
        },
        hint: 'if (tempC < minTemp) minTemp = tempC;  if (tempC > maxTemp) maxTemp = tempC;',
      },
    ],
  },

  // ── 30. Digital Dice ─────────────────────────────────────
  {
    id: 'digital_dice', title: 'Digital Dice', icon: '🎲',
    difficulty: 'intermediate', xp: 65,
    desc: 'Press a button to roll a virtual die — LED blinks the result!',
    components: [{ type: 'button', pin: 2 }],
    steps: [
      {
        type: 'learn', title: 'Random Numbers on Arduino', icon: '🎲',
        content: `
<h2>Using Random Numbers</h2>
<p>Arduino has a built-in <code>random()</code> function that generates pseudo-random numbers:</p>
<div class="info-box">
  <code>random(1, 7)</code> → a random number from 1 to 6 (never 7!)<br><br>
  <strong>Note:</strong> The upper bound is <em>exclusive</em> — random(1, 7) gives 1, 2, 3, 4, 5, or 6.
</div>
<p>For truly unpredictable numbers, we use <code>randomSeed()</code> to give it a different starting point each time:</p>
<div class="info-box tip">
<pre><code>randomSeed(analogRead(A1));  // A1 has random "noise" — different each boot!</code></pre>
</div>
<p>Our digital dice will:</p>
<ol>
  <li>Wait for button press</li>
  <li>Generate a random number 1–6</li>
  <li>Blink the LED that many times</li>
  <li>Print the result to Serial</li>
</ol>`,
        code: `int lastBtn = HIGH;

void blinkN(int n) {
  for (int i = 0; i < n; i++) {
    digitalWrite(13, HIGH); delay(200);
    digitalWrite(13, LOW);  delay(200);
  }
}

void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  randomSeed(analogRead(A1));  // Seed with random noise
  Serial.println("🎲 Digital Dice ready!");
  Serial.println("Press button to roll!");
}

void loop() {
  int btn = digitalRead(2);

  if (btn == LOW && lastBtn == HIGH) {
    int roll = random(1, 7);  // 1-6
    Serial.print("Rolled: ");
    Serial.print(roll);
    Serial.println(" ← blinking now...");
    blinkN(roll);
    Serial.println("Press again to roll!");
    delay(500);
  }

  lastBtn = btn;
}`,
      },
      {
        type: 'run', title: 'Roll the Dice!', icon: '▶',
        content: `
<h2>Roll!</h2>
<p>Click <strong>▶ Run</strong>, then <strong>click the PUSH button</strong> to roll the dice. Watch pin 13 blink the result, and check the Serial Monitor for the number!</p>
<div class="info-box tip">
  💡 Every roll is random — you might get the same number twice in a row, just like a real die! The <code>randomSeed()</code> call makes the sequence different each time you restart.
</div>`,
        code: `int lastBtn = HIGH;

void blinkN(int n) {
  for (int i = 0; i < n; i++) {
    digitalWrite(13, HIGH); delay(250);
    digitalWrite(13, LOW);  delay(250);
  }
}

void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  randomSeed(analogRead(A1));
  Serial.println("=== DIGITAL DICE ===");
  Serial.println("Press button to roll! (1-6)");
}

void loop() {
  int btn = digitalRead(2);
  if (btn == LOW && lastBtn == HIGH) {
    int roll = random(1, 7);
    Serial.print("🎲 You rolled: "); Serial.println(roll);
    blinkN(roll);
    delay(300);
  }
  lastBtn = btn;
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Double Dice', icon: '🎯',
        content: `
<h2>🎯 Challenge: Roll Two Dice!</h2>
<p>Modify the dice to roll <strong>two dice at once</strong>. Print both individual results AND their sum. Blink the LED the sum total number of times.</p>
<ul>
  <li>Generate two separate random numbers (1-6 each)</li>
  <li>Print both: "Die 1: 4  Die 2: 3  Total: 7"</li>
  <li>Blink LED 7 times (the total)</li>
</ul>`,
        code: `int lastBtn = HIGH;

void blinkN(int n) {
  for (int i = 0; i < n; i++) {
    digitalWrite(13, HIGH); delay(150);
    digitalWrite(13, LOW);  delay(150);
  }
}

void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
  randomSeed(analogRead(A1));
  Serial.println("Double Dice! Press button.");
}

void loop() {
  int btn = digitalRead(2);
  if (btn == LOW && lastBtn == HIGH) {
    // Roll two dice and display both + sum

    delay(300);
  }
  lastBtn = btn;
}`,
        validate: (code, _sim) => {
          const rolls = (code.match(/random\s*\(\s*1\s*,\s*7\s*\)/g) || []).length;
          return rolls >= 2 &&
                 /Serial\.print/.test(code) &&
                 /blinkN|blink/.test(code) &&
                 /\+/.test(code);
        },
        hint: 'int d1 = random(1, 7); int d2 = random(1, 7); int total = d1 + d2; Serial.print("Die 1: "); Serial.print(d1); Serial.print("  Die 2: "); Serial.print(d2); Serial.print("  Total: "); Serial.println(total); blinkN(total);',
      },
    ],
  },

  // ── 31. PWM Fade Sequence ────────────────────────────────
  {
    id: 'fade_sequence', title: 'Multi-LED Fade Sequence', icon: '🌊',
    difficulty: 'advanced', xp: 80,
    desc: 'Create a smooth breathing/fading animation across multiple PWM LEDs.',
    steps: [
      {
        type: 'learn', title: 'The Breathing Effect', icon: '🌊',
        content: `
<h2>The LED "Breathing" Effect</h2>
<p>A "breathing" LED fades in and out smoothly — like a sleeping MacBook indicator. It uses PWM (<code>analogWrite()</code>) to control brightness.</p>
<p>The basic breathing loop:</p>
<div class="info-box">
<pre><code>// Fade IN
for (int b = 0; b <= 255; b++) {
  analogWrite(9, b);
  delay(5);  // 5ms per step × 256 steps = ~1.3s fade
}

// Fade OUT
for (int b = 255; b >= 0; b--) {
  analogWrite(9, b);
  delay(5);
}</code></pre>
</div>
<p>For a multi-LED sequence, we offset each LED slightly so they each breathe at a different point in the cycle — creating a wave-like ripple!</p>
<div class="info-box tip">
  💡 This kind of effect is used in gaming keyboards, phone indicators, and smart home lights. It's satisfying because smooth fading looks more "alive" than on/off blinking.
</div>`,
        code: `int pwmPins[] = {9, 10, 11};  // Must be PWM (~) pins!
int numPins = 3;

void setup() {
  for (int i = 0; i < numPins; i++) {
    pinMode(pwmPins[i], OUTPUT);
  }
  Serial.begin(9600);
  Serial.println("Fade sequence running!");
}

void loop() {
  // Each LED fades one at a time
  for (int p = 0; p < numPins; p++) {
    // Fade in
    for (int b = 0; b <= 255; b += 5) {
      analogWrite(pwmPins[p], b);
      delay(15);
    }
    // Fade out
    for (int b = 255; b >= 0; b -= 5) {
      analogWrite(pwmPins[p], b);
      delay(15);
    }
    analogWrite(pwmPins[p], 0);
  }
}`,
      },
      {
        type: 'run', title: 'Watch the Wave!', icon: '▶',
        content: `
<h2>Run the Fade Sequence!</h2>
<p>Click <strong>▶ Run</strong> and watch pins 9, 10, and 11 fade in and out one at a time, creating a smooth wave effect.</p>
<div class="info-box tip">
  💡 In the simulator, pins with PWM values show a brightness indicator. Watch them pulse through 0→255→0 in sequence!
</div>`,
        code: `int pwmPins[] = {9, 10, 11};
int n = 3;

void breathe(int pin) {
  for (int b = 0; b <= 255; b += 3) {
    analogWrite(pin, b); delay(8);
  }
  for (int b = 255; b >= 0; b -= 3) {
    analogWrite(pin, b); delay(8);
  }
  analogWrite(pin, 0);
}

void setup() {
  for (int i = 0; i < n; i++) pinMode(pwmPins[i], OUTPUT);
  Serial.begin(9600);
}

void loop() {
  for (int i = 0; i < n; i++) {
    Serial.print("Fading pin "); Serial.println(pwmPins[i]);
    breathe(pwmPins[i]);
  }
}`,
      },
      {
        type: 'challenge', title: 'Challenge: Custom Fade', icon: '🎯',
        content: `
<h2>🎯 Challenge: Breathe with millis()</h2>
<p>Rewrite the breathing LED using <code>millis()</code> instead of <code>delay()</code> so the LED smoothly fades on pin 9 <strong>without blocking loop()</strong>.</p>
<p>Hint: Use <code>sin()</code> math to create a smooth wave: brightness = (sin(time) + 1) / 2 × 255</p>
<ul>
  <li>Use <code>millis()</code> to track time</li>
  <li>Calculate brightness using the elapsed time</li>
  <li>Write brightness to pin 9 with <code>analogWrite()</code></li>
  <li>No <code>delay()</code> calls!</li>
</ul>`,
        code: `#include <math.h>  // For sin()

void setup() {
  pinMode(9, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  unsigned long t = millis();

  // Use sin() to create smooth wave:
  // sin() returns -1 to +1, we want 0 to 255
  float angle = t / 1000.0 * 3.14159;  // Full cycle every ~2s
  int brightness = (int)((sin(angle) + 1.0) / 2.0 * 255.0);

  // Apply to pin 9 here!

  delay(10);  // Small delay OK here (just 10ms — nearly non-blocking)
}`,
        validate: (code, _sim) => {
          return /millis\s*\(\s*\)/.test(code) &&
                 /sin\s*\(/.test(code) &&
                 /analogWrite\s*\(\s*9/.test(code);
        },
        hint: 'analogWrite(9, brightness);  Then optionally add: Serial.println(brightness); to see the wave in Serial Monitor!',
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

  // ── Real Hardware Lessons ────────────────────────────────

  {
    id: 'ultrasonic_sensor',
    icon: '📡',
    title: 'HC-SR04 Ultrasonic Distance',
    xp: 65,
    difficulty: 'beginner',
    desc: 'Use a real ultrasonic sensor to measure distances using sound pulses. Learn pulseIn(), timing in microseconds, and convert to centimeters.',
    parts: ['Arduino Uno', 'HC-SR04 ultrasonic sensor', '1x LED', '220Ω resistor', 'Breadboard', 'Jumper wires'],
    skills: ['pulseIn()', 'delayMicroseconds()', 'Serial output', 'if/else'],
    components: [{ type: 'ultrasonic', trigPin: 9, echoPin: 10 }],
    wiring: [
      'HC-SR04 VCC → 5V',
      'HC-SR04 GND → GND',
      'HC-SR04 TRIG → Pin 9',
      'HC-SR04 ECHO → Pin 10',
      'LED (+) → 220Ω → Pin 13, LED (-) → GND',
    ],
    theory: `
## How the HC-SR04 Works

The HC-SR04 sends a burst of 8 ultrasonic pulses at **40 kHz** when you pulse TRIG HIGH for 10 µs. Sound bounces off an object and returns to the sensor. The ECHO pin stays HIGH for the duration of the round-trip:

\`\`\`
distance (cm) = pulse duration (µs) ÷ 58
\`\`\`

Sound travels ~343 m/s, so the round-trip per cm takes ~58 µs.

### pulseIn()

\`pulseIn(pin, HIGH)\` waits for the pin to go HIGH, measures how long it stays HIGH (in µs), then returns that value:

\`\`\`cpp
long duration = pulseIn(echoPin, HIGH);  // µs
float cm = duration / 58.0;
\`\`\`

### Wiring

\`\`\`
    Arduino          HC-SR04
    5V       ──────  VCC
    GND      ──────  GND
    Pin 9    ──────  TRIG   (output: trigger pulse)
    Pin 10   ──────  ECHO   (input: echo return)
\`\`\`

> HC-SR04 ECHO outputs 5V — this is safe for Arduino Uno pins but not for 3.3V boards (use a voltage divider on those).

### Simulator
Drag the **distance slider** on the HC-SR04 component to simulate objects at different distances. \`pulseIn()\` returns the correct µs timing automatically.
    `,
    starterCode: `// HC-SR04 Ultrasonic Distance Sensor
// Wiring: TRIG→Pin 9, ECHO→Pin 10
// Simulator: drag the distance slider on the sensor component

const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const int ALERT_LED = 13;

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(ALERT_LED, OUTPUT);
  Serial.begin(9600);
  Serial.println("HC-SR04 ready — drag slider to set distance!");
}

void loop() {
  // 1. Send 10µs trigger pulse
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // 2. Measure echo duration (µs)
  long duration = pulseIn(ECHO_PIN, HIGH);

  // 3. Convert: ~58 µs per cm (round trip at 343 m/s)
  float cm = duration / 58.0;

  Serial.print("Distance: ");
  Serial.print(cm, 1);
  Serial.println(" cm");

  // Alert LED: on if closer than 20 cm
  if (cm < 20.0) {
    digitalWrite(ALERT_LED, HIGH);
    Serial.println("  !! OBJECT CLOSE !!");
  } else {
    digitalWrite(ALERT_LED, LOW);
  }

  delay(200);
}
`,
    challenge: 'Make the LED blink faster as objects get closer. Use the distance to set the blink delay: closer = shorter delay. Try: delay = (int)(cm * 5);',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l => l.includes('cm'));
    },
  },

  {
    id: 'dc_motor_hbridge',
    icon: '🔄',
    title: 'DC Motor & H-Bridge (L298N)',
    xp: 75,
    difficulty: 'intermediate',
    desc: 'Control a DC motor with an L298N H-bridge driver. Learn forward, reverse, speed control with PWM, and why H-bridges are essential for motor control.',
    parts: ['Arduino Uno', 'L298N H-bridge module', 'DC motor (3–12V)', 'External power supply', 'Breadboard', 'Jumper wires'],
    skills: ['analogWrite', 'PWM speed control', 'Direction control', 'H-bridge logic table'],
    components: [{ type: 'motor', enablePin: 6, in1Pin: 7, in2Pin: 8 }],
    wiring: [
      'L298N ENA → Pin 6 (PWM~)',
      'L298N IN1 → Pin 7',
      'L298N IN2 → Pin 8',
      'L298N +12V → External supply positive',
      'L298N GND → Arduino GND + supply GND',
      'Motor terminals → L298N OUT1 & OUT2',
    ],
    theory: `
## Why You Need an H-Bridge

A DC motor draws far more current than an Arduino pin can provide (max 40 mA per pin). The **L298N** uses power transistors to supply motor current from an external supply while your Arduino controls the logic.

An H-bridge has 4 transistors arranged in an "H" shape. By opening/closing different pairs, you reverse current flow — reversing the motor direction.

### L298N Logic Table

| ENA (speed) | IN1  | IN2  | Motor behavior |
|-------------|------|------|----------------|
| 0–255 PWM   | HIGH | LOW  | ▶ Forward      |
| 0–255 PWM   | LOW  | HIGH | ◀ Reverse      |
| any         | LOW  | LOW  | ~ Coast (free) |
| any         | HIGH | HIGH | ■ Brake (lock) |

### Wiring

\`\`\`
    Arduino          L298N Module
    Pin 6 (PWM~) ──  ENA    (speed 0-255)
    Pin 7        ──  IN1    (direction A)
    Pin 8        ──  IN2    (direction B)
    GND          ──  GND    (share with supply!)
                     +12V ← external supply
                     OUT1 / OUT2 → Motor terminals
\`\`\`

> **NEVER** connect a motor directly to an Arduino pin — back-EMF spikes will damage the microcontroller.

### Simulator
Watch the motor component: the speed bar fills with PWM%, the direction label updates with Forward/Reverse/Coast/Brake in real time.
    `,
    starterCode: `// DC Motor Control — L298N H-Bridge
// ENA→Pin 6 (PWM), IN1→Pin 7, IN2→Pin 8

const int ENA = 6;  // Speed via PWM (0-255)
const int IN1 = 7;  // Direction control
const int IN2 = 8;  // Direction control

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  Serial.begin(9600);
  Serial.println("L298N Motor driver ready!");
}

void motorForward(int speed) {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, speed);  // 0-255
}

void motorReverse(int speed) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, speed);
}

void motorStop() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
}

void loop() {
  Serial.println("Forward at 50% speed...");
  motorForward(128);
  delay(2000);

  Serial.println("Braking...");
  motorStop();
  delay(500);

  Serial.println("Reverse at 75% speed...");
  motorReverse(192);
  delay(2000);

  Serial.println("Full stop.");
  motorStop();
  delay(1000);
}
`,
    challenge: 'Add a soft-start ramp: instead of jumping instantly to full speed, use a for loop to gradually increase analogWrite from 0 to 200 over 1 second (50 steps × 20ms each).',
    validate(state) {
      return state.pwmUsed && state.serialUsed;
    },
  },

  {
    id: 'stepper_motor',
    icon: '⚙️',
    title: 'Stepper Motor Control',
    xp: 80,
    difficulty: 'intermediate',
    desc: 'Drive a 28BYJ-48 stepper motor precisely step by step. Understand coil energizing sequences, use the Stepper library, and calculate steps per revolution.',
    parts: ['Arduino Uno', '28BYJ-48 stepper motor', 'ULN2003 driver board', 'Breadboard', 'Jumper wires'],
    skills: ['Stepper library', 'Coil sequences', 'setSpeed()', 'step()', 'Gear ratios'],
    components: [{ type: 'stepper', pins: [8, 9, 10, 11] }],
    wiring: [
      'ULN2003 IN1 → Pin 8',
      'ULN2003 IN2 → Pin 9',
      'ULN2003 IN3 → Pin 10',
      'ULN2003 IN4 → Pin 11',
      'ULN2003 VCC → 5V (external 5V recommended)',
      'ULN2003 GND → GND',
    ],
    theory: `
## How Steppers Work

A stepper motor moves in discrete **steps** by energizing its coils in a specific sequence. Unlike DC motors, steppers need no feedback — each step is a guaranteed angular movement.

### 28BYJ-48 Specs

| Property | Value |
|----------|-------|
| Type | Unipolar, 4-phase |
| Internal step angle | 5.625° |
| Gear ratio | ~64:1 |
| Steps/revolution | 2048 (with gearbox) |
| Operating voltage | 5V |
| Driver | ULN2003 (Darlington array) |

### Full-Step Coil Sequence

| Step | IN1 | IN2 | IN3 | IN4 |
|------|-----|-----|-----|-----|
|  1   |  1  |  0  |  1  |  0  |
|  2   |  0  |  1  |  1  |  0  |
|  3   |  0  |  1  |  0  |  1  |
|  4   |  1  |  0  |  0  |  1  |

Repeat to spin CW; reverse for CCW.

### Stepper Library

Arduino's built-in \`Stepper\` library handles the sequence:

\`\`\`cpp
Stepper myStepper(2048, 8, 10, 9, 11); // note pin order!
myStepper.setSpeed(10);  // RPM
myStepper.step(2048);    // one full revolution CW
myStepper.step(-512);    // quarter rev CCW
\`\`\`

### Wiring

\`\`\`
    Arduino      ULN2003 board
    Pin 8  ────  IN1
    Pin 9  ────  IN2
    Pin 10 ────  IN3
    Pin 11 ────  IN4
    5V     ────  VCC  (or ext. 5V)
    GND    ────  GND
\`\`\`

### Simulator
Watch the **C1–C4 coil LEDs** light up in sequence as the motor steps. The step counter tracks total steps taken.
    `,
    starterCode: `// Stepper Motor — 28BYJ-48 + ULN2003
// Pins: IN1→8, IN2→9, IN3→10, IN4→11
#include <Stepper.h>

// 28BYJ-48: 2048 steps per full output revolution
const int STEPS_PER_REV = 2048;

// Stepper(steps, IN1, IN3, IN2, IN4) — library needs this order
Stepper myStepper(STEPS_PER_REV, 8, 10, 9, 11);

void setup() {
  // Keep speed <= 15 RPM for 28BYJ-48 reliability
  myStepper.setSpeed(10);
  Serial.begin(9600);
  Serial.println("Stepper ready!");
}

void loop() {
  Serial.println("One revolution clockwise...");
  myStepper.step(2048);   // positive = CW

  delay(500);

  Serial.println("Half revolution counter-clockwise...");
  myStepper.step(-1024);  // negative = CCW

  delay(500);

  Serial.println("Quarter revolution clockwise...");
  myStepper.step(512);

  delay(1000);
}
`,
    challenge: 'Calculate how many steps are needed to rotate exactly 45°. (Hint: 2048 steps = 360°, so 45° = ?) Write a function rotateDegrees(float deg) that takes any angle.',
    validate(state) {
      return state.serialUsed;
    },
  },

  {
    id: 'imu_sensor',
    icon: '🔵',
    title: 'IMU Accelerometer (MPU-6050)',
    xp: 85,
    difficulty: 'advanced',
    desc: 'Read 3-axis accelerometer data from an MPU-6050 over I2C. Learn the Wire library, decode 16-bit sensor values with bit-shifting, and detect tilt direction.',
    parts: ['Arduino Uno', 'MPU-6050 IMU module', 'Breadboard', 'Jumper wires'],
    skills: ['Wire library', 'I2C protocol', 'Bit-shifting', 'Register maps', 'Sensor scaling'],
    components: [{ type: 'imu' }],
    wiring: [
      'MPU-6050 VCC → 3.3V (some modules have onboard regulator: use 5V)',
      'MPU-6050 GND → GND',
      'MPU-6050 SDA → A4',
      'MPU-6050 SCL → A5',
      'MPU-6050 AD0 → GND  (I2C address = 0x68)',
    ],
    theory: `
## What is an IMU?

An **Inertial Measurement Unit** combines an accelerometer and gyroscope in one chip. The **MPU-6050** by InvenSense is one of the most popular 6-DOF IMUs for Arduino projects.

### I2C on Arduino Uno

| Signal | Arduino Pin |
|--------|-------------|
| SDA (data) | A4 |
| SCL (clock) | A5 |

Two wires, up to 127 devices on the same bus — each with a unique address.

### MPU-6050 Register Map (Accel)

| Register | Data |
|----------|------|
| 0x3B | AcX high byte |
| 0x3C | AcX low byte |
| 0x3D | AcY high byte |
| 0x3E | AcY low byte |
| 0x3F | AcZ high byte |
| 0x40 | AcZ low byte |

### Decoding 16-bit Values

\`\`\`cpp
int16_t AcX = (Wire.read() << 8) | Wire.read();
//             high byte shift     low byte
\`\`\`

### Scaling to g-force

Default range is ±2g → **16384 LSB per g**:

\`\`\`cpp
float gX = AcX / 16384.0;  // 0.0 = no accel, 1.0 = 1g
\`\`\`

When flat: X≈0g, Y≈0g, Z≈+1g (gravity pointing down).

### Simulator
Drag the **X**, **Y**, **Z** sliders on the IMU component. Center (512) = 0g. Full left = -1g. Full right = +1g. The Wire.requestFrom() call fills the read buffer automatically.
    `,
    starterCode: `// MPU-6050 Accelerometer via I2C
// SDA→A4, SCL→A5, AD0→GND (address 0x68)
#include <Wire.h>

const int MPU_ADDR = 0x68;

void setup() {
  Wire.begin();

  // Wake up the MPU-6050 (starts in sleep mode)
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x6B);  // PWR_MGMT_1 register
  Wire.write(0);     // 0 = wake up, use internal oscillator
  Wire.endTransmission(true);

  Serial.begin(9600);
  Serial.println("MPU-6050 ready!");
  Serial.println("Move the X/Y/Z sliders to simulate tilt.");
}

void loop() {
  // Set register pointer to accel data (0x3B)
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B);
  Wire.endTransmission(false);  // false = repeated start

  // Read 6 bytes: AcX_H, AcX_L, AcY_H, AcY_L, AcZ_H, AcZ_L
  Wire.requestFrom(MPU_ADDR, 6, true);

  int16_t AcX = (Wire.read() << 8) | Wire.read();
  int16_t AcY = (Wire.read() << 8) | Wire.read();
  int16_t AcZ = (Wire.read() << 8) | Wire.read();

  // Scale: ±2g range → 16384 LSB/g
  float gX = AcX / 16384.0;
  float gY = AcY / 16384.0;
  float gZ = AcZ / 16384.0;

  Serial.print("X:"); Serial.print(gX, 2);
  Serial.print("g  Y:"); Serial.print(gY, 2);
  Serial.print("g  Z:"); Serial.print(gZ, 2);
  Serial.print("g  ");

  // Tilt detection
  if (gX > 0.4)       Serial.println("→ Tilted RIGHT");
  else if (gX < -0.4) Serial.println("← Tilted LEFT");
  else if (gY > 0.4)  Serial.println("↑ Tilted FORWARD");
  else if (gY < -0.4) Serial.println("↓ Tilted BACK");
  else                Serial.println("✓ Level");

  delay(300);
}
`,
    challenge: 'Add gyroscope reading: after the accel request, request 6 more bytes from register 0x43 (GyX, GyY, GyZ high/low). Divide raw by 131.0 to get °/s (default ±250°/s range).',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('Tilt') || l.includes('Level') || l.includes('g'));
    },
  },

  {
    id: 'ir_remote',
    icon: '📺',
    title: 'IR Remote Control',
    xp: 70,
    difficulty: 'intermediate',
    desc: 'Receive infrared signals from a TV remote and decode button hex codes. Use the IRremote library to make your Arduino react to different buttons.',
    parts: ['Arduino Uno', 'VS1838B IR receiver module', 'Any NEC/Samsung remote', '1x LED', '220Ω resistor'],
    skills: ['IRremote library', 'IR protocols', 'Hex codes', 'switch/case'],
    components: [{ type: 'button', pin: 2 }],
    wiring: [
      'IR Receiver OUT → Pin 2',
      'IR Receiver VCC → 5V',
      'IR Receiver GND → GND',
      'LED (+) → 220Ω → Pin 13, LED (-) → GND',
    ],
    theory: `
## How IR Remote Control Works

TV remotes flash an **infrared LED** at a carrier frequency (typically **38 kHz**). Data is encoded as pulse durations using a protocol like **NEC**:

- **Start pulse:** 9 ms HIGH + 4.5 ms LOW
- **Bit 0:** 562 µs HIGH + 562 µs LOW
- **Bit 1:** 562 µs HIGH + 1687 µs LOW
- **32-bit packet:** address (8-bit) + ~address + command (8-bit) + ~command

The **VS1838B** receiver module demodulates the 38 kHz carrier and outputs a clean digital signal — no extra circuitry needed.

### IRremote Library (v3.x)

\`\`\`cpp
#include <IRremote.h>

const int IR_PIN = 2;
IRrecv irrecv(IR_PIN);

void setup() {
  irrecv.enableIRIn();
}

void loop() {
  if (irrecv.decode()) {
    Serial.println(irrecv.decodedIRData.decodedRawData, HEX);
    irrecv.resume();
  }
}
\`\`\`

### Finding Your Remote's Codes

1. Upload the scanner sketch
2. Open Serial Monitor
3. Press each button and note its hex code
4. Use those codes in a \`switch\` statement

### Simulator Note

The simulator uses a **push button on Pin 2** to simulate receiving IR codes. Each press cycles through different fake hex codes — simulating pressing different remote buttons.
    `,
    starterCode: `// IR Remote Control — Simulator version
// Real HW: VS1838B receiver on Pin 2
// Simulator: push the button to simulate IR codes

const int IR_PIN  = 2;
const int LED_PIN = 13;

bool ledOn = false;
// Simulated NEC codes (real codes vary by remote brand)
const long CODE_POWER  = 0xFF02FD;
const long CODE_VOL_UP = 0xFF18E7;
const long CODE_VOL_DN = 0xFF4AB5;

// Cycle through codes in simulator
long codes[] = {CODE_POWER, CODE_VOL_UP, CODE_VOL_DN};
int codeIdx = 0;

void setup() {
  pinMode(IR_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("IR Remote ready!");
  Serial.println("Press button to simulate remote button presses.");
  Serial.println("(Real HW: point remote at VS1838B on Pin 2)");
}

void handleCode(long code) {
  Serial.print("Received: 0x");
  Serial.println(code, HEX);

  switch (code) {
    case CODE_POWER:
      ledOn = !ledOn;
      digitalWrite(LED_PIN, ledOn);
      Serial.println("  [POWER] LED toggled");
      break;
    case CODE_VOL_UP:
      Serial.println("  [VOL+] (no action in this demo)");
      break;
    case CODE_VOL_DN:
      Serial.println("  [VOL-] (no action in this demo)");
      break;
    default:
      Serial.println("  [UNKNOWN] code not mapped");
  }
}

void loop() {
  // Simulator: button press = IR packet received
  if (digitalRead(IR_PIN) == LOW) {
    handleCode(codes[codeIdx]);
    codeIdx = (codeIdx + 1) % 3;
    delay(400);  // debounce
  }
}
`,
    challenge: 'Add a third action: when CODE_VOL_UP is received, blink the LED 3 times rapidly. Use a for loop with digitalWrite and short delays.',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('Received') || l.includes('POWER') || l.includes('VOL'));
    },
  },

  {
    id: 'servo_potentiometer',
    icon: '🎛️',
    title: 'Servo + Potentiometer',
    xp: 60,
    difficulty: 'beginner',
    desc: 'Control a servo motor\'s exact angle using a potentiometer. Learn the map() function to scale analog readings (0–1023) to servo angles (0°–180°) in real time.',
    parts: ['Arduino Uno', 'SG90 servo motor', '10kΩ potentiometer', 'Breadboard', 'Jumper wires'],
    skills: ['Servo library', 'map()', 'constrain()', 'analogRead()', 'Real-time feedback'],
    components: [{ type: 'servo', pin: 9 }],
    wiring: [
      'Servo signal (orange/yellow) → Pin 9',
      'Servo VCC (red) → 5V',
      'Servo GND (brown/black) → GND',
      'Potentiometer wiper (center) → A0',
      'Potentiometer end 1 → 5V',
      'Potentiometer end 2 → GND',
    ],
    theory: `
## Servo Motors

A servo motor holds a precise angular position based on a PWM pulse width:

| Pulse width | Angle |
|-------------|-------|
| 1.0 ms | 0° |
| 1.5 ms | 90° |
| 2.0 ms | 180° |

The Arduino **Servo** library generates the correct 50 Hz PWM signal automatically — just call \`myServo.write(angle)\`.

## Potentiometer as an Angle Input

A potentiometer is a variable voltage divider. Rotating it changes the wiper voltage from 0V to 5V, which \`analogRead()\` converts to **0–1023**.

### The map() Function

\`map()\` linearly scales one range to another:

\`\`\`cpp
int angle = map(potValue, 0, 1023, 0, 180);
//               value   in-min in-max out-min out-max
\`\`\`

### constrain() for Safety

Real potentiometers rarely hit exactly 0 or 1023. Use \`constrain()\` to clamp the angle:

\`\`\`cpp
angle = constrain(angle, 0, 180);
\`\`\`

### Wiring

\`\`\`
    Arduino       Servo             Pot
    Pin 9  ─────  Signal (orange)
    5V     ─────  VCC    (red)  ──  End 1
    GND    ─────  GND    (brown) ── End 2
    A0     ──────────────────────── Wiper
\`\`\`

### Simulator
Drag the **A0 slider** to simulate turning the potentiometer. Watch the servo arm sweep in real time!
    `,
    starterCode: `// Servo + Potentiometer Control
// Pot wiper → A0,  Servo signal → Pin 9
#include <Servo.h>

Servo myServo;

const int POT_PIN   = A0;
const int SERVO_PIN = 9;

void setup() {
  myServo.attach(SERVO_PIN);
  Serial.begin(9600);
  Serial.println("Servo + Pot ready!");
  Serial.println("Move the A0 slider to control servo angle.");
}

void loop() {
  int potVal = analogRead(POT_PIN);       // 0 to 1023
  int angle  = map(potVal, 0, 1023, 0, 180);  // scale to degrees
  angle = constrain(angle, 0, 180);       // safety clamp

  myServo.write(angle);

  Serial.print("Pot: ");
  Serial.print(potVal);
  Serial.print("  →  Angle: ");
  Serial.print(angle);
  Serial.println("°");

  delay(20);  // ~50 updates/sec — smooth and responsive
}
`,
    challenge: 'Limit the servo to only sweep between 30° and 150° regardless of pot position. Change the map() output range to 30–150 and update the constrain() limits to match.',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('Angle') || l.includes('°'));
    },
  },

  {
    id: 'rotary_encoder',
    icon: '🔁',
    title: 'Rotary Encoder & Interrupts',
    xp: 75,
    difficulty: 'intermediate',
    desc: 'Decode quadrature signals from a KY-040 rotary encoder using hardware interrupts. Track rotation direction and count, perfect for menus and position control.',
    parts: ['Arduino Uno', 'KY-040 rotary encoder module', 'Breadboard', 'Jumper wires'],
    skills: ['attachInterrupt()', 'volatile variables', 'ISR', 'Quadrature decoding', 'digitalPinToInterrupt()'],
    components: [{ type: 'button', pin: 2 }, { type: 'button', pin: 3 }],
    wiring: [
      'KY-040 CLK → Pin 2 (INT0)',
      'KY-040 DT  → Pin 3 (INT1)',
      'KY-040 SW  → Pin 4 (push button)',
      'KY-040 +   → 5V',
      'KY-040 GND → GND',
    ],
    theory: `
## Quadrature Encoding

A rotary encoder has two output pins (**CLK** and **DT**) producing square waves 90° out of phase:

\`\`\`
Clockwise:               Counter-clockwise:
CLK: ‾‾|__|‾‾|__         CLK: ‾‾|__|‾‾|__
DT:  __|‾‾|__|‾‾         DT:  ‾‾|__|‾‾|__
     ↑ CLK falls first        ↑ DT already LOW when CLK falls
\`\`\`

**Direction rule:** When CLK falls LOW:
- If DT is **HIGH** → Clockwise (+1)
- If DT is **LOW** → Counter-clockwise (-1)

## Hardware Interrupts

Polling \`digitalRead()\` in \`loop()\` can miss fast pulses. **Interrupts** let the CPU pause and run a special function (ISR) the instant a pin changes:

\`\`\`cpp
attachInterrupt(digitalPinToInterrupt(2), myISR, FALLING);
//                  convert pin to INT#    function  trigger
\`\`\`

Arduino Uno interrupt pins: **2** (INT0) and **3** (INT1).

## volatile Keyword

Variables shared between the ISR and main code must be \`volatile\` — this tells the compiler not to cache the value in a register:

\`\`\`cpp
volatile int counter = 0;  // ISR and loop() both use this
\`\`\`

### Simulator
- **Button on Pin 2** = CLK pulse (CW step)
- **Button on Pin 3** = DT pulse (CCW step)

Press them to simulate encoder rotation. On real hardware, one click of the knob generates one pulse.
    `,
    starterCode: `// Rotary Encoder with Hardware Interrupts
// CLK→Pin 2 (INT0), DT→Pin 3 (INT1), SW→Pin 4
// Simulator: Pin 2 button = CW step, Pin 3 button = CCW step

const int CLK_PIN = 2;  // Interrupt pin (INT0)
const int DT_PIN  = 3;  // Interrupt pin (INT1)
const int SW_PIN  = 4;  // Push button (reset)

volatile int  counter = 0;
volatile bool newStep = false;
volatile bool lastDir = true;  // true = CW

// ISR: called when CLK falls
void onCLK() {
  if (digitalRead(DT_PIN) == HIGH) {
    counter++;     // DT HIGH when CLK falls → CW
    lastDir = true;
  } else {
    counter--;     // DT LOW when CLK falls → CCW
    lastDir = false;
  }
  newStep = true;
}

// Simulator extra: DT button simulates direct CCW pulse
void onDT() {
  counter--;
  lastDir = false;
  newStep = true;
}

void setup() {
  pinMode(CLK_PIN, INPUT_PULLUP);
  pinMode(DT_PIN,  INPUT_PULLUP);
  pinMode(SW_PIN,  INPUT_PULLUP);

  // Attach interrupts — FALLING = trigger when pin goes LOW
  attachInterrupt(digitalPinToInterrupt(CLK_PIN), onCLK, FALLING);
  attachInterrupt(digitalPinToInterrupt(DT_PIN),  onDT,  FALLING);

  Serial.begin(9600);
  Serial.println("Rotary Encoder ready!");
  Serial.println("Pin2=CW  Pin3=CCW  Pin4=Reset");
}

void loop() {
  if (newStep) {
    newStep = false;
    Serial.print(lastDir ? "CW  " : "CCW ");
    Serial.print("Counter: ");
    Serial.println(counter);
  }

  // Push SW to reset counter
  if (digitalRead(SW_PIN) == LOW) {
    counter = 0;
    Serial.println(">> Counter reset to 0");
    delay(300);  // debounce
  }
}
`,
    challenge: 'Use the counter to dim an LED: map the counter (clamped 0–20) to PWM (0–255) on Pin 11. Use constrain() to keep the counter in range, then analogWrite() the LED brightness.',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('Counter') || l.includes('CW') || l.includes('CCW'));
    },
  },

  {
    id: 'ir_sensor',
    icon: '🚧',
    title: 'IR Obstacle Sensor',
    xp: 55,
    difficulty: 'beginner',
    desc: 'Use an IR proximity sensor to detect obstacles. Perfect for robot collision avoidance — the sensor outputs a digital HIGH/LOW signal based on whether something is in range.',
    parts: ['Arduino Uno', 'FC-51 or KY-032 IR obstacle sensor', '1x LED', '220Ω resistor', 'Breadboard'],
    skills: ['digitalRead()', 'INPUT_PULLUP', 'if/else', 'Sensor calibration'],
    components: [{ type: 'button', pin: 2 }],
    wiring: [
      'IR Sensor VCC → 5V',
      'IR Sensor GND → GND',
      'IR Sensor DO (digital out) → Pin 2',
      'LED (+) → 220Ω → Pin 13, LED (-) → GND',
      'Adjust the onboard potentiometer to set detection distance (2–30 cm)',
    ],
    theory: `
## How IR Obstacle Sensors Work

The sensor has an **IR LED** (emitter) and a **photodiode** (receiver). The emitter constantly pulses infrared light. When an object is close enough, the IR light reflects back to the receiver.

The **DO (Digital Output)** pin:
- **HIGH** (1) = No obstacle
- **LOW** (0) = Obstacle detected

This is **active LOW** behavior, similar to INPUT_PULLUP buttons.

### Sensor Modules (FC-51, KY-032)

| Feature | Value |
|---------|-------|
| Range | 2–30 cm (adjustable) |
| Supply | 3.3V or 5V |
| Output | Digital DO + Analog AO |
| Adjust | Onboard potentiometer |

### Wiring

\`\`\`
    Arduino        FC-51 / KY-032
    5V      ─────  VCC
    GND     ─────  GND
    Pin 2   ─────  DO (Digital Output)
\`\`\`

### Simulator
The push button simulates the IR sensor output. **Released** = no obstacle (HIGH). **Pressed and held** = obstacle detected (LOW).
    `,
    starterCode: `// IR Obstacle Sensor
// DO → Pin 2 (HIGH = clear, LOW = obstacle detected)
// Simulator: hold the button to simulate an obstacle

const int IR_PIN  = 2;
const int LED_PIN = 13;

void setup() {
  pinMode(IR_PIN, INPUT);   // IR sensor output
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("IR Obstacle Sensor ready!");
  Serial.println("Hold button to simulate obstacle.");
}

void loop() {
  int obstacle = digitalRead(IR_PIN);

  if (obstacle == LOW) {
    // LOW = obstacle in range (active LOW)
    digitalWrite(LED_PIN, HIGH);
    Serial.println("!! OBSTACLE DETECTED !!");
  } else {
    // HIGH = path clear
    digitalWrite(LED_PIN, LOW);
    Serial.println("-- Path clear");
  }

  delay(200);
}
`,
    challenge: 'Add a second LED on pin 12. Make the "clear" LED (pin 12) on when the path is clear, and the "obstacle" LED (pin 13) on when blocked. Both LEDs must never be on at the same time.',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('OBSTACLE') || l.includes('clear') || l.includes('Clear'));
    },
  },

  {
    id: 'pir_motion',
    icon: '👁️',
    title: 'PIR Motion Sensor',
    xp: 55,
    difficulty: 'beginner',
    desc: 'Detect human movement with a passive infrared sensor. Build a motion-triggered alarm with an LED and buzzer — exactly like real security systems.',
    parts: ['Arduino Uno', 'HC-SR501 PIR sensor', '1x LED', '1x buzzer', '220Ω resistor', 'Breadboard'],
    skills: ['digitalRead()', 'millis() debounce', 'Motion detection', 'if/else'],
    components: [{ type: 'button', pin: 2 }, { type: 'buzzer', pin: 8 }],
    wiring: [
      'PIR VCC → 5V',
      'PIR GND → GND',
      'PIR OUT → Pin 2',
      'LED (+) → 220Ω → Pin 13',
      'Buzzer (+) → Pin 8',
      'Both LED and buzzer GND → Arduino GND',
      'Allow 30–60s warm-up time on first power-up',
    ],
    theory: `
## How PIR Sensors Work

A **Passive Infrared (PIR)** sensor detects changes in infrared radiation — specifically the heat signature of humans and animals moving through its field of view.

Key word: **Passive** — it detects IR, it doesn't emit it (unlike IR obstacle sensors).

### HC-SR501 Specs

| Feature | Value |
|---------|-------|
| Output | HIGH for ~3s when motion detected |
| Range | 3–7 meters |
| Angle | ~120° cone |
| Supply | 5–20V |
| Warm-up | 30–60 seconds |

### Two Onboard Potentiometers

- **Sensitivity pot** (left): adjust detection range (3–7m)
- **Time-delay pot** (right): adjust how long output stays HIGH (3s to 5min)

### Wiring

\`\`\`
    Arduino        HC-SR501
    5V      ─────  VCC (middle pin)
    GND     ─────  GND
    Pin 2   ─────  OUT
\`\`\`

### Simulator
The button simulates PIR output. **Press and hold** = motion detected (HIGH pulse). **Release** = no motion.
    `,
    starterCode: `// PIR Motion Sensor — Motion-activated alarm
// PIR OUT → Pin 2  (HIGH = motion, LOW = no motion)
// Simulator: press the button to simulate motion

const int PIR_PIN    = 2;
const int LED_PIN    = 13;
const int BUZZER_PIN = 8;

bool alarmActive = false;

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("PIR Motion Sensor ready!");
  Serial.println("(Allow 30s warm-up on real hardware)");
}

void loop() {
  int motion = digitalRead(PIR_PIN);

  if (motion == HIGH) {
    // Motion detected!
    alarmActive = true;
    digitalWrite(LED_PIN, HIGH);
    tone(BUZZER_PIN, 1000, 200);
    Serial.println(">> MOTION DETECTED!");
    delay(200);
  } else {
    if (alarmActive) {
      Serial.println("-- Motion stopped.");
      alarmActive = false;
    }
    digitalWrite(LED_PIN, LOW);
    noTone(BUZZER_PIN);
  }

  delay(100);
}
`,
    challenge: 'Add a "snooze" feature: after motion is detected, ignore further triggers for 5 seconds (use millis() to track when the last detection happened).',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('MOTION') || l.includes('motion'));
    },
  },

  {
    id: 'microphone_sensor',
    icon: '🎤',
    title: 'Microphone Sound Sensor',
    xp: 50,
    difficulty: 'beginner',
    desc: 'Detect sounds like claps using a KY-038 microphone module. Read both the digital threshold output and the raw analog audio signal.',
    parts: ['Arduino Uno', 'KY-038 or KY-037 sound sensor', '1x LED', '220Ω resistor', 'Breadboard'],
    skills: ['digitalRead()', 'analogRead()', 'Threshold detection', 'Sound-activated projects'],
    components: [{ type: 'button', pin: 7 }],
    wiring: [
      'KY-038 VCC → 5V',
      'KY-038 GND → GND',
      'KY-038 DO (digital) → Pin 7',
      'KY-038 AO (analog) → A0',
      'LED (+) → 220Ω → Pin 13',
      'Adjust the onboard potentiometer for clap sensitivity',
    ],
    theory: `
## KY-038 Sound Sensor

The module has a small electret microphone that converts sound waves into a varying voltage signal.

### Two Outputs

| Output | Type | Range | Use |
|--------|------|-------|-----|
| AO | Analog | 0–1023 | Raw audio level |
| DO | Digital | 0 or 1 | Threshold exceeded |

The **DO** (digital output) goes HIGH when sound exceeds the threshold set by the onboard potentiometer — perfect for clap detection.

The **AO** (analog output) gives the raw amplitude — useful for measuring sound level or recording patterns.

### Detection Technique

For reliable clap detection, look for a brief HIGH pulse followed by return to LOW:

\`\`\`cpp
if (digitalRead(DO_PIN) == HIGH) {
  // Sound detected!
  Serial.println("Clap!");
  delay(200);  // debounce — ignore echoes
}
\`\`\`

### Wiring

\`\`\`
    Arduino        KY-038
    5V      ─────  VCC
    GND     ─────  GND
    Pin 7   ─────  DO   (digital threshold)
    A0      ─────  AO   (analog audio)
\`\`\`

### Simulator
The button on Pin 7 simulates the DO output. Slide **A0** to simulate different sound levels on the analog output.
    `,
    starterCode: `// Microphone Sound Sensor — Clap Detector
// DO → Pin 7  (HIGH = sound threshold exceeded)
// AO → A0     (0-1023 raw sound level)
// Simulator: press button = clap, A0 slider = volume

const int DO_PIN  = 7;
const int LED_PIN = 13;

int clapCount = 0;

void setup() {
  pinMode(DO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Clap detector ready!");
  Serial.println("Clap near the mic (or press button in simulator)");
}

void loop() {
  // Read digital threshold output
  if (digitalRead(DO_PIN) == HIGH) {
    clapCount++;
    digitalWrite(LED_PIN, HIGH);
    Serial.print("CLAP #");
    Serial.println(clapCount);
    delay(200);  // debounce
    digitalWrite(LED_PIN, LOW);
  }

  // Read raw analog sound level
  int volume = analogRead(A0);
  if (volume > 600) {
    Serial.print("Loud sound! Level: ");
    Serial.println(volume);
  }

  delay(50);
}
`,
    challenge: 'Build a clap-toggle light: one clap turns the LED on, the next clap turns it off. Track whether the LED is currently on and toggle it on each clap detection.',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('CLAP') || l.includes('clap') || l.includes('Clap'));
    },
  },

  {
    id: 'joystick',
    icon: '🕹️',
    title: 'Analog Joystick',
    xp: 60,
    difficulty: 'beginner',
    desc: 'Read a dual-axis analog joystick with push-button click. Map the X/Y axes to directions and use the joystick for games, robot control, or menu navigation.',
    parts: ['Arduino Uno', 'KY-023 joystick module', 'Breadboard', 'Jumper wires'],
    skills: ['analogRead()', 'Dual-axis input', 'map()', 'Direction detection'],
    components: [{ type: 'button', pin: 10 }],
    wiring: [
      'Joystick VCC → 5V',
      'Joystick GND → GND',
      'Joystick VRX (X axis) → A0',
      'Joystick VRY (Y axis) → A1',
      'Joystick SW (push button) → Pin 10',
    ],
    theory: `
## KY-023 Joystick Module

The joystick has two **potentiometers** (one per axis) and a **push-button** that activates when you press the stick down.

### Reading the Axes

Each axis outputs 0–5V which analogRead() converts to 0–1023:

| Position | X (A0) | Y (A1) |
|----------|--------|--------|
| Center   | ~512   | ~512   |
| Left     | ~0     | —      |
| Right    | ~1023  | —      |
| Up       | —      | ~0     |
| Down     | —      | ~1023  |

> Note: exact values vary by module — always center-test first.

### Dead Zone

Joysticks have mechanical slop. Add a **dead zone** of ±50 around center to avoid phantom movements:

\`\`\`cpp
if (abs(xVal - 512) < 50) xVal = 512;  // snap to center
\`\`\`

### Push Button

The SW pin uses INPUT_PULLUP — LOW when pressed:

\`\`\`cpp
pinMode(SW_PIN, INPUT_PULLUP);
bool clicked = (digitalRead(SW_PIN) == LOW);
\`\`\`

### Wiring

\`\`\`
    Arduino      KY-023
    5V    ─────  VCC
    GND   ─────  GND
    A0    ─────  VRX  (X axis)
    A1    ─────  VRY  (Y axis)
    Pin 10 ────  SW   (button)
\`\`\`

### Simulator
Use **A0 slider** = X axis, **A1 slider** = Y axis. The **Pin 10 button** = joystick click.
    `,
    starterCode: `// KY-023 Dual-Axis Joystick
// X → A0, Y → A1, Click → Pin 10
// Simulator: A0/A1 sliders = axes, Pin10 button = click

const int SW_PIN = 10;  // Joystick push button

void setup() {
  pinMode(SW_PIN, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Joystick ready!");
  Serial.println("Move A0/A1 sliders, press Pin10 button.");
}

void loop() {
  int xRaw = analogRead(A0);  // 0-1023
  int yRaw = analogRead(A1);  // 0-1023
  bool clicked = (digitalRead(SW_PIN) == LOW);

  // Map to -100..+100 range for easier use
  int x = map(xRaw, 0, 1023, -100, 100);
  int y = map(yRaw, 0, 1023, -100, 100);

  // Dead zone: ignore small center wobble
  if (abs(x) < 10) x = 0;
  if (abs(y) < 10) y = 0;

  // Determine direction
  String dir = "CENTER";
  if      (x < -30) dir = "LEFT";
  else if (x >  30) dir = "RIGHT";
  if      (y < -30) dir = (dir == "CENTER") ? "UP" : dir + "-UP";
  else if (y >  30) dir = (dir == "CENTER") ? "DOWN" : dir + "-DOWN";

  Serial.print("X:");
  Serial.print(x);
  Serial.print("  Y:");
  Serial.print(y);
  Serial.print("  Dir: ");
  Serial.print(dir);
  if (clicked) Serial.print("  [CLICK!]");
  Serial.println();

  delay(150);
}
`,
    challenge: 'Use the joystick X axis to control a servo (Servo library on Pin 9). Map X (0–1023) to servo angle (0°–180°). Moving the joystick left/right should swing the servo arm.',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('LEFT') || l.includes('RIGHT') || l.includes('CENTER') || l.includes('X:'));
    },
  },

  {
    id: 'lcd_i2c',
    icon: '📺',
    title: 'LCD 16×2 with I2C',
    xp: 80,
    difficulty: 'intermediate',
    desc: 'Display text and sensor data on a 16-character × 2-row LCD using only 2 wires (I2C). Learn the LiquidCrystal_I2C library and build a real-time data display.',
    parts: ['Arduino Uno', '16×2 LCD with I2C backpack (PCF8574)', 'Breadboard', 'Jumper wires'],
    skills: ['LiquidCrystal_I2C', 'lcd.setCursor()', 'lcd.print()', 'lcd.clear()', 'I2C display'],
    components: [{ type: 'lcd' }],
    wiring: [
      'LCD I2C module VCC → 5V',
      'LCD I2C module GND → GND',
      'LCD I2C module SDA → A4',
      'LCD I2C module SCL → A5',
      'Most I2C backpacks use address 0x27 or 0x3F — try both if display is blank',
    ],
    theory: `
## LCD 16×2 with I2C Backpack

A standard 16×2 LCD needs 6–11 wires. The **I2C backpack** (PCF8574 port expander) reduces this to just **4 wires**: VCC, GND, SDA, SCL.

### Display Layout

\`\`\`
  Col:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
Row 0: [H][e][l][l][o][ ][W][o][r][l][d][!][ ][ ][ ][ ]
Row 1: [T][e][m][p][:][ ][2][3][.][5][°][C][ ][ ][ ][ ]
\`\`\`

### LiquidCrystal_I2C Library

\`\`\`cpp
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);  // addr, cols, rows

void setup() {
  lcd.init();          // initialize the LCD
  lcd.backlight();     // turn on backlight
  lcd.setCursor(0, 0); // col 0, row 0
  lcd.print("Hello!");
  lcd.setCursor(0, 1); // col 0, row 1
  lcd.print("World!");
}
\`\`\`

### Key Functions

| Function | What it does |
|----------|-------------|
| \`lcd.init()\` | Initialize display |
| \`lcd.backlight()\` | Turn on backlight |
| \`lcd.clear()\` | Clear screen, cursor → 0,0 |
| \`lcd.setCursor(col, row)\` | Move cursor |
| \`lcd.print(val)\` | Print text/numbers |
| \`lcd.noBacklight()\` | Turn off backlight |

### Finding Your I2C Address

Run an I2C scanner sketch — it will print all detected addresses. Common addresses: **0x27** and **0x3F**.

### Simulator
The LCD component shows a real 16×2 display that updates live as your code calls lcd.print(). Call lcd.backlight() to turn it on.
    `,
    starterCode: `// LCD 16x2 with I2C Backpack
// SDA → A4, SCL → A5
// Most common address: 0x27 (try 0x3F if blank)
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

int counter = 0;

void setup() {
  lcd.init();
  lcd.backlight();
  Serial.begin(9600);

  // Welcome message
  lcd.setCursor(0, 0);
  lcd.print("Arduino LCD Demo");
  lcd.setCursor(0, 1);
  lcd.print("   Hello World! ");

  Serial.println("LCD initialized!");
  delay(2000);
}

void loop() {
  counter++;

  // Row 0: uptime in seconds
  lcd.setCursor(0, 0);
  lcd.print("Uptime: ");
  lcd.print(millis() / 1000);
  lcd.print("s   ");  // spaces erase old digits

  // Row 1: counter
  lcd.setCursor(0, 1);
  lcd.print("Count:  ");
  lcd.print(counter);
  lcd.print("     ");

  Serial.print("LCD updated. Count: ");
  Serial.println(counter);

  delay(500);
}
`,
    challenge: 'Add a potentiometer (A0 slider) that displays its value as a percentage bar on row 1 using block characters. Hint: map A0 (0-1023) to 0-16 filled spaces, then pad with empty spaces to always fill 16 chars.',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('LCD') || l.includes('Count') || l.includes('initialized'));
    },
  },

  {
    id: 'continuous_servo',
    icon: '🌀',
    title: 'Continuous Rotation Servo',
    xp: 65,
    difficulty: 'intermediate',
    desc: 'Control a continuous rotation servo for wheeled robots and conveyors. Learn how writeMicroseconds() sets speed and direction instead of position.',
    parts: ['Arduino Uno', 'FS90R or modified continuous servo', 'Breadboard', 'Jumper wires'],
    skills: ['Servo library', 'writeMicroseconds()', 'Speed control', 'Direction reversal'],
    components: [{ type: 'servo', pin: 9 }],
    wiring: [
      'Servo signal (orange) → Pin 9',
      'Servo VCC (red) → 5V (external supply recommended for heavy servos)',
      'Servo GND (brown/black) → GND (shared with Arduino)',
    ],
    theory: `
## Standard vs. Continuous Rotation Servo

| Feature | Standard Servo | Continuous Servo |
|---------|---------------|-----------------|
| Output | Angle (0°–180°) | Speed + Direction |
| write(90) | Hold center | **Stop** |
| write(0)  | Go to 0° | Full speed CW |
| write(180)| Go to 180° | Full speed CCW |
| Feedback | Internal pot | None |

A continuous servo has its internal feedback pot **removed or bypassed** — so the motor just keeps spinning.

### writeMicroseconds() for Fine Control

\`write(angle)\` is coarse. Use \`writeMicroseconds()\` for precise speed control:

| µs value | Behavior |
|----------|---------|
| 1500 | Stop (neutral) |
| < 1500 | CW (lower = faster) |
| > 1500 | CCW (higher = faster) |
| 1000 | Full speed CW |
| 2000 | Full speed CCW |

\`\`\`cpp
servo.writeMicroseconds(1400);  // slow CW
servo.writeMicroseconds(1500);  // stop
servo.writeMicroseconds(1600);  // slow CCW
\`\`\`

> **Calibration tip:** The exact stop point varies by servo (usually 1490–1510 µs). Adjust until it truly stops.

### Simulator
The servo arm shows the pulse position (not rotation speed). \`write(90)\` stops it, lower values spin CW, higher CCW.
    `,
    starterCode: `// Continuous Rotation Servo
// Signal → Pin 9
// writeMicroseconds: 1500 = stop, 1000 = full CW, 2000 = full CCW
#include <Servo.h>

Servo contServo;

const int SERVO_PIN = 9;
const int STOP  = 1500;  // calibrate this: try 1490–1510
const int SLOW  = 100;   // offset from STOP for slow speed
const int FAST  = 400;   // offset from STOP for fast speed

void setup() {
  contServo.attach(SERVO_PIN);
  contServo.writeMicroseconds(STOP);  // start stopped
  Serial.begin(9600);
  Serial.println("Continuous servo ready!");
}

void loop() {
  Serial.println("Spinning CW slow (2s)...");
  contServo.writeMicroseconds(STOP - SLOW);  // CW
  delay(2000);

  Serial.println("Stopping (1s)...");
  contServo.writeMicroseconds(STOP);
  delay(1000);

  Serial.println("Spinning CCW fast (2s)...");
  contServo.writeMicroseconds(STOP + FAST);  // CCW
  delay(2000);

  Serial.println("Stopping (1s)...");
  contServo.writeMicroseconds(STOP);
  delay(1000);
}
`,
    challenge: 'Use the A0 slider to control the continuous servo in real time. Map A0 (0–1023) to µs (1000–2000). The center position (A0=512) should stop the servo.',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('CW') || l.includes('CCW') || l.includes('Spinning') || l.includes('servo'));
    },
  },

  {
    id: 'dht11_sensor',
    icon: '🌡️',
    title: 'DHT11 Temperature & Humidity',
    xp: 70,
    difficulty: 'intermediate',
    desc: 'Read temperature and humidity from a DHT11 sensor using a single data wire. Build a weather station that logs readings to the serial monitor.',
    parts: ['Arduino Uno', 'DHT11 sensor module', '1x LED', '220Ω resistor', 'Breadboard'],
    skills: ['DHT library', 'isnan()', 'Sensor libraries', 'Data formatting'],
    components: [],
    wiring: [
      'DHT11 VCC → 5V',
      'DHT11 GND → GND',
      'DHT11 DATA → Pin 4',
      'If bare sensor (not module): add 10kΩ pull-up resistor from DATA to VCC',
      'Wait 2 seconds between readings or data will be stale',
    ],
    theory: `
## DHT11 Sensor

The DHT11 uses a proprietary single-wire protocol to send temperature and humidity in a 40-bit packet. The DHT.h library handles all the timing automatically.

### Specifications

| Measurement | Range | Accuracy | Resolution |
|-------------|-------|----------|------------|
| Temperature | 0–50°C | ±2°C | 1°C |
| Humidity | 20–90% RH | ±5% RH | 1% |

> For better accuracy use **DHT22**: -40–80°C, ±0.5°C, 0–100% RH.

### Library Usage

\`\`\`cpp
#include <DHT.h>
#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() { dht.begin(); }

void loop() {
  float temp = dht.readTemperature();  // °C
  float hum  = dht.readHumidity();     // %
  if (isnan(temp) || isnan(hum)) {
    Serial.println("Read failed!");
    return;
  }
  delay(2000);  // minimum between reads
}
\`\`\`

### isnan() Check

Always check for NaN (Not a Number) — if the read fails (bad wiring, too fast), the library returns NaN:

\`\`\`cpp
if (isnan(temp)) { Serial.println("Error!"); return; }
\`\`\`

### Simulator
**A0 slider** = Temperature (maps to 0–50°C). **A1 slider** = Humidity (maps to 20–90% RH). The DHT stub reads these sliders automatically.
    `,
    starterCode: `// DHT11 Temperature & Humidity Sensor
// DATA → Pin 4
// Simulator: A0 slider = temperature (0-50°C), A1 = humidity (20-90%)
#include <DHT.h>

#define DHTPIN  4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  dht.begin();
  Serial.begin(9600);
  Serial.println("DHT11 Weather Station ready!");
  Serial.println("A0 slider = temp, A1 slider = humidity");
  delay(2000);  // sensor stabilization
}

void loop() {
  float temperature = dht.readTemperature();  // Celsius
  float humidity    = dht.readHumidity();     // %

  // Always check for read errors
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Error: DHT read failed! Check wiring.");
    delay(2000);
    return;
  }

  // Compute heat index (feels-like temperature)
  float heatIndex = dht.computeHeatIndex(temperature, humidity, false);

  Serial.print("Temp: ");
  Serial.print(temperature, 1);
  Serial.print("°C  Humidity: ");
  Serial.print(humidity, 1);
  Serial.print("%  Feels like: ");
  Serial.print(heatIndex, 1);
  Serial.println("°C");

  // Simple comfort indicator
  if (temperature > 30 && humidity > 70) {
    Serial.println("  >> Uncomfortable: hot & humid");
  } else if (temperature < 15) {
    Serial.println("  >> Cold! Bundle up.");
  } else {
    Serial.println("  >> Comfortable range.");
  }

  delay(2000);  // DHT11 needs minimum 2s between reads
}
`,
    challenge: 'Add the LCD display (lesson before): show temperature on row 0 and humidity on row 1 of a 16×2 LCD. Format: "Temp: 23.5 C" and "Hum:  65 %".',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('Temp') || l.includes('°C') || l.includes('Humidity'));
    },
  },

  {
    id: 'relay_module',
    icon: '⚡',
    title: 'Relay Module',
    xp: 65,
    difficulty: 'intermediate',
    desc: 'Control high-voltage devices (AC lights, pumps, motors) safely from your Arduino using a relay module. Learn active-LOW logic and why isolation is critical.',
    parts: ['Arduino Uno', '1-channel 5V relay module', 'LED (to simulate load)', '220Ω resistor', 'Breadboard'],
    skills: ['digitalWrite()', 'Active-LOW logic', 'Relay switching', 'Safety practices'],
    components: [],
    wiring: [
      'Relay module VCC → 5V',
      'Relay module GND → GND',
      'Relay module IN → Pin 7',
      'Connect LED between relay COM and NO terminals (safe low-voltage test)',
      'NEVER connect mains voltage without proper insulation and experience',
    ],
    theory: `
## What is a Relay?

A relay is an electrically-operated mechanical switch. A small control signal (5V from Arduino) triggers an electromagnet that physically moves a switch contact — allowing it to control large currents completely isolated from the Arduino.

### Relay Terminals

\`\`\`
   ┌─────────────────┐
   │  Relay Module   │
   │                 │
   │  IN ← Arduino  │
   │  VCC / GND      │
   │                 │
   │  COM ────────   │  ← Common terminal
   │  NO  ─── ↗     │  ← Normally Open  (open when relay off)
   │  NC  ─── ↘     │  ← Normally Closed (closed when relay off)
   └─────────────────┘
\`\`\`

### Active-LOW Logic

Most relay modules are **active LOW** — they trigger when IN is pulled LOW:

| Arduino Pin | IN Signal | Relay | COM–NO |
|-------------|-----------|-------|--------|
| HIGH (1)    | HIGH      | OFF   | Open   |
| LOW (0)     | LOW       | ON    | Closed |

\`\`\`cpp
digitalWrite(RELAY_PIN, LOW);   // TURN ON the relay
digitalWrite(RELAY_PIN, HIGH);  // turn off the relay
\`\`\`

### Safety Rules

⚠️ **NEVER work on mains-connected relays while powered.** Even 5-amp relays can kill. For learning, test only with LEDs or small DC loads.

### Simulator
Watch Pin 7 LED in the digital pin row — it turns ON when relay is activated (LOW signal). The Serial Monitor shows the relay state.
    `,
    starterCode: `// Relay Module — Active-LOW Control
// IN → Pin 7  (LOW = relay ON, HIGH = relay OFF)
// Watch pin 7 LED in the simulator

const int RELAY_PIN = 7;

void relayOn()  { digitalWrite(RELAY_PIN, LOW);  }  // Active LOW!
void relayOff() { digitalWrite(RELAY_PIN, HIGH); }

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  relayOff();  // Start with relay off (safe default)
  Serial.begin(9600);
  Serial.println("Relay module ready!");
  Serial.println("Note: Most relay modules are ACTIVE LOW");
}

void loop() {
  Serial.println("Relay ON  (closing circuit)...");
  relayOn();
  delay(2000);

  Serial.println("Relay OFF (opening circuit)...");
  relayOff();
  delay(2000);

  // Quick 3-pulse sequence
  Serial.println("3 quick pulses...");
  for (int i = 0; i < 3; i++) {
    relayOn();
    delay(200);
    relayOff();
    delay(200);
  }
  delay(1000);
}
`,
    challenge: 'Add a button (Pin 2, INPUT_PULLUP) that toggles the relay on each press. Use a boolean `relayState` variable and only change the relay when the button is freshly pressed (not held).',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('Relay') || l.includes('relay'));
    },
  },

  {
    id: 'shift_register',
    icon: '🔢',
    title: '74HC595 Shift Register',
    xp: 85,
    difficulty: 'advanced',
    desc: 'Control 8 LEDs using only 3 Arduino pins with a 74HC595 shift register. Learn serial-to-parallel data shifting, the shiftOut() function, and daisy-chaining for even more outputs.',
    parts: ['Arduino Uno', '74HC595 shift register IC', '8x LEDs', '8x 220Ω resistors', 'Breadboard', 'Jumper wires'],
    skills: ['shiftOut()', 'Bit manipulation', 'Shift registers', 'MSBFIRST/LSBFIRST', 'Daisy-chaining'],
    components: [],
    wiring: [
      '74HC595 Pin 14 (DS/SER) → Pin 11 (data)',
      '74HC595 Pin 12 (RCLK/ST_CP) → Pin 10 (latch)',
      '74HC595 Pin 11 (SHCP/SH_CP) → Pin 12 (clock)',
      '74HC595 Pin 16 (VCC) → 5V',
      '74HC595 Pin 8 (GND) → GND',
      '74HC595 Pin 10 (MR/SRCLR) → 5V (active LOW reset, tie HIGH to disable)',
      '74HC595 Pin 13 (OE) → GND (output enable, active LOW)',
      'Pins Q0–Q7 (15, 1–7) → LEDs through 220Ω resistors to GND',
    ],
    theory: `
## What is a Shift Register?

A 74HC595 converts **serial** data (3 wires) into **8 parallel** outputs. You can control 8 devices with just 3 Arduino pins instead of 8.

### How it Works

1. Set **latch LOW** (hold outputs steady)
2. Clock in 8 bits of data serially via **data** pin
3. Set **latch HIGH** — all 8 outputs update simultaneously

\`\`\`
  Arduino              74HC595
  DATA  (11) ────────  DS  (pin 14)   serial input
  CLOCK (12) ────────  SHCP (pin 11)  shift clock
  LATCH (10) ────────  STCP (pin 12)  latch clock
\`\`\`

### shiftOut()

Arduino's built-in function handles the clocking automatically:

\`\`\`cpp
digitalWrite(LATCH, LOW);
shiftOut(DATA, CLOCK, MSBFIRST, 0b10110011);
//                    bit order   8-bit value
digitalWrite(LATCH, HIGH);
\`\`\`

**MSBFIRST**: Most significant bit first (Q7=bit7, Q0=bit0)

### Binary Patterns

\`\`\`cpp
shiftOut(DATA, CLOCK, MSBFIRST, 0b11111111);  // all LEDs ON
shiftOut(DATA, CLOCK, MSBFIRST, 0b10101010);  // alternating
shiftOut(DATA, CLOCK, MSBFIRST, 0b00000001);  // only Q0
\`\`\`

### Daisy-Chaining

Connect Q7S (pin 9) of the first chip to DS of a second 74HC595 — share the same CLOCK and LATCH. Now send 16 bits to control 16 outputs from 3 pins!

### Simulator
Watch digital pins 2–9 in the simulator to see the shifting pattern (pins represent the 8 outputs Q0–Q7).
    `,
    starterCode: `// 74HC595 Shift Register — 8 LEDs with 3 pins
// DATA → Pin 11, CLOCK → Pin 12, LATCH → Pin 10

const int DATA  = 11;
const int CLOCK = 12;
const int LATCH = 10;

// Send one byte to shift register
void shiftWrite(byte val) {
  digitalWrite(LATCH, LOW);              // hold outputs
  shiftOut(DATA, CLOCK, MSBFIRST, val); // shift 8 bits
  digitalWrite(LATCH, HIGH);            // latch to outputs
}

void setup() {
  pinMode(DATA,  OUTPUT);
  pinMode(CLOCK, OUTPUT);
  pinMode(LATCH, OUTPUT);
  Serial.begin(9600);
  shiftWrite(0b00000000);  // all off
  Serial.println("74HC595 Shift Register ready!");
}

void loop() {
  // Chase effect: one LED at a time
  Serial.println("LED chase...");
  for (int i = 0; i < 8; i++) {
    shiftWrite(1 << i);  // bit shift to move LED position
    delay(150);
  }

  // All on
  Serial.println("All ON...");
  shiftWrite(0b11111111);
  delay(500);

  // Alternating pattern
  Serial.println("Alternating A...");
  shiftWrite(0b10101010);
  delay(500);
  Serial.println("Alternating B...");
  shiftWrite(0b01010101);
  delay(500);

  // Count up in binary
  Serial.println("Binary count 0-255...");
  for (int i = 0; i <= 255; i++) {
    shiftWrite(i);
    delay(20);
  }
}
`,
    challenge: 'Create a "bounce" animation: light up LED 0, then shift right until LED 7, then reverse direction back to 0. Keep bouncing smoothly.',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('chase') || l.includes('Chase') || l.includes('Alternating') || l.includes('Binary'));
    },
  },

  {
    id: 'keypad_matrix',
    icon: '🔢',
    title: '4×4 Matrix Keypad',
    xp: 75,
    difficulty: 'intermediate',
    desc: 'Read a 16-button 4×4 keypad using only 8 wires with row/column scanning. Build a PIN-entry system that accepts a 4-digit code.',
    parts: ['Arduino Uno', '4×4 membrane keypad', 'Breadboard', 'Jumper wires'],
    skills: ['Keypad library', 'Matrix scanning', '2D arrays', 'State machines', 'PIN systems'],
    components: [{ type: 'button', pin: 2 }, { type: 'button', pin: 3 }],
    wiring: [
      'Keypad Row 1 → Pin 9',
      'Keypad Row 2 → Pin 8',
      'Keypad Row 3 → Pin 7',
      'Keypad Row 4 → Pin 6',
      'Keypad Col 1 → Pin 5',
      'Keypad Col 2 → Pin 4',
      'Keypad Col 3 → Pin 3',
      'Keypad Col 4 → Pin 2',
    ],
    theory: `
## Matrix Keypad Scanning

A 4×4 keypad has 16 buttons wired in a grid: 4 rows × 4 columns. Only 8 wires needed instead of 16!

### How Matrix Scanning Works

1. Set all row pins as **OUTPUT HIGH**
2. Set all column pins as **INPUT_PULLUP**
3. Pull one row LOW at a time
4. Check which column reads LOW — that's the pressed key

\`\`\`
     Col1 Col2 Col3 Col4
Row1 [ 1 ][ 2 ][ 3 ][ A ]
Row2 [ 4 ][ 5 ][ 6 ][ B ]
Row3 [ 7 ][ 8 ][ 9 ][ C ]
Row4 [ * ][ 0 ][ # ][ D ]
\`\`\`

### Keypad Library

Handles the scanning automatically:

\`\`\`cpp
#include <Keypad.h>

char keys[4][4] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[4] = {9, 8, 7, 6};
byte colPins[4] = {5, 4, 3, 2};

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, 4, 4);

char key = keypad.getKey();
if (key) Serial.println(key);
\`\`\`

### Simulator Note
The Keypad library requires real hardware. The simulator uses **two buttons** (Pin 2, Pin 3) plus analog slider A0 to simulate keypad input. In the standalone sketch below, we show how you'd use the Keypad library on real hardware, and a simplified simulation mode.
    `,
    starterCode: `// 4x4 Matrix Keypad — PIN Entry System
// Real HW: use Keypad library (rows→9,8,7,6  cols→5,4,3,2)
// Simulator: Pin2 btn = digit input, Pin3 btn = clear/submit

// --- REAL HARDWARE CODE ---
// Uncomment on real Arduino with Keypad library:
/*
#include <Keypad.h>
const byte ROWS = 4, COLS = 4;
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {9, 8, 7, 6};
byte colPins[COLS]  = {5, 4, 3, 2};
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);
*/

// --- SIMULATOR VERSION ---
const String CORRECT_PIN = "1234";
String enteredPin = "";
const int BTN_DIGIT  = 2;   // adds simulated digit
const int BTN_ACTION = 3;   // clear or submit

void setup() {
  pinMode(BTN_DIGIT,  INPUT_PULLUP);
  pinMode(BTN_ACTION, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("PIN Entry System");
  Serial.println("Correct PIN: 1234");
  Serial.println("Pin2 = enter digit  |  Pin3 = clear");
  Serial.println("Enter PIN then press Pin3 to check.");
}

void loop() {
  // Simulate digit input from A0 slider (maps to 0-9)
  if (digitalRead(BTN_DIGIT) == LOW) {
    int digit = map(analogRead(A0), 0, 1023, 0, 9);
    if (enteredPin.length() < 4) {
      enteredPin += String(digit);
      Serial.print("Input: ");
      Serial.println(enteredPin);
    }
    delay(400);
  }

  // Clear or check PIN
  if (digitalRead(BTN_ACTION) == LOW) {
    if (enteredPin.length() == 0) {
      Serial.println("PIN cleared.");
    } else {
      Serial.print("Checking PIN: ");
      Serial.println(enteredPin);
      if (enteredPin == CORRECT_PIN) {
        Serial.println(">>> ACCESS GRANTED <<<");
        digitalWrite(13, HIGH);
        delay(2000);
        digitalWrite(13, LOW);
      } else {
        Serial.println("!!! ACCESS DENIED !!!");
      }
      enteredPin = "";
    }
    delay(400);
  }
}
`,
    challenge: 'Add a "lockout": after 3 wrong PINs, disable input for 10 seconds (use millis()). Print a countdown every second while locked out.',
    validate(state) {
      return state.serialUsed && state.serialLines.some(l =>
        l.includes('PIN') || l.includes('ACCESS') || l.includes('Input'));
    },
  },
];

// ── Sort lessons: beginner → intermediate → advanced ──────
const _DIFF_RANK = { beginner: 0, intermediate: 1, advanced: 2 };
LESSONS.sort((a, b) => (_DIFF_RANK[a.difficulty] || 0) - (_DIFF_RANK[b.difficulty] || 0));
