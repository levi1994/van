import {isObject, isArray, arrayUtil} from '../../util.index';

let uid = 0;

export default function(Levans) {
  Levans.prototype._init = function(options) {
    options = options || {};

    if (options.el) {
      this.$canvas = document.querySelector(options.el);
      this.$ctx = this.canvas.getContext('2d');
      this.$isRoot = true;
      this.$root = this;
    }

    this.$options = options;

    // init options
    this.render = options.render ? options.render : this.render;
    this.beforeRender = options.beforeRender ? options.beforeRender : this.beforeRender;
    this.afterRender = options.afterRender ? options.afterRender : this.afterRender;
    this.created = options.created ? options.created : this.created;
    this.components = options.components ? options.components : {};

    this._uid = uid++;

    // init child components
    for (let key in this.components) {
      if (this.components.hasOwnProperty(key)) {
        this.components[key].parent = this;
        this.components[key].ctx = this.ctx;
      }
    }

    // init data,
    this.data = this._initData(this, options.data, true);

    // 初始化完成之后，执行所有组件的created方法
    for (var key in this.components) {
      if (this.components.hasOwnProperty(key)) {
        this.components[key].created(this.components[key]);
      }
    }
  };

  // 初始化组件data数据
  // 使得所有数据都是相应是的
  // 一旦数据改变，则触发canvas渲染
  Levans.prototype._initData = function(vm, data, rootFlag) {
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

}
