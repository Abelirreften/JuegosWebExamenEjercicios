export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.body.setGravityY(700); // Gravedad SOLO del jugador
        this.scene = scene;

        // Estado de roll
        this.isRolling = false;
        this.rollCooldown = false;
    }
    
    update(cursors, teclasWASD) {

        const velocidad = 160;
        const rollBoost = 100;

        // Lógica de movimiento con las teclas personalizadas y las flechas + roll
        if (Phaser.Input.Keyboard.JustDown(teclasWASD.roll) && !this.isRolling && !this.rollCooldown) {
            this.isRolling = true;

            // Dirección del roll
            const direccion = this.flipX ? -1 : 1;
            this.setVelocityX(this.body.velocity.x + (rollBoost * direccion));

            this.anims.play('player-roll', true);

            // Cancelar roll después de 800ms
            this.scene.time.delayedCall(800, () => {
                this.isRolling = false;
            });

            // Impide spamear el roll añadiendo un cooldown de 600ms
            this.rollCooldown = true;
            this.scene.time.delayedCall(600, () => {
                this.rollCooldown = false;
            });
        }

        // Movimiento normal (si no está en estado roll)
        if (!this.isRolling) {
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

            // Lógica del salto
            if ((cursors.up.isDown || teclasWASD.arriba.isDown) && this.body.blocked.down) {
                this.setVelocityY(-300);
                this.anims.play('player-jump', true);
            }
        }
    }

    // Animación de muerte
    reiniciarAnimacion() {
        this.setVelocityX(0);
        this.anims.play('player-dead', true);
    }
}
