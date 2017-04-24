import Alien from './Alien'

export default class Enemies extends Phaser.Group {
    constructor (game, x, y, spriteKey) {
        super(game)
        this.spriteKey = spriteKey
        this.childX = x
        this.childY = y
        this.maxCount = 3
    }

    spawn () {
        let child = this.getFirstDead()

        if (!child) {
            if (this.length < this.maxCount) {
                child =  new Alien(this.game, this.childX, this.childY, this.spriteKey)
                this.add(child)
            }
        } else {
            child.regen()
        }

        return child
    }
}
