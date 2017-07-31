import Pair from './engine/pair';
import Cell from './cell';

export default class {
  constructor(options) {
    Object.assign(this, {
      grid: null,
      dimensions: new Pair(150, 150),
      cellSize: 10,
      borderSize: 0,
      seedWeight: 0.1,
      stepRate: 30
    }, options);

    if (!this.grid) {
      this.generateGrid();
      this.grid.forEach(row => {
        row.forEach(cell => cell.getNeighbors());
      });
    }
  }

  generateGrid() {
    const [x, y] = this.dimensions.pair;
    this.grid = [];
    for (let j = 0; j < y; j++) {
      const row = [];
      for (let i = 0; i < x; i++) {
        row.push(new Cell({
          grid: this,
          gridPosition: new Pair(i, j),
          size: new Pair(this.cellSize, this.cellSize),
          position: new Pair(
            i * (this.cellSize + this.borderSize),
            j * (this.cellSize + this.borderSize)
          ),
          alive: Math.random() < this.seedWeight
        }));
      }
      this.grid.push(row);
    }
  }

  flatten() {
    const flattened = [];
    this.grid.forEach(row => {
      row.forEach(cell => flattened.push(cell));
    });
    return flattened;
  }

  asSet() {
    return new Set(this.flatten());
  }

  getCell(x, y) {
    if (!(0 <= x && x < this.dimensions.x)) {
      x = x.mod(this.dimensions.x);
    }

    if (!(0 <= y && y < this.dimensions.y)) {
      y = y.mod(this.dimensions.y);
    }
    return this.grid[y][x];
  }
}
