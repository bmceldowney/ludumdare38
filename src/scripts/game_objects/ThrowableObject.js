export default class ThrowableObject extends Phaser.Sprite {
  constructor(game, x, y, key){
    super(game, x, y, key);
    this.anchor.setTo(0.5, 1);

    game.physics.p2.enable(this, false);
    this.body.setCircle(10);
  }
}
