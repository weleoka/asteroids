
/**
 * All objects are Vectors
 */
function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}
Vector.prototype = {
  muls:  function (scalar) { return new Vector( this.x * scalar, this.y * scalar); }, // Multiply with scalar
  imuls: function (scalar) { this.x *= scalar; this.y *= scalar; return this; },      // Multiply itself with scalar
  adds:  function (scalar) { return new Vector( this.x + scalar, this.y + scalar); }, // Multiply with scalar
  iadd:  function (vector) { this.x += vector.x; this.y += vector.y; return this; }   // Add itself with Vector
};


/**
 * The forces around us.
 */
function Forces() {
  this.all = {};
}
Forces.prototype = {
  createAcceleration: function(vector) {
    return function(velocity, Td) {
      velocity.iadd(vector.muls(Td));
    };
  },

  createDamping: function(damping) {
    return function(velocity) {
      velocity.imuls(damping);
    };
  },

  createWind: function(vector) {
    return function(velocity, Td) {
      velocity.iadd(vector.adds(Td));
    };
  },

  addAcceleration:  function(name, vector)  { this.all[name] = this.createAcceleration(vector); },
  addDamping:       function(name, damping) { this.all[name] = this.createDamping(damping); },
  addWind:          function(name, vector)  { this.all[name] = this.createWind(vector); },

  update: function(object, Td) {
  var force;
    for( force in this.all) {
      if (this.all.hasOwnProperty(force)) {
        this.all[force](object, Td);
      }
    }
  }
};