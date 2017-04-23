export default class Planet extends Phaser.Group {
    constructor (game, x, y, imageKey, outlineKey) {
        super(game)

        this.image = new Phaser.Image(game, x, y, imageKey)
        this.outline = new Phaser.Image(game, x, y, outlineKey)
        this.image.anchor = new Phaser.Point(0.5, 0.5)
        this.outline.anchor = new Phaser.Point(0.5, 0.5)

        this.add(this.image)
        this.add(this.outline)

        this.rotate()
    }

    rotate () {
        this.game.time.events.loop(16, () => this.image.angle += 0.02)
    }
}
