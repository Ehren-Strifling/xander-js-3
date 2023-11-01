"use strict";
/*Ehren Strifling
  Newer version of input.js made to better support controllers.
*/
//Requires Vector2.js

class InputV2 {
  constructor() {
    /**@type {InputV2Controller[]} */
    this.controllers = new Array(4);
    for (let i=0;i<this.controllers.length;++i) {
      this.controllers[i] = new InputV2Controller();
    }
    /**@type {number} Which controller the keyboard's inputs are sent to */
    this.keyboardController = 0;
    /**@type {number} Which controller the mouse's inputs are sent to */ 
    this.mouseController = 0;

    /**@type {InputV2KeyboardManager} */
    this.keyboardManager = new InputV2KeyboardManager();
    /**@type {InputV2MouseManager} */
    this.mouseManager = new InputV2MouseManager();
  }

  reset() {
    this.keyboardManager.reset();
    this.mouseManager.reset();
    for (let i=0;i<this.controllers.length;++i) {
      this.controllers[i].reset();
    }
  }

  addListeners(element) {
    //disables the context menu upon left clicking, we will want to use the left mouse button as an input.
    element.addEventListener('contextmenu', (e) => { e.preventDefault(); },false);

    element.addEventListener('mousemove', (e) => this.onMouseMove(e));
    element.addEventListener('mousedown', (e) => this.onMouseDown(e));
    element.addEventListener('mouseup', (e) => this.onMouseUp(e));
    element.addEventListener('wheel', (e) => this.onMouseWheel(e), {passive: true});
    
    //these functions need to be attached to the window... I think.
    element.addEventListener('keydown', (e) => this.onKeyDown(e));
    element.addEventListener('keyup', (e) => this.onKeyUp(e));
  
    element.tabIndex = 0;
  }

  onMouseMove(e) {
    this.mouseManager.onMouseMove(e, this.controllers[this.mouseController]);
  }
  onMouseDown(e) {
    this.mouseManager.onMouseDown(e, this.controllers[this.mouseController]);
  }
  onMouseUp(e) {
    this.mouseManager.onMouseUp(e, this.controllers[this.mouseController]);
  }
  onMouseWheel(e) {
    this.mouseManager.onMouseWheel(e, this.controllers[this.mouseController]);
  }

  onKeyDown(e) {
    this.keyboardManager.onKeyDown(e, this.controllers[this.mouseController]);
  }
  onKeyUp(e) {
    this.keyboardManager.onKeyUp(e, this.controllers[this.mouseController]);
  }

  get player1() {
    return this.controllers[0];
  }
  get player2() {
    return this.controllers[1];
  }
  get player3() {
    return this.controllers[2];
  }
  get player4() {
    return this.controllers[3];
  }
}
class InputV2Controller {
  //these are supposed to be used inside this script
  static BUTTONS = Object.freeze({
    START:              0,
    SELECT:             1,
    A_BUTTON:           2,
    B_BUTTON:           3,
    C_BUTTON:           4,
    D_BUTTON:           5,
    W_BUTTON:           6,
    X_BUTTON:           7,
    Y_BUTTON:           8,
    Z_BUTTON:           9,
    LEFT_BUTTON:        10,
    RIGHT_BUTTON:       11,
    LEFT_TRIGGER:       12,
    RIGHT_TRIGGER:      13,
    LEFT_STICK:         14,
    RIGHT_STICK:        15,
    HOME:               16,
    SCREEN_SHOT:        17
  });

  static AXIS = Object.freeze({
    LEFT:               0,
    RIGHT:              1
  })
  
  //these can be used in external scripts if you wish
  static PRESSED = 3;
  static HELD = 2;
  static RELEASED = 1;
  static NONE = 0;

  constructor() {
    this.buttons = new Array(18);
    this.buttons.fill(0)
    this.analogs = new Array(18);
    this.analogs.fill(0);
    this.axis = new Array(2);
    for (let i=0;i<this.axis.length;++i) {
      this.axis[i] = new Vector2();
    }
  }

  reset() {
    for (let i=0;i<this.buttons.length;++i) {
      this.buttons[i]&=2;
    }
  }

  //Button getters
  get buttonStart() {
    return this.buttons[this.constructor.BUTTONS.START];
  }
  get buttonSelect() {
    return this.buttons[this.constructor.BUTTONS>SELECT];
  }
  get buttonA() {
    return this.buttons[this.constructor.BUTTONS.A_BUTTON];
  }
  get buttonB() {
    return this.buttons[this.constructor.BUTTONS.B_BUTTON];
  }
  get buttonC() {
    return this.buttons[this.constructor.BUTTONS.C_BUTTON];
  }
  get buttonD() {
    return this.buttons[this.constructor.BUTTONS.D_BUTTON];
  }
  get buttonW() {
    return this.buttons[this.constructor.BUTTONS.W_BUTTON];
  }
  get buttonX() {
    return this.buttons[this.constructor.BUTTONS.X_BUTTON];
  }
  get buttonY() {
    return this.buttons[this.constructor.BUTTONS.Y_BUTTON];
  }
  get buttonZ() {
    return this.buttons[this.constructor.BUTTONS.Z_BUTTON];
  }
  get buttonLB() {
    return this.buttons[this.constructor.BUTTONS.LEFT_BUTTON];
  }
  get buttonRB() {
    return this.buttons[this.constructor.BUTTONS.RIGHT_BUTTON];
  }
  get buttonLT() {
    return this.buttons[this.constructor.BUTTONS.LEFT_TRIGGER];
  }
  get buttonRT() {
    return this.buttons[this.constructor.BUTTONS.RIGHT_TRIGGER];
  }
  get buttonLS() {
    return this.buttons[this.constructor.BUTTONS.LEFT_STICK];
  }
  get buttonRS() {
    return this.buttons[this.constructor.BUTTONS.RIGHT_STICK];
  }
  get buttonHome() {
    return this.buttons[this.constructor.BUTTONS.HOME];
  }
  get buttonScreenShot() {
    return this.buttons[this.constructor.BUTTONS.SCREEN_SHOT];
  }

  set buttonStart(n) {
    this.buttons[this.constructor.BUTTONS.START] = n;
  }
  set buttonSelect(n) {
    this.buttons[this.constructor.BUTTONS>SELECT] = n;
  }
  set buttonA(n) {
    this.buttons[this.constructor.BUTTONS.A_BUTTON] = n;
  }
  set buttonB(n) {
    this.buttons[this.constructor.BUTTONS.B_BUTTON] = n;
  }
  set buttonC(n) {
    this.buttons[this.constructor.BUTTONS.C_BUTTON] = n;
  }
  set buttonD(n) {
    this.buttons[this.constructor.BUTTONS.D_BUTTON] = n;
  }
  set buttonW(n) {
    this.buttons[this.constructor.BUTTONS.W_BUTTON] = n;
  }
  set buttonX(n) {
    this.buttons[this.constructor.BUTTONS.X_BUTTON] = n;
  }
  set buttonY(n) {
    this.buttons[this.constructor.BUTTONS.Y_BUTTON] = n;
  }
  set buttonZ(n) {
    this.buttons[this.constructor.BUTTONS.Z_BUTTON] = n;
  }
  set buttonLB(n) {
    this.buttons[this.constructor.BUTTONS.LEFT_BUTTON] = n;
  }
  set buttonRB(n) {
    this.buttons[this.constructor.BUTTONS.RIGHT_BUTTON] = n;
  }
  set buttonLT(n) {
    this.buttons[this.constructor.BUTTONS.LEFT_TRIGGER] = n;
  }
  set buttonRT(n) {
    this.buttons[this.constructor.BUTTONS.RIGHT_TRIGGER] = n;
  }
  set buttonLS(n) {
    this.buttons[this.constructor.BUTTONS.LEFT_STICK] = n;
  }
  set buttonRS(n) {
    this.buttons[this.constructor.BUTTONS.RIGHT_STICK] = n;
  }
  set buttonHome(n) {
    this.buttons[this.constructor.BUTTONS.HOME] = n;
  }
  set buttonScreenShot(n) {
    this.buttons[this.constructor.BUTTONS.SCREEN_SHOT] = n;
  }

  //analog input getters. Most of these unused
  get analogStart() {
    return this.analogs[this.constructor.BUTTONS.START];
  }
  get analogSelect() {
    return this.analogs[this.constructor.BUTTONS>SELECT];
  }
  get analogA() {
    return this.analogs[this.constructor.BUTTONS.A_BUTTON];
  }
  get analogB() {
    return this.analogs[this.constructor.BUTTONS.B_BUTTON];
  }
  get analogC() {
    return this.analogs[this.constructor.BUTTONS.C_BUTTON];
  }
  get analogD() {
    return this.analogs[this.constructor.BUTTONS.D_BUTTON];
  }
  get analogW() {
    return this.analogs[this.constructor.BUTTONS.W_BUTTON];
  }
  get analogX() {
    return this.analogs[this.constructor.BUTTONS.X_BUTTON];
  }
  get analogY() {
    return this.analogs[this.constructor.BUTTONS.Y_BUTTON];
  }
  get analogZ() {
    return this.analogs[this.constructor.BUTTONS.Z_BUTTON];
  }
  get analogLB() {
    return this.analogs[this.constructor.BUTTONS.LEFT_BUTTON];
  }
  get analogRB() {
    return this.analogs[this.constructor.BUTTONS.RIGHT_BUTTON];
  }
  get analogLT() {
    return this.analogs[this.constructor.BUTTONS.LEFT_TRIGGER];
  }
  get analogRT() {
    return this.analogs[this.constructor.BUTTONS.RIGHT_TRIGGER];
  }
  get analogLS() {
    return this.analogs[this.constructor.BUTTONS.LEFT_STICK];
  }
  get analogRS() {
    return this.analogs[this.constructor.BUTTONS.RIGHT_STICK];
  }
  get analogHome() {
    return this.analogs[this.constructor.BUTTONS.HOME];
  }
  get analogScreenShot() {
    return this.analogs[this.constructor.BUTTONS.SCREEN_SHOT];
  }

  set analogStart(n) {
    this.analogs[this.constructor.BUTTONS.START] = n;
  }
  set analogSelect(n) {
    this.analogs[this.constructor.BUTTONS>SELECT] = n;
  }
  set analogA(n) {
    this.analogs[this.constructor.BUTTONS.A_BUTTON] = n;
  }
  set analogB(n) {
    this.analogs[this.constructor.BUTTONS.B_BUTTON] = n;
  }
  set analogC(n) {
    this.analogs[this.constructor.BUTTONS.C_BUTTON] = n;
  }
  set analogD(n) {
    this.analogs[this.constructor.BUTTONS.D_BUTTON] = n;
  }
  set analogW(n) {
    this.analogs[this.constructor.BUTTONS.W_BUTTON] = n;
  }
  set analogX(n) {
    this.analogs[this.constructor.BUTTONS.X_BUTTON] = n;
  }
  set analogY(n) {
    this.analogs[this.constructor.BUTTONS.Y_BUTTON] = n;
  }
  set analogZ(n) {
    this.analogs[this.constructor.BUTTONS.Z_BUTTON] = n;
  }
  set analogLB(n) {
    this.analogs[this.constructor.BUTTONS.LEFT_BUTTON] = n;
  }
  set analogRB(n) {
    this.analogs[this.constructor.BUTTONS.RIGHT_BUTTON] = n;
  }
  set analogLT(n) {
    this.analogs[this.constructor.BUTTONS.LEFT_TRIGGER] = n;
  }
  set analogRT(n) {
    this.analogs[this.constructor.BUTTONS.RIGHT_TRIGGER] = n;
  }
  set analogLS(n) {
    this.analogs[this.constructor.BUTTONS.LEFT_STICK] = n;
  }
  set analogRS(n) {
    this.analogs[this.constructor.BUTTONS.RIGHT_STICK] = n;
  }
  set analogHome(n) {
    this.analogs[this.constructor.BUTTONS.HOME] = n;
  }
  set analogScreenShot(n) {
    this.analogs[this.constructor.BUTTONS.SCREEN_SHOT] = n;
  }

  /**@returns {Vector2} */
  get axisLeft() {
    return this.axis[this.constructor.AXIS.LEFT];
  }
  /**@returns {Vector2} */
  get axisRight() {
    return this.axis[this.constructor.AXIS.RIGHT];
  }
}

/** @abstract */
class InputV2KeyboardManager {
  onKeyDown(e, controller) {}
  onKeyUp(e, controller) {}

  key(id) {};
  reset() {}
}
/** @abstract */
class InputV2MouseManager {
  onMouseMove(e, controller) {}
  onMouseDown(e, controller) {}
  onMouseUp(e, controller) {}
  onMouseWheel(e, controller) {}

  getMousePos() {return new Vector2();}
  getMouseDrag() {return new Vector2();}
  getMouseButtons() {return [5];}
  getMouseWheel() {return [3];}
  reset() {};
}