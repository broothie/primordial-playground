import Pair from './pair';
import EngineObject from './engine_object';

export default class {
  constructor(options) {
    this.options = Object.assign(this, {
      canvas: null,
      context: null,
      engineObjects: new Set,
      frameRate: 60,
      backgroundColor: 'White'
    }, options);

    this.setUpCanvas();
    this.setUpEngineActions();
    this.createActions();
    this.setUpInputEventHandling();
  }

  setUpCanvas() {
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
  }

  setUpEngineActions() {
    // Set up engine and object actions
    this.engineActions = [];
    this.objectActions = ['update', 'draw'];
    this.engineObjects.forEach(engineObject => { engineObject.engine = this; });
  }

  createActions() {
    // Action for updating framecount
    this.frameCount = 0;
    this.engineActions.push(() => {
      this.frameCount++;
    });

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
  }

  setUpInputEventHandling() {
    // this.setUpKeyEventManagement();
    this.setUpMouseDragging();
    this.setUpMouseTracking();
  }

  setUpKeyEventManagement() {
    this.downkeys = new Set;
    this.body.addEventListener('keydown', event => {
      this.downkeys.add(event.keyCode);
    });
    this.body.addEventListener('keyup', event => {
      this.downkeys.delete(event.keyCode);
    });
  }

  setUpMouseDragging() {
    const handleMouseMove = ({ clientX, clientY }) => {
      const mousePosition = new Pair(clientX, clientY);
      const mouseDelta = this.mouseDownPosition.delta(mousePosition);
      this.eachDragObject(mdo => {
        mdo.position = mdo.mouseDownPosition.offset(mouseDelta);
      });
    };

    this.body.addEventListener('mousedown', ({ clientX, clientY }) => {
      this.body.addEventListener('mousemove', handleMouseMove);
      this.mouseDownPosition = new Pair(clientX, clientY);
      this.eachDragObject(mdo => {
        mdo.mouseDownPosition = mdo.position;
      });
    });

    this.body.addEventListener('mouseup', ({ clientX, clientY }) => {
      this.body.removeEventListener('mousemove', handleMouseMove);
      this.mouseDownPosition = new Pair(clientX, clientY);
      this.mouseDelta = new Pair;
    });
  }

  setUpMouseTracking() {
    this.mousePosition = new Pair(0, 0);
    this.body.addEventListener('mousemove', ({ clientX, clientY }) => {
      this.mousePosition = new Pair(clientX, clientY);
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

  eachDragObject(callback) {
    this.mouseDragObjects().forEach(mdo => callback(mdo));
  }

  run(frameRate) {
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
