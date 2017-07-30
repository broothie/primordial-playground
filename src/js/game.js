import GameObject from './game_object';

export default class {
  constructor(options) {
    this.options = Object.assign(this, {
      canvas: null,
      context: null,
      frameRate: 60,
      backgroundColor: 'white'
    }, options);

    // Get body reference
    this.body = document.getElementsByTagName('body')[0];

    // Get or create canvas
    if (!this.canvas) {
      this.canvas = document.getElementsByTagName('canvas')[0];
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
      }
      this.body.appendChild(this.canvas);
    }

    if (!this.context) {
      this.context = this.canvas.getContext('2d');
    }

    // Set focus to canvas
    this.canvas.focus();

    // Set up game and object actions
    this.game_actions = [];
    this.objects = new Set;
    this.object_actions = ['update', 'draw'];

    // Action for keeping track of viewport size
    this.game_actions.push(() => {
      this.width = innerWidth;
      this.height = innerHeight;
    });

    this.game_actions.push(() => {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    });

    // Action for clearing background
    this.game_actions.push(() => {
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.width, this.height);
    });

    // Set up key status tracking
    this.downkeys = new Set;
    this.body.addEventListener('keydown', event => {
      this.downkeys.add(event.keyCode);
    });
    this.body.addEventListener('keyup', event => {
      this.downkeys.delete(event.keyCode);
    });
  }

  registerGameObject(go) {
    this.objects.add(go);
  }

  unregisterGameObject(go) {
    this.object.delete(go);
  }

  dispatchGameActions() {
    this.game_actions.forEach(action => action());
  }

  dispatchObjectActions() {
    this.object_actions.forEach(action => {
      this.objects.forEach(object => object[action]());
    });
  }

  start(frameRate) {
    this.loop = setInterval(() => {
      this.dispatchGameActions();
      this.dispatchObjectActions();
    }, 1000 / (frameRate || this.frameRate));
  }

  pause() {
    this.object_actions.pop();
  }

  unpause() {
    this.object_actions.push('draw');
  }
}
