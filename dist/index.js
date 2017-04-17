var Van = window.Van;

var van = new Van({
  el: '#canvas',
  data: {
    x: 100,
    y: 100
  },
  render: function() {

  },
  beforeRender: function() {
    console.log('circle2 before');
  },
  afterRender: function() {
    console.log('circle2 after');
  },
  // 这里不要再用数组了，使用一个对象
  components: {
    'circle1': Van.Circle.newInstance(function() {
      this.data.x = 80;
      this.data.y = 80;
      this.data.radius = 30;
      this.data.color = 'red';
      this.name = 'circle1';
    }),
    'circle2': Van.Circle.newInstance(function() {
      this.name = 'circle2';
      this.data.x = 60;
      this.data.y = 60;
      this.data.radius = 20;
    }),
    'circle3': Van.Circle.newInstance({
      x: 40,
      y: 40,
      radius: 20,
      color: '#ccc',
      fill: true
    })
  }
});

van;

// 现在要实现组件
// 组件使用Van.component创建
// 与根组件类似
//
