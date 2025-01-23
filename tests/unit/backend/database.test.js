import { expect, test } from 'vitest';
import { initDB, closeDB } from '../../../server/database/database.js';

import dotenv from 'dotenv';
dotenv.config(); // Charger les variables d'environnement

let dbConnection;

beforeAll(async () => {

    dbConnection = await initDB();

});

afterAll(async () => {
    await closeDB();
});

test('test connection to MongoDB', async () => {
 
    await expect(dbConnection).toBeDefined();
    await expect(dbConnection.connection.client).toBeDefined();
    await expect(dbConnection.connection.db).toBeDefined();

    await expect(dbConnection.connections[0]['_readyState']).toBe(1);
    await expect(dbConnection.connections[0]['_hasOpened']).toBe(true);

});