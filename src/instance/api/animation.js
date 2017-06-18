export default function(Van) {
  Van.prototype._recompute = function() {
    // 使用setTimeout使渲染过程异步化
    setTimeout(callRecompute(this), 0);
  };

  function callRecompute(van) {
    if (van.recompute) {
      van.recompute();
    }

    // 执行子组件的recomputed()方法
    for (var key in van.$components) {
      if (van.$components.hasOwnProperty(key)) {
        callRecompute(van.$components[key]);
      }
    }
  }
}
