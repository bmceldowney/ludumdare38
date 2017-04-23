export default class MouseObject extends Phaser.Sprite {
  constructor(game, x, y, key){
    super(game, x, y, key);
    this.anchor.setTo(0.5, 1);

    game.physics.p2.enable(this, true);
    this.body.static = true;
    this.body.setCircle(9);
    this.body.data.shapes[0].sensor = true;
  }
}
