import _State from './_State';
import GameObjects from '../game_objects';
import DisplayObjects from '../display_objects';

export default class Gameplay extends _State {
  create () {
    game.physics.startSystem(Phaser.Physics.P2JS); //Starting the p2 physics
    this.stage.backgroundColor = '#223344';
    this.world.setBounds(0, 0, 320, 288);
    this.player = GameObjects.player(game, this.world.centerX, 60);
    this.ThrowableObject = GameObjects.throwable(game, this.world.centerx, this.world.centery); //Importing the ThrowableObject
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);


    this.add.existing(this.titleText());
    this.add.existing(this.player);
    this.add.existing(this.ThrowableObject);  //Adding the throwable object
    console.log(this.ThrowableObject);
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
