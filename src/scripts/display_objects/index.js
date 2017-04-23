import BitmapFont from './BitmapFont'
import ProgressBar from './ProgressBar'
import SpaceField from './SpaceField'
import Planet from './Planet'

const DISPLAY_FONT = 'Blocktopia_32pt'
const BODY_FONT = 'Blocktopia_12pt'
const PROGRESS_LEFT = 'progress_left'
const PROGRESS_MID = 'progress_mid'
const PROGRESS_RIGHT = 'progress_right'
const PROGRESS_RED_FILL = 'progress_red_fill'
const SPACE_1 = 'space_1'
const SPACE_2 = 'space_2'
const SPACE_3 = 'space_3'
const SPACE_4 = 'space_4'
const EARTH = 'earth'
const SAD_EARTH = 'sad_earth'
const PLANET_OUTLINE = 'planet_outline'

module.exports = {
  load: function load (loader) {
    const images = {}

    images[PROGRESS_LEFT] = '../../progress_left.png'
    images[PROGRESS_MID] = '../../progress_mid.png'
    images[PROGRESS_RIGHT] = '../../progress_right.png'
    images[PROGRESS_RED_FILL] = '../../progress_red_fill.png'
    images[SPACE_1] = '../../space_1.png'
    images[SPACE_2] = '../../dust.png'
    images[SPACE_3] = '../../space_3.png'
    images[SPACE_4] = '../../space_4.png'
    images[EARTH] = '../../world3.png'
    images[SAD_EARTH] = '../../world4.png'
    images[PLANET_OUTLINE] = '../../world_outline.png'

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
    return new ProgressBar(game, x, y, width, maxValue, initialValue, PROGRESS_LEFT, PROGRESS_MID, PROGRESS_RIGHT, PROGRESS_RED_FILL)
  },

  background: function background (game) {
    return new SpaceField(game, [SPACE_1, SPACE_2, SPACE_3, SPACE_4])
  },

  earth: function earth (game, x, y) {
    return new Planet(game, x, y, EARTH, SAD_EARTH, PLANET_OUTLINE)
  }
};
