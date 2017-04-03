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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Van(options) {
	  this._init(options);
	}
	
	(0, _init2.default)(Van);
	(0, _global2.default)(Van);
	
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
	
	    this._uid = uid++;
	
	    this.data = this._initData(this, options.data, true);
	
	    if (this.$isRoot) {
	      console.log('ROOT RENDER');
	
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
	
	  Van.prototype.render = function () {
	    console.log('START RENDER');
	  };
	
	  Van.prototype._render = function () {
	    var self = this;
	    for (var key in self.$components) {
	      if (this.$components.hasOwnProperty(key)) {
	        var component = self.$components[key];
	        component._render();
	      }
	    }
	    this.beforeRender();
	    this.render();
	    this.afterRender();
	  };
	
	  Van.prototype.clearRect = function () {
	    var ctx = this.$ctx;
	    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  };
	
	  Van.prototype.reRender = function () {
	
	    if (this.isRoot) {
	      console.log(this.name + 'RE RENDER');
	      this.clearRect();
	      this._render();
	    } else {
	      if (this.$parent) {
	        this.$parent.reRender();
	      }
	    }
	  };
	
	  Van.prototype.newInstance = function () {
	    var param = arguments[0];
	    var instance = Van.component(this.$options);
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Van) {
	  Van.component = function (options) {
	    var van = new Van(options);
	    return van;
	  };
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map