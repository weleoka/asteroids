/*globals CX, SPACE_HEIGHT, SPACE_WIDTH*/
/*
 * Bullets
 */
var playerBullets = [];

function Bullet(origin, target) {
  this.active = true;
  this.position = origin;
  this.target = target;
  this.mps = 10;  // sort of like metres per second, arbitary number.
  this.width = 3;
  this.height = 3;
  this.color = "blue";
}
Bullet.prototype = {
  draw: function() {
      CX.save();
      CX.fillStyle = this.color;
      CX.fillRect(this.position.x, this.position.y, this.width, this.height);
      CX.restore();
  },

  update: function() {
    var tx, ty, dist;

    if( this.position.x > SPACE_WIDTH || this.position.x < 0 ) {
      playerBullets.splice(0, 1); // take away oldest bullet
    } if (this.position.y > SPACE_HEIGHT || this.position.y < 0 ) {
      playerBullets.splice(0, 1); // take away oldest bullet
    }

    if ( this.active ) {
      tx = this.target.x - this.position.x;
      ty = this.target.y - this.position.y;
      dist = Math.sqrt(tx*tx + ty*ty);

      this.speedX = (tx/dist) * this.mps;
      this.speedY = (ty/dist) * this.mps;
      this.active = false;
    }
      this.position.x += this.speedX;
      this.position.y += this.speedY;
  },
};