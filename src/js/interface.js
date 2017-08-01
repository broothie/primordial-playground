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

    this.stepRateSlider = document.getElementById('stepRateSlider');
    this.stepRateSlider.value = this.sim.stepRate;
    this.stepRateSlider.addEventListener('input', event => {
      document.getElementById('stepRate').innerText = this.stepRateSlider.value;
      this.sim.stepRate = parseInt(this.stepRateSlider.value);
    });

    this.populationCount = document.getElementById('population-count');
    this.generationCount = document.getElementById('generation-count');
  }

  draw() {
    this.populationCount.innerText = this.sim.population;
    this.generationCount.innerText = this.sim.generation;
  }
}
