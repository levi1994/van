var Van = window.Van;

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
    'mineCircle': Van.Circle.newInstance({
      x: 40,
      y: 40,
      radius: 20,
      color: '#ccc',
      fill: true,
      name: 'mineCircle'
    }),
  }
});

var van = new Van({
  el: '#canvas',
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
    'circle1': Van.Circle.newOffInstance({
      x: 80,
      y: 80,
      radius: 30,
      color: 'red',
      name: 'circle1',
    }),
    'circle2': Van.Circle.newInstance({
      name: 'circle2',
      x: 60,
      y: 60,
      radius: 20,
      fill: false,
      color: 'black'
    }),
    'circle3': Van.Circle.newInstance({
      x: 40,
      y: 40,
      radius: 20,
      color: '#ccc',
      fill: false,
      name: 'circle3'
    }),
    'mine': Mine.newInstance(),
    'mines': Mine.newInstance(),
    'line': Van.Line.newInstance({
      x1: 50,
      y1: 10,
      x2: 100,
      y2: 100,
      name: 'ss'
    })
  }
});

van;

// 现在要实现组件
// 组件使用Van.component创建
// 与根组件类似
//
