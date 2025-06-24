import EscenaMemoria from "./EscenaMemoria.js";

// Configuración juego
const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  backgroundColor: "#2d2d2d",
  scene: EscenaMemoria,
};

// Crear el juego con la configuración
const game = new Phaser.Game(config);