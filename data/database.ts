export { db as default };

import  {openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('little_lemon');