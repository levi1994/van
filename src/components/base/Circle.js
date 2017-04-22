export default function(Van) {
  Van.Circle = Van.component({
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
    animate: function() {
      if (this.flag) {
        this.radius ++;
        if (this.radius > 100) {
          this.flag = false;
        }
      } else {
        this.radius --;
        if (this.radius < 20) {
          this.flag = true;
        }
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

    }
  });
}
