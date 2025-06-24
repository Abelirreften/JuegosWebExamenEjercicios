
export default class Animaciones {

    constructor(scene) {
        this.anims = scene.anims;
    }

    // Animaciones
    createAnimations() {

        this.anims.create({
            key: 'player-walk',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 19 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'player-iddle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'player-roll',
            frames: this.anims.generateFrameNumbers('player', { start: 20, end: 27 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'player-dead',
            frames: this.anims.generateFrameNumbers('player', { start: 32, end: 35 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'player-jump',
            frames: [{ key: 'player', frame: 12 }]
        });

        this.anims.create({
            key: 'slime-spawn',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 3 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'slime-walk',
            frames: this.anims.generateFrameNumbers('slime', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'slimeMorado-walk',
            frames: this.anims.generateFrameNumbers('slimeMorado', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'moneda-girar',
            frames: this.anims.generateFrameNumbers('moneda', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
    }

}