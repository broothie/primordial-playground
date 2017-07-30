import Pair from './pair';
import Engine from './engine';
import EngineObject from './engine_object';

document.addEventListener('DOMContentLoaded', () => {
  new Engine({
    engineObjects: new Set([
      new EngineObject({ dragWithMouse: true, size: new Pair(30, 30) })
    ])
  }).start();
});
