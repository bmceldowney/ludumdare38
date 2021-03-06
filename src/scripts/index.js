import States from './states';

// 2x Gameboy resolution
const width = 480;
const height = 360;
const renderer = Phaser.AUTO;
const parent = 'content';
const defaultState = null;
const transparent = false;
const antialias = false;
const physicsConfig = null;
const game = new Phaser.Game(
  width,
  height,
  renderer,
  parent,
  defaultState,
  transparent,
  antialias,
  physicsConfig
);

States.loading(game.state);

global.game = game;
