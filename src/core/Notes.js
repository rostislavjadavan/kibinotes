
import removeMarkdown from 'remove-markdown'
import { v4 as uuidv4 } from 'uuid';
import { connection } from "@/core/Database"

const q = {
    getById: connection.prepare("SELECT id, title, content, last_update_ts FROM notes WHERE id = $id"),
    getByRowId: connection.prepare("SELECT id, title, content, last_update_ts FROM notes WHERE rowid = $rowid"),
    getAll: connection.prepare("SELECT id, title, last_update_ts FROM notes"),
    createNote: connection.prepare("INSERT INTO notes (id, last_update_ts) VALUES ($id, $last_update_ts)"),
    createIndex: connection.prepare("INSERT INTO notes_index(note_id) VALUES ($note_id)"),
    updateNote: connection.prepare("UPDATE notes SET title = $title, content = $content, last_update_ts = $last_update_ts  WHERE id = $id"),
    updateNoteIndex: connection.prepare("UPDATE notes_index SET content = $content WHERE note_id = $note_id"),
    deleteNote: connection.prepare("DELETE FROM notes WHERE id = $id"),
    deleteNoteIndex: connection.prepare("DELETE FROM notes_index WHERE note_id = $note_id"),
    createArchiveNote: connection.prepare("INSERT INTO notes_archive (id, note_id, content, status, last_update_ts) VALUES ($id, $note_id, $content, $status, $last_update_ts)")
}

const StatusEnum = {
    VERSION: 1,
    TRASH: 2
}

const t = {
    createNote: connection.transaction(() => {
        const id = uuidv4()
        const res = q.createNote.run({ id: id, last_update_ts: Date.now() });
        q.createIndex.run({ note_id: id });
        return q.getByRowId.get({ rowid: res.lastInsertRowid });
    }),
    updateNote: connection.transaction((note) => {        
        const currentNote = q.getById.get({ id: note.id })
        if (note.content != currentNote.content) {
            q.createArchiveNote.run({
                id: uuidv4(),
                note_id: currentNote.id,
                content: currentNote.content,
                status: StatusEnum.VERSION,
                last_update_ts: currentNote.last_update_ts
            })
        }        
        const res = q.updateNote.run({ id: note.id, title: note.title, content: note.content, last_update_ts: Date.now() });
        q.updateNoteIndex.run({ note_id: note.id, content: removeMarkdown(note.content) });
        return res.changes == 1;
    }),
    deleteNote: connection.transaction((note) => {
        const res = q.deleteNote.run({ id: note.id });
        q.deleteNoteIndex.run({ note_id: note.id });
        return res.changes == 1;
    }),
}

class Notes {
    constructor() {
        /*
        [1, 3, 5, 9, 11].forEach(id => {
            let n = this.create()
            n.content = `Content of the note ${id}`
            this.update(n)
            console.log(n)
        })
        //*/
    }

    list() {
        return q.getAll.all()
    }

    getById(id) {
        return q.getById.get({ id: id })
    }

    create() {
        return t.createNote();
    }

    update(note) {
        if (!note.hasOwnProperty('id')) {
            throw Error("invalid note: " + JSON.stringify(note))
        }
        if (note.content && note.content.length > 0) {
            note.title = note.content.substring(0, 40)
        } else {
            note.title = "Empty note"
        }
        return t.updateNote(note)
    }

    delete(note) {
        if (!note.hasOwnProperty('id')) {
            throw Error("invalid note: " + JSON.stringify(note))
        }
        return t.deleteNote(note)
    }
}

export default new Notes();
