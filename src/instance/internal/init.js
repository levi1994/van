import {isObject, isArray, arrayUtil, initCtx, tip} from '../../util/index';
import {callHook} from './lifecycle.js';

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

  /**
   * Van对象初始化方法
   * options
   */
  Van.prototype._init = function(options) {
    // generate a uid
    this._uid = uid++;

    // 初始化beforeInit和afterInit
    this.beforeInit = options.beforeInit;
    this.afterInit = options.afterInit;

    var self = this;

    // 调用beforeInit钩子
    callHook(this, 'beforeInit');

    options = options || {};

    // 如果options中包含el属性的话
    // 则说明该组件为根组件，须初始化画布等信息
    if (options.el) {
      this.$canvas = createCanvas(options);
      this.$ctx = this.$canvas.getContext('2d');
      this.$isRoot = true;
      this.$root = this;

      // 对根组件的click事件和mousemove事件进行监听
      // 根据click和mousemove确定组件的事件
      this._bindEvent(options);
    }

    // 如果是离屏组件
    if (options.off) {
      this.$off = true;
    }

    // 在组件对象上挂载options
    this.$options = options;

    // 将options中的部分属性挂载至vm
    this.render = options.render || this.render;
    this.beforeRender = options.beforeRender || this.beforeRender;
    this.afterRender = options.afterRender || this.afterRender;
    this.recompute = options.recompute;
    this.created = options.created || function() {};
    this.area = options.area;

    // 初始化$components
    this.$components = {};
    if (options.components) {
      for (let key in options.components) {
        // 将组件实例化
        let comp = options.components[key].newInstance();
        let componentName = comp.$Component.name;
        this.$components[componentName + '_' + comp._uid] = comp;
      }
    }

    // 初始化鼠标事件
    // 目前主要有click、mouseleave、mouseenter等事件
    // 使用数组的方式存储
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

    // 初始化消息处理器
    this._handlers = {};

    // 初始化events
    // 先使用参数中的events直接覆盖
    // 如果有其他不能覆盖的情况，再做修改
    if (options.handlers) {
      this._handlers = options.handlers;
    }

    // 初始化内置方法
    if (options.methods) {
      for (var key in options.methods) {
        this[key] = options.methods[key];
      }
    }

    // 初始化继承属性
    this._valueWatcher = {};
    if (options.props) {
      for (let key of options.props) {
        // 针对每一个value创建valueWatcher
        if (this._valueWatcher.hasOwnProperty(key)) {
          tip('value属性名重复', 'warn');
        } else {
          options.data[key] = '';
          this._valueWatcher[key] = function(key, newValue) {
            self[key] = newValue;
          };
        }
      }
    }
    // 初始化子组件的继承属性
    for (let key in options.data) {
      this._callValueWatcher(key, options.data[key]);
    }

    // 将普通数据（data）转为响应式数据并放到vm上
    this.data = this._initData(this, options.data, true);

    if (this.$isRoot) {

      // 初始化所有子组件的运行时环境
      initCtx(this);

      // 渲染组件
      this._render();
    }

    if (this.$isRoot) {
      // 定时执行_recompute方法,重新计算图形属性
      this._recomputeTimer = setInterval(function() {
        self._recompute();
      }, 17);

      this._raf = requestAnimationFrame(refresh);

    }

    // call requestAnimationFrame to refresh
    function refresh() {
      if (self._refresh) {
        self._render();
      }
      callHook(self, 'nextFrame');
      requestAnimationFrame(refresh);
    }

    // 执行afterInit
    if (this.afterInit) {
      callHook(this, 'afterInit');
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
            vm._callValueWatcher(key, value);
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
              vm._callValueWatcher(key, value);
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

  /**
   * 当数据产生变动时，执行变动监听器
   */
  Van.prototype._callValueWatcher = function(valueName, value) {
    // 找到所有子组件
    for (let key in this.$components) {
      let comp = this.$components[key];
      if (comp._valueWatcher[valueName]) {
        comp._valueWatcher[valueName](valueName, value);
      }
    }
  };

  // 根据传入选项创建canvas
  function createCanvas(options) {

    var stage = document.querySelector(options.el);
    var canvas = document.createElement('canvas');
    var width = options.canvas ? options.canvas.width || 500 : 500;
    var height = options.canvas ? options.canvas.height || 500 : 500;
    var background = options.canvas ? options.canvas.background || '' : '';

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('class', 'main-canvas');

    // 背景色加在stage上
    stage.style.background = background;

    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 0;
    // canvas.style.background = 'rgb(241, 241, 241)';
    if (options.background) {
      stage.insertBefore(canvas);
    } else {
      stage.appendChild(canvas);
    }
    return canvas;
  }
}
