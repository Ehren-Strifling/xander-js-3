"use strict";
//Ehren Strifling

/** creates a Vector which is 2 numbers packed together.
 * @param {number} x
 * @param {number} y
 * 
 * @returns {Vector2}
 */
function Vector2(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
/**
 * Returns a copy of this vector.
 * @returns {Vector2}
 */
Vector2.prototype.copy = Vector2.prototype.vectorCopy = function () {
  return new Vector2(this.x, this.y);
};
/**
 * Copies the values of another vector, then returns itself
 * @param {Vector2} v
 * @returns {Vector2}
 */
Vector2.prototype.setVector = function (v) {
  this.x = v.x;
  this.y = v.y;
  return this;
};
/**
 * Sets this vector's x and y value, then returns itself.
 * @param {number} x 
 * @param {number} y 
 * @returns {Vector2}
 */
Vector2.prototype.set = function (x,y) {
  this.x = x;
  this.y = y;
  return this;
};
/**
 * Resets this vector to a zero vector, then returns itself.
 * @returns {Vector2}
 */
Vector2.prototype.zero = function() {
  this.x = 0;
  this.y = 0;
  return this;
};

/** This vector's x value
 * @returns {number}
 */
Vector2.prototype.getX = function() {
  return this.x;
};
/** This vector's y value
 * @returns {number}
 */
Vector2.prototype.getY = function () {
  return this.y;
};
/** Whether or not this vector is equal to 0
 * @returns {boolean}
 */
Vector2.prototype.isZero = function () {
  return !(this.x || this.y);
}

/* - - - - - - - - - -
  Basic math
 - - - - - - - - - - */

/**
 * Adds another vector to this vector, then returns this vector.
 * @param {Vector2} vector 
 * @returns {Vector2}
 */
Vector2.prototype.add = function (vector) {
  this.x += vector.x;
  this.y += vector.y;
  return this;
};
/**
 * Subtracts another vector from this vector, then returns this vector.
 * @param {Vector2} vector 
 * @returns {Vector2}
 */
Vector2.prototype.subtract = function (vector) {
  this.x -= vector.x;
  this.y -= vector.y;
  return this;
};
/**
 * Multiplies this vector by a number, then returns this vector.
 * @param {number} number 
 * @returns {Vector2}
 */
Vector2.prototype.scale = function (number) {
  this.x *= number;
  this.y *= number;
  return this;
};

/* - - - - - - - - - -
  Rotations
 - - - - - - - - - - */

 /**
 * Returns the angle (in radians) that this vector points towards
 * @returns {number}
 */
Vector2.prototype.getAngle = function () {
  return (this.x>=0) 
  ? Math.atan(this.y/this.x) 
  : Math.PI + Math.atan(this.y/this.x);
};

 /**
  * Turns this vector into a perpendicular vector by rotating it 90 degrees clockwise, then returns this vector.
  * @returns {Vector2}
  */
Vector2.prototype.perpendicular = function () {
  let number = this.x;
  this.x = this.y;
  this.y = -number;
  return this;
};
/**
 * Inverts this vector, then returns this vector.
 * This is the same as rotating a vector by 180 degrees.
 * @returns {Vector2}
 */
Vector2.prototype.invert = function () {
  this.x = -this.x;
  this.y = -this.y;
  return this;
};
 /**
  * Turns this vector into a perpendicular vector by rotating it 90 degrees counter-clockwise, then returns this vector.
  * @returns {Vector2}
  */
 Vector2.prototype.perpendicularCC = function () {
  let number = this.x;
  this.x = -this.y;
  this.y = number;
  return this;
};


/* - - - - - - - - - -
  Other operations
 - - - - - - - - - - */
/**
 * Returns the magnitude (length) of this vector.
 * @returns {number}
 */
Vector2.prototype.magnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
/**
 * Returns the square of the magnitude (length) of this vector.
 * @returns {number}
 */
Vector2.prototype.sqMagnitude = function () {
  return this.x * this.x + this.y * this.y;
};
/**
 * Returns the dot product of this vector with another vector.
 * @param {Vector2} vector 
 * @returns {number}
 */
Vector2.prototype.dotProduct = function (vector) {
  return (this.x * vector.x + this.y * vector.y);
};
/**
 * returns the distance between 2 vectors
 * @param {Vector2} vector 
 * @returns {number}
 */
Vector2.prototype.distance = function (vector) {
  return Math.sqrt((this.x-vector.x)*(this.x-vector.x) + (this.y-vector.y)*(this.y-vector.y));
};
/**
 * returns the square of the distance between 2 vectors
 * @param {Vector2} vector 
 * @returns {number}
 */
Vector2.prototype.sqDistance = function (vector) {
  return (this.x-vector.x)*(this.x-vector.x) + (this.y-vector.y)*(this.y-vector.y);
};
/**
 * Shortens or lengthens this vector's length to 1, then returns this vector.
 * @returns {Vector2}
 */
Vector2.prototype.normalize = function () {
  let magnitude = this.magnitude();
  if (magnitude != 0) { //We don't want to deal with NaN vectors
    magnitude = 1 / magnitude; //not magnitude anymore.
    this.x *= magnitude;
    this.y *= magnitude;
  }
  return this;
};



/* - - - - - - - - - -
  Vector 3
 - - - - - - - - - - */

/** creates a Vector3 which is 3 numbers packed together./
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * 
 * @returns {Vector3}
 */
function Vector3(x = 0, y = 0, z = 0) {
  this.x = x;
  this.y = y;
  this.z = z;
}
/**
 * Returns a copy of this vector.
 * @returns {Vector3}
 */
Vector3.prototype.copy = Vector3.prototype.vectorCopy = function () {
  return new Vector3(this.x, this.y, this.z);
};

/**
 * Copies the values of another vector, then returns itself
 * @param {Vector3} v
 * @returns {Vector3}
 */
Vector3.prototype.setVector = function (v) {
  this.x = v.x;
  this.y = v.y;
  this.z = v.z;
  return this;
};
/**
 * Sets this vector's x, y and z value, then returns itself.
 * @param {number} x 
 * @param {number} y 
 * @returns {Vector3}
 */
Vector3.prototype.set = function (x,y,z) {
  this.x = x;
  this.y = y;
  this.z = z
  return this;
};
/**
 * Resets this vector to a zero vector, then returns itself.
 * @returns {Vector3}
 */
Vector3.prototype.zero = function() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  return this;
};

/** This vector's x value
 * @returns {number}
 */
Vector3.prototype.getX = function () {
  return this.x;
};
/** This vector's y value
 * @returns {number}
 */
Vector3.prototype.getY = function () {
  return this.y;
};
/** This vector's z value
 * @returns {number}
 */
Vector3.prototype.getZ = function () {
  return this.z;
};
/** Whether or not this vector is equal to 0
 * @returns {boolean}
 */
Vector3.prototype.isZero = function () {
  return this.x || this.y || this.z;
};

/* - - - - - - - - - -
  Basic math
 - - - - - - - - - - */

/**
 * Adds another vector to this vector, then returns this vector.
 * @param {Vector3} vector 
 * @returns {Vector3}
 */
Vector3.prototype.add = function (vector) {
  this.x += vector.x;
  this.y += vector.y;
  this.z += vector.z;
  return this;
};
/**
 * Subtracts another vector from this vector, then returns this vector.
 * @param {Vector3} vector 
 * @returns {Vector3}
 */
Vector3.prototype.subtract = function (vector) {
  this.x -= vector.x;
  this.y -= vector.y;
  this.z -= vector.z;
  return this;
};
/**
 * Multiplies this vector by a number, then returns this vector.
 * @param {number} number 
 * @returns {Vector3}
 */
Vector3.prototype.scale = function (number) {
  this.x *= number;
  this.y *= number;
  this.z *= number;
  return this;
};

/* - - - - - - - - - -
  Rotations
 - - - - - - - - - - */
 /**
 * Inverts this vector, then returns this vector.
 * @returns {Vector3}
 */
Vector3.prototype.invert = function () {
  this.x = -this.x;
  this.y = -this.y;
  this.z = -this.z;
  return this;
};

/* - - - - - - - - - -
  Other operations
 - - - - - - - - - - */
/**
 * Returns the magnitude (length) of this vector.
 * @returns {number}
 */
Vector3.prototype.magnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};
/**
 * Returns the square of the magnitude (length) of this vector.
 * @returns {number}
 */
Vector3.prototype.sqMagnitude = function () {
  return this.x * this.x + this.y * this.y + this.z * this.z;
};
/**
 * Returns the dot product of this vector with another vector.
 * @param {Vector3} vector 
 * @returns {number}
 */
Vector3.prototype.dotProduct = function (vector) {
  return (this.x * vector.x + this.y * vector.y + this.z * vector.z);
};
/**
 * returns the distance between 2 vectors
 * @param {Vector3} vector 
 * @returns {number}
 */
Vector3.prototype.distance = function (vector) {
  return Math.sqrt((this.x-vector.x)*(this.x-vector.x) +
  (this.y-vector.y)*(this.y-vector.y) +
  (this.z-vector.z)*(this.z-vector.z));
};
/**
 * returns the square of the distance between 2 vectors
 * @param {Vector3} vector 
 * @returns {number}
 */
Vector3.prototype.sqDistance = function (vector) {
  return (this.x-vector.x)*(this.x-vector.x) +
  (this.y-vector.y)*(this.y-vector.y) +
  (this.z-vector.z)*(this.z-vector.z);
};
/**
 * Shortens or lengthens this vector's length to 1, then returns this vector.
 * @returns {Vector3}
 */
Vector3.prototype.normalize = function () {
  let magnitude = this.magnitude();
  if (magnitude != 0) { //We don't want to deal with NaN vectors
    magnitude = 1 / magnitude; //not magnitude anymore.
    this.x *= magnitude;
    this.y *= magnitude;
    this.z *= magnitude;
  }
  return this;
};