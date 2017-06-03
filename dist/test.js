var context = null;
var canvas = null;

// 绘制一条直线
function drawLine(x1, y1, x2, y2) {
  var canvas = document.querySelector('canvas');
  var context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.closePath();
  context.stroke();
}



drawLine(0, 0, 10, 10);


context.clearRect(canvas.width, canvas.height);
drawLine(0, 0, 20, 20);





var Line = Van.component({
    data: {
        x1: 0,
        y1: 0,
        x2: 10,
        y2: 10
    },
    render: function() {
        this.$ctx.beginPath();
        this.$ctx.moveTo(x1, y1);
        this.$ctx.lineTo(x2, y2);
        this.$ctx.closePath();
        this.$ctx.stroke();
    }
});


var line = Line.newInstance();
root.$mount(line);


line.x1 = 20;
line.x2 = 20;





