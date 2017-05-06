var Van = window.Van;

var MineCircle = Van.component({
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
  beforeInit: function() {
    console.log('生命周期调用成功');
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
  listener: {
    'click': [function() {
      alert(this.name);
    }],
    'mouseenter': [function() {
      this.radius += 10;
    }],
    'mouseleave': [function() {
      this.radius -= 10;
    }]
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

var Shine = Van.component({
  data: {

  },
  off: false,
  render: function() {
  },
  afterInit: function() {
    this.$registEvent("showLog",function(){
      console.log("hi");
    });
  },
  components: {
    'mineCircle': Van.Circle.newInstance({
      x: 40,
      y: 40,
      radius: 20,
      color: '#ccc',
      fill: true,
      name: 'mineCircle'
    })
  },
  handler: {
    showLog: function(data) {
      console.log("在Shine中接受到事件"+data);
      return true;
    }
  }
});

var Mine = Van.component({
  data: {

  },
  off: true,
  render: function() {
    // this.log('haha-------------------');
  },
  methods: {
    log: function(value) {
      console.log(value);
    }
  },
  afterRender: function() {
  },
  components: {
    'shine': Shine.newInstance()
  },
  handler: {
    showLog: function(data) {
      console.log("在Mine中接受到事件---"+data);
      return true;
    }
  },
});

var van = new Van({
  el: '#stage',
  data: {
    x: 100,
    y: 100
  },
  render: function() {

  },
  beforeRender: function() {

  },
  afterRender: function() {

  },
  // 这里不要再用数组了，使用一个对象
  components: {
    'circle1': MineCircle.newOffInstance({
      x: 80,
      y: 80,
      radius: 30,
      color: 'red',
      name: 'circle1',
    }),
    'mine': Mine.newInstance()
  }
});

van;

// 现在要实现组件
// 组件使用Van.component创建
// 与根组件类似

