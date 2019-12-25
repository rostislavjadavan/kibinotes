import electron from 'electron';

const sqlite3 = require('sqlite3').verbose();

export const file = "data.db"
export const path = require('path').join(electron.remote.app.getPath("userData"), file);
export const connection = new sqlite3.Database(path);
