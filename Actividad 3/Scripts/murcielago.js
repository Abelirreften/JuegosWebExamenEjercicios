export default class Murcielago extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, xMin, xMax, y) {
        super(scene, xMin, y, 'murcielago');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene = scene;
        this.body.setAllowGravity(false);
        this.setCollideWorldBounds(true);

        // Definir los límites del movimiento horizontal
        this.xMin = xMin;
        this.xMax = xMax;
        this.fixedY = y;

        this.speedX = 60; // velocidad constante
        this.setVelocityX(this.speedX);
        this.setY(this.fixedY);

        this.setFlipX(false);
    }

    update() {
        // Rebote horizontal
        if (this.x <= this.xMin) {
            this.setVelocityX(this.speedX);
            this.setFlipX(false);
        } else if (this.x >= this.xMax) {
            this.setVelocityX(-this.speedX);
            this.setFlipX(true);
        }

        // Fijar la altura para evitar "deriva" vertical
        this.setY(this.fixedY);

        this.anims.play('murcielago-fly', true);
    }
}