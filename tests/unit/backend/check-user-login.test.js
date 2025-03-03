import { expect, test, beforeAll, afterAll } from 'vitest';
import { initDB, closeDB } from '../../../server/database/database.js';
import { createTestUser, createUser } from '~/server/controllers/user-controller.js';

let dbConnection;

beforeAll(async () => {
    
    dbConnection = await initDB(process.env.DB_URL);

});

afterAll(async () => {
    await closeDB();
});

const buildTestUsers = () => {

    const testUsers = [];
    // testUsers.push(createTestUser('user with correct parameters','DummyTestman', 'dummy.testman', '@otis-ai-test.eu', 'Test001!'));
    testUsers.push(createTestUser('user with correct parameters','DummyTestlady', 'dummy.testlady', '@otis-ai-test.eu', 'Test001!'));
    testUsers.push(createTestUser("user with correct parameters, for this one we'll test login with wrong password", "Pilou", "king.pilou", '@otis-ai-test.eu', 'Test001!'));
    testUsers.push(createTestUser("user that won't be created in the database", "Natty", "queen.natty", '@otis-ai-test.eu', 'Test001!'));

    return testUsers;

}

const testUserCreation = async (testUsersArray) => {

    //console.log(testUsersArray);
    for (let i = 0; i < testUsersArray.length - 1; i++ ) {

        // await console.log(testUsersArray[i]);
        // i < testUsersArray.length - 1 : adjust the condition to keep the last test user not created in the database
        const test = await createUser(testUsersArray[i].username, testUsersArray[i].email, testUsersArray[i].password);
        testUsersArray[i].creationResult = test;
        // await console.log(testUsersArray[i]);

    }

}

const testUsers = buildTestUsers();

test('test user creation', async () => {

    await testUserCreation(testUsers);

    await expect(testUsers[0].creationResult.creationStatus).toBe(true);
    await expect(testUsers[1].creationResult.creationStatus).toBe(true);
    await expect(testUsers[2].creationResult).toBe(null);

    console.log(testUsers);

});