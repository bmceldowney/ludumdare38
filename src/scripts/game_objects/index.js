import Ship from './Ship'
import ThrowableObject from './ThrowableObject'
import MouseObject from './MouseObject'
import Alien from './Alien'
import Trash from './Trash'
import Throwables from './Throwables'
import Enemies from './Enemies'
import Mothership from './Mothership'

const PLAYER_SHIP = 'ship'
const CAR1 = 'car1'
const ALIEN = 'alienSpriteSheet'
const COW = 'spaceCow'
const EXPLOSION = 'explosion'
const FLING = 'fling';
const TRASH = 'trash';
const MOTHERSHIP = 'mothership'

module.exports = {
  load: function load (loader) {
    loader.load.spritesheet(PLAYER_SHIP, 'ship.png', 6, 6)
    loader.load.spritesheet(CAR1, 'car1.png', 16, 16)
    loader.load.spritesheet(ALIEN, 'alien.png', 16, 16)
    loader.load.spritesheet(COW, 'spaceCow.png', 16, 16)
    loader.load.spritesheet(FLING, 'fling.png', 16, 16);
    loader.load.spritesheet(TRASH, 'trash.png', 8, 8);
    loader.load.spritesheet(MOTHERSHIP, 'motherShip.png', 64, 64, 2);
    loader.load.physics('physicsData', 'mothership.json');
  },

  mothership: function mothership (game, x, y){
    return new Mothership(game, x, y, MOTHERSHIP)
  },

  player: function player (game, x, y) {
    return new Ship(game, x, y, PLAYER_SHIP);
  },

  car: function car (game, x, y){
    return new ThrowableObject(game, x, y, CAR1)
  },

  cow: function cow (game, x, y){
    return new ThrowableObject(game, x, y, COW)
  },

  mouse: function mouse (game, x, y){
    return new MouseObject(game, x, y, FLING);
  },

  alien: function alien (game, x, y) {
    return new Alien(game, x, y, ALIEN)
  },

  trash: function trash (game, x, y) {
    return new Trash(game, x, y, TRASH)
  },

  throwables: function throwables (game, x, y) {
    return new Throwables(game, x, y, [CAR1, COW])
  },

  enemies: function enemies (game, x, y) {
    return new Enemies(game, x, y, ALIEN)
  }
}
