class Shot extends MovingWrappedPosition {
  SHOT_SPEED = 8.0;
  SHOT_LIFE = 60;
  SHOT_DISPLAY_RADIUS = 3.0;

  constructor() {
    super();
  }

  reset() {
    this.shotLife = 0;

    super.reset();
  }

  shootFrom(player) {
    if (this.shotLife === 0) {
      this.x = player.x;
      this.y = player.y;

      this.xv = Math.cos(player.angle) * this.SHOT_SPEED + player.xv;
      this.yv = Math.sin(player.angle) * this.SHOT_SPEED + player.yv;

      this.shotLife = this.SHOT_LIFE;
    }
  }

  isReadyToFire() {
    return (this.shotLife <= 0)
  }

  isHit(enemy) {
    if (this.shotLife <= 0) {
      return false;
    }
    return enemy.isColliding(this.x, this.y);
  }

  move() {
    if (this.shotLife > 0) {
      this.shotLife--;
      super.move();
    }
  }

  draw() {
    if (this.shotLife > 0) {
      if (this.shotLife % 14 < 7) {
        drawCircle(this.x, this.y, this.SHOT_DISPLAY_RADIUS, '#FF6644');
      }
      drawCircle(this.x, this.y, this.SHOT_DISPLAY_RADIUS-1, '#FFAAAA');
    }
  }
}