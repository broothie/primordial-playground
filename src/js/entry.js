import './patch';
import Pair from './engine/pair';
import Engine from './engine/engine';
import Grid from './grid';

document.addEventListener('DOMContentLoaded', () => {
  new Engine({ engineObjects: new Grid().asSet() }).run();
});
