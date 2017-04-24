const DURATION = 100
const DISTANCE = 64
const MAX_IDLE_MOVES = 5

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
        this.game.time.events.loop(1500, () => {
            this.act()
        })

        this.init()
    }

    init () {
        this.inRange = false
        this.notAlive = false
        this.idleMoves = 0
        this.animations.play('idle')
    }

    update () {

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

    move () {
        const centerX = this.body.x
        const centerY = this.body.y
        let destination
        if (this.idleMoves > MAX_IDLE_MOVES) {
            destination = pointTowardsTarget(game, centerX, centerY)
        } else {
            destination = pointInBounds(game, centerX, centerY)
        }

        this.tween = this.game.add.tween(this.body)

        this.tween.onComplete.add(() => {
            this.onMove.dispatch()
            this.tween = null
        })

        this.tween.to({x: destination.x, y: destination.y}, DURATION, Phaser.Easing.Quadratic.Out, true)
        this.idleMoves++
    }

    splode () {
        const suffix = game.rnd.integerInRange(1, 3)

        this.game.sound.play(`explosion_${suffix}`, 0.5)
        if (this.tween) {
            this.tween.stop()
            this.tween = null
        }
        this.notAlive = true
        const anim = this.animations.play('splode', 10, false, true)
        anim.onComplete.addOnce(() => {
            this.kill()
        })
    }

    regen () {
        this.reset(100, 100, 100)
        this.init()
    }

    attack () {
        this.inRange = true
    }

    shoot () {
        this.game.sound.play('trash', 0.5)
        this.onShoot.dispatch()
    }
}

function pointTowardsTarget (game, centerX, centerY) {
    const angle = Phaser.Math.angleBetweenPoints({ x: centerX, y: centerY }, { x: 480, y: 360})
    const x = centerX + (DISTANCE * Math.cos(angle))
    const y = centerY + (DISTANCE * Math.sin(angle))

    return { x, y }
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

    return { x, y }
}
