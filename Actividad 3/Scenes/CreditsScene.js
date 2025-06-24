export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    preload() {
        this.load.image('sky', 'assets/images/sky.png');
        this.load.audio('hover','assets/audio/SoundEffects/bong_001.ogg' );
        this.load.audio('click','assets/audio/SoundEffects/select_003.ogg' );
    }

    create() {
        // Efectos de sonido
        const clickSound = this.sound.add('click');
        const hoverSound = this.sound.add('hover');

        // Fondo
        this.add.image(960, 240, 'sky');

        // Título
        this.add.text(this.scale.width / 2, 80, 'CREDITS', {
            fontSize: '64px',
            fill: '#ffffff',
            fontFamily: 'VT323'
        }).setOrigin(0.5);

        // Texto de créditos (líneas individuales)
        this.add.text(this.scale.width / 2, 150, 'Juego creado por:', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'VT323'
        }).setOrigin(0.5);

        this.add.text(this.scale.width / 2, 200, 'Abel Ahimsa Martín Crego', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'VT323'
        }).setOrigin(0.5);

        this.add.text(this.scale.width / 2, 250, 'Pedro González González', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'VT323'
        }).setOrigin(0.5);

        this.add.text(this.scale.width / 2, 300, 'Lucas Garcia Giobellina', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'VT323'
        }).setOrigin(0.5);

        this.add.text(this.scale.width / 2, 350, 'Juan José Berbel Najas', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'VT323'
        }).setOrigin(0.5);

        // Botón de volver
        const back = this.add.text(this.scale.width / 2, 430, 'BACK', {
            fontSize: '48px',
            fill: '#00ff00',
            fontFamily: 'VT323'
        }).setOrigin(0.5).setInteractive();

        back.on('pointerdown', () => {
            clickSound.play();
            this.scene.start('MenuScene');
        });

        back.on('pointerover', () => {
            hoverSound.play();
            back.setStyle({ fill: '#ffff00' });
        });

        back.on('pointerout', () => {
            back.setStyle({ fill: '#00ff00' });
        });
    }
}
