import Slime from '../Scripts/enemy.js';
import SlimeMorado from '../Scripts/enemy2.js';
import Murcielago from '../Scripts/murcielago.js';
import Player from '../Scripts/player.js';
import Moneda from '../Scripts/moneda.js';
import Animaciones from '../Scripts/animations.js';

let puntuacion = 0;
let textoPuntos;

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

    preload() {

        // Carga de imágenes
        this.load.image('sky', 'assets/images/sky.png');

        this.load.image('ui_teclas', 'assets/images/ui_teclas.png');
        this.load.image('ui_arrows', 'assets/images/ui_arrows.png');
        this.load.image('ui_reset', 'assets/images/ui_reset.png');
        this.load.image('ui_shift', 'assets/images/ui_shift.png');

        this.load.image('checkpoint', 'assets/images/checkpoint.png');

        // Carga del mapa (tiles.png + tiles.json)
        this.load.image('tilesheet', 'assets/images/world_tileset_ABEL.png');
        this.load.tilemapTiledJSON('map', 'assets/images/mapa-tiles.json');

        // Carga de Spriteseets
        this.load.spritesheet('player', 'assets/images/PlayerSpritesheet.png', {
            frameWidth: 16,
            frameHeight: 19
        });

        this.load.spritesheet('slime', 'assets/images/slime.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('slimeMorado', 'assets/images/slimeMorado.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('murcielago', 'assets/images/murcielago.png', {
            frameWidth: 24,
            frameHeight: 24
        });

        this.load.spritesheet('moneda', 'assets/images/coin.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        // Carga del audio
        this.load.audio('start', 'assets/audio/SoundEffects/time_for_adventure.mp3');
        this.load.audio('spawn', 'assets/audio/SoundEffects/game-start.mp3');
        this.load.audio('hit', 'assets/audio/SoundEffects/death-sound.mp3');
        this.load.audio('coin', 'assets/audio/SoundEffects/coin.wav');
    }

    create() {
        this.reiniciando = false;

        puntuacion = 0;

        new Animaciones(this).createAnimations();

        // Crear cielo
        this.add.image(4000, 240, 'sky');

        // Creacion del TileMap, asignar tiles, dibujar tiles.
        this.mapa = this.make.tilemap({ key: 'map' });
        this.tiles = this.mapa.addTilesetImage('tiles', 'tilesheet', 16, 16, 0, 0);
        this.plataformas = this.mapa.createLayer('plataformas', this.tiles, 0, 0);

        // Creación layer Pinchos
        this.pinchos = this.mapa.createLayer('pinchos', this.tiles, 0, 0);

        // Creacidón layer decoraciones
        this.decoraciones = this.mapa.createLayer('Decoraciones', this.tiles, 0, 0);

        // Imágenes de los Controles
        this.add.image(150, 150, 'ui_teclas').setScale(0.2);
        this.add.image(250, 150, 'ui_arrows').setScale(0.2);
        this.add.image(330, 150, 'ui_reset').setScale(0.2);
        this.add.image(400, 150, 'ui_shift').setScale(0.2);
        
        // Crear Jugador
        this.player = new Player(this, 100, 200);

        // Cámara sigue al jugador
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, 8000, 480);
        this.physics.world.setBounds(0, 0, 8000, 480);

        // Colisiones con el tilemap, los worldborders y jugador-plataforma.
        this.plataformas.setCollisionByExclusion(-1, true);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.plataformas);

        // Creación de los Slimes
        this.slimes = this.add.group();

        const posicionesSlimes = [
            { x: 600, y: 270 },
            { x: 1450, y: 315 },
            { x: 1800, y: 280 },
        ];
        
        posicionesSlimes.forEach(pos => {
            const slime = new Slime(this, pos.x, pos.y);
            this.slimes.add(slime);
            this.physics.add.collider(slime, this.plataformas);
        });

        // Creación de los Slimes Morados
        this.slimesMorados = this.add.group();

        const posicionesSlimesMorados = [
            { x: 2200, y: 250 },
            { x: 2375, y: 250 },
            { x: 3300, y: 350 },
            { x: 3700, y: 340 },
        ];
        
        posicionesSlimesMorados.forEach(pos => {
            const slimeMorado = new SlimeMorado(this, pos.x, pos.y);
            this.slimes.add(slimeMorado);
            this.physics.add.collider(slimeMorado, this.plataformas);
        });
      
        // Creación de los Murcielagos
        this.murcielagos = this.add.group();

        const posicionesMurcielagos = [
            { x1: 950, x2: 1250, y: 200 },
            { x1: 6000, x2: 6100, y: 200 },
            { x1: 4200, x2: 4400, y: 200 },
        ];
        
        posicionesMurcielagos.forEach(pos => {
            const murcielago = new Murcielago(this, pos.x1, pos.x2, pos.y);
            this.murcielagos.add(murcielago);
            this.physics.add.collider(murcielago, this.plataformas);
        });
        
        this.checkpointZones = this.physics.add.staticGroup();

        const checkpoints = [
            { x: 3200, y: 368 },
            { x: 1595, y: 256 },
            { x: 4000, y: 292 },
            { x: 4780, y: 192 }
        ];

        checkpoints.forEach(pos => {
            // Cuerpo invisible para la colisión
            const zone = this.checkpointZones.create(pos.x, pos.y).setScale(0.5).refreshBody();
            zone.setVisible(false); // Oculta la caja negra del sprite base

            // Sprite visual por separado
            this.add.image(pos.x, pos.y, 'checkpoint').setOrigin(0.5, 1).setScale(1);
        });;
        
        this.physics.add.overlap(this.player, this.checkpointZones, (player, zone) => {
            this.setCheckpoint(zone.x, zone.y);
        }, null, this);

        // ID de los tiles que matan al jugador
        this.pinchos.setCollision([
            13, 64, 80, 96, 150, 166, 173, 182, 184, 189,
            190, 191, 192, 198, 200, 205, 206, 207, 208, 214,
            217, 221, 222, 223, 224, 230, 233, 249, 174, 175, 176
        ]);
        
        // Si Jugador toca Pinchos -> Animación de morir + reiniciar escena
        this.physics.add.collider(this.player, this.pinchos, () => {
            if (!this.reiniciando) {
                this.respawnPlayer();
            }
        });

        // Creación del grupo de monedas
        this.monedasGrupo = this.physics.add.group();

        const posicionesMonedas = [
            { x: 575, y: 260 },
            { x: 1430, y: 320 },
            { x: 1800, y: 270 },
            { x: 2200, y: 250 },
            { x: 2250, y: 250 },
            { x: 2300, y: 250 },
            { x: 2675, y: 260 },
            { x: 2840, y: 220 },
            { x: 3095, y: 335 },
            { x: 3330, y: 340 },
            { x: 3640, y: 330 },
            { x: 3800, y: 290 },
            { x: 3950, y: 250 },
            { x: 4000, y: 250 },
            { x: 4050, y: 250 },
            { x: 4968, y: 150 },
            { x: 5080, y: 150 },
            { x: 5160, y: 150 },
            { x: 6025, y: 225 },
            { x: 6041, y: 225 },
            { x: 6057, y: 225 },
            { x: 6073, y: 225 },
            { x: 6089, y: 225 },
            { x: 6105, y: 225 },
            { x: 6121, y: 225 },
            { x: 6137, y: 225 },
            { x: 6153, y: 225 },
            { x: 6169, y: 225 },
            { x: 6185, y: 225 }
        ];
        
        posicionesMonedas.forEach(pos => {
            const moneda = new Moneda(this, pos.x, pos.y);
            this.monedasGrupo.add(moneda);
        });

        // Texto de puntuación
        textoPuntos = this.add.text(16, 16, 'Puntos: 0', {
            fontSize: '20px',
            fill: '#ffffff'
        });
        textoPuntos.setScrollFactor(0); // Para que el texto no se mueva con la cámara

        // Colisión entre jugador y moneda
        this.physics.add.overlap(this.player, this.monedasGrupo, recogerMoneda, null, this);

        // Controles Personalizados
        this.teclasWASD = this.input.keyboard.addKeys({
            arriba: Phaser.Input.Keyboard.KeyCodes.W,
            abajo: Phaser.Input.Keyboard.KeyCodes.S,
            izquierda: Phaser.Input.Keyboard.KeyCodes.A,
            derecha: Phaser.Input.Keyboard.KeyCodes.D,
            reinicio: Phaser.Input.Keyboard.KeyCodes.R,
            roll: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });

        // Controles flechas
        this.cursors = this.input.keyboard.createCursorKeys();

        // Música al iniciar la escena
        this.sound.stopAll();
        this.sound.add('spawn').play({ volume: 0.1 });
        this.sound.add('start').play({ volume: 0.1 });

        // Actualizar todos los slimes a la vez
        this.slimes.getChildren().forEach(slime => {
            slime.update();
        });
    }

    update(time, delta) {
        
        if (this.reiniciando) return;

        // Actualizar al jugador
        this.player.update(this.cursors, this.teclasWASD);

        // Actualizar todos los slimes a la vez
        this.slimes.getChildren().forEach(slime => {
            slime.update();
        });

        // Actualizar todos los murcielagos a la vez
        this.murcielagos.getChildren().forEach(murcielago => {
            murcielago.update(time, delta);
        });

        // Si el jugador presiona R -> reiniciar escena
        if (this.teclasWASD.reinicio.isDown) {
            this.respawnPlayer();
            
        }

        // Colisiones jugador-slimes
        this.physics.add.overlap(this.player, this.slimes, () => {
            if (!this.reiniciando) {
                this.respawnPlayer();
                
            }
        });

        // Colisiones jugador-murcielagos
        this.physics.add.overlap(this.player, this.murcielagos, () => {
            if (!this.reiniciando) {
                this.respawnPlayer();
                
            }
        });   
    }
    
    setCheckpoint(x, y) {
        this.checkpoint = { x, y };
    }

    respawnPlayer() {

        this.reiniciando = true;
        this.player.reiniciarAnimacion();
        this.sound.add('hit').play();
    

        // Colisiones jugador-murcielagos
        this.physics.add.overlap(this.player, this.murcielagos, () => {
            if (!this.reiniciando) {
                this.respawnPlayer();
                
            }
        });    
        
    }

    setCheckpoint(x, y) {
        this.checkpoint = { x, y };
    }

    respawnPlayer() {
        this.reiniciando = true;
        this.player.reiniciarAnimacion();
        this.sound.add('hit').play();
        this.time.delayedCall(1000, () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                if (this.checkpoint) {
                    // Respawn en el checkpoint
                    this.player.setPosition(this.checkpoint.x, this.checkpoint.y);
                    this.player.reiniciarAnimacion();
                    this.cameras.main.fadeIn(500, 0, 0, 0);
                    this.reiniciando = false;
                    
                } else {
                    // Reinicia la escena entera si no hay checkpoint
                    this.scene.restart();
                }
            });
        });
        
    }
}
    



// Función para cuando el jugador recoge la moneda
function recogerMoneda(player, moneda) {
    moneda.destroy();
    this.sound.add('coin').play();
    puntuacion += 1;
    textoPuntos.setText('Puntos: ' + puntuacion);
}
