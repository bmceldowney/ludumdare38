export default class Alien extends Phaser.Sprite {
    constructor (game, x, y, spritesheetKey) {
        super(game, x, y, spritesheetKey, 0)
        game.physics.p2.enable(this, false)
        this.body.static = true
        this.onFled = new Phaser.Signal()
        this.angerLevel = 0

        this.body.clearShapes()
        this.body.loadPolygon('physicsData', 'motherShip')
        this.animations.add('angerLevel_0', [0, 4], 9, true)
        this.animations.add('angerLevel_1', [1, 5], 9, true)
        this.animations.add('angerLevel_2', [2, 6], 9, true)
        this.animations.add('angerLevel_3', [3, 7], 9, true)

        this.animations.play(`angerLevel_${this.angerLevel}`)
    }

    anger () {
        this.angerLevel++
        this.animations.play(`angerLevel_${this.angerLevel}`)
    }

    flee () {
        const tween = this.game.add.tween(this.body)
        tween.to({x: -100, y: -100}, 2000, Phaser.Easing.Quadratic.Out, true)

        tween.onComplete.add(() => {
            this.onFled.dispatch()
        })
    }
}
