class Player extends MovingWrappedPosition {
  THRUST_POWER = 0.15;
  TURN_RATE = 0.02;
  SPACESPEED_DECAY_MULT = 0.99;

  constructor(name) {
    super();
    
    this.name = name;
    this.score = 0;
    this.angle;

    this.keyHeld_Thrust = false;
    this.keyHeld_East = false;
    this.keyHeld_West = false;
  }

  init(img) {
    this.imgSprite = img;
    this.shot = new Shot();

    this.reset();
  }

  setupControls(thrustKey, rightKey, leftKey, shotKey) {
    this.controlKeyThrust = thrustKey;
    this.controlKeyRight = rightKey;
    this.controlKeyLeft = leftKey;
    this.controlKeyShoot = shotKey;
  }

  reset() {
    this.angle = 0;

    super.reset();
    this.shot.reset();
  }

  fire() {
    if (this.shot.isReadyToFire()) {
      this.shot.shootFrom(this);
    }
  }

  checkCollisions(enemy) {
    if (enemy.isColliding(this.x, this.y)) {
      this.reset();
      console.log('Your ship has crashed!');
    }
    if (this.shot.isHit(enemy)) {
      enemy.die();
      this.shot.reset();
      console.log('Enemy killed!');
    }
  }

  move() {
    if (this.keyHeld_Thrust) {
      this.xv += Math.cos(this.angle) * this.THRUST_POWER;
      this.yv += Math.sin(this.angle) * this.THRUST_POWER;
    }
    if (this.keyHeld_West) {
      this.angle += -this.TURN_RATE * Math.PI;
    }
    if (this.keyHeld_East) {
      this.angle += this.TURN_RATE * Math.PI;
    }
   
    super.move();

    this.xv *= this.SPACESPEED_DECAY_MULT;
    this.yv *= this.SPACESPEED_DECAY_MULT;

    this.handleScreenWrap();
    
    this.shot.move();
  }

  draw() {
    this.shot.draw();

    drawImageCenteredAtLocationWithRotation(this.imgSprite, this.x, this.y, this.angle);
  }
}