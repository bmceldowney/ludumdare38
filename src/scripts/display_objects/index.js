import BitmapFont from './BitmapFont'
import ProgressBar from './ProgressBar'
import SpaceField from './SpaceField'
import Planet from './Planet'

const DISPLAY_FONT = 'Blocktopia_32pt'
const BODY_FONT = 'Blocktopia_12pt'

module.exports = {
  load: function load (loader) {
    const images = {
      progress_left: '../../progress_left.png',
      progress_mid: '../../progress_mid.png',
      progress_right: '../../progress_right.png',
      progress_red_fill: '../../progress_red_fill.png',
      space_background: '../../space1.png',
      earth: '../../world3.png',
      mars: '../../world4.png',
      planet_outline: '../../world_outline.png'
    }

    loader.load.bitmapFont(DISPLAY_FONT, 'Blocktopia_32pt.png', 'Blocktopia_32pt.fnt')
    loader.load.bitmapFont(BODY_FONT, 'Blocktopia_12pt.png', 'Blocktopia_12pt.fnt')
    loader.load.images(Object.keys(images), Object.values(images))
  },

  displayFont: function displayFont (game, text = '', x = 0, y = 0, align = 'left') {
    return new BitmapFont(game, x, y, DISPLAY_FONT, text, 32, align)
  },

  bodyFont: function bodyFont (game, text = '', x = 0, y = 0, align = 'left') {
    return new BitmapFont(game, x, y, BODY_FONT, text, 12, align)
  },

  healthBar: function healthBar (game, x, y, width, maxValue = 100, initialValue = 0) {
    return new ProgressBar(game, x, y, width, maxValue, initialValue, 'progress_left', 'progress_mid', 'progress_right', 'progress_red_fill')
  },

  background: function background (game) {
    return new SpaceField(game, ['space_background'])
  },

  earth: function earth (game, x, y) {
    return new Planet(game, x, y, 'earth', 'planet_outline')
  },

  mars: function mars (game, x, y) {
    return new Planet(game, x, y, 'mars', 'planet_outline')
  }
};
