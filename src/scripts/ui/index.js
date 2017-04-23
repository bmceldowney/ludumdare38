import menuDefinition from './components/menu'
import gameOverDefinition from './components/gameOver'
import theme from '../../assets/ui/theme.json'
import DisplayObjects from '../display_objects';

let menuScreen

export default {
    load: (game, callback) => {
        const uiAssets = theme.__config__.resources.filter(asset => asset.includes('.png'))

        uiAssets.forEach((asset) => {
            game.load.image(asset, `${asset}`)
        })

        game.load.onLoadComplete.add(() => {
            EZGUI.Compatibility.fixCache.call(game.load, uiAssets)

            EZGUI.Theme.load(['theme.json'], () => {
                callback()
            })
        })
    },

    menu: {
        create: function (game) {
            this.menuScreen = EZGUI.create(menuDefinition, 'ui-theme')
        },

        onStart: function (cb) {
            EZGUI.components.menu_button.on('click', () => {
                cb()
                this.menuScreen.destroy()
            })
        }
    },

    gameOver: {
        create: function (game) {
            this.gameOver = EZGUI.create(gameOverDefinition, 'ui-theme')
            this.gameOver.visible = false
        },

        show: function () {
            this.gameOver.visible = true
        },

        onStart: function (cb) {
            EZGUI.components.menu_button.on('click', () => {
                cb()
                this.gameOver.destroy()
            })
        }
    }
}
