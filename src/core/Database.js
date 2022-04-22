const path = require('path')
const fs = require('fs')
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

const createTables = (connection) => {
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
        connection.exec(sql);
    })
}

import Settings from "@/core/Settings"

export default new class Database {
    constructor() {        
        this.path = Settings.get('db', defaultDbName);
        this.connection = sqlite(this.path);

        createTables(this.connection)
    }

    getConnection() {
        return this.connection
    }

    getPath() {
        return this.path
    }

    open(newPath) {
        try {
            const newConnection = sqlite(newPath, { fileMustExist: true })
            newConnection.prepare("SELECT count(*) as count FROM notes").run()

            this.connection = newConnection
            this.path = newPath
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

    create(newPath) {
        try {
            if (fs.existsSync(newPath)) {
                return {
                    success: false,
                    error: `${newPath} already exists`
                };
            }

            this.connection = sqlite(newPath)
            createTables(this.connection)
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
