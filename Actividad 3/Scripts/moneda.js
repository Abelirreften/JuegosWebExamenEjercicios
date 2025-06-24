export default class Moneda extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key = 'moneda') {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.play('moneda-girar'); // Animación de la moneda
        this.setImmovable(true);
        this.body.allowGravity = false;
    }
}