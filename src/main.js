"use strict";

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame  ||
  window.mozRequestAnimationFrame     ||
  window.oRequestAnimationFrame       ||
  window.msRequestAnimationFrame      || function (fn) {
    window.setTimeout(fn, 1000 / CONFIG.FramesPerSecond);
  };
})();

(function(a, b) {

  const root = a || b;

  let renderer = root.Renderer = new root.Renderer();

  renderer.run();

  for (var ii = 0; ii < CONFIG.Entities; ++ii) {
    renderer.addEntity(new Entity({
      id: ii,
      radius: 0,
      angle: 0,
      color: "#FFF"
    }));
  };

}).call(this, window);