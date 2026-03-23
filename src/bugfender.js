import { Bugfender } from '@bugfender/sdk';

export function initBugfender() {
  Bugfender.init({
    appKey: 'DDMl8boBde5pDvqtpcpqlCLfa0AdsGB3',
    overrideConsoleMethods: true,
    printToConsole: true,
    registerErrorHandler: true,
    logBrowserEvents: true,
  });

  Bugfender.log('🟢 [APP] Aplicación Snowmen iniciada correctamente');
  Bugfender.setDeviceKey('app_version', '1.0.0');
  Bugfender.setDeviceKey('game', 'Snowmen Fight');
}

export function logScenaCargada(nombreEscena) {
  Bugfender.log(`📦 [ESCENA] ${nombreEscena} cargada correctamente`);
}

export function logInteraccion(accion, detalle = '') {
  Bugfender.log(`🎮 [INTERACCION] ${accion}${detalle ? ' — ' + detalle : ''}`);
}

export function logError(titulo, descripcion) {
  Bugfender.sendIssue(titulo, descripcion);
  Bugfender.error(`❌ [ERROR] ${titulo}: ${descripcion}`);
}