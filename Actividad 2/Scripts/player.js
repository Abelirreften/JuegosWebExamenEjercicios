export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.body.setGravityY(700); // Gravedad SOLO del jugador
        this.scene = scene;
    }
    
    update(cursors, teclasWASD) {

        const velocidad = 160;

        // Lógica de movimiento con las teclas personalizadas y las flechas
        if (cursors.left.isDown || teclasWASD.izquierda.isDown) {

            this.setVelocityX(-velocidad);
            if (this.body.blocked.down) this.anims.play('player-walk', true);
            this.setFlipX(true);

        } else if (cursors.right.isDown || teclasWASD.derecha.isDown) {

            this.setVelocityX(velocidad);
            if (this.body.blocked.down) this.anims.play('player-walk', true);
            this.setFlipX(false);

        } else {

            this.setVelocityX(0);
            if (this.body.blocked.down) this.anims.play('player-iddle', true);
        }

        if ((cursors.up.isDown || teclasWASD.arriba.isDown) && this.body.blocked.down) {

            this.setVelocityY(-300);
            this.anims.play('player-jump', true);
        }
    }

    // Animación de muerte
    reiniciarAnimacion() {
        this.setVelocityX(0);
        this.anims.play('player-dead', true);
    }
}
