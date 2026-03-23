import Phaser from "phaser";
import Boot from "./scenes/Boot.js";
import Preloader from "./scenes/Preloader.js";
import MainMenu from "./scenes/MainMenu.js";
import MainGame from "./scenes/Game.js";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  backgroundColor: "#3366b2",
  parent: "game-container",
  scene: [Boot, Preloader, MainMenu, MainGame],
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
};

export default function StartGame(containerId) {
  return new Phaser.Game({ ...config, parent: containerId });
}