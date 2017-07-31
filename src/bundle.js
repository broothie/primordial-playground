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
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
  }, {
    key: "withinCorners",
    value: function withinCorners(corner1, corner2) {
      var _sort = [corner1.x, corner2.x].sort(),
          _sort2 = _slicedToArray(_sort, 2),
          x1 = _sort2[0],
          x2 = _sort2[1];

      var _sort3 = [corner1.y, corner2.y].sort(),
          _sort4 = _slicedToArray(_sort3, 2),
          y1 = _sort4[0],
          y2 = _sort4[1];

      return x1 <= this.x && this.x < x2 && y1 <= this.y && this.y < y2;
    }
  }]);

  return Pair;
}();

exports.default = Pair;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pair = __webpack_require__(0);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _pair = __webpack_require__(0);

var _pair2 = _interopRequireDefault(_pair);

var _engine = __webpack_require__(4);

var _engine2 = _interopRequireDefault(_engine);

var _grid = __webpack_require__(5);

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  new _engine2.default({ engineObjects: new _grid2.default().asSet() }).run();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Number.prototype.mod = function (n) {
  return (this % n + n) % n;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pair = __webpack_require__(0);

var _pair2 = _interopRequireDefault(_pair);

var _engine_object = __webpack_require__(1);

var _engine_object2 = _interopRequireDefault(_engine_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(options) {
    _classCallCheck(this, _class);

    this.options = Object.assign(this, {
      canvas: null,
      context: null,
      engineObjects: new Set(),
      frameRate: 60,
      backgroundColor: 'White'
    }, options);

    this.setUpCanvas();
    this.setUpEngineActions();
    this.createActions();
    this.setUpInputEventHandling();
  }

  _createClass(_class, [{
    key: 'setUpCanvas',
    value: function setUpCanvas() {
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
    }
  }, {
    key: 'setUpEngineActions',
    value: function setUpEngineActions() {
      var _this = this;

      // Set up engine and object actions
      this.engineActions = [];
      this.objectActions = ['update', 'draw'];
      this.engineObjects.forEach(function (engineObject) {
        engineObject.engine = _this;
      });
    }
  }, {
    key: 'createActions',
    value: function createActions() {
      var _this2 = this;

      // Action for updating framecount
      this.frameCount = 0;
      this.engineActions.push(function () {
        _this2.frameCount++;
      });

      // Action for keeping track of viewport size
      this.engineActions.push(function () {
        _this2.width = innerWidth;
        _this2.height = innerHeight;
      });

      // Action for updating canvas to fill viewport
      this.engineActions.push(function () {
        _this2.canvas.width = _this2.width;
        _this2.canvas.height = _this2.height;
      });

      // Action for clearing background
      this.engineActions.push(function () {
        _this2.context.fillStyle = _this2.backgroundColor;
        _this2.context.fillRect(0, 0, _this2.width, _this2.height);
      });
    }
  }, {
    key: 'setUpInputEventHandling',
    value: function setUpInputEventHandling() {
      // this.setUpKeyEventManagement();
      this.setUpMouseDragging();
      this.setUpMouseTracking();
    }
  }, {
    key: 'setUpKeyEventManagement',
    value: function setUpKeyEventManagement() {
      var _this3 = this;

      this.downkeys = new Set();
      this.body.addEventListener('keydown', function (event) {
        _this3.downkeys.add(event.keyCode);
      });
      this.body.addEventListener('keyup', function (event) {
        _this3.downkeys.delete(event.keyCode);
      });
    }
  }, {
    key: 'setUpMouseDragging',
    value: function setUpMouseDragging() {
      var _this4 = this;

      var handleMouseMove = function handleMouseMove(_ref) {
        var clientX = _ref.clientX,
            clientY = _ref.clientY;

        var mousePosition = new _pair2.default(clientX, clientY);
        var mouseDelta = _this4.mouseDownPosition.delta(mousePosition);
        _this4.eachDragObject(function (mdo) {
          mdo.position = mdo.mouseDownPosition.offset(mouseDelta);
        });
      };

      this.body.addEventListener('mousedown', function (_ref2) {
        var clientX = _ref2.clientX,
            clientY = _ref2.clientY;

        _this4.body.addEventListener('mousemove', handleMouseMove);
        _this4.mouseDownPosition = new _pair2.default(clientX, clientY);
        _this4.eachDragObject(function (mdo) {
          mdo.mouseDownPosition = mdo.position;
        });
      });

      this.body.addEventListener('mouseup', function (_ref3) {
        var clientX = _ref3.clientX,
            clientY = _ref3.clientY;

        _this4.body.removeEventListener('mousemove', handleMouseMove);
        _this4.mouseDownPosition = new _pair2.default(clientX, clientY);
        _this4.mouseDelta = new _pair2.default();
      });
    }
  }, {
    key: 'setUpMouseTracking',
    value: function setUpMouseTracking() {
      var _this5 = this;

      this.mousePosition = new _pair2.default(0, 0);
      this.body.addEventListener('mousemove', function (_ref4) {
        var clientX = _ref4.clientX,
            clientY = _ref4.clientY;

        _this5.mousePosition = new _pair2.default(clientX, clientY);
      });
    }
  }, {
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
      var _this6 = this;

      this.objectActions.forEach(function (action) {
        _this6.engineObjects.forEach(function (engineObject) {
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
    key: 'run',
    value: function run(frameRate) {
      var _this7 = this;

      this.loop = setInterval(function () {
        _this7.dispatchEngineActions();
        _this7.dispatchObjectActions();
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pair = __webpack_require__(0);

var _pair2 = _interopRequireDefault(_pair);

var _cell = __webpack_require__(6);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(options) {
    _classCallCheck(this, _class);

    Object.assign(this, {
      grid: null,
      dimensions: new _pair2.default(150, 150),
      cellSize: 10,
      borderSize: 0,
      seedWeight: 0.1,
      stepRate: 30
    }, options);

    if (!this.grid) {
      this.generateGrid();
      this.grid.forEach(function (row) {
        row.forEach(function (cell) {
          return cell.getNeighbors();
        });
      });
    }
  }

  _createClass(_class, [{
    key: 'generateGrid',
    value: function generateGrid() {
      var _dimensions$pair = _slicedToArray(this.dimensions.pair, 2),
          x = _dimensions$pair[0],
          y = _dimensions$pair[1];

      this.grid = [];
      for (var j = 0; j < y; j++) {
        var row = [];
        for (var i = 0; i < x; i++) {
          row.push(new _cell2.default({
            grid: this,
            gridPosition: new _pair2.default(i, j),
            size: new _pair2.default(this.cellSize, this.cellSize),
            position: new _pair2.default(i * (this.cellSize + this.borderSize), j * (this.cellSize + this.borderSize)),
            alive: Math.random() < this.seedWeight
          }));
        }
        this.grid.push(row);
      }
    }
  }, {
    key: 'flatten',
    value: function flatten() {
      var flattened = [];
      this.grid.forEach(function (row) {
        row.forEach(function (cell) {
          return flattened.push(cell);
        });
      });
      return flattened;
    }
  }, {
    key: 'asSet',
    value: function asSet() {
      return new Set(this.flatten());
    }
  }, {
    key: 'getCell',
    value: function getCell(x, y) {
      if (!(0 <= x && x < this.dimensions.x)) {
        x = x.mod(this.dimensions.x);
      }

      if (!(0 <= y && y < this.dimensions.y)) {
        y = y.mod(this.dimensions.y);
      }
      return this.grid[y][x];
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _pair = __webpack_require__(0);

var _pair2 = _interopRequireDefault(_pair);

var _mouse_drag_object = __webpack_require__(7);

var _mouse_drag_object2 = _interopRequireDefault(_mouse_drag_object);

var _engine_object = __webpack_require__(1);

var _engine_object2 = _interopRequireDefault(_engine_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_EngineObject) {
  _inherits(_class, _EngineObject);

  function _class(options) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, Object.assign({
      grid: null,
      size: new _pair2.default(10, 10),
      color: 'WhiteSmoke',
      alive: false
    }, options)));

    _this.willLive = _this.alive;
    return _this;
  }

  _createClass(_class, [{
    key: 'getNeighbors',
    value: function getNeighbors() {
      var _gridPosition$pair = _slicedToArray(this.gridPosition.pair, 2),
          x = _gridPosition$pair[0],
          y = _gridPosition$pair[1];

      this.neighbors = [];
      for (var j = -1; j <= 1; j++) {
        for (var i = -1; i <= 1; i++) {
          var cell = this.grid.getCell(x + i, y + j);
          if (!cell || cell === this) continue;
          this.neighbors.push(cell);
        }
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _engine = this.engine,
          frameCount = _engine.frameCount,
          frameRate = _engine.frameRate,
          mousePosition = _engine.mousePosition;


      this.hovered = false;
      if (mousePosition.withinCorners(this.position, this.position.offset(this.size))) {
        this.hovered = true;
      }

      if (frameCount % Math.floor(frameRate / this.grid.stepRate) !== 0) {
        return;
      }

      var neighborCount = this.neighbors.filter(function (neighbor) {
        return neighbor.alive;
      }).length;

      this.alive = this.willLive;
      if (this.alive) {
        if ([2, 3].includes(neighborCount)) {
          this.color = '#8D23B2';
          // this.color = '#2CB27A';
          // this.color = '#1DCC1B';
          this.willLive = true;
        } else {
          this.color = '#D14CFF';
          // this.color = '#28CC87';
          // this.color = '#FF573B';
          this.willLive = false;
        }
      } else {
        if (neighborCount === 3) {
          this.color = '#28CC87';
          // this.color = '#D14CFF';
          // this.color = '#7BFF9F';
          this.willLive = true;
        } else {
          this.color = '#2CB27A';
          // this.color = '#FFCF65';
          // this.color = '#CC681B';
          this.willLive = false;
        }
      }

      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);
    }
  }, {
    key: 'draw',
    value: function draw() {
      var context = this.engine.context;

      context.fillStyle = this.color;
      context.fillRect.apply(context, _toConsumableArray(this.position.pair).concat(_toConsumableArray(this.size.pair)));

      if (this.hovered) {
        context.lineWidth = 1;
        context.strokeStyle = 'White';
        context.strokeRect.apply(context, _toConsumableArray(this.position.pair).concat(_toConsumableArray(this.size.pair)));
      }
    }
  }]);

  return _class;
}(_engine_object2.default);

exports.default = _class;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _engine_object = __webpack_require__(1);

var _engine_object2 = _interopRequireDefault(_engine_object);

var _pair = __webpack_require__(0);

var _pair2 = _interopRequireDefault(_pair);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_EngineObject) {
  _inherits(_class, _EngineObject);

  function _class(options) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, Object.assign({}, options)));

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