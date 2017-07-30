export default class Pair {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    this.update();
  }

  update() {
    this.pair = [this.x, this.y];
  }

  distance(other) {
    return Math.sqrt(this.pair.map((thisDim, index) => (
      Math.pow(thisDim - other.pair[index])
    )).reduce((sum, value) => sum + value));
  }

  offset(other) {
    return new Pair(...this.pair.map((thisDim, index) => (
      thisDim + other.pair[index]
    )));
  }
}
