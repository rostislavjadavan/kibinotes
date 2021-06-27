
import { v1 as uuid } from 'uuid'
import NoteIndexService from '@/libs/NoteIndexService'

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
            $title: note.title,
            $last_update_ts: Date.now()
        }
        let sql = "UPDATE notes SET title = $title, content = $content, last_update_ts = $last_update_ts  WHERE id = $id";
        this.connection.run(sql, noteData, callback);

        NoteIndexService.update(note)
    }

    create(callback) {
        let noteId = uuid();
        let noteTitle = "New note";

        let noteData = {
            $id: noteId,
            $title: noteTitle,
            $last_update_ts: Date.now()
        }
        let sql = "INSERT INTO notes(id, title, last_update_ts) VALUES ($id, $title, $last_update_ts)";
        this.connection.run(sql, noteData, function (err) {
            if (err) {
                console.error(err);
            }
            callback(err, noteId);
        });
        
        NoteIndexService.create(noteId, noteTitle);
    }

    remove(note, callback) {
        let noteData = {
            $id: note.id
        }
        let sql = "DELETE FROM notes WHERE id = $id";
        this.connection.run(sql, noteData, callback);

        NoteIndexService.remove(note);
    }
}

import { connection } from "@/libs/storage";

export default new NoteService(connection);