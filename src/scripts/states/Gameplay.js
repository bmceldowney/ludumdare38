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
    game.physics.p2.restitution = 1;
    this.world.setBounds(0, 0, 480, 360);
    this.earth = DisplayObjects.earth(game, 460, 344)

    this.alien = GameObjects.alien(game, 100, 100)
    this.car = GameObjects.throwable(game, this.world.centerX, this.world.centerY)
    this.cow = GameObjects.cow(game, this.world.centerX, this.world.centerY)
    this.MouseObject = GameObjects.mouse(game, game.input.x, game.input.y)
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON)
    this.line = new Phaser.Line(this.MouseObject.body.x, this.MouseObject.body.y, this.car.body.x, this.car.body.y)


    game.physics.p2.setImpactEvents(true);
    this.throwableCollisionGroup = game.physics.p2.createCollisionGroup();
    this.alienCollisionGroup = game.physics.p2.createCollisionGroup();

    this.alien.body.setCollisionGroup(this.alienCollisionGroup);
    this.alien.body.collides(this.throwableCollisionGroup, this.alienHit, this);

    this.cow.body.setCollisionGroup(this.throwableCollisionGroup);
    this.car.body.setCollisionGroup(this.throwableCollisionGroup);
    this.cow.body.collides(this.alienCollisionGroup);
    this.car.body.collides(this.throwableCollisionGroup);

    this.add.existing(this.car);  //Adding the throwable object
    this.add.existing(this.cow);  //Adding the throwable object
    this.add.existing(this.MouseObject);
    this.add.existing(this.alien);


    game.input.onDown.add(this.click, this);
    game.input.addMoveCallback(this.move, this);
    game.input.onUp.add(this.release, this);


    this.alien.onMove.add(() => {
      const sourceX = this.alien.x
      const sourceY = this.alien.y
      const targetX = this.earth.x
      const targetY = this.earth.y

      const distance = Phaser.Math.distance(sourceX, sourceY, targetX, targetY)

      if (distance < RANGE) {
        this.alien.attack()
      }
    })
  }

  alienHit () {
    this.alien.destroy()
  }

  move(pointer, x, y, isDown) {
    if(!this.drawLine){
      this.MouseObject.body.x = x;
      this.MouseObject.body.y = y;
    }
    else {
      this.car.body.x = x;
      this.car.body.y = y;
    }
  }

  click(pointer) {
    var bodies = game.physics.p2.hitTest(pointer.position, [ this.car ]);

    if (bodies.length)
    {
        //  Attach to the first body the mouse hit
        this.mouseSpring = game.physics.p2.createSpring(this.MouseObject, bodies[0], 0, 15, 5);
        this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, this.car.body.x, this.car.body.y);
        this.drawLine = true;
        this.car.body.setZeroVelocity();


        /*this.car.ensableStatic();
        this.car.static = true;
        this.car.body.velocity[0] = 0;
        this.car.body.angularForce = 0;*/

    }
  }

  release() {
    //this.car.body.static = false;
    game.physics.p2.removeSpring(this.mouseSpring);
    this.drawLine = false;
    //this.car.body.static = false;
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.player.respawn(game.world.centerX, this.player.y);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.O)) {
      this.player.destroy();
    }
    if(this.drawLine){
      this.car.body.x = this.input.x;
      this.car.body.y = this.input.y;

    }

    if(this.car.body.x > 485 || this.car.body.x < -5 || this.car.body.y < -5 || this.car.body.y >365){
      this.car.destroy();
      this.add.existing(this.car);  //Adding the throwable object
    }
  }

  preRender() {
    if (this.line)
    {
        this.line.setTo(this.MouseObject.body.x, this.MouseObject.body.y, this.car.body.x, this.car.body.y);
    }
  }

  render() {
    if (this.drawLine)
    {
        game.debug.geom(this.line);
    }
  }
}
