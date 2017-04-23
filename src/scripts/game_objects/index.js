import Ship from './Ship'
import ThrowableObject from './ThrowableObject'
import MouseObject from './MouseObject'
import Alien from './Alien'

const PLAYER_SHIP = 'ship'
const CAR1 = 'car1'
const ALIEN = 'alienSpriteSheet'
const COW = 'spaceCow'
const EXPLOSION = 'explosion'
const FLING = 'fling';

module.exports = {
  load: function load (loader) {
    loader.load.spritesheet(PLAYER_SHIP, 'ship.png', 6, 6)
    loader.load.spritesheet(CAR1, 'car1.png', 16, 16)
    loader.load.spritesheet(ALIEN, 'alien.png', 16, 16)
    loader.load.spritesheet(COW, 'spaceCow.png', 16, 16)
    loader.load.spritesheet(FLING, 'fling.png', 16, 16);
  },

  player: function player (game, x, y) {
    return new Ship(game, x, y, PLAYER_SHIP);
  },

  throwable: function throwable (game, x, y){
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
  }
}
