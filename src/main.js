import { initBugfender } from './bugfender';
import StartGame from './game/main';

document.addEventListener('DOMContentLoaded', () => {

    // ⚠️ Inicializar Bugfender ANTES que Phaser
    initBugfender();

    StartGame('game-container');

});