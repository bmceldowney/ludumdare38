export default class ProgressBar extends Phaser.Group {
    constructor (game, x, y, width, maxValue, initialValue, leftImageKey, midImageKey, rightImageKey, fillImageKey) {
        super(game)

        this.x = x
        this.y = y
        this.padding = 9
        this.maxValue = maxValue
        this._currentValue = 0

        this.leftImage = new Phaser.Image(game, 0, 0, leftImageKey)
        this.midImage = new Phaser.Image(game, 0, 0, midImageKey)
        this.rightImage = new Phaser.Image(game, 0, 0, rightImageKey)
        this.fillImage = new Phaser.Image(game, 0, 0, fillImageKey)

        const edgeWidth = this.leftImage.width + this.rightImage.width
        const midWidth = Math.max(width - edgeWidth, 0)

        this.fillImage.x = this.padding
        this.fillMaxWidth = midWidth + edgeWidth - (this.padding * 2)
        this.midImage.width = midWidth
        this.midImage.x = this.leftImage.width
        this.rightImage.x = this.leftImage.width + this.midImage.width

        this.add(this.leftImage)
        this.add(this.midImage)
        this.add(this.rightImage)
        this.add(this.fillImage)
        this.value = initialValue
    }

    set value (value) {
        this._currentValue = Math.min(Math.max(value, 0), this.maxValue)
        const normal = this._currentValue / this.maxValue
        const fillWidth = normal * this.fillMaxWidth

        this.fillImage.width = fillWidth
    }

    get value () {
        return this._currentValue
    }
}
