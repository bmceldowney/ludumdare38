import _State from './_State';
import ui from '../ui'
import DisplayObjects from '../display_objects';

export default class Menu extends _State {
  create () {
    this.background = DisplayObjects.background(game)    
    this.stage.disableVisibilityChange = true;

    ui.menu.create(this)
    ui.menu.onStart(() => {
      this.stateProvider.gameplay(this.state)
    })
  }
}
