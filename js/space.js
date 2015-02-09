/*globals SPACE_HEIGHT, SPACE_WIDTH, CX, Image*/

/**
 * The space around us.
 * SPACE IS BIG!
 */
function Space() {
    this.spaceTime = 4; // resets in the resetSpaceTime method.
    this.monsterTime = 35; // countdown for monster creation.
    this.numStars = 200;
    this.arrx = [];
    this.arry = [];
    this.bgImage = new Image();
    this.bgImage.src = 'img/background.png';
    console.log ('Space instanciated.');
}
Space.prototype = {
      createSpace: function () {
        var i, x, y;
        // Draw 50 stars.
        for ( i = 0; i <= this.numStars; i++ ) {
          // Get random positions for stars.
          x = Math.floor(Math.random() * SPACE_WIDTH);
          y = Math.floor(Math.random() * SPACE_HEIGHT);
          this.arrx[i] = x;
          this.arry[i] = y;
        }
      },

      getSpaceTime: function() {
        return this.spaceTime;
      },
      resetSpaceTime: function() {
        this.spaceTime = 4;
      },
      getMonsterTime: function() {
        return this.monsterTime;
      },
      resetMonsterTime: function() {
        this.monsterTime = 35;
      },

      update: function() {
        var j;
         for ( j = 0; j <= this.numStars; j++ ) {
              if (this.arrx[j] === 0 ) {
                this.arrx[j] = SPACE_WIDTH;
              } else {
                this.arrx[j] = this.arrx[j] - 1;
              }
              if (this.arry[j] === 0 ) {
                this.arry[j] = SPACE_HEIGHT;
              } else {
                this.arry[j] = this.arry[j] - 1;
             }
        }
      },

      countDown: function() {
        --this.spaceTime;
            if (this.spaceTime === 0) {
                this.update();
                this.resetSpaceTime();
        }
        --this.monsterTime;
            if (this.monsterTime === 0) {
                this.resetMonsterTime();
        }
      },

      draw: function(ship) {
        var j, x, y, arrx, arry;
        arrx = this.arrx; arry = this.arry;
          // Draw an individual star.
          CX.save();
          CX.beginPath();
          CX.fillStyle = "white";
          for ( j = 0; j <= arrx.length; j++ ) {
              x = arrx[j];
              y = arry[j];
              // Give the ship some room by removing stars around ship.
              if ( x > ship.x - 12  && x < ship.x + 12 && y > ship.y - 8  && y < ship.y + 8) {
                   x = 0; y = 0;
              }
              CX.fillRect(x,y,2,2);
              CX.closePath();
          }
        // Background image
        // CX.drawImage(this.bgImage, 0, 0);
        CX.restore();
      },

      // handle mousedown events JQuery here ---- rethink.
      handleMouseDown: function(e) {
          var canvasOffset=$("#canvas1").offset();  // Account for canvas offset.
          var offsetX=canvasOffset.left;
          var offsetY=canvasOffset.top;
          var mx, my;
          mx = parseInt(e.clientX - offsetX, 10);
          my = parseInt(e.clientY - offsetY, 10);
          return {x: mx, y: my};
          }
};
