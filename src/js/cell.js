export default class {
  constructor(iface, options) {
    this.iface = iface;

    Object.assign(this, {
      x: 0,
      y: 0,
      size: 10,
      color: this.iface.dead,
      alive: false,
      neighbors: []
    }, options);

    this.willLive = false;
  }

  update() {
    const iface = this.iface;
    const aliveNeighbors = this.neighbors.filter(cell => cell.alive).length;

    this.alive = this.willLive;
    if (this.alive) {
      if (iface.lifeCounts.includes(aliveNeighbors)) {
        // Survive
        this.willLive = true;
        this.color = iface.alive;
      } else {
        // Die
        this.willLive = false;
        this.color = iface.dying;
      }
    } else {
      if (iface.birthCounts.includes(aliveNeighbors)) {
        // Birth
        this.willLive = true;
        this.color = iface.birth;
      } else {
        // Dead
        this.willLive = false;
        this.color = iface.dead;
      }
    }
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(
      this.x * this.size,
      this.y * this.size,
      this.size,
      this.size
    );
  }
}
