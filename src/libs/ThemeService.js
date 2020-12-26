
import SettingsService from "@/libs/SettingsService"

class ThemeService {
    constructor() {
        this.theme = SettingsService.getTheme();
    }

    initTheme() {
        document.body.id = this.theme;    
    }

    setTheme(theme) {
        SettingsService.setTheme(theme);
        this.initTheme();        
    }

    getTheme() {
        return this.theme;
    }
}

export default new ThemeService();