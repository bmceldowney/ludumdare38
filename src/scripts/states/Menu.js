import _State from './_State'
import ui from '../ui'
import DisplayObjects from '../display_objects'
import Sounds from '../sounds'

export default class Menu extends _State {
  create () {
    this.background = DisplayObjects.background(game)
    this.stage.disableVisibilityChange = true

    Sounds.init()
    Sounds.playMusic('menuSong', 0.5)

    ui.menu.create(this)
    ui.menu.show(() => {
      this.stateProvider.gameplay(this.state)
    })
  }
}
