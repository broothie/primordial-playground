import Pair from './engine/pair';
import MouseDragObject from './engine/mouse_drag_object';

export default class extends MouseDragObject {
  constructor(options) {
    super(Object.assign({
      grid: null,
      size: new Pair(10, 10),
      color: 'WhiteSmoke',
      alive: false
    }, options));

    this.willLive = this.alive;
  }

  getNeighbors() {
    const [x, y] = this.gridPosition.pair;
    this.neighbors = [];
    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        const cell = this.grid.getCell(x + i, y + j);
        if (!cell || cell === this) continue;
        this.neighbors.push(cell);
      }
    }
  }

  update() {
    if (this.engine.frameCount % (this.engine.frameRate / this.grid.stepRate) !== 0) {
      return;
    }

    const neighborCount = this.neighbors.filter(neighbor => (
      neighbor.alive
    )).length;

    this.alive = this.willLive;
    if (this.alive) {
      if ([2, 3].includes(neighborCount)) {
        this.color = 'Black';
        this.willLive = true;
      } else {
        this.color = 'Red';
        this.willLive = false;
      }
    } else {
      if (neighborCount === 3) {
        this.color = 'Green';
        this.willLive = true;
      } else {
        this.color = 'WhiteSmoke';
        this.willLive = false;
      }
    }

    super.update();
  }

  draw() {
    const context = this.engine.context;
    context.fillStyle = this.color;
    context.fillRect(...this.position.pair, ...this.size.pair);
  }
}