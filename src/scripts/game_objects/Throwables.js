import ThrowableObject from './ThrowableObject'

export default class Throwables extends Phaser.Group {
    constructor (game, x, y, childTypes) {
        super(game)
        this.childTypes = childTypes
        this.childX = x
        this.childY = y
        this.maxCount = 3
    }

    spawn () {
        let child = this.getFirstDead()
        const typeIndex = game.rnd.integerInRange(0, this.childTypes.length - 1)

        if (!child) {
            if (this.length < this.maxCount) {
                child =  new ThrowableObject(this.game, this.childX, this.childY, this.childTypes[typeIndex])
                this.add(child)
            }
        } else {
            child.reset()
            child.body.x = this.childX
            child.body.y = this.childY
        }

        return child
    }
}
