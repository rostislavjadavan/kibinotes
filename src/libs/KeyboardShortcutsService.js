
import Mousetrap from "mousetrap";

const bindings = {
    switchEditAndViewMode: "command+s",
    goToDashboard: "command+d",
    searchResult: "command"
};

class KeyboardShortcutsService {
    constructor(bindings) {
        this.bindings = bindings;        
    }

    bindSwitchEditAndViewMode(func) {
        Mousetrap.bind(this.bindings.switchEditAndViewMode, func);
    }

    bindGoToDashboard(func) {
        Mousetrap.bind(this.bindings.goToDashboard, func);
    }

    bindSearchResult(index, func) {
        Mousetrap.bind(this.bindings.searchResult + "+" + index, func);
    }
}

export default new KeyboardShortcutsService(bindings);