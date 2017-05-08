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
	
	_Van2.default.version = '0.1.2';
	
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
	
	var _draw = __webpack_require__(5);
	
	var _draw2 = _interopRequireDefault(_draw);
	
	var _lifecycle = __webpack_require__(4);
	
	var _component = __webpack_require__(6);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _index = __webpack_require__(7);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _animation = __webpack_require__(13);
	
	var _animation2 = _interopRequireDefault(_animation);
	
	var _event = __webpack_require__(14);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _listener = __webpack_require__(15);
	
	var _listener2 = _interopRequireDefault(_listener);
	
	var _plugin = __webpack_require__(16);
	
	var _plugin2 = _interopRequireDefault(_plugin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Van(options) {
	  this._init(options);
	}
	
	(0, _init2.default)(Van);
	(0, _lifecycle.lifecycleMixin)(Van);
	(0, _component2.default)(Van);
	(0, _draw2.default)(Van);
	(0, _index2.default)(Van);
	(0, _animation2.default)(Van);
	(0, _event2.default)(Van);
	(0, _listener2.default)(Van);
	(0, _plugin2.default)(Van);
	
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
	    this._uid = uid++;
	
	    this.beforeInit = options.beforeInit;
	    this.afterInit = options.afterInit;
	
	    var self = this;
	
	    (0, _lifecycle.callHook)(this, 'beforeInit');
	
	    options = options || {};
	
	    if (options.el) {
	      this.$canvas = createCanvas(options);
	      this.$ctx = this.$canvas.getContext('2d');
	      this.$isRoot = true;
	      this.$root = this;
	
	      this._bindEvent(options);
	    }
	
	    if (options.off) {
	      this.$off = true;
	    }
	
	    this.$options = options;
	
	    this.render = options.render || this.render;
	    this.beforeRender = options.beforeRender || this.beforeRender;
	    this.afterRender = options.afterRender || this.afterRender;
	    this.recompute = options.recompute;
	    this.created = options.created || function () {};
	    this.$components = options.components || {};
	    this.area = options.area;
	    this.background = options.background;
	
	    var defaultListener = {
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
	
	    this._refresh = true;
	
	    this._handler = {};
	
	    if (options.handler) {
	      this._handler = options.handler;
	    }
	
	    if (options.methods) {
	      for (var key in options.methods) {
	        this[key] = options.methods[key];
	      }
	    }
	
	    this.data = this._initData(this, options.data, true);
	
	    if (this.$isRoot) {
	      (0, _index.initCtx)(this);
	
	      this._render();
	    }
	
	    if (this.$isRoot) {
	      this._recomputeTimer = setInterval(function () {
	        self._recompute();
	      }, 17);
	
	      this._raf = requestAnimationFrame(refresh);
	    }
	
	    function refresh() {
	      if (self._refresh) {
	        self._render();
	      }
	      (0, _lifecycle.callHook)(self, 'nextFrame');
	      requestAnimationFrame(refresh);
	    }
	
	    if (this.afterInit) {
	      (0, _lifecycle.callHook)(this, 'afterInit');
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
	
	  Van.prototype._bindEvent = function (options) {
	    var self = this;
	
	    var stage = document.querySelector(options.el);
	    stage.addEventListener('click', function (e) {
	      self._resolveListener('click', e);
	    });
	    stage.addEventListener('mousemove', function (e) {
	      self._resolveListener('mousemove', e);
	    });
	  };
	
	  function createCanvas(options) {
	
	    var stage = document.querySelector(options.el);
	    var canvas = document.createElement('canvas');
	    var width = options.canvas ? options.canvas.width || 500 : 500;
	    var height = options.canvas ? options.canvas.height || 500 : 500;
	
	    canvas.setAttribute('width', width);
	    canvas.setAttribute('height', height);
	    canvas.style.position = 'absolute';
	    canvas.style.left = 0;
	    canvas.style.top = 0;
	
	    if (options.background) {
	      stage.insertBefore(canvas);
	    } else {
	      stage.appendChild(canvas);
	    }
	    return canvas;
	  }
	};
	
	var _index = __webpack_require__(3);
	
	var _lifecycle = __webpack_require__(4);
	
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
	exports.toOffCanvas = toOffCanvas;
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
	        toOffCanvas(comps[key]);
	      } else {
	        initCtx(comps[key]);
	      }
	    }
	  }
	}
	
	function toOffCanvas(component) {
	  var rootCanvas = component.$canvas;
	
	  var offCanvas = document.createElement('canvas');
	  var _cid = _offid++;
	
	  offCanvas.id = _cid;
	  offCanvas.setAttribute('_cid', _cid);
	
	  if (component.background) {
	    rootCanvas.before(offCanvas);
	  } else {
	    rootCanvas.after(offCanvas);
	  }
	
	  offCanvas.style.position = 'absolute';
	  offCanvas.style.left = 0;
	  offCanvas.style.top = 0;
	  offCanvas.width = rootCanvas.width;
	  offCanvas.height = rootCanvas.height;
	
	  component.$canvas = offCanvas;
	  component.$ctx = offCanvas.getContext('2d');
	  initCtx(component);
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
	  if (type === 'warn') {
	    console.warn(message);
	  } else if (type === 'error') {
	    console.error(message);
	  } else if (type === 'info') {
	    console.info(message);
	  } else {
	    console.log(message);
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.lifecycleMixin = lifecycleMixin;
	exports.callHook = callHook;
	function lifecycleMixin(Van) {
	
	  Van.prototype._render = function () {
	    var self = this;
	    for (var key in self.$components) {
	      if (this.$components.hasOwnProperty(key)) {
	        var component = self.$components[key];
	        component._render();
	      }
	    }
	
	    callHook(this, 'beforeRender');
	
	    if (this.render) {
	      this.render();
	    }
	
	    callHook(this, 'afterRender');
	  };
	
	  Van.prototype.reRender = function () {
	    if (this.$isRoot || this.$off) {
	      this.$clearRect();
	
	      this._refresh = true;
	    } else {
	      if (this.$parent) {
	        this.$parent.reRender();
	      }
	    }
	  };
	
	  Van.prototype._destroy = function () {};
	}
	
	function callHook(vm, hook) {
	  var handlers = vm[hook];
	  if (handlers) {
	    handlers.call(vm);
	  } else {}
	}

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
	
	  Van.prototype.$mount = function (component) {
	    var _uid = component._uid;
	    component.$parent = this;
	    this.$components[_uid] = component;
	    if (component.$off) {
	      (0, _index.toOffCanvas)(component);
	    }
	  };
	
	  Van.prototype.$unmount = function (_uid) {
	    this.$components[_uid] = null;
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
	      name: 'circle',
	      flag: true
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
	    beforeRender: function beforeRender() {},
	    afterRender: function afterRender() {},
	    components: {},
	    area: function area(offsetX, offsetY) {
	      var delta = (offsetX - this.x) * (offsetX - this.x) + (offsetY - this.y) * (offsetY - this.y);
	      var radius = this.radius * this.radius;
	      if (delta < radius) {
	        return true;
	      }
	      return false;
	    }
	  });
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.Image = Van.component({
	    data: {
	      src: '',
	      width: 500,
	      height: 500
	    },
	    off: true,
	    background: true,
	    render: function render() {
	      var self = this;
	      var img = new Image();
	      img.onload = function () {
	        self.$ctx.drawImage(img, 0, 0);
	      };
	      img.src = self.src;
	    }
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

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.prototype._recompute = function () {
	    callRecompute(this);
	  };
	
	  function callRecompute(van) {
	    if (van.recompute) {
	      van.recompute();
	    }
	
	    for (var key in van.$components) {
	      if (van.$components.hasOwnProperty(key)) {
	        callRecompute(van.$components[key]);
	      }
	    }
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.prototype.$emit = function (handlerName, data) {
	    if (this.$isRoot) {
	      return;
	    }
	
	    this.$parent._handleEmit(handlerName, data);
	  };
	
	  Van.prototype.$dispatch = function (handlerName, data) {
	    var components = this.$components;
	    for (var key in components) {
	      var component = components[key];
	      component._handleDispatch(handlerName, data);
	    }
	  };
	
	  Van.prototype._handleDispatch = function (handlerName, data) {
	    var func = this._handler[handlerName];
	
	    if (!func) {
	      for (var key in this.$components) {
	        this.$components[key]._handleDispatch(handlerName, data);
	      }
	    } else {
	      var flag = func.call(this, data);
	
	      if (flag) {
	        for (var _key in this.$components) {
	          this.$components[_key]._handleDispatch(handlerName, data);
	        }
	      }
	    }
	  };
	
	  Van.prototype.$registEvent = function (handlerName, func) {
	    if (this._handler.hasOwnProperty(handlerName)) {
	      (0, _index.tip)('handler注册失败:该handler名称已存在', 'error');
	      return false;
	    }
	
	    if (typeof func !== 'function') {
	      (0, _index.tip)('handler注册失败:handler处理需为function', 'error');
	      return false;
	    }
	
	    this._handler[handlerName] = func;
	    return true;
	  };
	
	  Van.prototype.$unregistEvent = function (handlerName) {
	    if (!this._handler.hasOwnProperty(handlerName)) {
	      (0, _index.tip)('事件取消注册失败:未找到名为' + handlerName + '的事件', 'warn');
	      return false;
	    }
	
	    delete this._handler[handlerName];
	    return true;
	  };
	
	  Van.prototype._handleEmit = function (handlerName, data) {
	    var func = this._handler[handlerName];
	
	    if (!func) {
	      if (this.$isRoot) {
	        return;
	      }
	      return this.$parent._handleEmit(handlerName, data);
	    } else {
	      var flag = func.call(this, data);
	
	      if (flag) {
	        if (this.$isRoot) {
	          return;
	        }
	        this.$parent._handleEmit(handlerName, data);
	      } else {
	        return false;
	      }
	    }
	  };
	};
	
	var _index = __webpack_require__(3);

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.prototype._resolveListener = function (type, event) {
	    var targets = [];
	
	    findTarget(event, this.$root, targets);
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var val = _step.value;
	
	        val.target._trigger(val.type);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  };
	
	  Van.prototype._trigger = function (type) {
	    var events = this.listener[type];
	    for (var key in events) {
	      var func = events[key];
	      func.call(this);
	    }
	  };
	
	  Van.prototype.$addEventListener = function (type, handle) {
	    this.listener[type].push(handle);
	  };
	};
	
	function findTarget(event, comp, targets) {
	  if (comp.area && comp.area(event.offsetX, event.offsetY)) {
	    if (event.type === 'click') {
	      targets.push({ type: 'click', target: comp });
	    } else if (event.type === 'mousemove') {
	      if (!comp._mouseFlag) {
	        targets.push({ type: 'mouseenter', target: comp });
	      }
	    }
	    comp._mouseFlag = true;
	  } else if (comp.area && !comp.area(event.offsetX, event.offsetY)) {
	    if (event.type === 'mousemove') {
	      if (comp._mouseFlag) {
	        targets.push({ type: 'mouseleave', target: comp });
	      }
	    }
	
	    comp._mouseFlag = false;
	  }
	
	  var childrens = comp.$components;
	  for (var key in childrens) {
	    findTarget(event, childrens[key], targets);
	  }
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.use = function (func) {};
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map