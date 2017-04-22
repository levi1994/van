export default function(Van) {
  Van.prototype._animate = function() {
    callAnimate(this);
  };

  function callAnimate(van) {
    if (van.animate) {
      van.animate();
    }

    // excute sub-component's animate()
    for (var key in van.$components) {
      if (van.$components.hasOwnProperty(key)) {
        callAnimate(van.$components[key]);
      }
    }
  }
}
