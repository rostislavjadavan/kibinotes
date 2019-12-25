
class NoteService {

    constructor(connection) {
        this.connection = connection;
    }

    list(callback) {
        this.connection.all("SELECT id, title FROM notes ORDER BY title ASC", callback);
    }

    get(id, callback) {
        return this.connection.get("SELECT * FROM notes WHERE id = ?", id, callback);
    }

    save(note, callback) {
        let noteData = {
            $id: note.id,
            $content: note.content,
            $title: note.title
        }
        let sql = "UPDATE notes SET title = $title, content = $content WHERE id = $id";
        this.connection.run(sql, noteData, callback);
    }

    create(callback) {
        let noteData = {
            $title: "New note"
        }
        let sql = "INSERT INTO notes(title) VALUES ($title)";
        this.cconnectionon.run(sql, noteData, callback);
    }

    remove(note, callback) {
        let noteData = {
            $id: note.id
        }
        let sql = "DELETE FROM notes WHERE id = $id";
        this.connection.run(sql, noteData, callback);
    }
}

import { connection } from "@/libs/storage";

export default new NoteService(connection);