import Ship from './Ship';
import ThrowableObject from './ThrowableObject';
import MouseObject from './MouseObject';


const PLAYER_SHIP = 'ship';
const CAR1 = 'car1';

module.exports = {
  load: function load (loader) {
    loader.load.spritesheet(PLAYER_SHIP, 'ship.png', 6, 6);
    loader.load.spritesheet(CAR1, 'car1.png', 16, 16);
  },

  player: function player (game, x, y) {
    return new Ship(game, x, y, PLAYER_SHIP);
  },
  throwable: function throwable (game, x, y){
    return new ThrowableObject(game, x, y, CAR1);
  },
  mouse: function mouse (game, x, y){
    return new MouseObject(game, x, y, CAR1);
  }

};
