let dripSynth, dripFilter, dripLFO;
let dripImg;
let showImage = false;
let imageDisplayTime = 0;
let displayDuration = 1000; // Display image for 1 second

function preload() {
  // Load the drip image (place "drip.png" in an "assets" folder)
  dripImg = loadImage('assets/drip.png');
}

function setup() {
  createCanvas(400, 400);
  
  // Create a lowpass filter to mellow the sound slightly.
  dripFilter = new Tone.Filter(1000, "lowpass").toDestination();
  
  // Create a synth with a sine oscillator and a short envelope.
  // This synth will be used to create the water drip sound.
  dripSynth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.005,
      decay: 0.25,
      sustain: 0,
      release: 0.1
    }
  }).connect(dripFilter);
  
  // Add an LFO to modulate the filter's cutoff frequency for subtle variation.
  dripLFO = new Tone.LFO(0.5, 800, 1200).start();
  dripLFO.connect(dripFilter.frequency);
}

function draw() {
  background(220);
  
  // If triggered, display the drip image.
  if (showImage) {
    image(dripImg, 0, 0, width, height);
    if (millis() - imageDisplayTime > displayDuration) {
      showImage = false;
    }
  }
}

function mouseClicked() {
  // Show the drip image.
  showImage = true;
  imageDisplayTime = millis();
  
  // Create a pitch glide to mimic a water droplet:
  // Start at a higher pitch (600Hz) then quickly ramp down to 300Hz.
  dripSynth.frequency.setValueAtTime(600, Tone.now());
  dripSynth.frequency.exponentialRampToValueAtTime(300, Tone.now() + 0.25);
  
  // Trigger the synth with a note for a short duration.
  dripSynth.triggerAttackRelease("C4", 0.35);
}
