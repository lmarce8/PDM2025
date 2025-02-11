let meatboy, monk, roundboy;
let characters = [];

function preload() { 
  meatboy = loadImage("media/meatboy.png"); 
  monk = loadImage("media/monk.png"); 
  roundboy = loadImage("media/roundboy.png"); 
}

function setup() {
  createCanvas(400, 400); // Changed canvas size
  imageMode(CENTER);

  let spriteSheets = [meatboy, monk, roundboy];

  for (let i = 0; i < spriteSheets.length; i++) {
    let character = new Character(
      random(80, width - 80),  // Changed to match request
      random(80, height - 80), // Changed to match request
      spriteSheets[i]
    );
    character.setAnimation("stand"); // Ensure they appear on screen immediately
    characters.push(character);
  }
}

function draw() {
  background(220);

  for (let character of characters) {
    character.update();
    character.draw();
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    for (let character of characters) {
      character.setAnimation("right");
    }
  } else if (keyCode === LEFT_ARROW) {
    for (let character of characters) {
      character.setAnimation("left");
    }
  }
}

function keyReleased() {
  for (let character of characters) {
    character.setAnimation("stand"); // Keep them facing the last moved direction
  }
}

// Character Class
class Character {
  constructor(x, y, spritesheet) {
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.currentAnimation = "standRight"; // makes sure they appear immediately
    this.lastDirection = "right"; // Default facing right
    this.animations = {};

    // Define animations
    this.addAnimation("right", new SpriteAnimation(spritesheet, 0, 0, 9, false));
    this.addAnimation("left", new SpriteAnimation(spritesheet, 0, 0, 9, true));
    this.addAnimation("standRight", new SpriteAnimation(spritesheet, 0, 0, 1, false));
    this.addAnimation("standLeft", new SpriteAnimation(spritesheet, 0, 0, 1, true));
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  setAnimation(anim) {
    if (anim === "right") {
      if (this.lastDirection === "left") {
        this.x += 2; // Prevents jump-back glitch
      }
      this.lastDirection = "right"; 
      this.currentAnimation = "right";
    } else if (anim === "left") {
      if (this.lastDirection === "right") {
        this.x -= 2; // Prevents jump-back glitch
      }
      this.lastDirection = "left";
      this.currentAnimation = "left";
    } else if (anim === "stand") {
      this.currentAnimation = this.lastDirection === "right" ? "standRight" : "standLeft";
    }
  }

  update() {
    if (this.currentAnimation === "right") {
      this.x += 2;
    } else if (this.currentAnimation === "left") {
      this.x -= 2;
    }
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }
}

// Sprite Animation Class
class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration, flipped) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = flipped;
  }

  draw() {
    push();
    if (this.flipped) {
      translate(0, 0); // Adjust position to prevent jump glitch
      scale(-1, 1);
      image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);
    } else {
      image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);
    }
    pop();

    this.frameCount++;
    if (this.frameCount % 8 === 0) {
      this.u++;
    }

    if (this.u === this.startU + this.duration){
      this.u = this.startU;
    }
  }
}
