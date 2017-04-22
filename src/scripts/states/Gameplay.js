import _State from './_State';
import GameObjects from '../game_objects';
import DisplayObjects from '../display_objects';

export default class Gameplay extends _State {
  create () {
    game.physics.startSystem(Phaser.Physics.P2JS); //Starting the p2 physics
    this.stage.backgroundColor = '#223344';
game.physics.p2.restitution = 0.8;    this.world.setBounds(0, 0, 320, 288);
    this.player = GameObjects.player(game, this.world.centerX, 60);
    this.ThrowableObject = GameObjects.throwable(game, this.world.centerx, this.world.centery); //Importing the ThrowableObject
    this.MouseObject = GameObjects.mouse(game, game.input.x, game.input.y);
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);


    this.add.existing(this.titleText());
    this.add.existing(this.player);
    this.add.existing(this.ThrowableObject);  //Adding the throwable object
    this.add.existing(this.MouseObject);
    game.input.addMoveCallback(this.move, this);

 }
 move(pointer, x, y, isDown) {
    console.log("X:" + this.MouseObject.x );
    console.log("Y:"+ this.MouseObject.y);
    this.MouseObject.x = x;
    this.MouseObject.y = y;
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
}
