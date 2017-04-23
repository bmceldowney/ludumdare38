export default class SpaceField extends Phaser.Group {
    constructor (game, imageKeys) {
        super(game)
        imageKeys.forEach(key => {
            const sprite = new Phaser.TileSprite(game, 0, 0, 480, 360, key)
            this.add(sprite)
            sprite.autoScroll(15, 0)
        })
    }
}
