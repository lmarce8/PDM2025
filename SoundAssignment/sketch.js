let colors = [
  [0, 80, 100],   // Red
  [30, 80, 100],  // Orange
  [60, 70, 95],   // Yellow
  [120, 60, 100], // Green
  [180, 60, 100], // Turquoise
  [240, 70, 90],  // Blue
  [300, 60, 100], // Pink
  [30, 50, 40],   // Brown
  [0, 0, 100],    // White
  [0, 0, 0]       // Black
];

let selectedColor = [0, 100, 100]; // Default color (red)
let brushSound, colorChangeSound, clearSound, saveSound;
let bgMusic, bgMusic2;
let canvasFilled = 0; // Track painting progress

function preload() {
  soundFormats('mp3', 'wav');

  // Load sounds
  brushSound = loadSound('sounds/brush-stroke.mp3');  
  colorChangeSound = loadSound('sounds/color-change.mp3');  
  clearSound = loadSound('sounds/clear-screen.mp3');  
  saveSound = loadSound('sounds/save-success.mp3');  

  // Load background music files
  bgMusic = loadSound('sounds/background-music.mp3', musicReady);
  bgMusic2 = loadSound('sounds/background-music2.mp3');
}

function setup() {
  createCanvas(800, 600);
  background(250); // Light gray background

  strokeWeight(10);
  colorMode(HSB);

  drawColorPalette();

  // Create Clear Button
  clearButton = createButton('Clear Canvas');
  clearButton.position(820, 50); // Position next to the canvas
  clearButton.mousePressed(clearCanvas); // Call function when clicked

  // Ensure audio context starts on user interaction
  userStartAudio();
}

function musicReady() {
  bgMusic.setVolume(0.4);
  bgMusic.play(); // Play once instead of looping

  // When bgMusic finishes, start bgMusic2
  bgMusic.onended(() => {
    bgMusic2.setVolume(0.4);
    bgMusic2.play();

    // When bgMusic2 finishes, loop both together
    bgMusic2.onended(() => {
      bgMusic.loop(); // Restart bgMusic
      bgMusic2.loop(); // Restart bgMusic2
    });
  });
}

function drawColorPalette() {
  let boxSize = 30; 
  let gap = 1;
  let startX = 1;

  for (let i = 0; i < colors.length; i++) {
    stroke(250);
    strokeWeight(gap);
    fill(colors[i]); 
    rect(startX, i * (boxSize + gap), boxSize, boxSize); 
  }
}

function mousePressed() {
  let boxSize = 30;
  let gap = 1;
  let startX = 1;

  if (mouseX >= startX && mouseX <= startX + boxSize) {
    let index = Math.floor(mouseY / (boxSize + gap));
    
    if (index >= 0 && index < colors.length) {
      selectedColor = colors[index];

      // Play color change sound effect
      colorChangeSound.play();
    }
  }
}

function mouseDragged() {
  if (mouseX > 50) { 
    stroke(...selectedColor);
    strokeWeight(20);
    line(pmouseX, pmouseY, mouseX, mouseY);

    // Play brush stroke sound effect continuously while drawing
    if (!brushSound.isPlaying()) {
      brushSound.loop(); // Loop the brush sound
    }

    // Track how much the canvas is filled
    canvasFilled++;

    // Adjust background music volume dynamically
    if (canvasFilled > 5000) {
      bgMusic.setVolume(0.6);
      bgMusic2.setVolume(0.5);
    }
  }
}

// Stop the brush sound when user stops drawing
function mouseReleased() {
  brushSound.stop();
}

// Function to clear the canvas when button is clicked
function clearCanvas() {
  background(250); // Reset to light gray background
  canvasFilled = 0; // Reset painting progress

  // Play clear screen sound
  clearSound.play();

  // Reset music volume to normal
  bgMusic.setVolume(0.4);
  bgMusic2.setVolume(0.3);

  // Redraw the color palette
  drawColorPalette();
}
