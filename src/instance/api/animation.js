export default function(Van) {
  Van.prototype._recompute = function() {
    callRecompute(this);
  };

  function callRecompute(van) {
    if (van.recompute) {
      van.recompute();
    }

    // excute sub-component's recompute()
    for (var key in van.$components) {
      if (van.$components.hasOwnProperty(key)) {
        callRecompute(van.$components[key]);
      }
    }
  }
}
