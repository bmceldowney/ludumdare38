import menuDefinition from './components/menu'

let menuScreen

export default {
    load: (game, callback) => {
        const uiAssets = [
            './bottom_left_border.png',
            './bottom_middle_border.png',
            './bottom_right_border.png',
            './middle_left_border.png',
            './middle_middle_border.png',
            './middle_right_border.png',
            './top_left_border.png',
            './top_middle_border.png',
            './top_right_border.png'
        ]

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
            game.time.events.loop(400, () => {
                const text = EZGUI.components.spacelabel
                text.visible = !text.visible
            })
        },

        clear: function () {
            this.menuScreen.destroy()
        }
    }
}
