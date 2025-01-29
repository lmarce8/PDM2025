function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  fill(60,100,100);
  circle(100,100,100);

  fill(0);
  beginShape();
  vertex(50,50);
  vertex(100,100);
  vertex(50,150);
  endShape(CLOSE);

  fill(0,75,90);
  square(170,50,100,90,90,0,0);

  noStroke();
  fill(100);
  circle(195,100,35);
  circle(245,100,35);
  fill(240,80,90);

  circle(195,100,20);
  circle(245,100,20);

}
