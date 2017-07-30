import Pair from './pair';

export default class {
  constructor(options) {
    Object.assign(this, {
      engine: null,
      position: new Pair,
      size: new Pair(1, 1),
      speed: 0,
      color: 'black',
      visible: true,
      dragWithMouse: false
    }, options);
  }

  register(engine) {
    (engine || this.engine).registerEngineObject(this);
  }

  unregister(engine) {
    (engine || this.engine).unregisterEngineObject(this);
  }

  update() {
    if (this.dragWithMouse) {
      this.move(this.engine.mouseDelta);
    }

    this.position.update();
    this.size.update();
  }

  draw() {
    if (!this.visible) return;

    const context = this.engine.context;
    context.fillStyle = this.color;
    context.fillRect(...this.position.pair, ...this.size.pair);
  }

  move(offset) {
    this.position = this.position.offset(offset);
  }
}
