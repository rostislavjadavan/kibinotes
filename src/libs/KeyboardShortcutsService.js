
import Mousetrap from "mousetrap";

const os = require('os');
const bindings = {
    createNewNote: "n",
    switchEditAndViewMode: "s",
    goToDashboard: "d",
    systemPage: "shift+s"
};

class KeyboardShortcutsService {
    constructor(bindings) {
        this.modKey = os.platform() == 'darwin' ? 'command' : 'ctrl';
        this.bindings = bindings;
    }

    bindCreateNewNote(el, func) {
        if (el) {
            Mousetrap(el).bind(this.modKey + "+" + this.bindings.createNewNote, func);
        }
        Mousetrap.bind(this.modKey + "+" + this.bindings.createNewNote, func);
    }

    bindSwitchEditAndViewMode(func) {
        Mousetrap.bind(this.modKey + "+" + this.bindings.switchEditAndViewMode, func);
    }

    bindGoToDashboard(func) {
        Mousetrap.bind(this.modKey + "+" + this.bindings.goToDashboard, func);
    }

    bindSearchResult(el, index, func) {
        Mousetrap(el).bind(this.modKey + "+" + index, () => func(index));
    }

    bindSystemPage(func) {
        Mousetrap.bind(this.modKey + "+" + this.bindings.systemPage, func);
    }

    getCMModKey() {
        return this.modKey == "command" ? "Cmd" : this.modKey;
    }

    getCMSwitchEditAndViewMode() {
        return this.getCMModKey() + "-" + this.bindings.switchEditAndViewMode.toUpperCase();
    }

    getCMGoToDashboard() {
        return this.getCMModKey() + "-" + this.bindings.goToDashboard.toUpperCase();
    }
}

export default new KeyboardShortcutsService(bindings);