import electron from 'electron';

const sqlite3 = require('sqlite3').verbose();

export const file = "data.db"
export const path = require('path').join(electron.remote.app.getPath("userData"), file);
export const connection = new sqlite3.Database(
    path,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
        if (err) {
            vueThis.$buefy.toast.open({
                message: "Error :( " + err,
                type: "is-danger"
            });
        }
    }
);

[
    `CREATE TABLE IF NOT EXISTS "notes" (
            "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "title"	TEXT,
            "content"	TEXT,
            "last_update_ts"	INTEGER
        )`
].forEach(sql => {
    connection.run(sql);
})
