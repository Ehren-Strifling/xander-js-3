"use strict";
/*Ehren Strifling
  Newer version of input.js made to better support controllers.
*/
//Requires Vector2.js

class InputV2 {
  //Most browsers only support up to 4 controllers but there is no defined limit
  static CONTROLLER_COUNT = 4;
  constructor() {
    /**@type {InputV2Controller[]} */
    this.controllers = new Array(this.constructor.CONTROLLER_COUNT);
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

    /**@type {InputV2GamepadManager} */
    this.gamepadManager = new InputV2GamepadManager();
  }

  act() {
    this.manageController();
  }
  reset() {
    this.keyboardManager.reset();
    this.mouseManager.reset();
    for (let i=0;i<this.controllers.length;++i) {
      this.controllers[i].reset();
    }
  }

  manageController() {
    let gamepads = navigator.getGamepads();
    let count = Math.min(gamepads.length, this.constructor.CONTROLLER_COUNT);
    for (let i=0;i<count;++i) {
      this.gamepadManager.update(gamepads[i], this.controllers[i]);
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
    SELECT:             0,
    START:              1,
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
    DPAD_UP:            14,
    DPAD_DOWN:          15,
    DPAD_LEFT:          16,
    DPAD_RIGHT:         17,
    LEFT_STICK:         18,
    RIGHT_STICK:        19,
    HOME:               20,
    SCREEN_SHOT:        21
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
    this.buttons = new Array(22);
    this.buttons.fill(0)
    this.analogs = new Array(22);
    this.analogs.fill(0);
    this.axes = new Array(2);
    for (let i=0;i<this.axes.length;++i) {
      this.axes[i] = new Vector2();
    }
  }

  reset() {
    for (let i=0;i<this.buttons.length;++i) {
      this.buttons[i]&=2;
    }
  }

  //Button getters
  get buttonSelect() {
    return this.buttons[this.constructor.BUTTONS.SELECT];
  }
  get buttonStart() {
    return this.buttons[this.constructor.BUTTONS.START];
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
  get buttonDPadUp() {
    return this.buttons[this.constructor.BUTTONS.DPAD_UP];
  }
  get buttonDPadDown() {
    return this.buttons[this.constructor.BUTTONS.DPAD_UP];
  }
  get buttonDPadLeft() {
    return this.buttons[this.constructor.BUTTONS.DPAD_LEFT];
  }
  get buttonDPadRight() {
    return this.buttons[this.constructor.BUTTONS.DPAD_RIGHT];
  }
  get buttonHome() {
    return this.buttons[this.constructor.BUTTONS.HOME];
  }
  get buttonScreenShot() {
    return this.buttons[this.constructor.BUTTONS.SCREEN_SHOT];
  }

  set buttonSelect(n) {
    this.buttons[this.constructor.BUTTONS.SELECT] = n;
  }
  set buttonStart(n) {
    this.buttons[this.constructor.BUTTONS.START] = n;
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
  set buttonDPadUp(n) {
    this.buttons[this.constructor.BUTTONS.DPad_UP] = n;
  }
  set buttonDPadDown(n) {
    this.buttons[this.constructor.BUTTONS.DPad_DOWN] = n;
  }
  set buttonDPadLeft(n) {
    this.buttons[this.constructor.BUTTONS.DPad_LEFT] = n;
  }
  set buttonDPadRight(n) {
    this.buttons[this.constructor.BUTTONS.DPad_RIGHT] = n;
  }
  set buttonHome(n) {
    this.buttons[this.constructor.BUTTONS.HOME] = n;
  }
  set buttonScreenShot(n) {
    this.buttons[this.constructor.BUTTONS.SCREEN_SHOT] = n;
  }

  //analog input getters. Most of these unused
  get analogSelect() {
    return this.analogs[this.constructor.BUTTONS.SELECT];
  }
  get analogStart() {
    return this.analogs[this.constructor.BUTTONS.START];
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
  }pressed
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
  get analogDPadUp() {
    return this.analogs[this.constructor.BUTTONS.DPAD_UP];
  }
  get analogDPadDown() {
    return this.analogs[this.constructor.BUTTONS.DPAD_UP];
  }
  get analogDPadLeft() {
    return this.analogs[this.constructor.BUTTONS.DPAD_LEFT];
  }
  get analogDPadRight() {
    return this.analogs[this.constructor.BUTTONS.DPAD_RIGHT];
  }
  get analogHome() {
    return this.analogs[this.constructor.BUTTONS.HOME];
  }
  get analogScreenShot() {
    return this.analogs[this.constructor.BUTTONS.SCREEN_SHOT];
  }

  set analogSelect(n) {
    this.analogs[this.constructor.BUTTONS.SELECT] = n;
  }
  set analogStart(n) {
    this.analogs[this.constructor.BUTTONS.START] = n;
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
  set analogDPadUp(n) {
    this.analogs[this.constructor.BUTTONS.DPad_UP] = n;
  }
  set analogDPadDown(n) {
    this.analogs[this.constructor.BUTTONS.DPad_DOWN] = n;
  }
  set analogDPadLeft(n) {
    this.analogs[this.constructor.BUTTONS.DPad_LEFT] = n;
  }
  set analogDPadRight(n) {
    this.analogs[this.constructor.BUTTONS.DPad_RIGHT] = n;
  }
  set analogHome(n) {
    this.analogs[this.constructor.BUTTONS.HOME] = n;
  }
  set analogScreenShot(n) {
    this.analogs[this.constructor.BUTTONS.SCREEN_SHOT] = n;
  }

  /**@returns {Vector2} */
  get axisLeft() {
    return this.axes[this.constructor.AXIS.LEFT];
  }
  /**@returns {Vector2} */
  get axisRight() {
    return this.axes[this.constructor.AXIS.RIGHT];
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
/** @abstract */
class InputV2GamepadManager {
  /**
   * @param {Gamepad} gamepad 
   * @param {InputV2} controller 
   */
  update(gamepad, controller) {}
}



"use strict";

class DefaultKeyboardManager extends InputV2KeyboardManager {
  constructor() {
    super();
    this.keyMap = [223];//[223]; //keys pressed or held. 3 = pressed, 2 = held, 1 = released, 0 = none
    this.keyMap.fill(0);
  }
  /**
   * 
   * @param {Event} e 
   * @param {InputV2Controller} controller 
   */
  onKeyDown(e, controller) {
    if (e.keyCode) {
      this.keyMap[e.keyCode] = 3;
    }
    e.preventDefault(); //prevents spacebar from scrolling the screen and other weird things.
  }
  /**
   * 
   * @param {Event} e 
   * @param {InputV2Controller} controller 
   */
  onKeyUp(e, controller) {
    if (e.keyCode) {
      this.keyMap[e.keyCode] = 1;
    }
  }

  key(keyCode) {
    return this.keyMap[keyCode];
  }
  reset() {
    for (let i=0;i<this.keyMap.length;++i) {
      this.keyMap[i]&=2;
    }
  }
}
class DefaultMouseManager extends InputV2MouseManager {
  constructor() {
    super();

    this.camera = new Camera2d;

    this.mousePos = new Vector2();
    this.mouseDrag = new Vector2();
    this.mouseButtons = [5];
    this.mouseButtons.fill(0);
    this.mouseWheel = [3];
    this.mouseWheel.fill(0);
  }
  /**
   * @param {Event} e 
   * @param {InputV2Controller} controller 
   */
  onMouseMove(e, controller) {
    this.mouseDrag.x += this.mousePos.x - e.offsetX;
    this.mouseDrag.y += this.mousePos.y - e.offsetY;
    this.mousePos.x = e.offsetX;
    this.mousePos.y = e.offsetY;
  }
  /**
   * @param {Event} e 
   * @param {InputV2Controller} controller 
   */
  onMouseDown(e, controller) {
    this.mouseButtons[e.button] = 3;
  }
  /**
   * @param {Event} e 
   * @param {InputV2Controller} controller 
   */
  onMouseUp(e, controller) {
    this.mouseButtons[e.button] = 1;
  }
  /**
   * @param {Event} e 
   * @param {InputV2Controller} controller 
   */
  onMouseWheel(e, controller) {
    this.mouseWheel[0] = e.deltaX;
    this.mouseWheel[1] = e.deltaY;
    this.mouseWheel[2] = e.deltaZ; 
  }

  getMousePos() {
    return this.mousePos;
  }
  getMouseDrag() {
    return this.mouseDrag;
  }
  getMouseButtons() {
    return this.mouseButtons;
  }
  getMouseWheel() {
    return this.mouseWheel;
  }
  reset() {
    for (let i=0;i<this.mouseButtons.length;++i) {
      this.mouseButtons[i]&=2;
    }
  };
}

class DefaultGamepadManager extends InputV2GamepadManager {
  constructor() {
    super();
    this.lastUpdated = 0;
  }
  /**
   * @param {Gamepad} gamepad 
   * @param {InputV2} controller 
   */
  update(gamepad, controller) {
    if (gamepad===null) {
      return this.disconnected();
    }
    if (gamepad.timestamp<=this.lastUpdated) {
      return;
    }
    let id = gamepad.id;
    if (id.indexOf("057e")>-1) {
      this.nsProUpdate(gamepad, controller);
    } else {
      this.genericUpdate(gamepad, controller);
    }
    this.lastUpdated = gamepad.timestamp;
  }
  disconnected() {

  }

  /** Almost every controller will have the same joysticks so use this method to deal with them.
   * @param {Gamepad} gamepad 
   * @param {InputV2Controller} controller 
   */
  genericJoystick(gamepad, controller) {
    let axisLength = Math.min(gamepad.axes.length,4);
    for (let i=0; i<axisLength;++i) {
      let a = Math.floor(i/2);
      if (i&1) {
        controller.axes[a].y = gamepad.axes[i];
      } else {
        controller.axes[a].x = gamepad.axes[i];
      }
    }
  }
  /**
   * @param {Gamepad} gamepad 
   * @param {InputV2Controller} controller 
   */
  genericABXY(gamepad, controller, buttonIndex = 0) {
    //normally bottom, right, left, top
    //It took a lot of thinking to create this equation and I'm quite happy with it.
    //I'm so glad I don't have to spam if statements now.
    controller.buttonA = ((controller.buttonA>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogA = gamepad.buttons[buttonIndex].value; 
    buttonIndex++;
    controller.buttonB = ((controller.buttonB>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogB = gamepad.buttons[buttonIndex].value; 
    buttonIndex++;
    controller.buttonX = ((controller.buttonX>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogX = gamepad.buttons[buttonIndex].value; 
    buttonIndex++;
    controller.buttonY = ((controller.buttonY>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogY = gamepad.buttons[buttonIndex].value; 
  }
  /**
   * @param {Gamepad} gamepad 
   * @param {InputV2Controller} controller 
   */
  genericLBRB(gamepad, controller, buttonIndex = 4) {
    controller.buttonLB = ((controller.buttonLB>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogLB = gamepad.buttons[buttonIndex].value; 
    buttonIndex++;
    controller.buttonRB = ((controller.buttonRB>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogRB = gamepad.buttons[buttonIndex].value; 
  }
  /**
   * @param {Gamepad} gamepad 
   * @param {InputV2Controller} controller 
   */
  genericLTRT(gamepad, controller, buttonIndex) {
    controller.buttonLT = ((controller.buttonLT>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogLT = gamepad.buttons[buttonIndex].value; 
    buttonIndex++;
    controller.buttonRT = ((controller.buttonRT>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogRT = gamepad.buttons[buttonIndex].value; 
  }
  /**
   * @param {Gamepad} gamepad 
   * @param {InputV2Controller} controller 
   */
  genericSelectStart(gamepad, controller, buttonIndex) {
    controller.buttonSelect = ((controller.buttonSelect>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogSelect = gamepad.buttons[buttonIndex].value; 
    buttonIndex++;
    controller.buttonStart = ((controller.buttonStart>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogStart = gamepad.buttons[buttonIndex].value; 
  }
  /**
   * @param {Gamepad} gamepad 
   * @param {InputV2Controller} controller 
   */
  genericLSRS(gamepad, controller, buttonIndex) {
    controller.buttonLS = ((controller.buttonLS>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogLS = gamepad.buttons[buttonIndex].value; 
    buttonIndex++;
    controller.buttonRS = ((controller.buttonRS>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogRS = gamepad.buttons[buttonIndex].value; 
  }
  /**
   * @param {Gamepad} gamepad 
   * @param {InputV2Controller} controller 
   */
  genericDPad(gamepad, controller, buttonIndex) {
    //up down left right
    controller.buttonDPadUp = ((controller.buttonDPadUp>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogDPadUp = gamepad.buttons[buttonIndex].value; 
    buttonIndex++;
    controller.buttonDPadDown = ((controller.buttonDPadDown>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogDPadDown = gamepad.buttons[buttonIndex].value; 
    buttonIndex++;
    controller.buttonDPadLeft = ((controller.buttonDPadLeft>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogDPadLeft = gamepad.buttons[buttonIndex].value; 
    buttonIndex++;
    controller.buttonDPadRight = ((controller.buttonDPadRight>>>1) ^ gamepad.buttons[buttonIndex].pressed*3);
    controller.analogDPadRight = gamepad.buttons[buttonIndex].value; 
  }
  /**
   * @param {Gamepad} gamepad 
   * @param {InputV2Controller} controller 
   */
  genericUpdate(gamepad, controller) {
    this.genericJoystick(gamepad, controller);
    this.genericABXY(gamepad, controller);
    this.genericLBRB(gamepad, controller);
  }
  /**
   * @param {Gamepad} gamepad 
   * @param {InputV2Controller} controller 
   */
  nsProUpdate(gamepad, controller) {
    this.genericJoystick(gamepad, controller);
    this.genericABXY(gamepad, controller);
    this.genericLBRB(gamepad, controller);
    this.genericLTRT(gamepad, controller, 6)
    this.genericSelectStart(gamepad, controller, 8)
    this.genericLSRS(gamepad, controller, 10);
    this.genericDPad(gamepad, controller, 12);
    
    controller.buttonHome = ((controller.buttonHome>>>1) ^ gamepad.buttons[16].pressed*3);
    controller.analogHome = gamepad.buttons[16].value; 

    controller.buttonScreenShot = ((controller.buttonScreenShot>>>1) ^ gamepad.buttons[17].pressed*3);
    controller.analogScreenShot = gamepad.buttons[17].value; 
  }
}

