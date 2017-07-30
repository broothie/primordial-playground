import Pair from './pair';
import Triple from './triple';

export default class {
  constructor(game, options) {
    this.game = game;
    this.context = game.context;

    Object.assign(this, {
      position: new Triple,
      size: new Pair(1, 1),
      speed: 1,
      color: 'black',
      visible: true
    }, options);
  }

  register() {
    this.game.registerGameObject(this);
  }

  unregister() {
    this.game.unregisterGameObject(this);
  }

  update() {
    this.position.update();
    this.size.update();
  }

  draw() {
    if (!this.visible) return;
    this.context.fillStyle = this.color;
    this.context.fillRect(...this.position.xy, ...this.size.pair);
  }

  move(...offset) {
    this.position = this.position.offset(new Triple(...offset));
  }
}
