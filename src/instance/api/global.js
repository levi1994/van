// registe gloval api
export default function(Van) {

  // generate a component
  Van.component = function(options) {
    var van = new Van(options);
    return van;
  };

  // internal components
  // Circle
  Van.Circle = Van.component({
    data: {
      x: 50,
      y: 80,
      radius: 50,
      color: 'black',
      fill: false,
      name: 'circle'
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

    },
    beforeRender: function() {
      console.log(this.name + ' render before');
    },
    afterRender: function() {
      console.log(this.name + 'render after');
    },
    components: {

    }
  });

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

  // Text
  Van.Text = Van.component({
    data: {

    },
    render: function() {

    }
  });

  // Image
  Van.Image = Van.component({
    data: {

    },
    render: function() {

    }
  });


}
