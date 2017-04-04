// Component drawing API
export default function(Van) {

  // clear rect
  Van.prototype.$clearRect = function() {
    var ctx = this.$ctx;
    ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  };

}
