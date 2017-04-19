import {isObject, isArray, arrayUtil, initCtx} from '../../util/index';

let uid = 0;

export default function(Van) {
  Van.prototype._init = function(options) {
    options = options || {};

    // if options contains el attribute
    // it's the root object
    if (options.el) {
      this.$canvas = document.querySelector(options.el);
      this.$ctx = this.$canvas.getContext('2d');
      this.$isRoot = true;
      this.$root = this;
    }

    // place the options property to the object
    this.$options = options;

    // init options
    this.render = options.render ? options.render : this.render;
    this.beforeRender = options.beforeRender ? options.beforeRender : this.beforeRender;
    this.afterRender = options.afterRender ? options.afterRender : this.afterRender;
    this.created = options.created ? options.created : function() {};
    this.$components = options.components ? options.components : {};

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


}
