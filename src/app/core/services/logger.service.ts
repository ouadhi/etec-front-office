import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const noop = (): any => undefined;

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private appPrefix = 'Frontend-Office';

  get log() {
    if (!this.checkDebugMode()) { return noop; }
    return console.log.bind(console, `[${this.appPrefix} Log]`);
  }

  get info() {
    if (!this.checkDebugMode()) { return noop; }
    return console.info.bind(console, `[${this.appPrefix} Info]`);
  }

  get warn() {
    if (!this.checkDebugMode()) { return noop; }
    return console.warn.bind(console, `[${this.appPrefix} Warn]`);
  }

  get error() {
    if (!this.checkDebugMode()) { return noop; }
    return console.error.bind(console, `[${this.appPrefix} Error]`);
  }

  get trace() {
    if (!this.checkDebugMode()) { return noop; }
    return console.trace.bind(console, `[${this.appPrefix} Trace]`);
  }

  get debug() {
    if (!this.checkDebugMode()) { return noop; }
    return console.debug.bind(console, `[${this.appPrefix} Debug]`);
  }

  get table() {
    if (!this.checkDebugMode()) { return noop; }
    return console.table.bind(console, `[${this.appPrefix} Table]`);
  }

  private checkDebugMode() {
    if (!environment.production) { return true; }
  }
}

