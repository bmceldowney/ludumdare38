import menuDefinition from './components/menu'
import gameOverDefinition from './components/gameOver'
import winDefinition from './components/win'
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
            EZGUI.components.menu_instructions_label_1.visible = false
            EZGUI.components.menu_instructions_label_2.visible = false
            EZGUI.components.menu_more_instructions.visible = false
        },

        show: function (cb) {
            EZGUI.components.menu.visible = true
            EZGUI.components.menu_button.on('click', () => {
                EZGUI.components.menu.visible = false
                cb()
            })

            EZGUI.components.menu_instructions.on('click', () => {
                EZGUI.components.menu_label.visible = false
                EZGUI.components.menu_instructions.visible = false
                EZGUI.components.menu_button.visible = false

                EZGUI.components.menu_instructions_label_1.visible = true
                EZGUI.components.menu_instructions_label_2.visible = false
                EZGUI.components.menu_more_instructions.visible = true
            })

            EZGUI.components.menu_more_instructions.on('click', () => {
                if (EZGUI.components.menu_instructions_label_1.visible) {
                    EZGUI.components.menu_instructions_label_1.visible = false
                    EZGUI.components.menu_instructions_label_2.visible = true
                } else {
                    EZGUI.components.menu_label.visible = true
                    EZGUI.components.menu_instructions.visible = true
                    EZGUI.components.menu_button.visible = true

                    EZGUI.components.menu_instructions_label_1.visible = false
                    EZGUI.components.menu_instructions_label_2.visible = false
                    EZGUI.components.menu_more_instructions.visible = false
                }
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
    },

    win: {
        create: function (game) {
            EZGUI.create(winDefinition, 'ui-theme')
            EZGUI.components.win.visible = false
            EZGUI.components.win_label_1.visible = false
            EZGUI.components.win_label_2.visible = false
            EZGUI.components.win_label_3.visible = false
        },

        show: function (successLevel, cb) {
            EZGUI.components.win.visible = true
            const key = `win_label_${successLevel}`
            EZGUI.components[key].visible = true

            EZGUI.components.win_button.on('click', () => {
                EZGUI.components.win.visible = false
                EZGUI.components[key].visible = false
                cb()
            })
        }
    },

}
