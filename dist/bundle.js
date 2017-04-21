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
	
	_Van2.default.version = '0.1.1';
	
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
	
	var _draw = __webpack_require__(4);
	
	var _draw2 = _interopRequireDefault(_draw);
	
	var _lifecycle = __webpack_require__(5);
	
	var _lifecycle2 = _interopRequireDefault(_lifecycle);
	
	var _component = __webpack_require__(6);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _index = __webpack_require__(7);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Van(options) {
	  this._init(options);
	}
	
	(0, _init2.default)(Van);
	
	(0, _lifecycle2.default)(Van);
	(0, _component2.default)(Van);
	(0, _draw2.default)(Van);
	(0, _index2.default)(Van);
	
	exports.default = Van;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Object.defineProperty(Van.prototype, '$ctx', {
	    configurable: true,
	    enumerable: true,
	    get: function get() {
	      if (!this._ctx) {
	        return this.$parent.$ctx;
	      }
	      return this._ctx;
	    },
	    set: function set(value) {
	      this._ctx = value;
	    }
	  });
	  Object.defineProperty(Van.prototype, '$canvas', {
	    configurable: true,
	    enumerable: true,
	    get: function get() {
	      if (!this._canvas) {
	        return this.$parent.$canvas;
	      }
	      return this._canvas;
	    },
	    set: function set(value) {
	      this._canvas = value;
	    }
	  });
	  Van.prototype._init = function (options) {
	    options = options || {};
	
	    if (options.el) {
	      this.$canvas = document.querySelector(options.el);
	      this.$ctx = this.$canvas.getContext('2d');
	      this.$isRoot = true;
	      this.$root = this;
	    }
	
	    if (options.off) {
	      this.$off = true;
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
	exports.isUndef = isUndef;
	exports.isDef = isDef;
	exports.isTrue = isTrue;
	exports.isPrimitive = isPrimitive;
	exports.isPlainObject = isPlainObject;
	exports.isFunction = isFunction;
	exports.bind = bind;
	exports.extend = extend;
	exports.once = once;
	exports.closeDebug = closeDebug;
	exports.tip = tip;
	function isObject(obj) {
	  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}
	
	var isArray = exports.isArray = Array.isArray;
	
	var _offid = 0;
	function initCtx(van) {
	  var comps = van.$components;
	  for (var key in comps) {
	    if (comps.hasOwnProperty(key)) {
	      comps[key].$parent = van;
	
	      if (comps[key].$off) {
	        var rootCanvas = van.$canvas;
	
	        var offCanvas = document.createElement('canvas');
	        var _cid = _offid++;
	
	        offCanvas.id = key + _cid;
	        offCanvas.setAttribute('_cid', _cid);
	
	        rootCanvas.after(offCanvas);
	
	        offCanvas.style.position = 'absolute';
	        offCanvas.style.left = 0;
	        offCanvas.style.top = 0;
	        offCanvas.width = rootCanvas.width;
	        offCanvas.height = rootCanvas.height;
	
	        comps[key].$canvas = offCanvas;
	        comps[key].$ctx = offCanvas.getContext('2d');
	        initCtx(comps[key]);
	      } else {
	        initCtx(comps[key]);
	      }
	    }
	  }
	}
	
	function mergeTo(from, to) {
	  for (var key in from) {
	    if (key === 'data') {
	      to[key] = JSON.parse(JSON.stringify(from[key]));
	    } else {
	      var vo = from[key];
	      to[key] = vo;
	    }
	  }
	  return to;
	}
	
	function isUndef(v) {
	  return v === undefined || v === null;
	}
	
	function isDef(v) {
	  return v !== undefined && v !== null;
	}
	
	function isTrue(v) {
	  return v === true;
	}
	
	function isPrimitive(value) {
	  return typeof value === 'string' || typeof value === 'number';
	}
	
	function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}
	
	function isFunction(value) {
	  return typeof value === 'function';
	}
	
	function bind(fn, ctx) {
	  function boundFn(a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  }
	
	  boundFn._length = fn.length;
	  return boundFn;
	}
	
	function extend(to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to;
	}
	
	function once(fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn.apply(this, arguments);
	    }
	  };
	}
	
	var debug = true;
	function closeDebug() {
	  debug = false;
	}
	
	function tip(message, type) {
	  if (!debug) {
	    return;
	  }
	  console.log(message);
	}

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
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
	    if (this.$isRoot || this.$off) {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.component = function (options) {
	    var comp = new Component(options);
	    return comp;
	  };
	
	  function Component(options) {
	    this.options = options;
	    return this;
	  }
	
	  Component.prototype.newInstance = function (args) {
	    var instance;
	
	    var option = (0, _index.mergeTo)(this.options, {});
	
	    if (typeof args === 'function') {
	      instance = new Van(option);
	      args.call(instance);
	    } else {
	      option.data = (0, _index.mergeTo)(args, option.data);
	      instance = new Van(option);
	    }
	
	    instance.$isInstance = true;
	
	    return instance;
	  };
	
	  Component.prototype.newOffInstance = function (args) {
	    var instance;
	
	    var option = (0, _index.mergeTo)(this.options, {});
	    option.off = true;
	
	    if (typeof args === 'function') {
	      instance = new Van(option);
	      args.call(instance);
	    } else {
	      option.data = (0, _index.mergeTo)(args, option.data);
	      instance = new Van(option);
	    }
	
	    instance.$isInstance = true;
	
	    return instance;
	  };
	};
	
	var _index = __webpack_require__(3);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  (0, _Circle2.default)(Van);
	  (0, _Image2.default)(Van);
	  (0, _Text2.default)(Van);
	  (0, _Line2.default)(Van);
	  (0, _Rect2.default)(Van);
	};
	
	var _Circle = __webpack_require__(8);
	
	var _Circle2 = _interopRequireDefault(_Circle);
	
	var _Image = __webpack_require__(9);
	
	var _Image2 = _interopRequireDefault(_Image);
	
	var _Text = __webpack_require__(10);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	var _Line = __webpack_require__(11);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _Rect = __webpack_require__(12);
	
	var _Rect2 = _interopRequireDefault(_Rect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
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
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.Image = Van.component({
	    data: {},
	    render: function render() {}
	  });
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.Text = Van.component({
	    data: {},
	    render: function render() {}
	  });
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
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
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map