import { patternParser, patterns } from './patterns';
import colors from './colors';

export default class {
  constructor(sim, options) {
    this.sim = sim;

    Object.assign(this, {
      survivalCounts: [2, 3],
      birthCounts: [3],
    }, options);

    this.body = document.getElementsByTagName('body')[0];
    this.controls = document.getElementsByClassName('controls')[0];
    this.form = document.getElementById('controls-form');

    // Initialize pattern holder to empty
    this.currentPattern = null;

    // Set color scheme randomly
    this.setColor(Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)]);

    // Update canvas size
    this.adjustWindowSize();
    this.body.addEventListener('resize', this.adjustWindowSize.bind(this));

    // Set up
    this.setUpMouseTracking();
    this.setUpPatterns();
    this.setUpRuleControls();
    this.setUpColorSchemes();
    this.setUpColorPickers();
    this.setUpStepRateSlider();
    this.setUpStepControls();
    this.setUpHud();

    // Set up opening modal
    const infoArticle = document.querySelector('.info > article');
    infoArticle.style.display = 'block';
    infoArticle.style.opacity = 1;
    infoArticle.style.width = '320px';

    const firstClickHandler = event => {
      infoArticle.style.display = null;
      infoArticle.style.opacity = null;
      infoArticle.style.width = null;
      document.removeEventListener('click', firstClickHandler);
    };
    document.addEventListener('click', firstClickHandler);
  }

  adjustWindowSize() {
    this.sim.canvas.width = window.innerWidth;
    this.sim.canvas.height = window.innerHeight;
  }

  setUpMouseTracking() {
    // Set up mouse position tracking
    this.sim.canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
      this.mouseX = clientX;
      this.mouseY = clientY;
    });

    // Set up click handler
    this.sim.canvas.addEventListener('click', () => {
      this.sim.update(true);

      // Clear pattern if there is one
      if (this.currentPattern) {
        this.clearPattern();
      }
    });

    // Set up right click handler
    this.sim.canvas.addEventListener('contextmenu', e => {
      e.preventDefault();

      // Rotate patter if there is one
      if (this.currentPattern) {
        this.currentPattern = this.currentPattern.rotate();
      }

      return false;
    }, false);
  }

  setUpPatterns() {
    // Remove current pattern with escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.clearPattern();
      }
    });

    // Set up patterns in controls menu
    const patternButtons = document.getElementById('pattern-buttons');
    for (let patternName in patterns) {
      // Create pattern button
      const patternButton = document.createElement('button');
      patternButton.innerText = patternName;

      // Add to list
      patternButtons.appendChild(patternButton);

      // Add event handler
      patternButton.addEventListener('click', event => {
        event.preventDefault();

        // Store pattern in pattern holder
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
    // Add event handler to each rule input box
    ['survival', 'birth'].forEach(ruleName => {
      const ruleControl = document.getElementById(ruleName + '-rule');
      ruleControl.addEventListener('input', event => {
        // Update rule neighbor counts
        const counts = event.target.value.split(',').map(el => parseInt(el));
        this[ruleName + 'Counts'] = counts;
      });
    });
  }

  setColor(schemeName) {
    // Color setting helper method
    const colorScheme = colors[schemeName];
    ['dead', 'emerging', 'dying', 'alive'].forEach((statusName, idx) => {
      // Set interface value to color scheme color
      this[statusName] = colorScheme[idx];
      const colorPicker = document.getElementById(statusName + '-color');
      colorPicker.value = colorScheme[idx];
    });
  }

  setUpColorSchemes() {
    const schemeList = document.querySelector('.color-schemes > ul');
    Object.keys(colors).forEach(colorScheme => {
      // Make and append new `li`
      const schemeLi = document.createElement('li');
      schemeList.appendChild(schemeLi);

      // Make and append `a` to `li`
      const schemeLink = document.createElement('a');
      schemeLi.appendChild(schemeLink);

      // Set link text and handler
      schemeLink.innerText = colorScheme;
      schemeLi.addEventListener('click', e => {
        this.setColor(colorScheme);
      });
    });
  }

  setUpColorPickers() {
    ['alive', 'dying', 'emerging', 'dead'].forEach(colorPickerName => {
      // Set color picker color
      const colorPicker = document.getElementById(colorPickerName + '-color');
      colorPicker.value = this[colorPickerName];

      // Add open handler to control how controls overlay appears during
      //  color picking
      colorPicker.addEventListener('click', () => {
        // Keep form up during color pick
        this.form.style.display = 'block';
        this.controls.style.opacity = 1;

        // Add focus handler, which removes itself after use
        const focusHandler = () => {
          this.form.style.display = null;
          this.controls.style.opacity = null;
          colorPicker.removeEventListener('focusin', focusHandler);
        };
        colorPicker.addEventListener('focusin', focusHandler.bind(this));
      });

      // Add color pick handler
      colorPicker.addEventListener('change', event => {
        this[colorPickerName] = event.target.value;
      });
    });
  }

  setUpStepRateSlider() {
    // Set step rate to reflect initial rate
    const stepRateSlider = document.getElementById('stepRateSlider');
    const stepRate = document.getElementById('stepRate');
    stepRateSlider.value = this.sim.stepRate;
    stepRate.innerText = this.sim.stepRate;

    // Add input handler
    stepRateSlider.addEventListener('input', event => {
      document.getElementById('stepRate').innerText = stepRateSlider.value;
      this.sim.stepRate = parseInt(stepRateSlider.value);
    });
  }

  setUpStepControls() {
    // Get each control
    ['pause', 'play', 'step', 'clear', 'seed'].forEach(buttonName => {
      this[buttonName + 'Button'] = document.getElementById(buttonName);
    });

    // Hide play and seed buttons initially, and disable step button
    ['play', 'seed'].forEach(buttonName => {
      this[buttonName + 'Button'].style.display = 'none';
    });
    this.stepButton.classList.add('button-disabled');

    // Run update on step
    const stepButtonClickHandler = () => {
      this.sim.update();
    };

    // Pause and change display on pause button click
    this.pauseButton.addEventListener('click', () => {
      this.sim.paused = true;
      this.pauseButton.style.display = 'none';
      this.playButton.style.display = 'block';
      this.stepButton.classList.remove('button-disabled');
      this.stepButton.addEventListener('click', stepButtonClickHandler);
    });

    // Play and change display on play butto click
    this.playButton.addEventListener('click', () => {
      this.sim.paused = false;
      this.playButton.style.display = 'none';
      this.pauseButton.style.display = 'block';
      this.stepButton.classList.add('button-disabled');
      this.stepButton.removeEventListener('click', stepButtonClickHandler);
    });

    // Clear grid on clear button click
    this.clearButton.addEventListener('click', () => {
      this.sim.generateGrid();
    });

    // Seed grid on seed button click
    this.seedButton.addEventListener('click', () => {
      this.sim.seed();
      this.sim.update();
    });
  }

  setUpHud() {
    // Get hud references
    this.populationCount = document.getElementById('population-count');
    this.generationCount = document.getElementById('generation-count');
  }

  draw() {
    // Update clear and seed buttons depending on population
    if (this.sim.population === 0) {
      this.clearButton.style.display = 'none';
      this.seedButton.style.display = 'block';
    } else {
      this.seedButton.style.display = 'none';
      this.clearButton.style.display = 'block';
    }

    // Update hud
    this.populationCount.innerText = this.sim.population;
    this.generationCount.innerText = this.sim.generation;
  }
}
