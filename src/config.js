"use strict";

(function(a, b) {

  const root = a || b;

  const CONFIG = {
    Entities: window.innerWidth + window.innerHeight * 2,
    FramesPerSecond: 60,
    Color: "#FFF",
    ExpandFactor: 2,
    CompressFactor: -4,
    Speed: 150
  };

  root.CONFIG = CONFIG;

}).call(this, window);