import _State from './_State';
import DisplayObjects from '../display_objects';
import GameObjects from '../game_objects';
import ui from '../ui'
import Sounds from '../sounds';

export default class Loading extends _State {
  init () {
    // Pixel-perfect canvas scaling!
    // Thanks to http://www.belenalbeza.com/retro-crisp-pixel-art-in-phaser/
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    // Rounds x/y positions to the nearest whole to avoid sub-pixel rendering
    game.renderer.renderSession.roundPixels = true;

    // Sets browser-prefixed "image-rendering" CSS property on the game canvas
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);

    // Prevent these keys from being handled by the browser
    // when the game is in focus
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
  }

  preload () {
    Sounds.loadResources(this);
    DisplayObjects.load(this);
    GameObjects.load(this);

    ui.load(this.game, () => {
        this.stateProvider.menu(this.state);
        // this.stateProvider.gameplay(this.state);
    })

  }
}
