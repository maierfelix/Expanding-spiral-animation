"use strict";

/**
 * Renderer
 * @class Renderer
 */
class Renderer {

  /** @constructor */
  constructor() {

    /**
     * DOM container
     * @type {Object}
     */
    this.fpsContainer = document.querySelector("#fps");

    /**
     * DOM container
     * @type {Object}
     */
    this.neuronContainer = document.querySelector("#neurons");

    /**
     * DOM container
     * @type {Object}
     */
    this.canvasContainer = document.querySelector("#canvas");

    /**
     * Canvas 2D context
     * @type {Object}
     */
    this.ctx = this.canvasContainer.getContext("2d");

    /**
     * Canvas background color
     * @type {String}
     */
    this.canvasBackgroundColor = "#241C1F";

    /**
     * Width
     * @type {Number}
     */
    this.spectrum = 0;

    /**
     * Radius Factor
     * @type {Number}
     */
    this.radiusFactor = 0.00045;

    /**
     * Expand Mode
     * @type {Number}
     */
    this.mode = 1;

    /**
     * Width
     * @type {Number}
     */
    this.width = 0;

    /**
     * Height
     * @type {Number}
     */
    this.height = 0;

    /**
     * Running timer
     * @type {Number}
     */
    this.now = 0;

    /**
     * Active entities
     * @type {Array}
     */
    this.entities = [];

    /**
     * Last entity amount
     * @type {Number}
     */
    this.lastEntityAmount = 0;

    /**
     * Fps
     * @type {Number}
     */
    this.fps = 0;

    /**
     * Fps helper
     * @type {Number}
     */
    this.lastFps = (new Date()) * 1 - 1;

    /**
     * Next FPS update
     * @type {Number}
     */
    this.nextFpsUpdate = 0;

    /**
     * GC friendly iterator
     * @type {Number}
     */
    this.ii = 0;

  };

  /**
   * Entity exists
   * @method entityExists
   */
  entityExists(entity) {

    var id = entity.id;

    for (let ii = 0, length = this.entities.length; ii < length; ++ii) {
      if (this.entities[ii].id === id) return (true);
    };

    return (false);

  };

  /**
   * Add a new entity
   * @method addEntity
   */
  addEntity(entity) {

    if (!this.entityExists(entity)) {
      this.entities.push(entity);
    }

  };

  /**
   * Calculate
   * @method calculate
   */
  calculate() {

    this.ii = this.entities.length;

    while (this.ii) {

      --this.ii;

      this.entities[this.ii].radius = this.ii * this.radiusFactor;

      if (this.entities[this.ii].angle >= this.spectrum) {
        this.mode = 0;
      }

      if (!this.mode) {
        this.entities[this.ii].angle -= 0.0002;
      } else {
        this.entities[this.ii].angle += 0.0002;
      }

      if (this.entities[this.ii].angle < 0) {
        this.mode = 1;
        this.radiusFactor = parseFloat((Math.random() / 100).toFixed(4));
      }

      this.entities[this.ii].x = (this.width / 2) + (Math.PI * this.entities[this.ii].angle * this.ii) * Math.cos(this.entities[this.ii].angle * this.ii);
      this.entities[this.ii].y = (this.height / 2) + (Math.PI * this.entities[this.ii].angle * this.ii) * Math.sin(this.entities[this.ii].angle * this.ii);

    };

  };

  /**
   * Draw
   * @method draw
   */
  draw() {

    this.ii = this.entities.length;

    while (this.ii) {

      --this.ii;

      this.ctx.fillStyle = "white";
      this.ctx.beginPath();
      this.ctx.arc(this.entities[this.ii].x, this.entities[this.ii].y, this.entities[this.ii].radius, 0, Math.PI * 2, false);

      // Fill the color to the arc that we just created
      this.ctx.fill();

    };

  };

  /**
   * Fps
   * @method calculateFPS
   */
  calculateFPS() {

    this.fps = 1E3 / (new Date() - this.lastFps);

    this.lastFps = new Date();

  };

  /**
   * Update
   * @method update
   */
  update() {

    this.now = Date.now();

    this.calculateFPS();

    if (this.nextFpsUpdate <= this.now) {
      this.fpsContainer.innerHTML = this.fps.toFixed(1);
      this.nextFpsUpdate = this.now + 1E3;
    }

    if (this.lastEntityAmount !== this.entities.length) {
      this.neuronContainer.innerHTML = this.lastEntityAmount = this.entities.length;
    }

    /** Clear */
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.canvasBackgroundColor;
    this.ctx.fill();

    this.draw();

    this.calculate();

    window.requestAnimFrame(() => this.update());

  };

  /**
   * Resize
   * @method resize
   */
  resize() {

    this.width = window.innerWidth;

    this.height = window.innerHeight;

    this.canvasContainer.width = this.width;

    this.canvasContainer.height = this.height;

    this.spectrum = (this.width / CONFIG.Entities);

  };

  /**
   * Run
   * @method run
   */
  run() {

    this.resize();

    window.addEventListener('resize', e => this.resize(), false);

    this.update();

  };

};

window.Renderer = Renderer;