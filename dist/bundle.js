/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Van = __webpack_require__(1);
	
	var _Van2 = _interopRequireDefault(_Van);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.Van = _Van2.default;
	
	exports.default = _Van2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _init = __webpack_require__(2);
	
	var _init2 = _interopRequireDefault(_init);
	
	var _global = __webpack_require__(4);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _draw = __webpack_require__(5);
	
	var _draw2 = _interopRequireDefault(_draw);
	
	var _lifecycle = __webpack_require__(6);
	
	var _lifecycle2 = _interopRequireDefault(_lifecycle);
	
	var _component = __webpack_require__(7);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Van(options) {
	  this._init(options);
	}
	
	(0, _init2.default)(Van);
	(0, _global2.default)(Van);
	(0, _lifecycle2.default)(Van);
	(0, _component2.default)(Van);
	(0, _draw2.default)(Van);
	
	exports.default = Van;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.prototype._init = function (options) {
	    options = options || {};
	
	    if (options.el) {
	      this.$canvas = document.querySelector(options.el);
	      this.$ctx = this.$canvas.getContext('2d');
	      this.$isRoot = true;
	      this.$root = this;
	    }
	
	    this.$options = options;
	
	    this.render = options.render ? options.render : this.render;
	    this.beforeRender = options.beforeRender ? options.beforeRender : this.beforeRender;
	    this.afterRender = options.afterRender ? options.afterRender : this.afterRender;
	    this.created = options.created ? options.created : function () {};
	    this.$components = options.components ? options.components : {};
	
	    if (options.methods) {
	      for (var key in options.methods) {
	        this[key] = options.methods[key];
	      }
	    }
	
	    this._uid = uid++;
	
	    this.data = this._initData(this, options.data, true);
	
	    if (this.$isRoot) {
	      (0, _index.initCtx)(this);
	
	      this._render();
	    }
	  };
	
	  Van.prototype._initData = function (vm, data, rootFlag) {
	    var responseObj = {};
	    if ((0, _index.isObject)(data)) {
	      if ((0, _index.isArray)(data)) {
	        responseObj = [];
	        data.forEach(function (val, key) {
	          responseObj[key] = vm._initData(vm, val);
	        });
	        (0, _index.arrayUtil)(vm, responseObj);
	        return responseObj;
	      }
	
	      var _loop = function _loop() {
	        var value = vm._initData(vm, data[key]);
	        Object.defineProperty(responseObj, key, {
	          configurable: true,
	          enumerable: true,
	          get: function get() {
	            return value;
	          },
	          set: function set(val) {
	            value = vm._initData(vm, val);
	            vm.reRender();
	          }
	        });
	
	        if (rootFlag) {
	          Object.defineProperty(vm, key, {
	            configurable: true,
	            enumerable: true,
	            get: function get() {
	              return value;
	            },
	            set: function set(val) {
	              value = vm._initData(vm, val);
	              vm.reRender();
	            }
	          });
	        }
	      };
	
	      for (var key in data) {
	        _loop();
	      }
	    } else {
	      responseObj = data;
	    }
	    return responseObj;
	  };
	};
	
	var _index = __webpack_require__(3);
	
	var uid = 0;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.isObject = isObject;
	exports.initCtx = initCtx;
	exports.mergeTo = mergeTo;
	function isObject(obj) {
	  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}
	
	var isArray = exports.isArray = Array.isArray;
	
	function initCtx(van) {
	  var comps = van.$components;
	  for (var key in comps) {
	    if (comps.hasOwnProperty(key)) {
	      comps[key].$parent = van;
	      comps[key].$ctx = van.$ctx;
	      initCtx(comps[key]);
	    }
	  }
	}
	
	function mergeTo(obj1, obj2) {
	  for (var key in obj1) {
	    var vo = obj1[key];
	    obj2[key] = vo;
	  }
	  return obj2;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.component = function (options) {
	    var van = new Van(options);
	    return van;
	  };
	
	  Van.Circle = Van.component({
	    data: {
	      x: 50,
	      y: 80,
	      radius: 50,
	      color: 'black',
	      fill: false,
	      name: 'circle'
	    },
	    render: function render() {
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
	    created: function created() {},
	    beforeRender: function beforeRender() {
	      console.log(this.name + ' render before');
	    },
	    afterRender: function afterRender() {
	      console.log(this.name + 'render after');
	    },
	    components: {}
	  });
	
	  Van.Line = Van.component({
	    data: {
	      x1: 0,
	      y1: 0,
	      x2: 0,
	      y2: 0,
	      color: 'black',
	      lineWidth: 1
	    },
	    render: function render() {
	      this.$ctx.beginPath();
	      this.$ctx.strokeStyle = this.color;
	      this.$ctx.moveTo(this.x1, this.y1);
	      this.$ctx.lineTo(this.x2, this.y2);
	      this.$ctx.stroke();
	    }
	  });
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.prototype.$clearRect = function () {
	    var ctx = this.$ctx;
	    ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	
	  Van.prototype._beforeRender = function () {
	    if (this.beforeRender) {
	      this.beforeRender();
	    }
	  };
	
	  Van.prototype._afterRender = function () {
	    if (this.afterRender) {
	      this.afterRender();
	    }
	  };
	
	  Van.prototype._render = function () {
	    var self = this;
	    for (var key in self.$components) {
	      if (this.$components.hasOwnProperty(key)) {
	        var component = self.$components[key];
	        component._render();
	      }
	    }
	
	    this._beforeRender();
	
	    if (this.render) {
	      this.render();
	    }
	
	    this._afterRender();
	  };
	
	  Van.prototype.reRender = function () {
	    if (this.$isRoot) {
	      console.log(this.name + 'RE RENDER');
	      this.$clearRect();
	      this._render();
	    } else {
	      if (this.$parent) {
	        this.$parent.reRender();
	      }
	    }
	  };
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.prototype.newInstance = function () {
	    var param = arguments[0];
	    var instance;
	
	    if (typeof param === 'function') {
	      instance = Van.component(this.$options);
	      param.call(instance);
	    } else {
	      this.$options = (0, _index.mergeTo)(param, this.$options);
	      instance = Van.component(this.$options);
	    }
	
	    instance.$isInstance = true;
	    if (!param) {
	      return instance;
	    }
	
	    if (typeof param === 'function') {
	      param.call(instance);
	    } else {
	      instance.data = param;
	    }
	    return instance;
	  };
	};
	
	var _index = __webpack_require__(3);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map