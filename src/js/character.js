import Pair from './pair';
import GameObject from './game_object';

export default class extends GameObject {
  constructor(...args) {
    super(...args);

    this.color = 'blue';
    this.size = new Pair(20, 20);
  }

  update() {
    this.move(...[
      [87, [ 0, -1]],
      [65, [-1,  0]],
      [83, [ 0,  1]],
      [68, [ 1,  0]]
    ].filter(([key]) => (
      this.game.downkeys.has(key)
    )).map(([_, delta]) => delta).concat([[0, 0]]).reduce((deltaSum, delta) => (
      deltaSum.map((deltaEl, idx) => deltaEl + delta[idx])
    )).map(deltaEl => deltaEl * this.speed));

    super.update();
  }
}
