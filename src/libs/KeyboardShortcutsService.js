
import Mousetrap from "mousetrap";

const os = require('os');
const bindings = {
    createNewNote: "n",
    switchEditAndViewMode: "e",
    editTitle: "t",
    goToDashboard: "d",
    systemPage: "shift+s"
};

class KeyboardShortcutsService {
    constructor(bindings) {
        this.modKey = os.platform() == 'darwin' ? 'command' : 'ctrl';
        this.modKeyEditor = os.platform() == 'darwin' ? 'Cmd' : 'Ctrl';
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

    bindGoToDashboard(el, func) {
        if (typeof el === "function") {
            Mousetrap.bind(this.modKey + "+" + this.bindings.goToDashboard, el);
        } else {
            Mousetrap(el).bind(this.modKey + "+" + this.bindings.goToDashboard, func);        
        }
    }

    bindSearchResult(el, index, func) {
        Mousetrap(el).bind(this.modKey + "+" + index, () => func(index));
    }

    bindSystemPage(func) {
        Mousetrap.bind(this.modKey + "+" + this.bindings.systemPage, func);
    }

    getCMSwitchEditAndViewMode() {
        return this.modKeyEditor + "-" + this.bindings.switchEditAndViewMode.toUpperCase();
    }

    getCMEditTitle() {
        return this.modKeyEditor + "-" + this.bindings.editTitle.toUpperCase();
    }

    getCMGoToDashboard() {
        return this.modKeyEditor + "-" + this.bindings.goToDashboard.toUpperCase();
    }
}

export default new KeyboardShortcutsService(bindings);