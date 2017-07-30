import Pair from './pair';
import EngineObject from './engine_object';

export default class {
  constructor(options) {
    this.options = Object.assign(this, {
      canvas: null,
      context: null,
      engineObjects: new Set,
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

    // Create context
    if (!this.context) {
      this.context = this.canvas.getContext('2d');
    }

    // Set focus to canvas
    this.canvas.focus();

    // Set up engine and object actions
    this.engineActions = [];
    this.objectActions = ['update', 'draw'];

    this.engineObjects.forEach(engineObject => { engineObject.engine = this; });

    // Action for keeping track of viewport size
    this.engineActions.push(() => {
      this.width = innerWidth;
      this.height = innerHeight;
    });

    // Action for updating canvas to fill viewport
    this.engineActions.push(() => {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    });

    // Action for clearing background
    this.engineActions.push(() => {
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

    // Set up mouse status tracking
    this.mouseDelta = new Pair;
    const handleMouseMove = ({ clientX, clientY }) => {
      this.mouseLocation = new Pair(clientX, clientY);
      this.mouseDelta = this.mouseDownLocation.delta(this.mouseLocation);
    };
    this.body.addEventListener('mousedown', ({ clientX, clientY}) => {
      this.body.addEventListener('mousemove', handleMouseMove);
      this.mouseDownLocation = new Pair(clientX, clientY);
    });
    this.body.addEventListener('mouseup', event => {
      this.body.removeEventListener('mousemove', handleMouseMove);
      this.mouseDownLocation = null;
      this.mouseDelta = new Pair;
    });
  }

  registerEngineObject(engineObject) {
    this.engineObjects.add(engineObject);
  }

  unregisterEngineObject(engineObject) {
    this.engineObjects.delete(engineObject);
  }

  dispatchEngineActions() {
    this.engineActions.forEach(action => action());
  }

  dispatchObjectActions() {
    this.objectActions.forEach(action => {
      this.engineObjects.forEach(engineObject => engineObject[action]());
    });
  }

  mouseDragObjects() {
    return Array.from(this.engineObjects).filter(engineObject => (
      engineObject.dragWithMouse
    ));
  }

  start(frameRate) {
    this.loop = setInterval(() => {
      this.dispatchEngineActions();
      this.dispatchObjectActions();
    }, 1000 / (frameRate || this.frameRate));
  }

  pause() {
    this.objectActions.shift();
  }

  unpause() {
    this.objectActions.unshift('update');
  }
}
