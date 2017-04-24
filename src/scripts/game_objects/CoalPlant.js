import ThrowableObject from './ThrowableObject'

export default class CoalPlant extends ThrowableObject {
    constructor (game, x, y) {
        super(game, x, y, 'coalPlant')

        this.animations.add('idle',  [0, 1, 2, 3, 4, 5, 6, 7, 8], 14, true)
        this.animations.play('idle')
    }

    ready () {
        super.ready()
        this.body.setRectangleFromSprite(this)
    }
}
