import connect, {sql} from '@databases/expo';


    const db = connect('contacts-db');

    const ready = db.tx(function* (tx) {
        yield tx.query(sql`
            CREATE TABLE IF NOT EXISTS schema_version (
            version INT NOT NULL
            );
        `);
        const versionRecord = yield tx.query(sql`
            SELECT version FROM schema_version;
        `);
        const version = (
            versionRecord.length
            ? versionRecord[0].version
            : 0
        );
        if (version < 1) {
            yield tx.query(sql`
            CREATE TABLE contacts (
                name TEXT NOT NULL PRIMARY KEY,
                mobile INT NOT NULL,
                landline INT NOT NULL,
                img TEXT,
                favorite BOOLEAN
            );`,
            console.log("Table Created!")
            ); 
        }
        const LATEST_VERSION = 1;
        if (version === 0) {
            yield tx.query(sql`
            INSERT INTO schema_version
            VALUES (${LATEST_VERSION});
            `);
        } else {
            yield tx.query(sql`
            UPDATE schema_version
            SET version = ${LATEST_VERSION};
            `);
        }
        });