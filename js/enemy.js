class Enemy extends MovingWrappedPosition {
  SPEED = 1.9;
  TIME_BETWEEN_DIRECTION_CHANGE = 85;
  COLLISION_RADIUS = 13;

  constructor() {
    super();
    
    this.cyclesTillDirectionChange = 0;
    this.isDead = false;
  }

  init(img) {
    this.imgSprite = img;
    this.shot = new Shot();

    this.reset();
  }

  reset() {
    super.reset();
    this.shot.reset();

    this.x = Math.random()*canvas.width;
    this.x = Math.random()*canvas.height;
    this.isDead = false;
  }

  fire() {
    if (this.shot.isReadyToFire()) {
      this.shot.shootFrom(this);
    }
  }

  die() {
    this.isDead = true;
  }

  isColliding(testX, testY) {
    let deltaX = testX-this.x;
    let deltaY = testY-this.y;
    let dist = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    return dist <= this.COLLISION_RADIUS;
  }

  move() {
    if (this.isDead) {
      return;
    }

    super.move();

    this.cyclesTillDirectionChange--;
    if (this.cyclesTillDirectionChange <= 0) {
      var randomAngle = Math.random()*Math.PI*2.0;
      this.xv = Math.cos(randomAngle) * this.SPEED;
      this.yv = Math.sin(randomAngle) * this.SPEED;
      this.cyclesTillDirectionChange = this.TIME_BETWEEN_DIRECTION_CHANGE;
    }
    
    this.shot.move();
  }

  draw() {
    if (this.isDead) {
      return;
    }

    this.shot.draw();

    drawImageCenteredAtLocationWithRotation(this.imgSprite, this.x, this.y, 0);
  }
}