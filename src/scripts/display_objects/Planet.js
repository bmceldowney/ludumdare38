export default class Planet extends Phaser.Group {
    constructor (game, x, y, imageKey, sadImageKey, outlineKey) {
        super(game)

        this.health = 100
        this.planetGroup = new Phaser.Group(game)
        this.image = new Phaser.Image(game, 0, 0, imageKey)
        this.sadImage = new Phaser.Image(game, 0, 0, sadImageKey)
        this.outline = new Phaser.Sprite(game, 0, 0, outlineKey)
        this.onPolluted = new Phaser.Signal()
        this.x = x
        this.y = y

        this.planetGroup.anchor = new Phaser.Point(0.5, 0.5)
        this.image.anchor = new Phaser.Point(0.5, 0.5)
        this.sadImage.anchor = new Phaser.Point(0.5, 0.5)
        this.outline.anchor = new Phaser.Point(0.5, 0.5)

        this.planetGroup.add(this.sadImage)
        this.planetGroup.add(this.image)
        this.add(this.planetGroup)
        this.add(this.outline)

        this.startRotation()
    }

    startRotation () {
        this.game.time.events.loop(16, () => this.planetGroup.angle += 0.02)
    }

    doDamage (value) {
        this.health -= value
        this.image.alpha = Math.max(this.health / 100, 0)

        if (this.health < 1) {
            this.onPolluted.dispatch()
        }
    }
}
