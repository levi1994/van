export default function(Van) {
  Van.Circle = Van.component({
    name: 'Circle',
    data: {
      x: 50,
      y: 80,
      radius: 50,
      color: 'black',
      fill: false,
      name: 'circle',
      flag: true
    },
    render: function() {
      this.$ctx.beginPath();
      this.$ctx.strokeStyle = this.color;
      this.$ctx.fillStyle = this.color;
      this.$ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      if (this.data.fill) {
        this.$ctx.fill();
      } else {
        this.$ctx.stroke();
      }
    },
    created: function() {
      // console.log('created');
    },
    beforeRender: function() {
      // console.log(this.name + ' render before');
    },
    afterRender: function() {
      // console.log(this.name + 'render after');
    },
    components: {

    },
    area: function(offsetX, offsetY) {
      // 判断是否在区域范围内
      // 若两点之间的距离小于radius,则说明在圆圈的范围内
      var delta = (offsetX - this.x) * (offsetX - this.x) +
                  (offsetY - this.y) * (offsetY - this.y);
      var radius = this.radius * this.radius;
      if (delta < radius) {
        return true;
      }
      return false;
    }
  });
}
