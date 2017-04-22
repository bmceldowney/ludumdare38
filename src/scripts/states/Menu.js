import _State from './_State';
import ui from '../ui'

export default class Menu extends _State {
  create () {
    this.stage.backgroundColor = '#AACCCC';
    this.stage.disableVisibilityChange = true;

    ui.menu.create(this)
    ui.menu.onStart(() => {
      this.stateProvider.gameplay(this.state)
    })
  }
}
