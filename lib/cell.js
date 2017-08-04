export default class {
  constructor(sim, options) {
    this.sim = sim;

    Object.assign(this, {
      x: 0,
      y: 0,
      size: 10,
      color: this.sim.iface.dead,
      alive: false,
      neighbors: []
    }, options);

    this.displayX = this.x * this.size;
    this.displayY = this.y * this.size;
  }

  step() {
    this.alive = this.willLive;
  }

  getAliveNeighbors() {
    this.aliveNeighbors = this.neighbors.filter(cell => cell.alive).length;
  }

  update(fromClick = false) {
    const iface = this.sim.iface;
    this.getAliveNeighbors();

    if (fromClick) {
      if (this.hovered) {
        this.alive = !this.alive;
      } else if (this.patternMapped) {
        this.alive = true;
      }
      this.neighbors.forEach(cell => cell.update(this.hovered));
    }

    if (this.alive) {
      if (iface.survivalCounts.includes(this.aliveNeighbors)) {
        // Survive
        this.willLive = true;
      } else {
        // Die
        this.willLive = false;
      }
    } else {
      if (iface.birthCounts.includes(this.aliveNeighbors)) {
        // Birth
        this.willLive = true;
      } else {
        // Dead
        this.willLive = false;
      }
    }
  }

  draw() {
    const { displayX, displayY, size, sim: { context, iface } } = this;

    if (this.alive) {
      if (this.willLive) {
        this.color = iface.alive;
      } else {
        this.color = iface.dying;
      }
    } else {
      if (this.willLive) {
        this.color = iface.emerging;
      } else {
        this.color = iface.dead;
      }
    }

    this.hovered = (
      (displayX <= iface.mouseX && iface.mouseX < displayX + size) &&
      (displayY <= iface.mouseY && iface.mouseY < displayY + size)
    );

    this.patternMapped = false;
    if (iface.currentPattern) {
      this.hovered = false;
      iface.currentPattern.forEach((row, rowIdx) => {
        row.forEach((cellStatus, colIdx) => {
          const patternOffsetX = iface.mouseX + (colIdx * size);
          const patternOffsetY = iface.mouseY + (rowIdx * size);
          if (
            (displayX <= patternOffsetX && patternOffsetX < displayX + size) &&
            (displayY <= patternOffsetY && patternOffsetY < displayY + size) &&
            cellStatus === 1
          ) {
            this.patternMapped = true;
          }
        });
      });
    }

    const highlighted = this.hovered || this.patternMapped;

    if (highlighted) {
      context.fillStyle = 'Black';
      context.fillRect(
        displayX,
        displayY,
        size,
        size
      );
    }

    context.fillStyle = this.color;
    context.fillRect(
      displayX + (highlighted ? 1 : 0),
      displayY + (highlighted ? 1 : 0),
      size - (highlighted ? 2 : 0),
      size - (highlighted ? 2 : 0)
    );
  }
}
