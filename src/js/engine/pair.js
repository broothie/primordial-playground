export default class Pair {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    this.update();
  }

  update() {
    this.pair = [this.x, this.y];
  }

  delta(other) {
    return new Pair(...this.pair.map((dim, idx) => other.pair[idx] - dim));
  }

  distance(other) {
    return Math.sqrt(this.delta(other).pair.reduce((sum, val) => sum + val));
  }

  offset(other) {
    return new Pair(...this.pair.map((dim, idx) => dim + other.pair[idx]));
  }

  withinCorners(corner1, corner2) {
    const [x1, x2] = [corner1.x, corner2.x].sort();
    const [y1, y2] = [corner1.y, corner2.y].sort();

    return (
      (x1 <= this.x && this.x < x2) &&
      (y1 <= this.y && this.y < y2)
    );
  }
}
