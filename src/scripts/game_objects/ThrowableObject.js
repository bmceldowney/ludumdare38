export default class ThrowableObject extends Phaser.Sprite {
  constructor(game, x, y, key){
    super(game, x, y, key)
    this.anchor.setTo(0.5, 0.5)

    game.physics.p2.enable(this, false)
  }

  ready () {
      this.body.collideWorldBounds = false

      this.body.setCircle(10)
      this.body.static = false
  }
}
