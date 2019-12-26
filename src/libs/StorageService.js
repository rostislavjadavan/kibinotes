
class StorageService {

    constructor(connection) {
        this.connection = connection;
    }

    tables(callback) {
        return this.connection.get("SELECT count() AS tables FROM sqlite_master", function (err, row) {
            let tablesCount = row.tables;
            callback(err, tablesCount);
        });
    }
}

import { connection } from "@/libs/storage";

export default new StorageService(connection);