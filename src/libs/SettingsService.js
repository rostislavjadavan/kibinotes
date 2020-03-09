import electron from 'electron';
import LoggingService from '@/libs/LoggingService'

const fs = require('electron').remote.require('fs');

export const file = "settings.json"
export const path = require('path').join(electron.remote.app.getPath("userData"), file);

class SettingsService {
    constructor() {
        this.settings = {
            theme: "default"
        };

        if (fs.existsSync(path)) {
            this.settings = JSON.parse(fs.readFileSync(path));
            LoggingService.info(`Loaded settings from ${path}: ${JSON.stringify(this.settings)}`)
        } else {
            fs.writeFileSync(path, JSON.stringify(this.settings));
            LoggingService.info(`Using default settings: ${JSON.stringify(this.settings)}`)
        }        
    }

    writeUpdates() {
        fs.writeFileSync(path, JSON.stringify(this.settings));
    }

    getTheme() {
        return this.settings.theme;
    }

    setTheme(theme) {
        this.settings.theme = theme;
        this.writeUpdates();
    }
}

export default new SettingsService();