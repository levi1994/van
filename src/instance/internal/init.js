import {isObject, isArray, arrayUtil, initCtx} from '../../util/index';

let uid = 0;

export default function(Van) {

  // 使用Object.defineProperty来设置Van实例的$ctx和$canvas
  // 使得可以只在根组件中存储绘图环境，在子组件中任然可以自由访问
  Object.defineProperty(Van.prototype, '$ctx', {
    configurable: true,
    enumerable: true,
    get: function() {
      if (!this._ctx) {
        return this.$parent.$ctx;
      }
      return this._ctx;
    },
    set: function(value) {
      this._ctx = value;
    }
  });
  Object.defineProperty(Van.prototype, '$canvas', {
    configurable: true,
    enumerable: true,
    get: function() {
      if (!this._canvas) {
        return this.$parent.$canvas;
      }
      return this._canvas;
    },
    set: function(value) {
      this._canvas = value;
    }
  });
  Van.prototype._init = function(options) {
    // 初始化beforeInit和afterInit
    this.beforeInit = options.beforeInit;
    this.afterInit = options.afterInit;

    var self = this;

    // 执行beforeInit
    if (this.beforeInit) {
      self.beforeInit.call(this);
    }

    options = options || {};

    // if options contains el attribute
    // it's the root object
    if (options.el) {
      this.$canvas = createCanvas(options);
      this.$ctx = this.$canvas.getContext('2d');
      this.$isRoot = true;
      this.$root = this;

      this._bindEvent(options);
    }

    // if it is off component
    if (options.off) {
      this.$off = true;
    }

    // place the options property to the object
    this.$options = options;

    // init options
    this.render = options.render || this.render;
    this.beforeRender = options.beforeRender || this.beforeRender;
    this.afterRender = options.afterRender || this.afterRender;
    this.animate = options.animate;
    this.created = options.created || function() {};
    this.$components = options.components || {};
    this.area = options.area;

    // init mouseevent listener
    let defaultListener = {
      click: [],
      mouseleave: [],
      mouseenter: []
    };
    if (options.listener) {
      defaultListener.click = options.listener.click || [];
      defaultListener.mouseenter = options.listener.mouseenter || [];
      defaultListener.mouseleave = options.listener.mouseleave || [];
    }
    this.listener = defaultListener;

    // 初始化刷新标识，如果需要刷新则为true
    this._refresh = true;

    // init event list
    this._handler = {};

    // 初始化events
    // 先使用参数中的events直接覆盖
    // 如果有其他不能覆盖的情况，再做修改
    if (options.handler) {
      this._handler = options.handler;
    }

    // initialize mehtods
    if (options.methods) {
      for (var key in options.methods) {
        this[key] = options.methods[key];
      }
    }

    // generate a uid
    this._uid = uid++;

    // convert data to response data
    this.data = this._initData(this, options.data, true);

    if (this.$isRoot) {

      // initialize all subcomponent runtime context
      initCtx(this);

      // excute _render function
      this._render();
    }

    if (this.$isRoot) {
      // animate
      this._animateTimer = setInterval(function() {
        self._animate();
      }, 30);

      this._raf = requestAnimationFrame(refresh);

    }

    // call requestAnimationFrame to refresh
    function refresh() {
      if (self._refresh) {
        self._render();
      }
      requestAnimationFrame(refresh);
    }

    // 执行afterInit
    if (this.afterInit) {
      self.afterInit.call(this);
    }
  };

  // convert data to response data
  // when the data changes ,the page will be re-rendered
  Van.prototype._initData = function(vm, data, rootFlag) {
    var responseObj = {};
    if (isObject(data)) {
      if (isArray(data)) {
        responseObj = [];
        data.forEach(function(val, key) {
          responseObj[key] = vm._initData(vm, val);
        });
        arrayUtil(vm, responseObj);
        return responseObj;
      }
      for (var key in data) {
        let value = vm._initData(vm, data[key]);
        Object.defineProperty(responseObj, key, {
          configurable: true,
          enumerable: true,
          get: function() {
            return value;
          },
          set: function(val) {
            value = vm._initData(vm, val);
            vm.reRender();
          }
        });
        // if is root property , copy to vm
        if (rootFlag) {
          Object.defineProperty(vm, key, {
            configurable: true,
            enumerable: true,
            get: function() {
              return value;
            },
            set: function(val) {
              value = vm._initData(vm, val);
              vm.reRender();
            }
          });
        }
      }
    } else {
      responseObj = data;
    }
    return responseObj;
  };

  Van.prototype._bindEvent = function(options) {
    let self = this;
      // 如果是根组件的话，绑定事件监听
      // 为canvas的父容器组件绑定事件
    let stage = document.querySelector(options.el);
    stage.addEventListener('click', function(e) {
      self._resolveListener('click', e);
    });
    stage.addEventListener('mousemove', function(e) {
      self._resolveListener('mousemove', e);
    });
  };

  // 根据传入选项创建canvas
  function createCanvas(options) {

    var stage = document.querySelector(options.el);
    var canvas = document.createElement('canvas');
    var width = options.canvas ? options.canvas.width || 500 : 500;
    var height = options.canvas ? options.canvas.height || 500 : 500;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    stage.appendChild(canvas);

    return canvas;
  }


}
