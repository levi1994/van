var Van = window.Van;

var Bird = Van.component({
  name: 'Bird',
  data: {
    x: 100,
    y: 100,
    vx: 0,
    vy: 0,
    radius: 10
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
  off: false,
  recompute: function() {
    const t = 0.017;
    const g = 500;
    // 每隔 17ms 计算一次
    // 位移距离等于平均速度*时间
    var vp = this.vy + (this.vy + g*t);
    var deltaY = vp * t;
    this.y = this.y + deltaY;
    this.vy = this.vy + g*t;
    if(this.y > 485 && !this.flag) {
      this.flag = true;
      this.vy = - 0.900001 * this.vy;
    } 
    if(this.y < 485) {
      this.flag = false;
    }
  },
  handlers: {
    "clicks": function(){
      this.vy = -200;
    }
  }
});

var Block = Van.component({
  name: 'Block',
  data: {
    y: 0,
    width: 50,
    height: 50,
  },
  render: function() {
    this.$ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
  handlers: {
    "brad": function(){
      console.log("broadcast!!");
    }
  },
  // 从父组件接收一个名叫x的参数
  props: ['x']
});

var BlockGroup = Van.component({
  name: 'BlockGroup',
  data: {
    h1: 0,
    h2: 0,
    x: 300
  },
  components: [
    Block.extends({
      y:0
    }),
    Block.extends({
      y:200
    })
  ]
});

var van = new Van({
  el: '#stage',
  canvas: {
    width:1000,
    height:800
  },
  data: {
    x: 100,
    y: 100
  },
  methods: {
    sayHi: function() {
      console.log('Hi');
    }
  },
  // 这里不要再用数组了，使用一个对象
  components: [
    Van.Image.extends({
      src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494224287122&di=6c111ce35c472d5e27c418bddb92cde2&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F74%2F43%2F34R58PICcD9_1024.jpg",
    }),
    Bird,
    BlockGroup,
  ],
  area: function() {
    return true;
  },
  listener: {
    click: [function() {
      this.$dispatch("clicks",{});
    }],
  }
});

for(var i=0;i<1000;i++){
  van.$mount(Bird.newInstance({
    x:i*10,
    y:100,
    vy: i*10
  }));
}

