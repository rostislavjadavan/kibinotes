import electron from 'electron';

const fs = require('fs');
const path = require('path');

export default class Storage {

    constructor() {
        this.filePath = this.getFilePath();
    }

    save(data) {
        fs.writeFileSync(this.filePath, data);
    }

    load() {
        return fs.existsSync(this.getFilePath()) ?
            fs.readFileSync(this.filePath).toString() : "";
    }

    getFilePath() {
        return path.join(electron.remote.app.getPath("userData"), "content.md");
    }
}