export default class {
  constructor(sim, options) {
    this.sim = sim;

    Object.assign(this, {
      x: 0,
      y: 0,
      size: 10,
      status: 'dead',
      alive: false,
      neighbors: []
    }, options);

    this.displayX = this.x * this.size;
    this.displayY = this.y * this.size;
  }

  step() {
    this.alive = this.willLive;
  }

  update(fromClick = false) {
    const iface = this.sim.iface;
    const aliveNeighbors = this.neighbors.filter(cell => cell.alive).length;

    // Handle updating in the event of a manual toggle. Must update neighbors
    if (fromClick) {
      if (this.hovered) {
        this.alive = !this.alive;
      } else if (this.patternMapped) {
        this.alive = true;
      }
      this.neighbors.forEach(cell => cell.update(this.hovered));
    }

    // Determine next state
    if (this.alive) {
      if (iface.survivalCounts.includes(aliveNeighbors)) {
        // Survive
        this.willLive = true;
        this.status = 'alive';
      } else {
        // Die
        this.willLive = false;
        this.status = 'dying';
      }
    } else {
      if (iface.birthCounts.includes(aliveNeighbors)) {
        // Birth
        this.willLive = true;
        this.status = 'emerging';
      } else {
        // Dead
        this.willLive = false;
        this.status = 'dead';
      }
    }
  }

  draw() {
    const { displayX, displayY, size, sim: { context, iface } } = this;

    // Determine if hovered
    this.hovered = (
      (displayX <= iface.mouseX && iface.mouseX < displayX + size) &&
      (displayY <= iface.mouseY && iface.mouseY < displayY + size)
    );

    // Determine if under pattern blueprint
    this.patternMapped = false;
    if (iface.currentPattern) {
      // Takes priority over hovered
      this.hovered = false;

      // Loop through pattern
      iface.currentPattern.forEach((row, rowIdx) => {
        row.forEach((cellStatus, colIdx) => {

          // Find offset based on row and column indices
          const patternOffsetX = iface.mouseX + (colIdx * size);
          const patternOffsetY = iface.mouseY + (rowIdx * size);

          // If mouse offset within bounds of cell, highlight
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

    // Determine if highlighted
    const highlighted = this.hovered || this.patternMapped;

    // Draw outline if highlighted
    if (highlighted) {
      context.fillStyle = 'Black';
      context.fillRect(
        displayX,
        displayY,
        size,
        size
      );
    }

    // Draw cell
    context.fillStyle = iface[this.status];
    context.fillRect(
      displayX + (highlighted ? 1 : 0),
      displayY + (highlighted ? 1 : 0),
      size - (highlighted ? 2 : 0),
      size - (highlighted ? 2 : 0)
    );
  }
}
