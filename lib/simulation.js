import Interface from './interface';
import Cell from './cell';

export default class {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    Object.assign(this, {
      loopRate: 500,
      stepRate: 50,

      paused: false,

      seedRatio: 0.08,

      width: Math.ceil(window.innerWidth / 10),
      height: Math.ceil(window.innerHeight / 10),
    }, options);

    this.iface = new Interface(this);

    this.generateGrid();
    this.seed();
  }

  generateGrid() {
    // Fill grid with cells
    const grid = [];
    for (let i = 0; i < this.height; i++) {
      const row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(new Cell(this, { x: j, y: i }));
      }
      grid.push(row);
    }

    // Give cells references to neighbors
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            if (k === 0 && l === 0) continue;
            grid[i][j].neighbors.push(
              grid[(i + k).mod(this.height)][(j + l).mod(this.width)]
            );
          }
        }
      }
    }

    this.grid = grid;
    this.cells = this.grid.flatten();   // Cells is a 1d array of all the cells

    this.generation = 0;
  }

  seed() {
    this.cells.forEach(cell => {
      cell.willLive = Math.random() < this.seedRatio;
    });
  }

  run() {
    // Initialize loop for simulation update
    this.loopCount = 0;
    this.loopId = setInterval(this.loop.bind(this), 1000 / this.loopRate);

    // Start rendering
    requestAnimationFrame(this.draw.bind(this));
  }

  loop() {
    // Simulation loop
    const { loopCount, loopRate, stepRate, paused } = this;

    if (loopCount % Math.floor(loopRate / stepRate) === 0) {
      if (!paused) this.update();
    }

    this.loopCount++;
  }

  update(fromClick = false) {
    // Advance cell states
    if (!fromClick) {
      this.cells.forEach(cell => cell.step());
      this.generation++;
    }

    // Update cells
    this.population = 0;
    this.cells.forEach(cell => {
      cell.update(fromClick);
      if (cell.alive) this.population++;
    });
  }

  draw() {
    // Update cells and interface
    this.cells.forEach(cell => cell.draw());
    this.iface.draw();

    // Call next draw routine
    requestAnimationFrame(this.draw.bind(this));
  }

  kill() {
    clearInterval(this.loopId);
  }
}
