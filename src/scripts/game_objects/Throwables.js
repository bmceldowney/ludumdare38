import ThrowableObject from './ThrowableObject'
import CoalPlant from './CoalPlant'

export default class Throwables extends Phaser.Group {
    constructor (game, x, y, childTypes) {
        super(game)
        this.childTypes = childTypes
        this.childX = x
        this.childY = y
        this.maxCount = 3
        this.index = 0
    }

    spawn () {
        let child = this.getFirstDead()

        if (!child) {
            if (this.length < this.maxCount) {
                if (this.index === 0) {
                    child =  new CoalPlant(this.game, this.childX, this.childY)
                } else {
                    child =  new ThrowableObject(this.game, this.childX, this.childY, this.childTypes[this.index])
                }
                this.add(child)
                child.index = this.index
                this.index++
            }
        } else {
            child.reset(this.childX, this.childY)
            child.body.static = true
        }

        return child
    }
}
