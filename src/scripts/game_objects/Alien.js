const DURATION = 100
const DISTANCE = 64

export default class Alien extends Phaser.Sprite {
    constructor (game, x, y, spritesheetKey) {
        super(game, x, y, spritesheetKey, 0)
        this.onMove = new Phaser.Signal()
        this.onShoot = new Phaser.Signal()

        game.physics.p2.enable(this, false)
        this.body.static = true
        this.body.setCircle(9)
        this.body.data.shapes[0].sensor = true
        this.animations.add('idle',  [0, 1, 2, 3], 6, true)
        this.animations.add('splode',  [4, 5, 7, 8, 10, 11], 10, false)
        this.animations.play('idle')
        this.inRange = false

        this.game.time.events.loop(1500, () => {
            this.act()
        })
    }

    act () {
        if (this.notAlive) {
            return
        }

        if (this.inRange) {
            this.shoot()
        } else {
            this.move()
        }
    }

    shoot () {

    }

    move () {
        const centerX = this.body.x
        const centerY = this.body.y
        const destination = pointInBounds(game, centerX, centerY)
        const tween = this.game.add.tween(this.body)

        tween.onComplete.add(() => {
            this.onMove.dispatch()
        })

        tween.to({x: destination.x, y: destination.y}, DURATION, Phaser.Easing.Quadratic.Out, true)
    }

    destroy () {
        this.notAlive = true
        this.animations.play('splode', 10, false, true)
    }

    regen () {
        this.reset(100, 100, 100)
    }

    attack () {
        this.inRange = true
    }

    shoot () {
        this.onShoot.dispatch()
    }
}

function pointInBounds (game, centerX, centerY) {
    let angle = game.rnd.integerInRange(1, 360)
    let x = centerX + (DISTANCE * Math.cos(angle))
    let y = centerY + (DISTANCE * Math.sin(angle))

    while (x < 20 || x > 460 || y < 20 || y > 340) {
        angle = game.rnd.integerInRange(1, 360)
        x = centerX + (DISTANCE * Math.cos(angle))
        y = centerY + (DISTANCE * Math.sin(angle))
    }

    return {
        x,
        y
    }
}
