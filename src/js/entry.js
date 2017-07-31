import Pair from './engine/pair';
import Engine from './engine/engine';
import Grid from './grid';

document.addEventListener('DOMContentLoaded', () => {
  new Engine({
    engineObjects: new Set((new Grid({
      dimensions: new Pair(100, 100),
      seedWeight: 0.05,
      stepRate: 12
    })).flatten())
  }).start();
});
