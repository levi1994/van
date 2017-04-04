var Van = window.Van;
// 方形
var Rectangle = Van.component({
  data: {
    x: 50,
    y: 80,
    width: 100,
    height: 100,
    name: 'rectangle'
  },
  render: function() {
    console.log('circle2 render');
    this.$ctx.beginPath();
    this.$ctx.fillStyle = 'green';
    this.$ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  created: function() {

  },
  beforeRender: function() {
    console.log(this.name + ' render before');
  },
  afterRender: function() {
    console.log(this.name + 'render after');
  }
});

// 原型组件
var Circle = Van.component({
  data: {
    x: 50,
    y: 80,
    speed: 1,
    name: 'circle'
  },
  render: function() {
    console.log('circle2 render1');
    this.$ctx.beginPath();
    console.log(this.data.x);
    console.log(this.data.y);
    this.$ctx.arc(this.data.x, this.data.y, 30, 0, Math.PI * 2, true);
    this.$ctx.fill();
  },
  created: function() {
    // var self = this;
  },
  beforeRender: function() {
    console.log(this.name + ' render before');
  },
  afterRender: function() {
    console.log(this.name + 'render after');
  },
  components: {
    'rect': Rectangle.newInstance()
  }
});

var van = new Van({
  el: '#canvas',
  data: {
    x: 100,
    y: 100
  },
  render: function() {
    console.log('root element render');
    // 清空画布
    this.$ctx.beginPath();
    this.$ctx.arc(this.data.x, this.data.y, 50, 0, Math.PI * 2, true);
    this.$ctx.stroke();
  },
  beforeRender: function() {
    console.log('circle2 before');
  },
  afterRender: function() {
    console.log('circle2 after');
  },
  // 这里不要再用数组了，使用一个对象
  components: {
    'circle1': Circle.newInstance(function() {
      this.data.x = 80;
      this.speed = 1;
      this.name = 'circle1';
    }),
    'circle2': Circle.newInstance(function() {
      this.name = 'circle2';
      this.speed = 2;
    })
  }
});

van;

// 现在要实现组件
// 组件使用Van.component创建
// 与根组件类似
//
