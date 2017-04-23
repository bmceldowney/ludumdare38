export default class ThrowableObject extends Phaser.Sprite {
  constructor(game, x, y, key){
    super(game, x, y, key);
    // this.anchor.setTo(0.5, 0.5);
    //this.ThrowableObject.body.velocity[0] = 0;
    game.physics.p2.enable(this, true);
    this.body.collideWorldBounds = false;

    //this.body.static = true;
    this.body.setCircle(10);
  }

  enableStatic(){
    this.body.static = true;
  }
  disableStatic(){
    this.body.static = false;
  }
}
