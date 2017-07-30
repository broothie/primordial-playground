/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pair = function () {
  function Pair() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Pair);

    this.x = x;
    this.y = y;

    this.update();
  }

  _createClass(Pair, [{
    key: "update",
    value: function update() {
      this.pair = [this.x, this.y];
    }
  }, {
    key: "delta",
    value: function delta(other) {
      return new (Function.prototype.bind.apply(Pair, [null].concat(_toConsumableArray(this.pair.map(function (dim, idx) {
        return other.pair[idx] - dim;
      })))))();
    }
  }, {
    key: "distance",
    value: function distance(other) {
      return Math.sqrt(this.delta(other).pair.reduce(function (sum, val) {
        return sum + val;
      }));
    }
  }, {
    key: "offset",
    value: function offset(other) {
      return new (Function.prototype.bind.apply(Pair, [null].concat(_toConsumableArray(this.pair.map(function (dim, idx) {
        return dim + other.pair[idx];
      })))))();
    }
  }]);

  return Pair;
}();

exports.default = Pair;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pair = __webpack_require__(1);

var _pair2 = _interopRequireDefault(_pair);

var _engine = __webpack_require__(6);

var _engine2 = _interopRequireDefault(_engine);

var _mouse_drag_object = __webpack_require__(8);

var _mouse_drag_object2 = _interopRequireDefault(_mouse_drag_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  new _engine2.default({
    engineObjects: new Set([new _mouse_drag_object2.default({ size: new _pair2.default(30, 30) })])
  }).start();
});

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pair = __webpack_require__(1);

var _pair2 = _interopRequireDefault(_pair);

var _engine_object = __webpack_require__(7);

var _engine_object2 = _interopRequireDefault(_engine_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(options) {
    var _this = this;

    _classCallCheck(this, _class);

    this.options = Object.assign(this, {
      canvas: null,
      context: null,
      engineObjects: new Set(),
      frameRate: 60,
      backgroundColor: 'white'
    }, options);

    // Get body reference
    this.body = document.getElementsByTagName('body')[0];

    // Get or create canvas
    if (!this.canvas) {
      this.canvas = document.getElementsByTagName('canvas')[0];
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
      }
      this.body.appendChild(this.canvas);
    }

    // Create context
    if (!this.context) {
      this.context = this.canvas.getContext('2d');
    }

    // Set focus to canvas
    this.canvas.focus();

    // Set up engine and object actions
    this.engineActions = [];
    this.objectActions = ['update', 'draw'];

    this.engineObjects.forEach(function (engineObject) {
      engineObject.engine = _this;
    });

    // Action for keeping track of viewport size
    this.engineActions.push(function () {
      _this.width = innerWidth;
      _this.height = innerHeight;
    });

    // Action for updating canvas to fill viewport
    this.engineActions.push(function () {
      _this.canvas.width = _this.width;
      _this.canvas.height = _this.height;
    });

    // Action for clearing background
    this.engineActions.push(function () {
      _this.context.fillStyle = _this.backgroundColor;
      _this.context.fillRect(0, 0, _this.width, _this.height);
    });

    // Set up key status tracking
    this.downkeys = new Set();
    this.body.addEventListener('keydown', function (event) {
      _this.downkeys.add(event.keyCode);
    });
    this.body.addEventListener('keyup', function (event) {
      _this.downkeys.delete(event.keyCode);
    });

    // Set up mouse status tracking
    var handleMouseMove = function handleMouseMove(_ref) {
      var clientX = _ref.clientX,
          clientY = _ref.clientY;

      _this.mousePosition = new _pair2.default(clientX, clientY);
      var mouseDelta = _this.mouseDownPosition.delta(_this.mousePosition);
      _this.eachDragObject(function (mdo) {
        mdo.position = mdo.mouseDownPosition.offset(mouseDelta);
      });
    };

    this.body.addEventListener('mousedown', function (_ref2) {
      var clientX = _ref2.clientX,
          clientY = _ref2.clientY;

      _this.body.addEventListener('mousemove', handleMouseMove);
      _this.mouseDownPosition = new _pair2.default(clientX, clientY);
      _this.eachDragObject(function (mdo) {
        mdo.mouseDownPosition = mdo.position;
      });
    });

    this.body.addEventListener('mouseup', function (_ref3) {
      var clientX = _ref3.clientX,
          clientY = _ref3.clientY;

      _this.body.removeEventListener('mousemove', handleMouseMove);
      _this.mouseDownPosition = new _pair2.default(clientX, clientY);
      _this.mouseDelta = new _pair2.default();
    });
  }

  _createClass(_class, [{
    key: 'registerEngineObject',
    value: function registerEngineObject(engineObject) {
      this.engineObjects.add(engineObject);
    }
  }, {
    key: 'unregisterEngineObject',
    value: function unregisterEngineObject(engineObject) {
      this.engineObjects.delete(engineObject);
    }
  }, {
    key: 'dispatchEngineActions',
    value: function dispatchEngineActions() {
      this.engineActions.forEach(function (action) {
        return action();
      });
    }
  }, {
    key: 'dispatchObjectActions',
    value: function dispatchObjectActions() {
      var _this2 = this;

      this.objectActions.forEach(function (action) {
        _this2.engineObjects.forEach(function (engineObject) {
          return engineObject[action]();
        });
      });
    }
  }, {
    key: 'mouseDragObjects',
    value: function mouseDragObjects() {
      return Array.from(this.engineObjects).filter(function (engineObject) {
        return engineObject.dragWithMouse;
      });
    }
  }, {
    key: 'eachDragObject',
    value: function eachDragObject(callback) {
      this.mouseDragObjects().forEach(function (mdo) {
        return callback(mdo);
      });
    }
  }, {
    key: 'start',
    value: function start(frameRate) {
      var _this3 = this;

      this.loop = setInterval(function () {
        _this3.dispatchEngineActions();
        _this3.dispatchObjectActions();
      }, 1000 / (frameRate || this.frameRate));
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.objectActions.shift();
    }
  }, {
    key: 'unpause',
    value: function unpause() {
      this.objectActions.unshift('update');
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pair = __webpack_require__(1);

var _pair2 = _interopRequireDefault(_pair);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(options) {
    _classCallCheck(this, _class);

    Object.assign(this, {
      engine: null,
      position: new _pair2.default(),
      size: new _pair2.default(1, 1),
      speed: 0,
      color: 'black',
      visible: true
    }, options);
  }

  _createClass(_class, [{
    key: 'register',
    value: function register(engine) {
      (engine || this.engine).registerEngineObject(this);
    }
  }, {
    key: 'unregister',
    value: function unregister(engine) {
      (engine || this.engine).unregisterEngineObject(this);
    }
  }, {
    key: 'update',
    value: function update() {
      this.position.update();
      this.size.update();
    }
  }, {
    key: 'draw',
    value: function draw() {
      if (!this.visible) return;

      var context = this.engine.context;
      context.fillStyle = this.color;
      context.fillRect.apply(context, _toConsumableArray(this.position.pair).concat(_toConsumableArray(this.size.pair)));
    }
  }, {
    key: 'move',
    value: function move(offset) {
      this.position = this.position.offset(offset);
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _engine_object = __webpack_require__(7);

var _engine_object2 = _interopRequireDefault(_engine_object);

var _pair = __webpack_require__(1);

var _pair2 = _interopRequireDefault(_pair);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_EngineObject) {
  _inherits(_class, _EngineObject);

  function _class(options) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, Object.assign({
      mouseDelta: new _pair2.default()
    }, options)));

    _this.dragWithMouse = true;
    _this.mouseDownPosition = _this.position;
    return _this;
  }

  return _class;
}(_engine_object2.default);

exports.default = _class;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map