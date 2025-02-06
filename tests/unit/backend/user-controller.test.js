import { expect, test } from 'vitest';
import {createUser, createTestUser} from '../../../server/controllers/user-controller';
import { initDB, closeDB } from '../../../server/database/database.js';

let dbConnection;

beforeAll(async () => {
    
    dbConnection = await initDB(process.env.DB_URL);

});

afterAll(async () => {
    await closeDB();
});

const buildTestUsers = async () => {

    const testUsers = [];
    await testUsers.push(createTestUser('user with correct parameters','DummyTestman', 'dummy.testman', '@otis-ai-test.eu', 'Test001!'));
    await testUsers.push(createTestUser('user with correct parameters','KingPilou', 'king.pilou', '@otis-ai-test.eu', 'Test001!'));
    await testUsers.push(createTestUser('user with wrong username', 'VivinaDaBest!', 'vivinadabest', '@otis-ai-test.eu', 'Test001!'));
    await testUsers.push(createTestUser('user with wrong username', 'Lea Kpop', 'lk', '@otis-ai-test.eu', 'Test001!'));
    await testUsers.push(createTestUser('user with wrong password', 'WilliballZ', 'williballz', '@otis-ai-test.eu', 'dbz'));
    await testUsers.push(createTestUser('user with wrong password', 'BruceTheSensei', 'bruce', '@otis-ai-test.eu', 'thebestracer63'));
    await testUsers.push(createTestUser('user with wrong email format', 'DummyTestlady', '!?dummy', '@otis-ai-test.eu', 'Test001!'));
    await testUsers.push(createTestUser('user with wrong email format', 'DummyTestgirl', 'dummy.testgirl', 'otis-ai-test.eu', 'Test001!'));

    return testUsers;

}

const testUsers = await buildTestUsers();
console.log(testUsers);

