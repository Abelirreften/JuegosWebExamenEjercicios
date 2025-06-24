import CreditsScene from './Scenes/CreditsScene.js';
import GameScene from './Scenes/GameScene.js';
import MenuScene from './Scenes/MenuScene.js';

const config = {
    autoFocus: false, // false = Ventana código ::::: true = Ventana juego
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
    scene: [MenuScene, GameScene, CreditsScene]
};

const game = new Phaser.Game(config);
