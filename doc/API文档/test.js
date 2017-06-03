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

    },
    render
});


