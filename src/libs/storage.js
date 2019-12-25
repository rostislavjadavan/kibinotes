import electron from 'electron';

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

export default class Storage {

    constructor() {
        this.db = new sqlite3.Database(path.join(electron.remote.app.getPath("userData"), "data.db"));
    }

    list(callback) {
        this.db.all("SELECT id, title FROM notes ORDER BY title ASC", callback);
    }

    get(id, callback) {
        return this.db.get("SELECT * FROM notes WHERE id = ?", id, callback);
    }

    save(note, callback) {
        let noteData = {
            $id: note.id,
            $content: note.content,
            $title: note.title
        }
        let sql = "UPDATE notes SET title = $title, content = $content WHERE id = $id";
        this.db.run(sql, noteData, callback);
    }

    create(callback) {
        let noteData = {
            $title: "New note"
        }
        let sql = "INSERT INTO notes(title) VALUES ($title)";
        this.db.run(sql, noteData, callback);
    }

    remove(note, callback) {
        let noteData = {
            $id: note.id
        }
        let sql = "DELETE FROM notes WHERE id = $id";
        this.db.run(sql, noteData, callback);
    }
}