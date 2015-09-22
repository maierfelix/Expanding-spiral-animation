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

  var x = 0;
  var y = 0;

  var width = renderer.width;
  var height = renderer.height;

  for (var ii = 0; ii < CONFIG.Entities; ++ii) {
    x = Math.floor(Math.random() * (renderer.width / 2) + 1);
    y = Math.floor(Math.random() * (renderer.height / 2) + 1);
    renderer.addEntity(new Entity({
      id: ii,
      radius: 0,
      angle: 0,
      color: "#FFF"
    }));
  };

}).call(this, window);