const path = require('path')
const sqlite = require('better-sqlite3')

export const defaultDbName = 'kibinotes.db'
export const defaultDbPath = path
    .join(
        window.require("electron")
            .remote
            .app
            .getPath("documents"),
        defaultDbName
    );

export default new class Database {
    constructor() {
        this.path = defaultDbPath;
        this.connection = sqlite(this.path);

        [
            `CREATE TABLE IF NOT EXISTS "notes" (
                    "id"	            TEXT NOT NULL PRIMARY KEY,
                    "title"             TEXT,
                    "content"	        TEXT,
                    "last_update_ts"	INTEGER
                )`,
            `CREATE TABLE IF NOT EXISTS "notes_archive" (
                    "id"	            TEXT NOT NULL PRIMARY KEY,
                    "note_id"           TEXT,
                    "status"            INTEGER,
                    "content"	        TEXT,
                    "last_update_ts"	INTEGER
                )`,
            `CREATE VIRTUAL TABLE IF NOT EXISTS notes_index 
                    USING fts5(note_id UNINDEXED, content);`
        ].forEach(sql => {
            this.connection.exec(sql);
        })
    }

    getConnection() {
        return this.connection
    }

    getPath() {
        return this.path
    }

    open(path) {
        try {
            const newConnection = sqlite(path, { fileMustExist: true })
            newConnection.prepare("SELECT count(*) as count FROM notes").run()

            this.connection = newConnection
            this.path = path
        } catch (e) {
            return {
                success: false,
                error: e
            };
        }
        return {
            success: true
        }
    }
}
