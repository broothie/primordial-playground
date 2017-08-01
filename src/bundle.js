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
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _simulation = __webpack_require__(8);

var _simulation2 = _interopRequireDefault(_simulation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.createElement('canvas');
  document.getElementsByTagName('body')[0].appendChild(canvas);
  new _simulation2.default(canvas).run();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Number.prototype.mod = function (n) {
  return (this % n + n) % n;
};

Array.prototype.flatten = function () {
  var result = [];

  this.forEach(function (el) {
    if (el instanceof Array) {
      result = result.concat(el.flatten());
    } else {
      result.push(el);
    }
  });

  return result;
};

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(iface, options) {
    _classCallCheck(this, _class);

    this.iface = iface;

    Object.assign(this, {
      x: 0,
      y: 0,
      size: 10,
      color: this.iface.dead,
      alive: false,
      neighbors: []
    }, options);

    this.willLive = false;
  }

  _createClass(_class, [{
    key: "update",
    value: function update() {
      var iface = this.iface;
      var aliveNeighbors = this.neighbors.filter(function (cell) {
        return cell.alive;
      }).length;

      this.alive = this.willLive;
      if (this.alive) {
        if (iface.lifeCounts.includes(aliveNeighbors)) {
          // Survive
          this.willLive = true;
          this.color = iface.alive;
        } else {
          // Die
          this.willLive = false;
          this.color = iface.dying;
        }
      } else {
        if (iface.birthCounts.includes(aliveNeighbors)) {
          // Birth
          this.willLive = true;
          this.color = iface.birth;
        } else {
          // Dead
          this.willLive = false;
          this.color = iface.dead;
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(context) {
      context.fillStyle = this.color;
      context.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _interface = __webpack_require__(9);

var _interface2 = _interopRequireDefault(_interface);

var _cell = __webpack_require__(6);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(canvas, options) {
    _classCallCheck(this, _class);

    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    Object.assign(this, {
      loopRate: 1000,
      stepRate: 12,
      frameRate: 60,

      paused: false,

      seedRatio: 0.3,

      width: Math.ceil(window.innerWidth / 10),
      height: Math.ceil(window.innerHeight / 10)
    }, options);

    this.iface = new _interface2.default(this);

    this.generateGrid();
    this.seed();
  }

  _createClass(_class, [{
    key: 'generateGrid',
    value: function generateGrid() {
      var grid = [];
      for (var i = 0; i < this.height; i++) {
        var row = [];
        for (var j = 0; j < this.width; j++) {
          row.push(new _cell2.default(this.iface, { x: j, y: i }));
        }
        grid.push(row);
      }

      for (var _i = 0; _i < this.height; _i++) {
        for (var _j = 0; _j < this.width; _j++) {
          for (var k = -1; k <= 1; k++) {
            for (var l = -1; l <= 1; l++) {
              if (k === 0 && l === 0) continue;
              grid[_i][_j].neighbors.push(grid[(_i + k).mod(this.height)][(_j + l).mod(this.width)]);
            }
          }
        }
      }

      this.grid = grid;
      this.cells = this.grid.flatten();

      this.generatation = 0;
    }
  }, {
    key: 'seed',
    value: function seed() {
      var _this = this;

      this.cells.forEach(function (cell) {
        cell.alive = Math.random() < _this.seedRatio;
      });
    }
  }, {
    key: 'run',
    value: function run() {
      this.loopCount = 0;
      this.generation = 0;
      this.frameCount = 0;

      this.loopId = setInterval(this.loop.bind(this), 1000 / this.loopRate);
    }
  }, {
    key: 'loop',
    value: function loop() {
      var loopCount = this.loopCount,
          loopRate = this.loopRate,
          stepRate = this.stepRate,
          frameRate = this.frameRate,
          paused = this.paused;


      if (loopCount % Math.floor(loopRate / stepRate) === 0) {
        if (!paused) this.update();
      }

      if (loopCount % Math.floor(loopRate / frameRate) === 0) {
        this.draw();
      }

      this.loopCount++;
    }
  }, {
    key: 'update',
    value: function update() {
      this.cells.forEach(function (cell) {
        cell.update();
      });
      this.generation++;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this2 = this;

      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.population = 0;
      this.cells.forEach(function (cell) {
        cell.draw(_this2.context);
        if (cell.alive) _this2.population++;
      });

      this.iface.draw();

      this.frameCount++;
    }
  }, {
    key: 'kill',
    value: function kill() {
      clearInterval(this.loopId);
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(sim, options) {
    _classCallCheck(this, _class);

    this.sim = sim;

    Object.assign(this, {
      birthCounts: [3],
      lifeCounts: [2, 3],

      dead: '#2CB27A',
      birth: '#28CC87',
      dying: '#D14CFF',
      alive: '#8D23B2'
    }, options);

    this.setUpStepRateSlider();
    this.setUpStepControls();
    this.setUpHud();
  }

  _createClass(_class, [{
    key: 'setUpStepRateSlider',
    value: function setUpStepRateSlider() {
      var _this = this;

      this.stepRateSlider = document.getElementById('stepRateSlider');
      this.stepRateSlider.setAttribute('max', this.sim.loopRate);
      this.stepRateSlider.value = this.sim.stepRate;
      this.stepRateSlider.addEventListener('input', function (event) {
        document.getElementById('stepRate').innerText = _this.stepRateSlider.value;
        _this.sim.stepRate = parseInt(_this.stepRateSlider.value);
      });
    }
  }, {
    key: 'setUpStepControls',
    value: function setUpStepControls() {
      var _this2 = this;

      ['pause', 'play', 'step', 'clear', 'seed'].forEach(function (buttonName) {
        _this2[buttonName + 'Button'] = document.getElementById(buttonName);
      });

      ['play', 'seed'].forEach(function (buttonName) {
        _this2[buttonName + 'Button'].style.display = 'none';
      });

      this.stepButton.classList.add('button-disabled');

      var stepButtonClickHandler = function stepButtonClickHandler() {
        _this2.sim.update();
      };

      this.pauseButton.addEventListener('click', function () {
        _this2.sim.paused = true;
        _this2.pauseButton.style.display = 'none';
        _this2.playButton.style.display = 'block';
        _this2.stepButton.classList.remove('button-disabled');
        _this2.stepButton.addEventListener('click', stepButtonClickHandler);
      });

      this.playButton.addEventListener('click', function () {
        _this2.sim.paused = false;
        _this2.playButton.style.display = 'none';
        _this2.pauseButton.style.display = 'block';
        _this2.stepButton.classList.add('button-disabled');
        _this2.stepButton.removeEventListener('click', stepButtonClickHandler);
      });

      this.clearButton.addEventListener('click', function () {
        _this2.sim.generateGrid();
      });

      this.seedButton.addEventListener('click', function () {
        _this2.sim.seed();
        _this2.sim.update();
      });
    }
  }, {
    key: 'setUpHud',
    value: function setUpHud() {
      this.populationCount = document.getElementById('population-count');
      this.generationCount = document.getElementById('generation-count');
    }
  }, {
    key: 'draw',
    value: function draw() {
      if (this.sim.population === 0) {
        this.clearButton.style.display = 'none';
        this.seedButton.style.display = 'block';
      } else {
        this.seedButton.style.display = 'none';
        this.clearButton.style.display = 'block';
      }

      this.populationCount.innerText = this.sim.population;
      this.generationCount.innerText = this.sim.generation;
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map