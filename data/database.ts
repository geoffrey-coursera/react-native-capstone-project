export { db as default };

import  { SQLiteDatabase, openDatabaseSync } from 'expo-sqlite';

type DB = Pick<SQLiteDatabase, 'runAsync' | 'getAllAsync'>;

const db = instantiateDb('little_lemon');

function instantiateDb (dbName: string) {
    let db: DB;

    try {
        db = openDatabaseSync(dbName);
    } catch (e) {
        console.error('failed to open database connexion');
        db = {
            runAsync: () => Promise.reject(Error('no database')),
            getAllAsync: () => Promise.reject(Error('no database'))
        };
    }
    return db;
}