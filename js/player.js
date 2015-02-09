/*globals SPACE_WIDTH, SPACE_HEIGHT, CX, window, Td, Vector, Forces, Bullet, Monster,
 Key:true, Player:true, playerBullets:true, monsters:true*/


/**
 * Trace the keys pressed
 * http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
 */
window.Key = {
  pressed: {},

  LEFT:   37,
  UP:     38,
  RIGHT:  39,
  DOWN:   40,
  SPACE:  32,
  A:      65,
  S:      83,
  D:      68,
  W:      87,

  isDown: function(keyCode, keyCode1) {
    return this.pressed[keyCode] || this.pressed[keyCode1];
  },

  onKeydown: function(event) {
    this.pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this.pressed[event.keyCode];
  }
};


/**
 * A Player as an object. Instance AKA Ship.
 */
function Player(position) {
  this.height     =  20;
  this.width      =  10;
  this.position   = position  || new Vector();
  this.velocity   = new Vector();
  this.speed      = new Vector();
  this.direction  = 0;
  this.accelerateForce  = Forces.createAcceleration(new Vector(80, 80));
  this.breakForce       = Forces.createDamping(0.97);
  this.dampForce        = Forces.createDamping(0.999);
  this.bulletCount = 0;
}

Player.prototype = {
  draw: function() {
    var x = this.width/2, y = this.height/2;

    CX.save();
    CX.lineWidth = 1;
    CX.strokeStyle = 'hsla(0,0%,100%,1)';
    CX.translate(this.position.x, this.position.y);
    CX.rotate(this.direction+Math.PI/2);
    CX.beginPath();
    CX.moveTo(0, -y);
    CX.lineTo(x, y);
    CX.lineTo(0, 0.8*y);
    CX.lineTo(-x, y);
    CX.lineTo(0, -y);

    if (Key.isDown(Key.UP, Key.W)) {
      CX.moveTo(0, y);
      CX.lineTo(-2, y+10);
      CX.lineTo(0, y+8);
      CX.lineTo(2, y+10);
      CX.lineTo(0, y);
    }

    if (Key.isDown(Key.DOWN, Key.S)) {
      CX.moveTo(y+4, 0);
      CX.arc(0, 0, y+4, 0, Math.PI, true);
    }

    CX.stroke();
    CX.restore();

  },

  moveForward: function() {
    this.dampForce(this.speed, Td);
    this.position.x += this.speed.x * Math.cos(this.direction) * Td;
    this.position.y += this.speed.y * Math.sin(this.direction) * Td;
    this.position.iadd(this.velocity.muls(Td));
  },

  rotateLeft:  function() { this.direction -= Math.PI/30; },
  rotateRight: function() { this.direction += Math.PI/30; },

  throttle: function(Td)  { this.accelerateForce(this.speed, Td); },
  breaks:   function(Td)  { this.breakForce(this.speed, Td); this.breakForce(this.velocity, Td); },

  update: function(Td) {
    if (Key.isDown(Key.UP, Key.W)) { this.throttle(Td); }
    if (Key.isDown(Key.LEFT, Key.A)) { this.rotateLeft(); }
    if (Key.isDown(Key.DOWN, Key.S)) { this.breaks(Td); }
    if (Key.isDown(Key.RIGHT, Key.D)) { this.rotateRight(); }
    Forces.update(this.velocity, Td);
    this.moveForward(Td);
    this.stayInArea();
  },

  stayInArea: function() {
    if(this.position.y < -this.height)        { this.position.y = SPACE_HEIGHT - 2; }
    if(this.position.y > SPACE_HEIGHT)   { this.position.y = -this.height; }
    if(this.position.x > SPACE_WIDTH)    { this.position.x = -this.width; }
    if(this.position.x < -this.width)         {this.position.x = SPACE_WIDTH -2; }
  },

  midpoint: function() {
    return {
      x: this.position.x,
      y: this.position.y
    };
  },

  shoot: function(target) {
    var origin = this.midpoint();
    this.bulletCount++;
    playerBullets.push( new Bullet( origin, target ) );
}

};



/*
this.speed = 10; //exempel-värde för skalär
this.position.x += this.speed * Math.cos(this.direction) * td; //ger vektors x-komponent från dess skalär
this.position.y += this.speed * Math.sin(this.direction) * td;//ger vektors y-komponent från dess skalär
*/