export default class Triple {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.update();
  }

  update() {
    this.triple = [this.x, this.y, this.x];
    this.xy = [this.x, this.y];
  }

  distance(other) {
    return Math.sqrt(this.triple.map((thisDim, index) => (
      Math.pow(thisDim - other.triple[index])
    )).reduce((sum, value) => sum + value));
  }

  offset(other) {
    return new Triple(...this.triple.map((thisDim, index) => (
      thisDim + other.triple[index]
    )));
  }
}
