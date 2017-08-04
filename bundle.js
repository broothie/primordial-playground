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

var _pattern_parser = __webpack_require__(7);

var _pattern_parser2 = _interopRequireDefault(_pattern_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.patternParser = _pattern_parser2.default;

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

/*
 * Assumes rectangular matrix
 */
Array.prototype.rotate = function () {
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

Array.prototype.pushAll = function (other) {
  var _this = this;

  other.forEach(function (el) {
    return _this.push(el);
  });
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

      this.loopId = setInterval(this.loop.bind(this), 300 / this.loopRate);
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

var _patterns = __webpack_require__(5);

var _patterns2 = _interopRequireDefault(_patterns);

var _pattern_parser = __webpack_require__(7);

var _pattern_parser2 = _interopRequireDefault(_pattern_parser);

var _colors = __webpack_require__(6);

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    this.body = document.getElementsByTagName('body')[0];
    this.controls = document.getElementsByClassName('controls')[0];
    this.form = document.getElementById('controls-form');
    this.currentPattern = null;

    this.setColor(Object.keys(_colors2.default)[Math.floor(Math.random() * Object.keys(_colors2.default).length)]);

    this.setUpMouseTracking();
    this.setUpPatterns();
    this.setUpColorSchemes();
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
          _this.clearPattern();
        }
      });

      this.sim.canvas.addEventListener('contextmenu', function (e) {
        e.preventDefault();

        if (_this.currentPattern) {
          _this.currentPattern = _this.currentPattern.rotate();
        }

        return false;
      }, false);
    }
  }, {
    key: 'setUpPatterns',
    value: function setUpPatterns() {
      var _this2 = this;

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          _this2.clearPattern();
        }
      });

      var _loop = function _loop(patternName) {
        var patternButtons = document.getElementById('pattern-buttons');
        var patternButton = document.createElement('button');
        patternButton.innerText = patternName;
        patternButtons.appendChild(patternButton);
        patternButton.addEventListener('click', function (event) {
          event.preventDefault();
          _this2.currentPattern = (0, _pattern_parser2.default)(_patterns2.default[patternName]);
          _this2.body.style.cursor = 'none';
        });
      };

      for (var patternName in _patterns2.default) {
        _loop(patternName);
      }
    }
  }, {
    key: 'clearPattern',
    value: function clearPattern() {
      this.currentPattern = null;
      this.body.style.cursor = null;
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
    key: 'setColor',
    value: function setColor(schemeName) {
      var _this4 = this;

      ['dead', 'emerging', 'dying', 'alive'].forEach(function (statusName, idx) {
        _this4[statusName] = _colors2.default[schemeName][idx];
        var colorPicker = document.getElementById(statusName + '-color');
        colorPicker.value = _colors2.default[schemeName][idx];
      });
    }
  }, {
    key: 'setUpColorSchemes',
    value: function setUpColorSchemes() {
      var _this5 = this;

      var schemeList = document.querySelector('.color-schemes > ul');
      Object.keys(_colors2.default).forEach(function (colorScheme) {
        var schemeLi = document.createElement('li');
        schemeList.appendChild(schemeLi);
        var schemeLink = document.createElement('a');
        schemeLi.appendChild(schemeLink);
        schemeLink.innerText = colorScheme;
        schemeLi.addEventListener('click', function (e) {
          _this5.setColor(colorScheme);
        });
      });
    }
  }, {
    key: 'setUpColorPickers',
    value: function setUpColorPickers() {
      var _this6 = this;

      ['alive', 'dying', 'emerging', 'dead'].forEach(function (colorPickerName) {
        var colorPicker = document.getElementById(colorPickerName + '-color');
        colorPicker.value = _this6[colorPickerName];
        colorPicker.addEventListener('click', function () {
          _this6.form.style.display = 'block';
          _this6.controls.style.opacity = 1;
          colorPicker.addEventListener('focusin', function () {
            _this6.form.style.display = null;
            _this6.controls.style.opacity = null;
          });
        });

        colorPicker.addEventListener('change', function (event) {
          _this6[colorPickerName] = event.target.value;
        });
      });
    }
  }, {
    key: 'setUpStepRateSlider',
    value: function setUpStepRateSlider() {
      var _this7 = this;

      var stepRateSlider = document.getElementById('stepRateSlider');
      stepRateSlider.value = this.sim.stepRate;
      stepRateSlider.addEventListener('input', function (event) {
        document.getElementById('stepRate').innerText = stepRateSlider.value;
        _this7.sim.stepRate = parseInt(stepRateSlider.value);
      });
    }
  }, {
    key: 'setUpStepControls',
    value: function setUpStepControls() {
      var _this8 = this;

      ['pause', 'play', 'step', 'clear', 'seed'].forEach(function (buttonName) {
        _this8[buttonName + 'Button'] = document.getElementById(buttonName);
      });

      ['play', 'seed'].forEach(function (buttonName) {
        _this8[buttonName + 'Button'].style.display = 'none';
      });

      this.stepButton.classList.add('button-disabled');

      var stepButtonClickHandler = function stepButtonClickHandler() {
        _this8.sim.update();
      };

      this.pauseButton.addEventListener('click', function () {
        _this8.sim.paused = true;
        _this8.pauseButton.style.display = 'none';
        _this8.playButton.style.display = 'block';
        _this8.stepButton.classList.remove('button-disabled');
        _this8.stepButton.addEventListener('click', stepButtonClickHandler);
      });

      this.playButton.addEventListener('click', function () {
        _this8.sim.paused = false;
        _this8.playButton.style.display = 'none';
        _this8.pauseButton.style.display = 'block';
        _this8.stepButton.classList.add('button-disabled');
        _this8.stepButton.removeEventListener('click', stepButtonClickHandler);
      });

      this.clearButton.addEventListener('click', function () {
        _this8.sim.generateGrid();
      });

      this.seedButton.addEventListener('click', function () {
        _this8.sim.seed();
        _this8.sim.update();
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
        context.fillStyle = 'Black';
        context.fillRect(displayX, displayY, size, size);
      }

      context.fillStyle = this.color;
      context.fillRect(displayX + (highlighted ? 1 : 0), displayY + (highlighted ? 1 : 0), size - (highlighted ? 2 : 0), size - (highlighted ? 2 : 0));
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
exports.default = {
  'Spaceship': 'b5o$o4bo$5bo$o3bob!',
  'Glider': 'bob$2bo$3o!',
  'Gosper Glider Gun': '24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8bo3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!',
  'Revolver': 'o12bo$3o4bo3b3o$3bobobo2bo3b$2bo6bobo2b$2bobo6bo2b$3bo2bobobo3b$3o3bo4b3o$o12bo!',
  'Dart': '7bo7b$6bobo6b$5bo3bo5b$6b3o6b2$4b2o3b2o4b$2bo3bobo3bo2b$b2o3bobo3b2ob$o5bobo5bo$bob2obobob2obo!',
  'Airforce': '7bo6b$6bobo5b$7bo6b2$5b5o4b$4bo5bob2o$3bob2o3bob2o$3bobo2bobo3b$2obo3b2obo3b$2obo5bo4b$4b5o5b2$6bo7b$5bobo6b$6bo!',
  'Kokes Galaxy': '2bo2bobob$2obob3ob$bo6bo$2o5bob2$bo5b2o$o6bob$b3obob2o$bobo2bo!',
  'Lightbulb': 'b2obo2b$bob2o2b2$2b3o2b$bo3bob$bo3bob$2bobo2b$obobobo$2o3b2o!',
  'Lightspeed Oscillator': '22b2o19bo2bo22b$22bobo18b4o22b$24bo3bo2bo2bo2bo2bo6b2o15b2o3b$23b2ob21o2bob2obo2bo2bo3bo4b$18b2o2bo2bo22bo3bob4o2b3obo4b$14b2obobo2b2o2b3o2b3o2b3o2b3o2b2ob2o7b2o3bob2o2b$b2o2b2o3b2o3bobo6b2o4b2o3b2o3b2o5bobob5o2bo2bo3bo2bo$bo3bobo2bo3bo3bo3b2o2b2o3b3o2b3o2b3ob2o3bo3bo4bob2o2bob2o$2b3o2bo3bo2b5o2bo4bo19bo5b4o2bo5b2o3b$4bobob4o5b2o3bobob2o3b3o2b3o2b3ob2o3bo3bo4bob2o2bob2o$6bobo3b5o2bo2bo7b2o3b2o3b2o5bobob5o2bo2bo3bo2bo$6bo2bobo6bobob7o2b3o2b3o2b3o2b2ob2o7b2o3bob2o2b$3bo2bo2bo2bobo2b4obo25bo3bob4o2b3obo4b$3b2obob2o4bo7bob23o2bob2obo2bo2bo3bo4b$3bobo3bobo4b6obo4bo2bo2bo2bo2bo6b2o15b2o3b$bobobob2o2b5o5bobobo17b4o22b$obo3bo2b2o4bob2o2bo2b2o17bo2bo22b$bo5bobo2bo3b2obobo47b$8bo2b2o7bo!',
  'Long Canada Goose': '14b2o19b$13b2o3bo16b$15bob2o16b$11bo5b3o15b$10b2o5bo17b$10bobo6b2o14b$20b3o12b$12b3o5bo3bo10b$11b3o7bo2bo10b$5bo7bobo6b2ob2o8b$4b5o6b3o7b2o8b$4bo2b2o7bobo4bo2bo8b$6b2obo6bo2bo6bob2o5b$b2o16bobo2b3o8b$2o7bobo5b2o4bo11b$bobo6b2o7b2o2bo11b$b3o6b3o6b5o11b$b2o10b2o20b$3bobo9bo6bo12b$6b2o7bo6bo12b$5b3o5b2o2b2o16b$7bo6bob3o4b2o10b$8bo2bo3bo6b3o10b$8bo2b2o5bo2b3o8b2ob$9b2o2bo16b3obo$12bo12b2o2b2o4b$11b2o13bo8b$11b2obo15bo4b$26b2o3bo3b$25bobob2o4b$25bobo2bob2ob$24bo4b2o4b$24b2o9b$24b2o!',
  'Lightweight Tagalong': '21bo3b$18b4o3b$13bo2bob2o5b$13bo11b$4o8bo3bob2o5b$o3bo5b2ob2obobob5o$o9b2obobobo2b5o$bo2bo2b2o2bo3b3o2bob2ob$6bo2bob2o12b$6bo4b2o12b$6bo2bob2o12b$bo2bo2b2o2bo3b3o2bob2ob$o9b2obobobo2b5o$o3bo5b2ob2obobob5o$4o8bo3bob2o5b$13bo11b$13bo2bob2o5b$18b4o3b$21bo!',
  'Back Rake': '5b3o11b3o5b$4bo3bo9bo3bo4b$3b2o4bo7bo4b2o3b$2bobob2ob2o5b2ob2obobo2b$b2obo4bob2ob2obo4bob2ob$o4bo3bo2bobo2bo3bo4bo$12bobo12b$2o7b2obobob2o7b2o$12bobo12b$6b3o9b3o6b$6bo3bo9bo6b$6bobo4b3o11b$12bo2bo4b2o5b$15bo11b$11bo3bo11b$11bo3bo11b$15bo11b$12bobo!',
  "Baker's Dozen": '2o9b2o10b$4obo5b2o10b$obo2b3o15b$11bo11b$4b2o4bobo10b$4bo5bo2bo4bo4b$11b2o4b2o4b2$15b3o2bobo$10b2o5bob4o$10b2o9b2o!',
  'P46 Gun': '25b2o5b2o$25b2o5b2o12$27b2ob2o2b$26bo5bob2$25bo7bo$25bo2bobo2bo$25b3o3b3o5$17bo16b$2o15b2o15b$2o16b2o14b$13b2o2b2o15b4$13b2o2b2o15b$2o16b2o7b2o5b$2o15b2o8b2o5b$17bo!',
  'Nonmonotonic Spaceship': '10b2obo7b$6b3obob3o6b$2bobo10bo3b2o$2o4b2o5bo3b4o$2bob2o2bo4b3obo3b$8bo4bo7b$2bob2o2bo4b3obo3b$2o4b2o5bo3b4o$2bobo10bo3b2o$6b3obob3o6b$10b2obo!',
  'Tubestretcher': '8b2o7b$7b2o8b$9bo7b$11b2o4b$10bo6b2$9bo2b2o3b$b2o5b2o4bo2b$2o5bo5bo3b$2bo4bobo3b2o2b$4bo2bo4b2obob$4b2o7b2o2b$8bo4bob2o$7bobo2bob2ob$8bo!',
  'Pi Heptomino Hassler': '9b2o10b2o8b$8bo2bo8bo2bo7b$8b3o10b3o7b$11b10o10b$10bo2b6o2bo9b$10b2o2b4o2b2o9b4$20b2o9b$20b2o9b$12b2o17b6$2o12b3o12b2o$2o11bo3bo11b2o$13b2ob2o13b5$13b2ob2o13b$2o11bo3bo11b2o$2o12b3o12b2o6$12b2o17b$20b2o9b$20b2o9b4$10b2o2b4o2b2o9b$10bo2b6o2bo9b$11b10o10b$8b3o10b3o7b$8bo2bo8bo2bo7b$9b2o10b2o!',
  'Orion': '3b2o9b$3bobo8b$3bo10b$2obo10b$o4bo8b$ob2o6b3ob$5b3o4b2o$6b3obobob$13bo$6bobo5b$5b2obo5b$6bo7b$4b2obo6b$7bo6b$5b2o!',
  'Glider Shuttle': '31bo23b$30bobo22b$30bobo22b$29b2ob2o21b$29bo5bo19b$30bobob4o17b$25bo2bobobo5bo16b$25b4obo2b2o2b2o16b$30b2o3bo19b$24bob2obo5bob2o16b$24b2obob3obob2obo16b$33b2o20b$28b4o4b2o17b$27bo2bob2obo2bo16b$27b2o4bo3b2o16b$23bo9bo21b$22bobo5b2o8b2o2b2ob2o6b$23bo6b3o7bobo2bobobo5b$33b3o6bobo4bo5b$21b5o4b2o8bobob3o2b2o4b$20bo4bo6bobo5bo2bo3bobo5b$19bob2o10bo3b2o2bo3bobo3bo3b$16bo2bobo11b2ob3ob2o3bobobob3ob$15bobobo9bo6b3obobobo9bo$9b2o5bo2bo4b3o3b2o10bobob4ob3ob$6b2o2bo8b2o3b2o3b2o11bob2o4b2o3b$7bobo14bo15bobo4b2o6b$7bob2o2b2o25b2o2b2obo7b$6b2o4bobo14b2o14bobo7b$3b2o4b2obo10bobo2bo2bo2b2o8bo2b2o6b$b3ob4obob2o2b2obo4b2o2bobo4bo2bo5b2o9b$o7bobobo3b2obo4bo4bo5bobobo15b$b3ob2o6bo3bo2bo11b2obo2bo16b$3bo3bo2b2ob3o2bo2b2o9bo2bo19b$5bobo3bo6bobobo6bo4bo20b$4b2o2b3o2bo4bo10b5o21b$5bo4bobo9b2o31b$5bobobo2bobo6b3o7bo23b$6b2ob2o2b2o6b3o6bobo22b$31bo23b$16b2ob2ob2o2b2o27b$16bo4b2o4bo27b$17b3o3b4o28b$20bo34b$16bob2o3b3obob2o24b$16b2obob2o2bob2obo24b$19bo4bo30b$16b2o2b3obob4o25b$16bo7bobo2bo25b$17b4obobo30b$19bo5bo29b$21b2ob2o29b$22bobo30b$22bobo30b$23bo!',
  'Beehive Hassler': '35b2o4b2o36b$35bobo2bobo27b2o7b$37bo2bo6b2o4b2o8b2o3bo2bo7b$36bo4bo6bo4bobo8bo3b2o9b$26bo9b2o2b2o6bob2obo2bo7bob2o2b4ob2o2b$25bobo10b2o7b2obobob2o6b2obobobo3bobobob$25bob3o16bo3bobo10bobo3b2o4bobob$22bob2o4bo14b3ob2ob2o6b2obob2obobobob2ob2o$14b2o6b2o3b2obo14bo3b2ob2ob2o2bo6bob2o2bo2bo3b$13bobo9b2obob2o13bo7bo2b3o3bobobobo4bobo3b$7b2obo2bo6b5obobo3bo12bo8bob2o7b2ob4ob2o4b$6bob2obob2o4bo8b2ob3o4bo6bo3b2o3b2o2bo5bo2bo4bo6b$6bo4bo2bo5bo2b2o3b2o3bo4b2o5b3ob2o8bo4b2obob2obo6b$4b2ob4ob2o7b2obo8bo5bo6bo3bobob5o6bo2bob2o7b$3bobo4bobobobo3b3o2bo7bo13b2obob2o9bobo13b$3bo2bo2b2obo6bo2b2ob2ob2o3bo14bob2o3b2o6b2o14b$2ob2obobobob2obob2o6b2ob2ob3o14bo4b2obo22b$bobo4b2o3bobo10bobo3bo16b3obo25b$bobobo3bobobob2o6b2obobob2o7b2o10bobo25b$2b2ob4o2b2obo7bo2bob2obo6b2o2b2o9bo26b$9b2o3bo8bobo4bo6bo4bo36b$7bo2bo3b2o8b2o4b2o6bo2bo37b$7b2o27bobo2bobo35b$36b2o4b2o!',
  'R Pentomino': 'b2o$2ob$bob!',
  'Virginia': 'bo12bob$bo12bob$obo10bobo$bo12bob$bo12bob$2bo3b4o3bo2b$6b4o6b$2b4o4b4o2b2$4bo6bo4b$5b2o2b2o!',
  'Snail': 'bo36b$bo36b$o37b$b3o17b3o3b3o8b$b2obo9bo3bobo6b3o8b$2bo11b2obo7bo4b4o4b$6bo6bo3bobo3b2obo5b2o4b$3bo2bob3o3b2o9bo8b2obo$3b2obo5bo5bo17bob$9bob7o20b2$9bob7o20b$3b2obo5bo5bo17bob$3bo2bob3o3b2o9bo8b2obo$6bo6bo3bobo3b2obo5b2o4b$2bo11b2obo7bo4b4o4b$b2obo9bo3bobo6b3o8b$b3o17b3o3b3o8b$o37b$bo36b$bo!',
  'Turtle': 'b3o7bo$b2o2bob2ob2o$3b3o4bob$bo2bobo3bob$o4bo4bob$o4bo4bob$bo2bobo3bob$3b3o4bob$b2o2bob2ob2o$b3o7bo!',
  'Toaster': '2bo6b2o$bobob2o2bob$bobobobobob$2obo3bob2o$o2b2ob2o2bo$bo7bob$bo7bob$o2b2ob2o2bo$2obo3bob2o$bobobobobob$bobob2o2bob$2bo6b2o!'
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'Classic': ['#999999', '#999999', '#FFFFFF', '#FFFFFF'],
  'Aqua': ['#004080', '#0080FF', '#CCFF66', '#66FF66'],
  'Barney': ['#2CB27A', '#28CC87', '#D14CFF', '#8D23B2'],
  'Flappy Bird': ['#4EC0CA', '#A5C55C', '#FE3800', '#F6B833'],
  'Electric': ['#B3B3B3', '#FFFF66', '#00FFFF', '#008080'],
  'Swayed': ['#6F00CA', '#800040', '#000000', '#804000'],
  'Rick and Morty': [],
  'App Academy': [],
  'UB': []
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (patternCode) {
  var grid = [[]];
  var previousCount = 1;

  var match = void 0,
      lastRow = void 0;
  while (true) {
    var loopBreak = false;
    match = patternCode.match(/(\d+)|b|o|\$|\!/)[0];
    lastRow = grid[grid.length - 1];

    switch (match) {
      case 'o':
        lastRow.pushAll(Array(previousCount).fill(1));
        previousCount = 1;
        break;
      case 'b':
        lastRow.pushAll(Array(previousCount).fill(0));
        previousCount = 1;
        break;
      case '$':
        for (var i = 0; i < previousCount - 1; i++) {
          grid.push(Array(grid[0].length).fill(0));
        }
        grid.push([]);
        previousCount = 1;
        break;
      case '!':
        loopBreak = true;
        break;
      default:
        previousCount = parseInt(match);
        break;
    }

    if (loopBreak) {
      break;
    }
    patternCode = patternCode.slice(match.length);
  }

  return grid;
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map