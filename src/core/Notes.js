
import removeMarkdown from 'remove-markdown'
import { v4 as uuidv4 } from 'uuid';
import DB from "@/core/Database"
import markdownTitle from '@/libs/markdown_title'

const q = {
    count: () => DB.connection.prepare("SELECT count(*) as count FROM notes"),
    getById: () => DB.connection.prepare("SELECT id, title, content, last_update_ts FROM notes WHERE id = $id"),
    getByRowId: () => DB.connection.prepare("SELECT id, title, content, last_update_ts FROM notes WHERE rowid = $rowid"),
    getAll: () => DB.connection.prepare("SELECT id, title, last_update_ts FROM notes ORDER BY title ASC"),
    createNote: () => DB.connection.prepare("INSERT INTO notes (id, title, content, last_update_ts) VALUES ($id, $title, $content, $last_update_ts)"),
    createIndex: () => DB.connection.prepare("INSERT INTO notes_index(note_id) VALUES ($note_id)"),
    updateNote: () => DB.connection.prepare("UPDATE notes SET title = $title, content = $content, last_update_ts = $last_update_ts  WHERE id = $id"),
    updateNoteIndex: () => DB.connection.prepare("UPDATE notes_index SET content = $content WHERE note_id = $note_id"),
    deleteNote: () => DB.connection.prepare("DELETE FROM notes WHERE id = $id"),
    deleteNoteIndex: () => DB.connection.prepare("DELETE FROM notes_index WHERE note_id = $note_id"),
    createHistoryNote: () => DB.connection.prepare("INSERT INTO notes_archive (id, note_id, content, status, last_update_ts) VALUES ($id, $note_id, $content, $status, $last_update_ts)"),
    getHistoryForNoteId: () => DB.connection.prepare("SELECT id, last_update_ts FROM notes_archive WHERE note_id = $note_id ORDER BY last_update_ts DESC"),
    getHistoricById: () => DB.connection.prepare("SELECT id, content, last_update_ts FROM notes_archive WHERE id = $id"),
    search: () => DB.connection.prepare(`SELECT note_id, notes.title as title, snippet(notes_index, 2, '<b>', '</b>', '...', 20) as content FROM notes_index INNER JOIN notes ON notes.id = notes_index.note_id WHERE notes_index MATCH $query ORDER BY rank;`)
}


const StatusEnum = {
    VERSION: 1,
    TRASH: 2
}

const t = {
    createNote: DB.connection.transaction(() => {
        const ts = Date.now()
        const title = `Note ${new Date(ts).toLocaleString()}`
        const note = {
            id: uuidv4(),
            title: title,
            content: `# ${title}` + "\n\n",
            last_update_ts: ts
        }
        const res = q.createNote().run(note)

        q.createIndex().run({ note_id: note.id })
        q.updateNoteIndex().run({ note_id: note.id, content: removeMarkdown(note.content) })

        return q.getByRowId().get({ rowid: res.lastInsertRowid })
    }),
    updateNote: DB.connection.transaction((note) => {
        const currentNote = q.getById().get({ id: note.id })
        if (note.content != currentNote.content) {
            q.createHistoryNote().run({
                id: uuidv4(),
                note_id: currentNote.id,
                content: currentNote.content,
                status: StatusEnum.VERSION,
                last_update_ts: Date.now()
            })
        }
        const res = q.updateNote().run({ id: note.id, title: note.title, content: note.content, last_update_ts: Date.now() })
        q.updateNoteIndex().run({ note_id: note.id, content: removeMarkdown(note.content) })
        return res.changes == 1
    }),
    deleteNote: DB.connection.transaction((note) => {
        q.createHistoryNote().run({
            id: uuidv4(),
            note_id: note.id,
            content: note.content,
            status: StatusEnum.TRASH,
            last_update_ts: note.last_update_ts
        })
        const res = q.deleteNote().run({ id: note.id })
        q.deleteNoteIndex().run({ note_id: note.id })
        return res.changes == 1
    }),
}

class Notes {

    list() {        
        return q.getAll().all()
    }

    listHistory(note) {
        return q.getHistoryForNoteId().all({ note_id: note.id })
    }

    getById(id) {
        return q.getById().get({ id: id })
    }

    getHistoricById(id) {
        return q.getHistoricById().get({ id: id })
    }

    create() {
        return t.createNote();
    }

    update(note) {
        if (!note.hasOwnProperty('id')) {
            throw Error("invalid note: " + JSON.stringify(note))
        }
        note.title = markdownTitle.fromContent(note.content)
        return t.updateNote(note)
    }

    delete(note) {
        if (!note.hasOwnProperty('id')) {
            throw Error("invalid note: " + JSON.stringify(note))
        }
        return t.deleteNote(note)
    }

    search(query) {
        if (!query) {
            return []
        }
        query = query.trim()
        return q.search().all({ query: `${query}*` })
    }
}

export default new Notes();
