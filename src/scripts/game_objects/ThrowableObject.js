export default class ThrowableObject extends Phaser.Sprite {
  constructor(game, x, y, key){
    super(game, x, y, key);
    game.physics.p2.enable(this, false);
    this.body.collideWorldBounds = false;

    this.body.setCircle(10);
  }

  enableStatic(){
    this.body.static = true;
  }
  disableStatic(){
    this.body.static = false;
  }
}
