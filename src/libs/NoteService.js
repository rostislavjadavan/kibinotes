
import uuid from 'uuid/v1'
import removeMarkdown from 'remove-markdown'

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

        let noteIndexData = {
            $note_id: note.id,
            $content: removeMarkdown(note.content).replace(/[^\w\s]/gi, ''),
            $title: note.title
        }
        let sqlIndex = "UPDATE notes_index SET title = $title, content = $content WHERE note_id = $note_id";
        this.connection.run(sqlIndex, noteIndexData, function (err) {
            if (err) {
                console.error(err);
            }
        });
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

        let noteIndexData = {
            $note_id: noteId,
            $title: noteTitle
        }
        let sqlIndex = "INSERT INTO notes_index(note_id, title) VALUES ($note_id, $title)";
        this.connection.run(sqlIndex, noteIndexData, function (err) {
            if (err) {
                console.error(err);
            }
        });
    }

    remove(note, callback) {
        let noteData = {
            $id: note.id
        }
        let sql = "DELETE FROM notes WHERE id = $id";
        this.connection.run(sql, noteData, callback);

        let sqlIndex = "DELETE FROM notes_index WHERE note_id = $id";
        this.connection.run(sqlIndex, noteData, function (err) {
            if (err) {
                console.error(err);
            }
        });
    }

    search(query, callback) {
        let sql = `SELECT 
            note_id,
            highlight(notes_index, 1, '<b>', '</b>') title,
            snippet(notes_index, 2, '<b>', '</b>', '...', 10) content
            FROM notes_index 
            WHERE notes_index MATCH '${query}*'
            ORDER BY rank;`;
        this.connection.all(sql, callback);
    }
}

import { connection } from "@/libs/storage";

export default new NoteService(connection);