import Pair from './pair';
import Engine from './engine';
import mouseDragObject from './mouse_drag_object';

document.addEventListener('DOMContentLoaded', () => {
  new Engine({
    engineObjects: new Set([
      new mouseDragObject({ size: new Pair(30, 30) })
    ])
  }).start();
});
