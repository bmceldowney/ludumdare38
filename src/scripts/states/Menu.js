import _State from './_State';
import DisplayObjects from '../display_objects';
import ui from '../ui'

export default class Menu extends _State {
  create () {
    this.stage.backgroundColor = '#AACCCC';
    this.stage.disableVisibilityChange = true;

    ui.menu.create(this)
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      ui.menu.clear()
      this.stateProvider.gameplay(this.state)
    }
  }
}
