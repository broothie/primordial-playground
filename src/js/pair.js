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
}
