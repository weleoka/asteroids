/*globals Vector, CX, SPACE_HEIGHT, SPACE_WIDTH, Image*/
/*
 * Bullets
 */
var monsters = [];

function Monster() {
  this.monsterImage = new Image();
  this.monsterImage.src = 'img/monster2.jpg';
  var xx = SPACE_WIDTH - 1;
  var yy = Math.floor( Math.random() * (SPACE_HEIGHT - 20) + 20 );
  this.destination = Math.floor( Math.random() * (SPACE_HEIGHT - 20) + 20 );
  this.active = true;
  this.position = new Vector(xx, yy);
  this.mps = 2;  // sort of like metres per second, arbitary number.
  this.width = 32;
  this.height = 32;
  this.color = "blue";
}
Monster.prototype = {
  draw: function() {
      CX.save();
      CX.drawImage(this.monsterImage, this.position.x, this.position.y);
      //CX.fillStyle = this.color;
      //CX.fillRect(this.position.x, this.position.y, this.width, this.height);
      CX.restore();
  },

  update: function() {
    var tx, ty, dist;

    if ( this.active ) {
      tx = this.destination - this.position.x;
      ty = this.destination - this.position.y;
      dist = Math.sqrt(tx*tx + ty*ty);

      this.speedX = (tx/dist) * this.mps;
      this.speedY = (ty/dist) * this.mps;
      this.active = false;
    }
      this.position.x += this.speedX;
      this.position.y += this.speedY;
  },
};



