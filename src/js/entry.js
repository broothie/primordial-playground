import Game from './game';
import Character from './character';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.registerGameObject(new Character(game));
  game.start();
});
