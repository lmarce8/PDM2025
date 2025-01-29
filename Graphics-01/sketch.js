function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(250,30,100); //background color

  noStroke(); //no outlines
  fill(0);
  square(100,100,100);

  fill(0,100,100,0.5); //last value is translucent 
  circle(125,125,25);
  circle(175,125,25);

  arc(150,160,75,25,0,180);

  stroke('orange'); //outlines only hair
  strokeWeight(5);  //thickness of stroke
  beginShape();
  vertex(100,100);  //top right of head
  vertex(75,75);    //highest point of spike
  vertex(125,90);   //down left spike
  vertex(150,60);
  vertex(175,90);
  vertex(190,50);
  vertex(200,100); //bottom right line
  endShape(CLOSE);
}
