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

    this.form = document.getElementById('controls-form');

    this.setUpMouseTracking();
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
    });
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

  setUpColorPickers() {
    ['alive', 'dying', 'emerging', 'dead'].forEach(colorPickerName => {
      const colorPicker = document.getElementById(colorPickerName + '-color');
      colorPicker.value = this[colorPickerName];
      colorPicker.addEventListener('click', () => {
        this.form.style.display = 'block';
        colorPicker.addEventListener('focusin', () => {
          this.form.style.display = null;
        });
      });

      colorPicker.addEventListener('change', event => {
        this[colorPickerName] = event.target.value;
      });
    });
  }

  setUpStepRateSlider() {
    this.stepRateSlider = document.getElementById('stepRateSlider');
    this.stepRateSlider.value = this.sim.stepRate;
    this.stepRateSlider.addEventListener('input', event => {
      document.getElementById('stepRate').innerText = this.stepRateSlider.value;
      this.sim.stepRate = parseInt(this.stepRateSlider.value);
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
