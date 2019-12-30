
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

    bindSearchResult(el, index, func) {        
        Mousetrap(el).bind(this.bindings.searchResult + "+" + index, () => func(index));
    }
}

export default new KeyboardShortcutsService(bindings);