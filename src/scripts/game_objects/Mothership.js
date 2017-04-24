export default class Alien extends Phaser.Sprite {
    constructor (game, x, y, spritesheetKey) {
        super(game, x, y, spritesheetKey, 0);
        game.physics.p2.enable(this, false);
        this.body.static = true;

        //this.game.add.sprite(200, 200, 'mother');
        this.animations.add('walking');
        this.animations.play('walking', 9, true);
    }
}
