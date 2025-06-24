import GameScene from './Scenes/GameScene.js';

const config = {
    autoFocus: false, // Para poder escribir código sin que te cambie a la ventana del preview
    type: Phaser.AUTO,
    width: 1920,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);
