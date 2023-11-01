"use strict";
//Ehren Strifling

//Requires Vector2

/**
 * Creates a 2d camera object.
 * 
 * DO NOT USE SCALE VARIABLE
 * @returns {Camera2d}
 */
function Camera2d() {
  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;
  this.hw = 0; //half width
  this.hh = 0; //half height

  this.canvasWidth = 0;
  this.canvasHeight = 0;

  this.canvasScaleX = 1;
  this.canvasScaleY = 1;

  this._scale = 1;
}
if (window.Vector2) {
  Object.setPrototypeOf(Camera2d.prototype, Vector2.prototype);
}
/* - - - - - - - - - -
  Getters and Setters
 - - - - - - - - - - */

/**
 * Sets this camera's scale factor.
 * Higher = zoom in. Lower = zoom out.
 * @param {number} z
 */
Camera2d.prototype.setScale = function (z) {
  this._scale = z;
};
/**
 * Gets this camera's scale factor.
 * Higher = zoom in. Lower = zoom out.
 * @returns {number}
 */
Camera2d.prototype.getScale = function () {
  return this._scale;
};

/**
 * Sets this camera's width. Should be set to the width of the canvas.
 * @param {number} w 
 */
Camera2d.prototype.setWidth = function (w) {
  this.w = w;
  this.hw = w/2;
  this.updateCanvasScaleX();
};
/**
 * Gets this camera's width.
 * @returns {number}
 */
Camera2d.prototype.getWidth = function () {
  return this.w;
};
/**
 * Sets this camera's height. Should be set to the height of the canvas.
 * @param {number} w 
 */
Camera2d.prototype.setHeight = function (h) {
  this.h = h;
  this.hh = h/2;
  this.updateCanvasScaleY();
};
/**
 * Gets this camera's height.
 * @returns {number}
 */
Camera2d.prototype.getHeight = function () {
  return this.h;
};

Camera2d.prototype.setCanvasWidth = function (w) {
  this.canvasWidth = w;
  this.updateCanvasScaleX();
}
Camera2d.prototype.setCanvasHeight = function (h) {
  this.canvasHeight = h;
  this.updateCanvasScaleY();
}
Camera2d.prototype.updateCanvasScaleX = function () {
  if (this.canvasWidth!==0) {
    this.canvasScaleX = this.w / this.canvasWidth;
  }
}
Camera2d.prototype.updateCanvasScaleY = function () {
  if (this.canvasHeight!==0) {
    this.canvasScaleY = this.h / this.canvasHeight;
  }
}

/* - - - - - - - - - -
  Coordinate conversion functions
 - - - - - - - - - - */

/**
 * World to Point X.
 * 
 * takes an x value in world coordinates and converts it into a point to draw on the canvas based on scale and camera x.
 * @param {number} x
 * @returns {number}
 */
Camera2d.prototype.WtPX = function (x) {
  return (x - this.x) * this._scale + this.hw;
};
/**
 * World to Point Y.
 * 
 * takes a y value in world coordinates and converts it into a point to draw on the canvas based on scale and camera y.
 * @param {number} y
 * @returns {number}
 */
Camera2d.prototype.WtPY = function (y) {
  return (y - this.y) * this._scale + this.hh;
};
/**
 * Multiplies a number by this camera's scale value.
 * @param {number} number 
 * @returns {number}
 */
Camera2d.prototype.scale = function (number) {
  return number * this._scale;
};

/**
 * Point to World X.
 * 
 * takes an x coordinate as a point on the camera and converts it into world coordinates.
 * useful for checking if the mouse is clicking on something.
 * @param {number} x
 * @returns {number}
 */
Camera2d.prototype.PtWX = function (x) {
  return (x - this.hw) / this._scale + this.x;
};
/**
 * Point to World Y.
 * 
 * takes a y coordinate as a point on the camera and converts it into world coordinates.
 * useful for checking if the mouse is clicking on something.
 * @param {number} y
 * @returns {number}
 */
Camera2d.prototype.PtWY = function (y) {
  return (y - this.hh) / this._scale + this.y;
};

 /* - - - - - - - - - -
  Drawing Functions
 - - - - - - - - - - */

/**
 * Creates a filled rectangle on a canvas context using world values, adjusting values based on camera coordinates.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
*/
Camera2d.prototype.fillRect = function (ctx, x, y, width, height) {
  ctx.fillRect(
    (x - this.x) * this._scale + this.hw,
    (y - this.y) * this._scale + this.hh,
    width * this._scale,
    height * this._scale
  );
};
/**
 * Creates a rectangle outline on a canvas context using world values, adjusting values based on camera coordinates.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
*/
Camera2d.prototype.strokeRect = function (ctx, x, y, width, height) {
  ctx.strokeRect(
    (x - this.x) * this._scale + this.hw,
    (y - this.y) * this._scale + this.hh,
    width * this._scale,
    height * this._scale
  );
};

/**
 * creates a circle (or arc) on the context using world values, adjusting values to the camera coordinates.
 * @param {CanvasRenderingContext2D} ctx canvas to draw on
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} start
 * @param {number} end
*/
Camera2d.prototype.circle = function (ctx, x, y, radius, start = 0, end = Math.PI * 2) {
  ctx.arc( //inlined code because I don't think browsers do that. Some scripts might call draw code every frame so decent performance is important.
    (x - this.x) * this._scale + this.hw,
    (y - this.y) * this._scale + this.hh,
    radius * this._scale,
    start,
    end
  );
};

/**
 * Clears a canvas.
 * @param {CanvasRenderingContext2D} ctx
 */
Camera2d.prototype.clear = function (ctx) {
  ctx.clearRect(0, 0, this.w, this.h);
};

/**
 * Puts text on a canvas.
 * @param {CanvasRenderingContext2D} ctx
 * @param {String} text
 * @param {number} x
 * @param {number} y
 * @param {number} maxWidth
*/
Camera2d.prototype.fillText = function (ctx, text, x, y, maxWidth = undefined) {
  ctx.fillText(
    text,
    (x - this.x) * this._scale + this.hw,
    (y - this.y) * this._scale + this.hh,
    maxWidth
  );
};