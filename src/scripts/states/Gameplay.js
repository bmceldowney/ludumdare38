import _State from './_State';
import GameObjects from '../game_objects';
import DisplayObjects from '../display_objects';
import ui from '../ui'

const ALIEN_RANGE = 200

export default class Gameplay extends _State {
  create () {
    ui.gameOver.create(this)
    this.attached = false;
    this.background = DisplayObjects.background(game)
    this.stage.backgroundColor = '#000000';

    game.physics.startSystem(Phaser.Physics.P2JS); //Starting the p2 physics
    game.physics.p2.setBoundsToWorld(false, false, false, false, false);
    game.physics.p2.restitution = 0.8;

    this.world.setBounds(0, 0, 480, 360);
    this.earth = DisplayObjects.earth(game, 380, 264)
    this.throwables = GameObjects.throwables(game, this.earth.x, this.earth.y)
    this.enemies = GameObjects.enemies(game, 100, 100)

    this.motherShip = GameObjects.mothership(game, 50, 50);
    this.MouseObject = GameObjects.mouse(game, game.input.x, game.input.y)

    this.stagingPoints = [
      new Phaser.Point(50, 50),
      new Phaser.Point(70, 0),
      new Phaser.Point(0, 70)
    ]

    this.stagingIndicies = 0

    this.line = new Phaser.Line()
    this.draggingBody = null;

    this.add.existing(this.motherShip);
    this.add.existing(this.MouseObject);

    game.input.onDown.add(this.click, this);
    game.input.addMoveCallback(this.move, this);

    this.earth.onPolluted.addOnce(this.loseGame, this)

    this.spawnNewAlien()
    this.game.time.events.loop(1500, () => {
        this.spawnNewThrowable()
        this.spawnNewAlien()
    })
  }

  spawnNewThrowable () {
    const throwable = this.throwables.spawn()
    if (throwable) {
      if (throwable.stagingIndex === undefined) {
        throwable.stagingIndex = this.stagingIndicies
        this.stagingIndicies++
      }
      throwable.body.static = true
      throwable.body.x -= this.stagingPoints[throwable.stagingIndex].x
      throwable.body.y -= this.stagingPoints[throwable.stagingIndex].y
      throwable.rotation = 0
      throwable.body.static = false
    }
  }

  spawnNewAlien () {
    const enemy = this.enemies.spawn()
    if (enemy) {
      enemy.body.x = 100
      enemy.body.y = 100
      enemy.onMove.add(this.checkRange, this, 0, enemy)
      enemy.onShoot.add(this.throwTrash, this, 0, enemy)
      enemy.body.onBeginContact.add(this.alienHit, enemy)
    }
  }

  loseGame () {
    ui.gameOver.show()
    ui.gameOver.onStart(() => {
      this.stateProvider.gameplay(this.state)
    })
  }

  checkRange (enemy) {
    const sourceX = enemy.x
    const sourceY = enemy.y
    const targetX = this.earth.x
    const targetY = this.earth.y

    const distance = Phaser.Math.distance(sourceX, sourceY, targetX, targetY)

    if (distance < ALIEN_RANGE) {
      enemy.attack()
    }
  }

  throwTrash (enemy) {
    const trash = new GameObjects.trash(game, enemy.body.x, enemy.body.y)
    this.add.existing(trash)
    const tween = this.game.add.tween(trash)
    tween.to({x: this.earth.x, y: this.earth.y}, 1000, Phaser.Easing.Quadratic.Out, true)

    tween.onComplete.add(() => {
        trash.destroy()
        this.earth.doDamage(5)
        console.log(this.earth.health)
    })
  }

  alienHit (collidedWith, alienBody) {
    this.onMove.removeAll()
    this.onShoot.removeAll()
    this.splode()
    collidedWith.sprite.kill()
  }

  move (pointer, x, y, isDown) {
    if(!this.drawLine){
      this.MouseObject.body.x = x;
      this.MouseObject.body.y = y;
    } else {
      const rads = Phaser.Math.angleBetweenPoints(this.MouseObject.body, this.draggingBody)
      this.draggingBody.x = x;
      this.draggingBody.y = y;
      this.draggingBody.rotation = rads - 1.57
    }
  }

  click (pointer) {
    var bodies = game.physics.p2.hitTest(pointer.position, this.throwables.children)

    if (bodies.length) {
      const body = bodies[0].parent
      body.static = true
      this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, body.x, body.y)
      this.drawLine = true
      body.setZeroVelocity()
      this.draggingBody = body
      this.game.input.onUp.addOnce(this.release, this)
    }
  }

  release () {
    const sourceX = this.draggingBody.x
    const sourceY = this.draggingBody.y
    const targetX = this.MouseObject.body.x
    const targetY = this.MouseObject.body.y

    const lineLength = Phaser.Math.distance(sourceX, sourceY, targetX, targetY)

    this.draggingBody.static = false
    this.draggingBody.thrust(lineLength * 400)
    this.drawLine = false
    this.draggingBody = null
  }

  update () {
    this.throwables.forEach(throwable => {
      if (!this.world.bounds.contains(throwable.body.x, throwable.body.y)) {
        throwable.kill()
      }
    })
  }

  preRender () {
    if (this.line && this.draggingBody)
    {
        this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, this.draggingBody.x, this.draggingBody.y);
    }
  }

  render () {
    if (this.drawLine)
    {
        game.debug.geom(this.line);
    }
  }
}
