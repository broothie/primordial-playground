export default class {
  constructor(sim, options) {
    this.sim = sim;

    Object.assign(this, {
      birthCounts: [3],
      lifeCounts: [2, 3],

      dead: '#2CB27A',
      birth: '#28CC87',
      dying: '#D14CFF',
      alive: '#8D23B2',
    }, options);


    this.setUpStepRateSlider();
    this.setUpStepControls();
    this.setUpHud();
  }

  setUpStepRateSlider() {
    this.stepRateSlider = document.getElementById('stepRateSlider');
    this.stepRateSlider.setAttribute('max', this.sim.loopRate);
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
