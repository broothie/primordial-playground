import patterns from './patterns';
import patternParser from './pattern_parser';
import colors from './colors';

export default class {
  constructor(sim, options) {
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

    this.setColor(Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)]);

    this.setUpMouseTracking();
    this.setUpPatterns();
    this.setUpColorSchemes();
    this.setUpColorPickers();
    this.setUpRuleControls();
    this.setUpStepRateSlider();
    this.setUpStepControls();
    this.setUpHud();
  }

  setUpMouseTracking() {
    this.sim.canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
      this.mouseX = clientX;
      this.mouseY = clientY;
    });

    this.sim.canvas.addEventListener('click', () => {
      this.sim.update(true);

      if (this.currentPattern) {
        this.clearPattern();
      }
    });

    this.sim.canvas.addEventListener('contextmenu', e => {
      e.preventDefault();

      if (this.currentPattern) {
        this.currentPattern = this.currentPattern.rotate();
      }

      return false;
    }, false);
  }

  setUpPatterns() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.clearPattern();
      }
    });

    for (let patternName in patterns) {
      const patternButtons = document.getElementById('pattern-buttons');
      const patternButton = document.createElement('button');
      patternButton.innerText = patternName;
      patternButtons.appendChild(patternButton);
      patternButton.addEventListener('click', event => {
        event.preventDefault();
        this.currentPattern = patternParser(patterns[patternName]);
        this.body.style.cursor = 'none';
      });
    }
  }

  clearPattern() {
    this.currentPattern = null;
    this.body.style.cursor = null;
  }

  setUpRuleControls() {
    ['survival', 'birth'].forEach(ruleName => {
      const ruleControl = document.getElementById(ruleName + '-rule');
      ruleControl.addEventListener('input', event => {
        ruleControl.style.border = '1px solid Gray';
        const value = event.target.value;
        try {
          const counts = value.split(',').map(el => parseInt(el));
          this[ruleName + 'Counts'] = counts;
        } catch (e) {
          ruleControl.style.border = '1px solid Red';
        }
      });
    });
  }

  setColor(schemeName) {
    ['dead', 'emerging', 'dying', 'alive'].forEach((statusName, idx) => {
      this[statusName] = colors[schemeName][idx];
      const colorPicker = document.getElementById(statusName + '-color');
      colorPicker.value = colors[schemeName][idx];
    });
  }

  setUpColorSchemes() {
    const schemeList = document.querySelector('.color-schemes > ul');
    Object.keys(colors).forEach(colorScheme => {
      const schemeLi = document.createElement('li');
      schemeList.appendChild(schemeLi);
      const schemeLink = document.createElement('a');
      schemeLi.appendChild(schemeLink);
      schemeLink.innerText = colorScheme;
      schemeLi.addEventListener('click', e => {
        this.setColor(colorScheme);
      });
    });
  }

  setUpColorPickers() {
    ['alive', 'dying', 'emerging', 'dead'].forEach(colorPickerName => {
      const colorPicker = document.getElementById(colorPickerName + '-color');
      colorPicker.value = this[colorPickerName];
      colorPicker.addEventListener('click', () => {
        this.form.style.display = 'block';
        this.controls.style.opacity = 1;
        colorPicker.addEventListener('focusin', () => {
          this.form.style.display = null;
          this.controls.style.opacity = null;
        });
      });

      colorPicker.addEventListener('change', event => {
        this[colorPickerName] = event.target.value;
      });
    });
  }

  setUpStepRateSlider() {
    const stepRateSlider = document.getElementById('stepRateSlider');
    stepRateSlider.value = this.sim.stepRate;
    stepRateSlider.addEventListener('input', event => {
      document.getElementById('stepRate').innerText = stepRateSlider.value;
      this.sim.stepRate = parseInt(stepRateSlider.value);
    });
  }

  setUpStepControls() {
    ['pause', 'play', 'step', 'clear', 'seed'].forEach(buttonName => {
      this[buttonName + 'Button'] = document.getElementById(buttonName);
    });

    ['play', 'seed'].forEach(buttonName => {
      this[buttonName + 'Button'].style.display = 'none';
    });

    this.stepButton.classList.add('button-disabled');

    const stepButtonClickHandler = () => {
      this.sim.update();
    };

    this.pauseButton.addEventListener('click', () => {
      this.sim.paused = true;
      this.pauseButton.style.display = 'none';
      this.playButton.style.display = 'block';
      this.stepButton.classList.remove('button-disabled');
      this.stepButton.addEventListener('click', stepButtonClickHandler);
    });

    this.playButton.addEventListener('click', () => {
      this.sim.paused = false;
      this.playButton.style.display = 'none';
      this.pauseButton.style.display = 'block';
      this.stepButton.classList.add('button-disabled');
      this.stepButton.removeEventListener('click', stepButtonClickHandler);
    });

    this.clearButton.addEventListener('click', () => {
      this.sim.generateGrid();
    });

    this.seedButton.addEventListener('click', () => {
      this.sim.seed();
      this.sim.update();
    });
  }

  setUpHud() {
    this.populationCount = document.getElementById('population-count');
    this.generationCount = document.getElementById('generation-count');
  }

  draw() {
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
}
