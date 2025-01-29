function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  noStroke();
  fill(0,100,100,0.3); //translucent
  circle(195,105,100);

  fill(240,100,100,0.3);
  circle(160,160,100);

  fill(120,100,100,0.3);
  circle(230,160,100);
  
}
