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

    this.willLive = false;
  }

  update(clickUpdate = false) {
    const iface = this.sim.iface;
    const aliveNeighbors = this.neighbors.filter(cell => cell.alive).length;

    if(!clickUpdate) {
      this.alive = this.willLive;
    }

    if (this.alive) {
      if (iface.lifeCounts.includes(aliveNeighbors)) {
        // Survive
        this.willLive = true;
      } else {
        // Die
        this.willLive = false;
      }
    } else {
      if (iface.birthCounts.includes(aliveNeighbors)) {
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
        this.color = iface.birth;
      } else {
        this.color = iface.dead;
      }
    }

    this.hovered = (
      (displayX <= iface.mouseX && iface.mouseX < displayX + size) &&
      (displayY <= iface.mouseY && iface.mouseY < displayY + size)
    );

    if (this.hovered) {
      context.fillStyle = 'white';
      context.fillRect(
        displayX,
        displayY,
        size,
        size
      );
    }

    context.fillStyle = this.color;
    context.fillRect(
      displayX + (this.hovered ? 1 : 0),
      displayY + (this.hovered ? 1 : 0),
      size - (this.hovered ? 2 : 0),
      size - (this.hovered ? 2 : 0)
    );
  }
}
