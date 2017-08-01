import './patch';
import Simulation from './simulation';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  document.getElementsByTagName('body')[0].appendChild(canvas);
  new Simulation(canvas).run();
});
