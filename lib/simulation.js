import Interface from './interface';
import Cell from './cell';

export default class {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    Object.assign(this, {
      loopRate: 1000,
      stepRate: 12,
      frameRate: 60,

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
    const grid = [];
    for (let i = 0; i < this.height; i++) {
      const row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(new Cell(this, { x: j, y: i }));
      }
      grid.push(row);
    }

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
    this.cells = this.grid.flatten();

    this.generation = 0;
  }

  seed() {
    this.cells.forEach(cell => {
      cell.willLive = Math.random() < this.seedRatio;
    });
  }

  run() {
    this.loopCount = 0;
    this.frameCount = 0;

    this.loopId = setInterval(this.loop.bind(this), 1000 / this.loopRate);
  }

  loop() {
    const { loopCount, loopRate, stepRate, frameRate, paused } = this;

    if (loopCount % Math.floor(loopRate / stepRate) === 0) {
      if (!paused) this.update();
    }

    if (loopCount % Math.floor(loopRate / frameRate) === 0) {
      this.draw();
    }

    this.loopCount++;
  }

  update(fromClick = false) {
    if (!fromClick) this.cells.forEach(cell => cell.step());
    this.cells.forEach(cell => cell.getAliveNeighbors());
    this.cells.forEach(cell => cell.update(fromClick));
    if (!fromClick) this.generation++;
  }

  draw() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.population = 0;
    this.cells.forEach(cell => {
      cell.draw();
      if (cell.alive) this.population++;
    });

    this.iface.draw();

    this.frameCount++;
  }

  kill() {
    clearInterval(this.loopId);
  }
}
