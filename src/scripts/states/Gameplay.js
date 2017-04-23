import _State from './_State';
import GameObjects from '../game_objects';
import DisplayObjects from '../display_objects';

const RANGE = 175

export default class Gameplay extends _State {
  create () {
    this.attached = false;
    this.background = DisplayObjects.background(game)
    game.physics.startSystem(Phaser.Physics.P2JS); //Starting the p2 physics
    this.stage.backgroundColor = '#000000';
    game.physics.p2.restitution = 0.8;
    this.world.setBounds(0, 0, 480, 360);
    this.earth = DisplayObjects.earth(game, 460, 344)

    this.alien = GameObjects.alien(game, 100, 100)
    this.car = GameObjects.throwable(game, this.world.centerX - 50, this.world.centerY - 50)
    this.cow = GameObjects.cow(game, this.world.centerX + 50, this.world.centerY + 50)
    this.MouseObject = GameObjects.mouse(game, game.input.x, game.input.y)
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON)
    this.line = new Phaser.Line(this.MouseObject.body.x, this.MouseObject.body.y, this.car.body.x, this.car.body.y)

    this.alien.body.onBeginContact.add(this.alienHit, this.alien)

    this.add.existing(this.car);
    this.add.existing(this.cow);
    this.add.existing(this.MouseObject);
    this.add.existing(this.alien);


    game.input.onDown.addOnce(this.click, this);
    game.input.addMoveCallback(this.move, this);


    this.alien.onMove.add(this.checkRange, this)
    this.alien.onShoot.add(this.throwTrash, this)
  }

  checkRange () {
    const sourceX = this.alien.x
    const sourceY = this.alien.y
    const targetX = this.earth.x
    const targetY = this.earth.y

    const distance = Phaser.Math.distance(sourceX, sourceY, targetX, targetY)

    if (distance < RANGE) {
      this.alien.attack()
    }
  }

  throwTrash () {
    this.add.existing(new GameObjects.trash(game, this.alien.x, this.alien.y))

  }

  alienHit (collidedWith, alienBody) {
    this.destroy()
  }

  move (pointer, x, y, isDown) {
    if(!this.drawLine){
      this.MouseObject.body.x = x;
      this.MouseObject.body.y = y;
    }
    else {
      const rads = Phaser.Math.angleBetweenPoints(this.MouseObject.body, this.car.body)
      this.car.body.x = x;
      this.car.body.y = y;
      this.car.body.rotation = rads - 1.57
    }
  }

  click (pointer) {
    var bodies = game.physics.p2.hitTest(pointer.position, [ this.car ])

    if (bodies.length)
    {
      this.car.body.static = true
      this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, this.car.body.x, this.car.body.y)
      this.drawLine = true
      this.car.body.setZeroVelocity()
      this.game.input.onUp.addOnce(this.release, this)
    }
  }

  release () {
    const sourceX = this.car.body.x
    const sourceY = this.car.body.y
    const targetX = this.MouseObject.body.x
    const targetY = this.MouseObject.body.y

    const lineLength = Phaser.Math.distance(sourceX, sourceY, targetX, targetY)

    this.car.body.static = false
    this.car.body.thrust(lineLength * 100)
    this.drawLine = false
  }

  update () {
  }

  preRender () {
    if (this.line)
    {
        this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, this.car.body.x, this.car.body.y);
    }
  }

  render () {
    if (this.drawLine)
    {
        game.debug.geom(this.line);
    }
  }
}
