
import removeMarkdown from 'remove-markdown'

class NoteIndexService {

    constructor(connection) {
        this.connection = connection;
    }

    update(note) {
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

    create(noteId, noteTitle) {
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

    remove(note) {
        let noteData = {
            $id: note.id
        }        

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
            snippet(notes_index, 2, '<b>', '</b>', '...', 30) content
            FROM notes_index 
            WHERE notes_index MATCH '${query}*'
            ORDER BY rank;`;
        this.connection.all(sql, callback);
    }
}

import { connection } from "@/libs/storage";

export default new NoteIndexService(connection);