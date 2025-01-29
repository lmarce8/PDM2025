function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(240,100,60);

  stroke('white');
  strokeWeight(5);
  fill(120,80,60);

  circle(200,200,200);
  fill('red');
  beginShape();
  vertex(200,100); //top
  vertex(225,170); 
  vertex(295,170); //right top
  vertex(240,215); 

  vertex(260,280); //right bottom
  vertex(200,240); 
  vertex(140,280); //left bottom
  vertex(160,215); 

  vertex(105,170); //left top
  vertex(175,170); 
  vertex(200,100); //top
  endShape(CLOSE); 
}
