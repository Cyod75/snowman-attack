import Phaser from "phaser";
import Track from "./Track.js";
import Player from "./Player.js";
import { logScenaCargada, logInteraccion, logError } from "../../bugfender.js";

export default class MainGame extends Phaser.Scene {
  constructor() {
    super("MainGame");

    this.player;
    this.tracks;

    this.score = 0;
    this.highscore = 0;
    this.infoPanel;

    this.scoreTimer;
    this.scoreText;
    this.highscoreText;

    // Referencia al botón de errores para poder eliminarlo al salir
    this._errorBtn = null;
  }

  create() {
    // LOG TIPO 1 — Escena de juego cargada
    logScenaCargada("MainGame");

    this.score = 0;
    this.highscore = this.registry.get("highscore");

    this.add.image(512, 384, "background");

    this.tracks = [
      new Track(this, 0, 196),
      new Track(this, 1, 376),
      new Track(this, 2, 536),
      new Track(this, 3, 700),
    ];

    this.player = new Player(this, this.tracks[0]);

    this.add.image(0, 0, "overlay").setOrigin(0);
    this.add.image(16, 0, "sprites", "panel-score").setOrigin(0);
    this.add.image(1024 - 16, 0, "sprites", "panel-best").setOrigin(1, 0);

    this.infoPanel = this.add.image(512, 384, "sprites", "controls");
    this.scoreText = this.add.text(140, 2, this.score, {
      fontFamily: "Arial",
      fontSize: 32,
      color: "#ffffff",
    });
    this.highscoreText = this.add.text(820, 2, this.highscore, {
      fontFamily: "Arial",
      fontSize: 32,
      color: "#ffffff",
    });

    // LOG TIPO 2 — Jugador esperando para comenzar
    logInteraccion("Partida preparada", "esperando input del jugador para empezar");

    this.input.keyboard.once("keydown-SPACE", this.start, this);
    this.input.keyboard.once("keydown-UP", this.start, this);
    this.input.keyboard.once("keydown-DOWN", this.start, this);

    // Crear botón generador de errores de prueba
    this._crearBotonErrores();
  }

  start() {
    // LOG TIPO 2 — Partida iniciada
    logInteraccion("Partida iniciada", `highscore previo: ${this.highscore}`);

    this.input.keyboard.removeAllListeners();

    this.tweens.add({
      targets: this.infoPanel,
      y: 700,
      alpha: 0,
      duration: 500,
      ease: "Power2",
    });

    this.player.start();

    this.tracks[0].start(4000, 8000);
    this.tracks[1].start(500, 1000);
    this.tracks[2].start(5000, 9000);
    this.tracks[3].start(6000, 10000);

    this.scoreTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.score++;
        this.scoreText.setText(this.score);
      },
      callbackScope: this,
      repeat: -1,
    });

    // Colisiones jugador con bolas enemigas
    this.physics.add.overlap(this.player, this.tracks[0].enemySnowballs, this.hitPlayer, null, this);
    this.physics.add.overlap(this.player, this.tracks[1].enemySnowballs, this.hitPlayer, null, this);
    this.physics.add.overlap(this.player, this.tracks[2].enemySnowballs, this.hitPlayer, null, this);
    this.physics.add.overlap(this.player, this.tracks[3].enemySnowballs, this.hitPlayer, null, this);
  }

  hitPlayer(player, snowball) {
    // LOG TIPO 2 — Jugador golpeado
    logInteraccion("Jugador golpeado por bola de nieve", `puntuación al morir: ${this.score}`);
    this.gameOver();
  }

  gameOver() {
    // LOG TIPO 1 — Fin de partida
    logScenaCargada(`Game Over — puntuación final: ${this.score}`);

    this.infoPanel.setTexture("gameover");

    this.tweens.add({
      targets: this.infoPanel,
      y: 384,
      alpha: 1,
      duration: 500,
      ease: "Power2",
    });

    this.tracks.forEach((track) => {
      track.stop();
    });

    this.sound.stopAll();
    this.sound.play("gameover");

    this.player.stop();

    this.scoreTimer.destroy();

    if (this.score > this.highscore) {
      this.highscoreText.setText("NEW!");
      this.registry.set("highscore", this.score);

      // LOG TIPO 2 — Nuevo récord
      logInteraccion("Nuevo récord conseguido", `puntuación: ${this.score}`);
    }

    // Al volver al menú, eliminar el botón de errores
    const limpiarBoton = () => {
      if (this._errorBtn && document.body.contains(this._errorBtn)) {
        document.body.removeChild(this._errorBtn);
        this._errorBtn = null;
      }
    };

    this.input.keyboard.once(
      "keydown-SPACE",
      () => {
        logInteraccion("Volver al menú", "usuario presionó SPACE en game over");
        limpiarBoton();
        this.scene.start("MainMenu");
      },
      this,
    );

    this.input.once(
      "pointerdown",
      () => {
        logInteraccion("Volver al menú", "usuario hizo clic en game over");
        limpiarBoton();
        this.scene.start("MainMenu");
      },
      this,
    );
  }

  // ─────────────────────────────────────────────────────────
  // BOTÓN GENERADOR DE ERRORES DE PRUEBA
  // ─────────────────────────────────────────────────────────
  _crearBotonErrores() {
    const boton = document.createElement('button');
    boton.textContent = '⚠️ Generar Error de Prueba';
    boton.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 24px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 15px;
      font-family: Arial, sans-serif;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;

    let contador = 0;

    boton.addEventListener('click', () => {
      contador++;
      this._generarError(contador);
    });

    document.body.appendChild(boton);
    this._errorBtn = boton;
  }

  _generarError(intento) {
    if (intento % 2 === 1) {
      // ── ERROR TIPO 1: TypeError — acceso a propiedad de objeto nulo ──
      try {
        const snowmanInexistente = null;
        snowmanInexistente.position; // TypeError intencionado
      } catch (e) {
        logError(
          'TypeError: objeto nulo en el juego',
          `Intento #${intento} — Se intentó acceder a la posición de un snowman nulo. Error: ${e.message}`
        );
        console.error(`[Bugfender] Error de prueba #${intento} (TypeError):`, e.message);
      }
    } else {
      // ── ERROR TIPO 2: RangeError — puntuación fuera de rango ──
      try {
        const puntuacionInvalida = -999;
        if (puntuacionInvalida < 0) {
          throw new RangeError(`Puntuación inválida detectada: ${puntuacionInvalida}. No puede ser negativa.`);
        }
      } catch (e) {
        logError(
          'RangeError: puntuación fuera de rango',
          `Intento #${intento} — ${e.message}`
        );
        console.error(`[Bugfender] Error de prueba #${intento} (RangeError):`, e.message);
      }
    }
  }
}