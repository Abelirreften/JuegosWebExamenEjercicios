export default class SlimeMorado extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'slimeMorado');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.body.setGravityY(700); // Gravedad del Slime
        this.scene = scene;
        this.body.setVelocityX(-100);
        this.setFlipX(true);
    }

    update(){

        const velocidad = 100;

        // Lógica de movimiento (rebote)
        if (this.body.blocked.right) {
            this.setVelocityX(-velocidad);
            this.setFlipX(true);
        } else if (this.body.blocked.left) {
            this.setVelocityX(velocidad);
            this.setFlipX(false);
        }

        // Al reiniciar desde un checkpoint, se le asigna velocidad de nuevo al slime
        if (this.body.velocity.x === 0) {
            // Restaurar dirección según flipX
            this.setVelocityX(this.flipX ? -velocidad : velocidad);
        }

        if (this.body.blocked.down) {
            this.anims.play('slimeMorado-walk', true);
        }
    }
}