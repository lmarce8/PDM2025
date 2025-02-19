let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
});
let gameState = GameStates.START;
let score = 0;
let highScore = 0;
let time = 30;
let textPadding = 15;
let bugs = [];
let bugImg;
let squishImg;
let gameFont;

function preload() {
  gameFont = loadFont("libraries/media/PressStart2P-Regular.ttf");
  bugImg = loadImage("libraries/media/bugs.png");
  squishImg = loadImage("libraries/media/squish.png");
}

class Bug {
  constructor() {
    const edge = floor(random(4)); // Choose random edge for spawning
    switch (edge) {
      case 0: // Enter from the left
        this.x = -80;
        this.y = random(height);
        this.vx = 1;
        this.vy = 0;
        this.angle = HALF_PI; // Rotate 90 degrees for right movement
        break;
      case 1: // Enter from the right
        this.x = width + 80;
        this.y = random(height);
        this.vx = -1;
        this.vy = 0;
        this.angle = -HALF_PI; // Rotate -90 degrees for left movement
        break;
      case 2: // Enter from the top
        this.x = random(width);
        this.y = -80;
        this.vx = 0;
        this.vy = 1;
        this.angle = PI; // Rotate 180 degrees for down movement
        break;
      case 3: // Enter from the bottom
        this.x = random(width);
        this.y = height + 80;
        this.vx = 0;
        this.vy = -1;
        this.angle = 0; // No rotation needed for up movement
        break;
    }
    this.size = 80;
    this.clickSize = this.size; // Initial clickable size
    this.alive = true;
    this.bugFrame = 0;
    this.squishFrame = int(random(4)) * this.size;
    this.squished = false;
    this.updateSpeed();
  }

  updateSpeed() {
    this.speed = 1 + score * 0.02; // Increase speed slightly with each point scored
    this.clickSize = max(20, this.size - score * 2); // Decrease clickable area as score increases
  }

  move() {
    if (!this.squished) {
      this.x += this.vx * this.speed;
      this.y += this.vy * this.speed;
      this.bugFrame = (this.bugFrame + 0.1) % 8;
    }
  }

  display() {
    push();
    translate(this.x + this.size / 2, this.y + this.size / 2);
    rotate(this.angle); // Rotate based on the movement direction
    let frameX = int(this.bugFrame) * this.size;
    if (this.alive) {
      image(bugImg, -this.size / 2, -this.size / 2, this.size, this.size, frameX, 0, this.size, this.size);
    } else if (this.squished) {
      image(squishImg, -this.size / 2, -this.size / 2, this.size, this.size, this.squishFrame, 0, this.size, this.size);
    }
    pop();
  }

  squish(mx, my) {
    let d = dist(mx, my, this.x + this.size / 2, this.y + this.size / 2);
    if (d < this.clickSize / 2 && this.alive && !this.squished) {
      this.alive = false;
      this.squished = true;
      setTimeout(() => { this.squished = false; }, 500);
      score++;
      bugs.forEach(bug => bug.updateSpeed()); // Update speed and clickable size of all bugs
      return true;
    }
    return false;
  }
}


function setup() {
  createCanvas(400, 400);
  textFont(gameFont);
  textSize(18);
}

function draw() {
  background(220);

  switch (gameState) {
    case GameStates.START:
      textAlign(CENTER, CENTER);
      text("Press ENTER to Start", width / 2, height / 2);
      break;
    case GameStates.PLAY:
      textAlign(LEFT, TOP);
      text("Score: " + score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      text("Time: " + Math.ceil(time), width - textPadding, textPadding);

      bugs.forEach(bug => {
        bug.move();
        bug.display();
      });

      time -= deltaTime / 1000;
      if (time <= 0) {
        gameState = GameStates.END;
      }
      break;
    case GameStates.END:
      textAlign(CENTER, CENTER);
      text("Game Over!", width / 2, height / 2 - 20);
      text("Score: " + score, width / 2, height / 2);
      if (score > highScore) {
        highScore = score;
      }
      text("High Score: " + highScore, width / 2, height / 2 + 20);
      break;
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (gameState === GameStates.START || gameState === GameStates.END) {
      gameState = GameStates.PLAY;
      score = 0;
      time = 30;
      bugs = [];
      for (let i = 0; i < 10; i++) {
        bugs.push(new Bug());
      }
    }
  }
}

function mousePressed() {
  if (gameState === GameStates.PLAY) {
    for (let i = bugs.length - 1; i >= 0; i--) {
      if (bugs[i].squish(mouseX, mouseY)) {
        setTimeout(() => {
          bugs.splice(i, 1);
          bugs.push(new Bug());
        }, 500);
        break;
      }
    }
  }
}
