import electron from 'electron';
import SettingsService from '@/libs/SettingsService'
import LoggingService from '@/libs/LoggingService'

const sqlite3 = require('sqlite3').verbose();

export const path = SettingsService.getPath();
export const connection = new sqlite3.Database(
    path,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
        if (err) {
            LoggingService.error(`Unable to connect to dabase ${path}: ${err.message}`);
            vueThis.$buefy.toast.open({
                message: "Error :( " + err,
                type: "is-danger"
            });
        } else {
            LoggingService.info(`Connected to ${path}`)
        }
    }
);

[
    `CREATE TABLE IF NOT EXISTS "notes" (
            "id"	TEXT NOT NULL PRIMARY KEY,
            "title"	TEXT,
            "content"	TEXT,
            "last_update_ts"	INTEGER
        )`,
    `CREATE VIRTUAL TABLE IF NOT EXISTS notes_index 
            USING fts5(note_id UNINDEXED, title, content);`
].forEach(sql => {
    connection.run(sql);
})
