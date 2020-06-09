class Player {
  THRUST_POWER = 0.15;
  TURN_RATE = 0.02;
  SPACESPEED_DECAY_MULT = 0.99;

  constructor(name) {
    this.name = name;
    this.score = 0;
    this.x;
    this.y;
    this.driftX;
    this.driftY;
    this.angle;

    this.keyHeld_Thrust = false;
    this.keyHeld_East = false;
    this.keyHeld_West = false;
  }

  init(img) {
    this.imgSprite = img;
    this.reset();
  }

  setupControls(thrustKey, eastKey, westKey) {
    this.controlKeyThrust = thrustKey;
    this.controlKeyEast = eastKey;
    this.controlKeyWest = westKey;
  }

  reset() {
    this.driftX = 0;
    this.driftY = 0;
    this.angle = 0;

    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }

  handleScreenWrap() {
    if (this.x < 0) {
      this.x += canvas.width;
    } else if (this.x > canvas.width) {
      this.x -= canvas.width;
    }

    if (this.y < 0) {
      this.y += canvas.height;
    } else if (this.y > canvas.height) {
      this.y -= canvas.height;
    }
  }

  move() {
    if (this.keyHeld_Thrust) {
      this.driftX += Math.cos(this.angle) * this.THRUST_POWER;
      this.driftY += Math.sin(this.angle) * this.THRUST_POWER;
    }
    if (this.keyHeld_West) {
      this.angle += -this.TURN_RATE * Math.PI;
    }
    if (this.keyHeld_East) {
      this.angle += this.TURN_RATE * Math.PI;
    }
   
    this.x = this.x + this.driftX;
    this.y = this.y + this.driftY;
    this.driftX *= this.SPACESPEED_DECAY_MULT;
    this.driftY *= this.SPACESPEED_DECAY_MULT;

    this.handleScreenWrap();
  }

  draw() {
    drawImageCenteredAtLocationWithRotation(this.imgSprite, this.x, this.y, this.angle);
  }
}