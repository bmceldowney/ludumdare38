import _State from './_State';
import GameObjects from '../game_objects';
import DisplayObjects from '../display_objects';

export default class Gameplay extends _State {
  create () {
    game.physics.startSystem(Phaser.Physics.P2JS); //Starting the p2 physics
    this.stage.backgroundColor = '#223344';
    game.physics.p2.restitution = 0.8;
    this.world.setBounds(0, 0, 320, 288);
    this.player = GameObjects.player(game, this.world.centerX, 60);
    this.drawLine = false;
    this.ThrowableObject = GameObjects.throwable(game, this.world.centerx, this.world.centery); //Importing the ThrowableObject
    this.MouseObject = GameObjects.mouse(game, game.input.x, game.input.y);
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
    this.line = new Phaser.Line(this.MouseObject.body.x, this.MouseObject.body.y, this.ThrowableObject.body.x, this.ThrowableObject.body.y);


    this.add.existing(this.titleText());
    this.add.existing(this.player);
    this.add.existing(this.ThrowableObject);  //Adding the throwable object
    this.add.existing(this.MouseObject);
    //this.MouseObject = static;
    game.input.onDown.add(this.click, this);
    game.input.addMoveCallback(this.move, this);
    game.input.onUp.add(this.release, this);
 }
 move(pointer, x, y, isDown) {
    this.MouseObject.body.x = x;
    this.MouseObject.body.y = y;
    //this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, this.ThrowableObject.body.x, this.ThrowableObject.body.y)
    //this.drawLine = true;
  }

  click(pointer) {

    var bodies = game.physics.p2.hitTest(pointer.position, [ this.ThrowableObject ]);

    if (bodies.length)
    {
        //  Attach to the first body the mouse hit
        this.mouseSpring = game.physics.p2.createSpring(this.MouseObject, bodies[0], 0, 10, 5);
        this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, this.ThrowableObject.body.x, this.ThrowableObject.body.y);
        //line.setTo(cow.x, cow.y, mouseBody.x, mouseBody.y);
        this.drawLine = true;
    }

}
  release() {

    game.physics.p2.removeSpring(this.mouseSpring);
    this.drawLine = false;
  }

  titleText () {
    return DisplayObjects.displayFont(game, 'THIS IS THE GAME', this.world.centerX, 40, 'center');
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.player.respawn(game.world.centerX, this.player.y);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.O)) {
      this.player.destroy();
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.player.bankLeft();
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.player.bankRight();
    } else {
      this.player.normal();
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
