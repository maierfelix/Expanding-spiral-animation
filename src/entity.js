"use strict";

/**
 * Entity
 * @class Entity
 */
class Entity {

  /** @constructor */
  constructor(object) {

    /**
     * Id
     * @type {Number}
     */
    this.id = 0;

    /**
     * X axis position
     * @type {Number}
     */
    this.x = 0;

    /**
     * Y axis position
     * @type {Number}
     */
    this.y = 0;

    /**
     * Radius
     * @type {Number}
     */
    this.radius = 0;

    /**
     * Angle
     * @type {Number}
     */
    this.angle = 0;

    /**
     * Color
     * @type {String}
     */
    this.color = "";

    for (var ii in object) {
      if (this.hasOwnProperty(ii)) {
        this[ii] = object[ii];
      }
    };

  };

};

window.Entity = Entity;