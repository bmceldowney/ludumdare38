export default class SpaceField extends Phaser.Group {
    constructor (game, imageKeys) {
        super(game)
        const count = imageKeys.length

        imageKeys.forEach((key, index) => {
            let velocity = ((index + 1) / count) * 25
            if (index < 2) {
                velocity = 15
            }
            const sprite = new Phaser.TileSprite(game, 0, 0, 480, 360, key)
            this.add(sprite)
            sprite.autoScroll(velocity, 0)
        })
    }
}
