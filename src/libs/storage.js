import electron from 'electron';

const fs = require('fs');
const path = require('path');

const sqlite3 = require('sqlite3').verbose();

export default class Storage {

    constructor() {
        this.filePath = this.getFilePath();

        this.db = new sqlite3.Database(path.join(electron.remote.app.getPath("userData"), "data.db"));
        
        console.log(this.list());
    }

    list() {
        let res = [];
        this.db.each("SELECT * FROM notes ORDER BY title ASC", function(err, row) {
            res.push(row);
        });
        return res;
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