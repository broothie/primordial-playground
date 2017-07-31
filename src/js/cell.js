import Pair from './engine/pair';
import MouseDragObject from './engine/mouse_drag_object';
import EngineObject from './engine/engine_object';

export default class extends EngineObject {
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
    const { frameCount, frameRate, mousePosition } = this.engine;

    this.hovered = false;
    if (mousePosition.withinCorners(
      this.position,
      this.position.offset(this.size)
    )) {
      this.hovered = true;
    }

    if ((frameCount % Math.floor(frameRate / this.grid.stepRate)) !== 0) {
      return;
    }

    const neighborCount = this.neighbors.filter(neighbor => (
      neighbor.alive
    )).length;

    this.alive = this.willLive;
    if (this.alive) {
      if ([2, 3].includes(neighborCount)) {
        this.color = '#8D23B2';
        // this.color = '#2CB27A';
        // this.color = '#1DCC1B';
        this.willLive = true;
      } else {
        this.color = '#D14CFF';
        // this.color = '#28CC87';
        // this.color = '#FF573B';
        this.willLive = false;
      }
    } else {
      if (neighborCount === 3) {
        this.color = '#28CC87';
        // this.color = '#D14CFF';
        // this.color = '#7BFF9F';
        this.willLive = true;
      } else {
        this.color = '#2CB27A';
        // this.color = '#FFCF65';
        // this.color = '#CC681B';
        this.willLive = false;
      }
    }

    super.update();
  }

  draw() {
    const context = this.engine.context;

    context.fillStyle = this.color;
    context.fillRect(...this.position.pair, ...this.size.pair);

    if (this.hovered) {
      context.lineWidth = 1;
      context.strokeStyle = 'White';
      context.strokeRect(...this.position.pair, ...this.size.pair);
    }
  }
}
