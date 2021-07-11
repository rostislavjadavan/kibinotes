export const path = require('path')
    .join(
        window.require("electron")
            .remote
            .app
            .getPath("userData"), 'data.db'
    );

export const connection = require('better-sqlite3')(path);

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

