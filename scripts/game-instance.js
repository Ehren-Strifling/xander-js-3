"use strict";
//Ehren Strifling

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Game Instance base class
 * @interface
 */
class GameInstance {
  /**@type {number} default frames per second if not specifically set */
  static FRAMES_PER_SECOND = 60;
  /**@type {number} how many loops to perform before skipping frames */
  static MAX_LOOPS = 4;
  constructor() {
    this.frameRate = 1000 / this.constructor.FRAMES_PER_SECOND;
    this.nextFrame;
  }
  async main() {
    while (true) {
      let loops = 0;
      while (Date.now()>=this.nextFrame) {
        if (loops++>=this.constructor.MAX_LOOPS) {
          this.nextFrame = Date.now()+this.frameRate;
          break;
        }
        this.act();
        this.nextFrame+=this.frameRate;
      }
      this.draw();

      await sleep(this.nextFrame-Date.now());
    }
  };
  
  start() {
    this.nextFrame = Date.now()+this.frameRate;
    this.startup();
    this.main();
  }
  /** @abstract */
  startup() {};
  /** @abstract */
  act() {};
  /** @abstract */
  draw() {};
}


