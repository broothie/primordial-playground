import EngineObject from './engine_object';
import Pair from './pair';

export default class extends EngineObject {
  constructor(options) {
    super(Object.assign({}, options));

    this.dragWithMouse = true;
    this.mouseDownPosition = this.position;
  }
}
