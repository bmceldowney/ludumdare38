import _State from './_State';
import GameObjects from '../game_objects';
import DisplayObjects from '../display_objects';

export default class Gameplay extends _State {
  create () {
    this.attached = false;
    this.background = DisplayObjects.background(game)
    game.physics.startSystem(Phaser.Physics.P2JS); //Starting the p2 physics
    this.stage.backgroundColor = '#000000';
    game.physics.p2.restitution = 1;
    this.world.setBounds(0, 0, 480, 360);
    this.earth = DisplayObjects.earth(game, 460, 344)
    this.mars = DisplayObjects.mars(game, 20, 20)
    this.ThrowableObject = GameObjects.throwable(game, 400, 300); //Importing the ThrowableObject
    this.MouseObject = GameObjects.mouse(game, game.input.x, game.input.y);
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
    this.line = new Phaser.Line(this.MouseObject.body.x, this.MouseObject.body.y, this.ThrowableObject.body.x, this.ThrowableObject.body.y);


    this.add.existing(this.ThrowableObject);  //Adding the throwable object
    this.add.existing(this.MouseObject);

    game.input.onDown.add(this.click, this);
    game.input.addMoveCallback(this.move, this);
    game.input.onUp.add(this.release, this);
  }
  move(pointer, x, y, isDown) {
    if(!this.drawLine){
      this.MouseObject.body.x = x;
      this.MouseObject.body.y = y;
    }
    else {
      this.ThrowableObject.body.x = x;
      this.ThrowableObject.body.y = y;

    }
  }

  click(pointer) {
    var bodies = game.physics.p2.hitTest(pointer.position, [ this.ThrowableObject ]);

    if (bodies.length)
    {
        //  Attach to the first body the mouse hit
        this.mouseSpring = game.physics.p2.createSpring(this.MouseObject, bodies[0], 0, 15, 5);
        this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, this.ThrowableObject.body.x, this.ThrowableObject.body.y);
        this.drawLine = true;
        this.ThrowableObject.body.setZeroVelocity();


        /*this.ThrowableObject.ensableStatic();
        this.ThrowableObject.static = true;
        this.ThrowableObject.body.velocity[0] = 0;
        this.ThrowableObject.body.angularForce = 0;*/

    }
  }

  release() {
    //this.ThrowableObject.body.static = false;
    game.physics.p2.removeSpring(this.mouseSpring);
    this.drawLine = false;
    //this.ThrowableObject.body.static = false;
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.player.respawn(game.world.centerX, this.player.y);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.O)) {
      this.player.destroy();
    }
    if(this.drawLine){
      this.ThrowableObject.body.x = this.input.x;
      this.ThrowableObject.body.y = this.input.y;

    }

    if(this.ThrowableObject.body.x > 485 || this.ThrowableObject.body.x < -5 || this.ThrowableObject.body.y < -5 || this.ThrowableObject.body.y >365){
      this.object.destroy();
      this.add.existing(this.ThrowableObject);  //Adding the throwable object
    }


}

  preRender() {
    if (this.line)
    {
        this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, this.ThrowableObject.body.x, this.ThrowableObject.body.y);
    }
  }
  render() {
    if (this.drawLine)
    {
        game.debug.geom(this.line);
    }
  }


}
