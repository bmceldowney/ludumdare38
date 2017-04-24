import menuDefinition from './components/menu'
import gameOverDefinition from './components/gameOver'
import theme from '../../assets/ui/theme.json'
import DisplayObjects from '../display_objects';

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
            EZGUI.create(menuDefinition, 'ui-theme')
            EZGUI.components.menu.visible = false
        },

        show: function (cb) {
            EZGUI.components.menu.visible = true
            EZGUI.components.menu_button.on('click', () => {
                EZGUI.components.menu.visible = false
                cb()
            })
        }
    },

    gameOver: {
        create: function (game) {
            EZGUI.create(gameOverDefinition, 'ui-theme')
            EZGUI.components.gameOver.visible = false
        },

        show: function (cb) {
            EZGUI.components.gameOver.visible = true
            EZGUI.components.gameOver_button.on('click', () => {
                EZGUI.components.gameOver.visible = false
                cb()
            })
        }
    }
}
