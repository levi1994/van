export default function(Van) {
  // Line
  Van.Line = Van.component({
    data: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      color: 'black',
      lineWidth: 1
    },
    render: function() {
      this.$ctx.beginPath();
      this.$ctx.strokeStyle = this.color;
      this.$ctx.moveTo(this.x1, this.y1);
      this.$ctx.lineTo(this.x2, this.y2);
      this.$ctx.stroke();
    }
  });
}
