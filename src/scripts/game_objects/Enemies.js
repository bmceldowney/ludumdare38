import Alien from './Alien'

export default class Enemies extends Phaser.Group {
    constructor (game, spriteKey) {
        super(game, null, 'group', false, true, Phaser.Physics.P2JS)
        this.spriteKey = spriteKey
        this.maxCount = 3
    }

    spawn () {
        let child = this.getFirstDead()

        if (!child) {
            if (this.length < this.maxCount) {
                child =  new Alien(this.game, 0, 0, this.spriteKey)
                this.add(child)
            }
        } else {
            child.reset()
            child.body.x = 100
            child.body.y = 100
        }

        return child
    }
}



// this.car = GameObjects.car(game, this.world.centerX + 100, this.world.centerY + 70)
// this.cow = GameObjects.cow(game, this.world.centerX + 150, this.world.centerY + 50)
