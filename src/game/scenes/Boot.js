import Phaser from "phaser";
import { logScenaCargada } from "../../bugfender.js";

export default class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  create() {
    // LOG TIPO 1 — Carga de escena Boot
    logScenaCargada("Boot");

    this.registry.set("highscore", 0);

    this.scene.start("Preloader");
  }
}