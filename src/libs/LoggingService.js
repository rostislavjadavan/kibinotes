
const fs = require('fs')

import electron from 'electron';

export const file = "app-" + new Date().toISOString().slice(0, 10) + ".log"
export const path = require('path').join(electron.remote.app.getPath("userData"), file);

class LoggingService {

    constructor() {
        this.development = true;        
    }

    info(message) {
        this._message("info", message);
    }

    debug(message) {
        this._message("debug", message);
    }

    error(message) {
        this._message("error", message);
    }

    _message(level, message) {
        if (this.development) {
            switch (level) {
                case "error": console.error(message); break;
                default: console.log(message);
            }
        }
        message = (new Date().toString() + ' ' + message).replace(/\n$/, '')
        fs.appendFile(path, message + '\n', err => { if (err) console.log(err) })
    }
}

export default new LoggingService();