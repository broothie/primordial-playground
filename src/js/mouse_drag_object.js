import EngineObject from './engine_object';
import Pair from './pair';

export default class extends EngineObject {
  constructor(options) {
    super(Object.assign({
      mouseDelta: new Pair,
    }, options));

    this.dragWithMouse = true;
    this.mouseDownPosition = this.position;
  }
}
