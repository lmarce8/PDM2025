let polySynth, metalSynth, fmSynth, filter, lfo;
let activeKeys = {};
let filterSlider, lfoSlider;

// Key mapping for one octave (C4 to C5) mimicking a piano layout
let keyNotes = {
  'a': 'C4',  // White key
  'w': 'C#4', // Black key
  's': 'D4',  // White key
  'e': 'D#4', // Black key
  'd': 'E4',  // White key
  'f': 'F4',  // White key
  't': 'F#4', // Black key
  'g': 'G4',  // White key
  'y': 'G#4', // Black key
  'h': 'A4',  // White key
  'u': 'A#4', // Black key
  'j': 'B4',  // White key
  'k': 'C5'   // White key (octave up)
};

function setup() {
  createCanvas(400, 400);
  
  // Low-pass filter to shape sound
  filter = new Tone.Filter(800, "lowpass").toDestination();
  
  // LFO (Low-Frequency Oscillator) for modulation
  lfo = new Tone.LFO(5, 100, 2000).start();
  lfo.connect(filter.frequency);
  
  // PolySynth for melody
  polySynth = new Tone.PolySynth(Tone.Synth).connect(filter);
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.8,
      release: 0.3
    },
    oscillator: {
      type: 'sawtooth'
    }
  });
  
  // MetalSynth for percussive sounds
  metalSynth = new Tone.MetalSynth({
    envelope: {
      attack: 0.5,
      decay: 3,
      sustain: 0.2,
      release: 2
    }
  }).toDestination();
  
  // FM Synth for dynamic tones
  fmSynth = new Tone.FMSynth({
    harmonicity: 2.5,
    modulationIndex: 15
  }).connect(filter);
  
  // Filter slider for real-time sound control
  filterSlider = createSlider(100, 5000, 800);
  filterSlider.position(20, height - 40);
  filterSlider.input(() => filter.frequency.value = filterSlider.value());
  
  // LFO speed slider for modulation control
  lfoSlider = createSlider(0.1, 10, 5, 0.1);
  lfoSlider.position(220, height - 40);
  lfoSlider.input(() => lfo.frequency.value = lfoSlider.value());
}

function draw() {
  background(220);
  fill(0);
  textSize(16);
  text("Filter Frequency", 20, height - 50);
  text("LFO Speed", 220, height - 50);
  
  // Draw keyboard representation
  let x = 50;
  let whiteKeyWidth = 40;
  let whiteKeyHeight = 120;
  let blackKeyWidth = 25;
  let blackKeyHeight = 80;
  
  // Draw white keys
  fill(255);
  stroke(0);
  for (let key of ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k']) {
    if (activeKeys[key]) {
      fill(200);
    } else {
      fill(255);
    }
    rect(x, 150, whiteKeyWidth, whiteKeyHeight);
    fill(0);
    text(key.toUpperCase(), x + 15, 250);
    x += whiteKeyWidth;
  }
  
  // Draw black keys
  x = 80;
  fill(0);
  for (let key of ['w', 'e', 't', 'y', 'u']) {
    if (activeKeys[key]) {
      fill(100);
    } else {
      fill(0);
    }
    rect(x, 150, blackKeyWidth, blackKeyHeight);
    fill(255);
    text(key.toUpperCase(), x + 5, 190);
    x += (key === 'e' || key === 'u') ? 80 : 40;
  }
}

function keyPressed() {
  let pitch = keyNotes[key];
  if (pitch) {
    polySynth.triggerAttack(pitch);
    activeKeys[key] = true;
  } else if (key === 'z') {
    metalSynth.triggerAttackRelease("C3", 1);
  } else if (key === 'x') {
    fmSynth.triggerAttack("G3");
  }
}

function keyReleased() {
  let pitch = keyNotes[key];
  if (pitch) {
    polySynth.triggerRelease(pitch);
    delete activeKeys[key];
  } else if (key === 'x') {
    fmSynth.triggerRelease();
  }
}
