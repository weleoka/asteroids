/**
 * Helpers and tools to ease your JavaScript day.
 *
 * @author Kai Weeks (me@meeee.se)
 */
window.Kai = (function (window, document, undefined) {
  var Kai = {};

  /**
   * clone an object.
   * @param object to clone.
   */
  Kai.cloneObject = function (source) {
    var i;
    for (i in source) {
      if (source.hasOwnProperty(i)) {
        if (typeof source[i] === 'source') {
          this[i] = new CloneObject(i);
        } else {
          this[i] = source[i];
        }
      }
    }
  };



  /**
   * Remove all properties of object. Effectively reverts to new object.
   * @param object to clean.
   */
Kai.wipe = function (obj) {
	var p;
  for (p in obj) {
		if (obj.hasOwnProperty(p)) {
			delete obj[p];
    }
	}
};



  /**
   * Compare two array sto see if they contain the same values.
   * @param array a
   * @param array b
   *
   * @return boolean
   */
Kai.equalArrays = function (a,b) {
  var i;
  if (a.length !== b.length) { return false; }
  for(i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {return false; }
  }
};



  /**
   * To benchmark a function return it again.s
   * @param object
   */
Kai.benchmarkFunction = function (fTest) {
  var nStartTime = Date.now(),
      vReturn = fTest(),
      nEndTime = Date.now();

  console.log('Elapsed time: ' + String(nEndTime - nStartTime) + ' milliseconds');
  return vReturn;
};



  /**
   * Functions for generating random numbers. Generate random number between 1 and @param max.
   * @param int $max.
   */
Kai.randomNumber = function (max) {
  return Math.floor(Math.random() * max) + 1;
};

  // Generate random number between @param min and @param max
Kai.random = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

  /**
   * Test input to see if it is an eMail address.
   * @param int $max.
   * /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   */
Kai.validateEmail = function (email) {
  var re = /^.+@.+\..+$/;
  return re.test(email);
};


// This function adds property accessor methods for a property with
// the specified name to the object o. The methods are named get<name>
// and set<name>. If a predicate function is supplied, the setter
// method uses it to test its argument for validity before storing it.
// If the predicate returns false, the setter method throws an exception.
//
// The unusual thing about this function is that the property value
// that is manipulated by the getter and setter methods is not stored in
// the object o. Instead, the value is stored only in a local variable
// in this function. The getter and setter methods are also defined
// locally to this function and therefore have access to this local variable.
// This means that the value is private to the two accessor methods, and it
// cannot be set or modified except through the setter method.
Kai.addPrivateProperty = function (o, name, predicate) {
    var value; // This is the property value
// The getter method simply returns the value.
    o["get" + name] = function() { return value; };
// The setter method stores the value or throws an exception if
// the predicate rejects the value.
    o["set" + name] = function(v) {
        if (predicate && !predicate(v)) {
          throw new Error("set" + name + ": invalid value " + v);
        }
        value = v;
    };
};
// The following code demonstrates the addPrivateProperty() method.
// var o = {}; // Here is an empty object

// Add property accessor methods getName and setName()
// Ensure that only string values are allowed
// addPrivateProperty(o, "Name", function(x) { return typeof x == "string"; });
// o.setName("Frank");
// Set the property value
// console.log(o.getName()); // Get the property value
// o.setName(0); // Try to set a value of the wrong type


  // Expose public methods
  return Kai;

})(window, window.document);

