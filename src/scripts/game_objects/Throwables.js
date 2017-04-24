import ThrowableObject from './ThrowableObject'

export default class Throwables extends Phaser.Group {
    constructor (game, x, y, childTypes) {
        super(game)
        this.childTypes = childTypes
        this.x = x
        this.y = y
    }

    spawn () {
        let child = this.getFirstDead()
        const typeIndex = game.rnd.integerInRange(0, this.childTypes.length - 1)

        if (!child) {
            child =  new ThrowableObject(this.game, 0, 0, this.childTypes[typeIndex])
            this.add(child)
        } else {
            child.reset()
        }

        return child
    }
}



// this.car = GameObjects.car(game, this.world.centerX + 100, this.world.centerY + 70)
// this.cow = GameObjects.cow(game, this.world.centerX + 150, this.world.centerY + 50)
