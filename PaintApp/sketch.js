function setup() {
  createCanvas(800, 600);
  background(250); //light gray background

  strokeWeight(10);
  colorMode(HSB);

  drawColorPalette();
}

let colors = [
  [0,80,100], //red
  [30,80,100], //orange
  [60,70,95], //yellow
  [120,60,100], //green
  [180,60,100], //turquoise
  [240,70,90], //blue
  [300,60,100], // pink
  [30,50,40], //brown
  [0,0,100], //white
  [0,0,0] //black
];

let selectedColor = [0,100,100];

function drawColorPalette() {
  let boxSize = 30; 
  let gap = 1;
  let startX = 1;

  for (let i = 0; i < colors.length; i++) {
    stroke(250);
    strokeWeight(gap);
    fill(colors[i]);
    rect(startX, i * (boxSize + gap), boxSize, boxSize); // draws the color palette boxes
  }
}

function mousePressed() {
  let boxSize = 30;
  let gap = 1;
  let startX = 1;

  if (mouseX >= startX && mouseX <= startX + boxSize) {
    let index = Math.floor(mouseY / (boxSize + gap));
    
    if (index >= 0 && index < colors.length) {
      selectedColor = colors[index]; //changed colors when pressed
    }
  }
}

function mouseDragged() {
  if (mouseX > 50) {
    stroke(...selectedColor);
    strokeWeight(20); // thickness of lines drawn
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}