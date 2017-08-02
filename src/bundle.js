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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _simulation = __webpack_require__(2);

var _simulation2 = _interopRequireDefault(_simulation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.createElement('canvas');
  document.getElementsByTagName('body')[0].appendChild(canvas);
  new _simulation2.default(canvas).run();
});

/***/ }),
/* 1 */
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

Array.prototype.rotate = function () {
  // Assumes rectangular matrix
  var originalWidth = this[0].length;
  var originalHeight = this.length;

  var array = [];
  for (var oj = originalWidth - 1; oj >= 0; oj--) {
    var row = [];
    for (var oi = 0; oi < originalHeight; oi++) {
      row.push(this[oi][oj]);
    }
    array.push(row);
  }

  return array;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _interface = __webpack_require__(3);

var _interface2 = _interopRequireDefault(_interface);

var _cell = __webpack_require__(4);

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

      seedRatio: 0.08,

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
          row.push(new _cell2.default(this, { x: j, y: i }));
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

      this.generation = 0;
    }
  }, {
    key: 'seed',
    value: function seed() {
      var _this = this;

      this.cells.forEach(function (cell) {
        cell.willLive = Math.random() < _this.seedRatio;
      });
    }
  }, {
    key: 'run',
    value: function run() {
      this.loopCount = 0;
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
      var fromClick = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!fromClick) this.cells.forEach(function (cell) {
        return cell.step();
      });
      this.cells.forEach(function (cell) {
        return cell.getAliveNeighbors();
      });
      this.cells.forEach(function (cell) {
        return cell.update(fromClick);
      });
      if (!fromClick) this.generation++;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this2 = this;

      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.population = 0;
      this.cells.forEach(function (cell) {
        cell.draw();
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
/* 3 */
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
      survivalCounts: [2, 3],
      birthCounts: [3],

      dead: '#004080',
      emerging: '#0080FF',
      dying: '#CCFF66',
      alive: '#66FF66'
    }, options);

    this.controls = document.getElementsByClassName('controls')[0];
    this.form = document.getElementById('controls-form');
    this.currentPattern = null;

    this.setUpMouseTracking();
    this.setUpPatterns();
    this.setUpColorPickers();
    this.setUpRuleControls();
    this.setUpStepRateSlider();
    this.setUpStepControls();
    this.setUpHud();
  }

  _createClass(_class, [{
    key: 'setUpMouseTracking',
    value: function setUpMouseTracking() {
      var _this = this;

      this.sim.canvas.addEventListener('mousemove', function (_ref) {
        var clientX = _ref.clientX,
            clientY = _ref.clientY;

        _this.mouseX = clientX;
        _this.mouseY = clientY;
      });

      this.sim.canvas.addEventListener('click', function () {
        _this.sim.update(true);

        if (_this.currentPattern) {
          _this.currentPattern = null;
        }
      });

      this.sim.canvas.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
      }, false);
    }
  }, {
    key: 'setUpPatterns',
    value: function setUpPatterns() {
      var _this2 = this;

      var spaceshipButton = document.getElementById('spaceship-button');
      spaceshipButton.addEventListener('click', function () {
        _this2.currentPattern = [[0, 1, 1, 1, 1], [1, 0, 0, 0, 1], [0, 0, 0, 0, 1], [1, 0, 0, 1, 0]];

        _this2.rotateHandler = _this2.sim.canvas.addEventListener('contextmenu', function (e) {
          e.preventDefault();
          _this2.currentPattern = _this2.currentPattern.rotate();
          return false;
        }, false);
      });
    }
  }, {
    key: 'setUpRuleControls',
    value: function setUpRuleControls() {
      var _this3 = this;

      ['survival', 'birth'].forEach(function (ruleName) {
        var ruleControl = document.getElementById(ruleName + '-rule');
        ruleControl.addEventListener('input', function (event) {
          ruleControl.style.border = '1px solid Gray';
          var value = event.target.value;
          try {
            var counts = value.split(',').map(function (el) {
              return parseInt(el);
            });
            _this3[ruleName + 'Counts'] = counts;
          } catch (e) {
            ruleControl.style.border = '1px solid Red';
          }
        });
      });
    }
  }, {
    key: 'setUpColorPickers',
    value: function setUpColorPickers() {
      var _this4 = this;

      ['alive', 'dying', 'emerging', 'dead'].forEach(function (colorPickerName) {
        var colorPicker = document.getElementById(colorPickerName + '-color');
        colorPicker.value = _this4[colorPickerName];
        colorPicker.addEventListener('click', function () {
          _this4.form.style.display = 'block';
          _this4.controls.style.opacity = 1;
          colorPicker.addEventListener('focusin', function () {
            _this4.form.style.display = null;
            _this4.controls.style.opacity = null;
          });
        });

        colorPicker.addEventListener('change', function (event) {
          _this4[colorPickerName] = event.target.value;
        });
      });
    }
  }, {
    key: 'setUpStepRateSlider',
    value: function setUpStepRateSlider() {
      var _this5 = this;

      this.stepRateSlider = document.getElementById('stepRateSlider');
      this.stepRateSlider.value = this.sim.stepRate;
      this.stepRateSlider.addEventListener('input', function (event) {
        document.getElementById('stepRate').innerText = _this5.stepRateSlider.value;
        _this5.sim.stepRate = parseInt(_this5.stepRateSlider.value);
      });
    }
  }, {
    key: 'setUpStepControls',
    value: function setUpStepControls() {
      var _this6 = this;

      ['pause', 'play', 'step', 'clear', 'seed'].forEach(function (buttonName) {
        _this6[buttonName + 'Button'] = document.getElementById(buttonName);
      });

      ['play', 'seed'].forEach(function (buttonName) {
        _this6[buttonName + 'Button'].style.display = 'none';
      });

      this.stepButton.classList.add('button-disabled');

      var stepButtonClickHandler = function stepButtonClickHandler() {
        _this6.sim.update();
      };

      this.pauseButton.addEventListener('click', function () {
        _this6.sim.paused = true;
        _this6.pauseButton.style.display = 'none';
        _this6.playButton.style.display = 'block';
        _this6.stepButton.classList.remove('button-disabled');
        _this6.stepButton.addEventListener('click', stepButtonClickHandler);
      });

      this.playButton.addEventListener('click', function () {
        _this6.sim.paused = false;
        _this6.playButton.style.display = 'none';
        _this6.pauseButton.style.display = 'block';
        _this6.stepButton.classList.add('button-disabled');
        _this6.stepButton.removeEventListener('click', stepButtonClickHandler);
      });

      this.clearButton.addEventListener('click', function () {
        _this6.sim.generateGrid();
      });

      this.seedButton.addEventListener('click', function () {
        _this6.sim.seed();
        _this6.sim.update();
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

/***/ }),
/* 4 */
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
      x: 0,
      y: 0,
      size: 10,
      color: this.sim.iface.dead,
      alive: false,
      neighbors: []
    }, options);

    this.displayX = this.x * this.size;
    this.displayY = this.y * this.size;
  }

  _createClass(_class, [{
    key: 'step',
    value: function step() {
      this.alive = this.willLive;
    }
  }, {
    key: 'getAliveNeighbors',
    value: function getAliveNeighbors() {
      this.aliveNeighbors = this.neighbors.filter(function (cell) {
        return cell.alive;
      }).length;
    }
  }, {
    key: 'update',
    value: function update() {
      var fromClick = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var iface = this.sim.iface;

      if (fromClick) {
        if (this.hovered) {
          this.alive = !this.alive;
          this.neighbors.forEach(function (cell) {
            return cell.getAliveNeighbors();
          });
          this.neighbors.forEach(function (cell) {
            return cell.update(true);
          });
        } else if (this.patternMapped) {
          this.alive = true;
          this.neighbors.forEach(function (cell) {
            return cell.getAliveNeighbors();
          });
          this.neighbors.forEach(function (cell) {
            return cell.update(false);
          });
        }
      }

      if (this.alive) {
        if (iface.survivalCounts.includes(this.aliveNeighbors)) {
          // Survive
          this.willLive = true;
        } else {
          // Die
          this.willLive = false;
        }
      } else {
        if (iface.birthCounts.includes(this.aliveNeighbors)) {
          // Birth
          this.willLive = true;
        } else {
          // Dead
          this.willLive = false;
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this = this;

      var displayX = this.displayX,
          displayY = this.displayY,
          size = this.size,
          _sim = this.sim,
          context = _sim.context,
          iface = _sim.iface;


      if (this.alive) {
        if (this.willLive) {
          this.color = iface.alive;
        } else {
          this.color = iface.dying;
        }
      } else {
        if (this.willLive) {
          this.color = iface.emerging;
        } else {
          this.color = iface.dead;
        }
      }

      this.hovered = displayX <= iface.mouseX && iface.mouseX < displayX + size && displayY <= iface.mouseY && iface.mouseY < displayY + size;

      this.patternMapped = false;
      if (iface.currentPattern) {
        this.hovered = false;
        iface.currentPattern.forEach(function (row, rowIdx) {
          row.forEach(function (cellStatus, colIdx) {
            var patternOffsetX = iface.mouseX + colIdx * size;
            var patternOffsetY = iface.mouseY + rowIdx * size;
            if (displayX <= patternOffsetX && patternOffsetX < displayX + size && displayY <= patternOffsetY && patternOffsetY < displayY + size && cellStatus === 1) {
              _this.patternMapped = true;
            }
          });
        });
      }

      var highlighted = this.hovered || this.patternMapped;

      if (highlighted) {
        context.fillStyle = 'white';
        context.fillRect(displayX, displayY, size, size);
      }

      context.fillStyle = this.color;
      context.fillRect(displayX + (highlighted ? 1 : 0), displayY + (highlighted ? 1 : 0), size - (highlighted ? 2 : 0), size - (highlighted ? 2 : 0));
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map