export default class MenuScene extends Phaser.Scene {
    constructor(){
        super('MenuScene');
    }

    preload() {
        this.load.image('sky', 'assets/images/sky.png');
        this.load.audio('hover','assets/audio/SoundEffects/bong_001.ogg' );
        this.load.audio('click','assets/audio/SoundEffects/select_003.ogg' );
        this.load.audio('start', 'assets/audio/SoundEffects/time_for_adventure.mp3');
    }

    create(){
        // Efectos de sonido y Música
        const clickSound = this.sound.add('click');
        const hoverSound = this.sound.add('hover');
        
        // Música al iniciar la escena
        this.sound.stopAll();
        this.sound.add('start').play({ volume: 0.1 });

        // Fondo
        this.add.image(960, 240,'sky');

        // Título
        this.add.text(700, 100, 'A Knight Adventure', {
            fontSize: '64px',
            fill: '#ffffff',
            fontFamily: 'VT323'
        });

        // Botón de Play
        const textPlay = this.add.text(880, 250, 'PLAY', {
            fontSize: '48px',
            fill: '#00ff00',
            fontFamily: 'VT323'
        }).setInteractive();

        textPlay.on('pointerdown', ()=> {
            clickSound.play();
            this.scene.start('GameScene');
        });

        textPlay.on('pointerover', ()=> {
            hoverSound.play();
            textPlay.setStyle({ fill: '#ffff00' });
        });

        textPlay.on('pointerout', () => {
            textPlay.setStyle({ fill: '#00ff00' });
          });
        
         // Botón de Créditos
        const textCredits = this.add.text(850, 320, 'CREDITS', {
            fontSize: '48px',
            fill: '#00ff00',
            fontFamily: 'VT323'
          }).setInteractive();

          textCredits.on('pointerdown', () => {
            clickSound.play();
            this.scene.start('CreditsScene');
          });

          textCredits.on('pointerover', () => {
            hoverSound.play();
            textCredits.setStyle({ fill: '#ffff00' });
          });

          textCredits.on('pointerout', () => {
            textCredits.setStyle({ fill: '#00ff00' });
          });
   
    }
}

