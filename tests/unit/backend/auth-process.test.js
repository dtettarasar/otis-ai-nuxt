import { expect, test, beforeAll, afterAll } from 'vitest';
import { initDB, closeDB } from '../../../server/database/database.js';
import { createTestUser, createUser } from '~/server/controllers/user-controller.js';
import checkUserLogin from '~/server/auth/check-user-login.js';
import createToken from '~/server/auth/token-service.js';

import dotenv from 'dotenv';
dotenv.config(); // Charger les variables d'environnement

const encryptionKey = process.env.ENCRYPTION_KEY;

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
    testUsers.push(createTestUser("user with correct parameters, created to test failed token creation and auth token (no jwt will be provided)", "CafeTheGuineaPig", "cafe.guinea.pig", '@otis-ai-test.eu', 'Test001!'));
    testUsers.push(createTestUser("user with correct parameters, created to test failed auth token (with invalid key)", "CracotteTheGuineaPig", "cracotte.guinea.pig", '@otis-ai-test.eu', 'Test001!'));
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
    await expect(testUsers[2].creationResult.creationStatus).toBe(true);
    await expect(testUsers[3].creationResult.creationStatus).toBe(true);
    await expect(testUsers[4].creationResult).toBe(null);

    console.log(testUsers);

});

test('Check the authSuccess', async () => {

    testUsers[0].authResult = await checkUserLogin(testUsers[0].username, testUsers[0].password, encryptionKey);
    await expect(testUsers[0].authResult).toHaveProperty('authSuccess', true);

    testUsers[1].authResult = await checkUserLogin(testUsers[1].username, 'didou&dede', encryptionKey);
    await expect(testUsers[1].authResult).toHaveProperty('authSuccess', false);

    testUsers[4].authResult = await checkUserLogin(testUsers[4].username, testUsers[4].password, encryptionKey);
    await expect(testUsers[4].authResult).toHaveProperty('authSuccess', false);

});

test('Check that users contain the userIdEncryption object', async () => {

    await expect(testUsers[0].authResult).toHaveProperty('userIdEncryption');
    await expect(testUsers[0].authResult.userIdEncryption).toBeInstanceOf(Object);

});

test('Check that the userIdEncryption object has the iv & encryptedStr properties (for the the user successfully logged in)', async () => {

    await expect(testUsers[0].authResult.userIdEncryption).toHaveProperty('iv');
    await expect(testUsers[0].authResult.userIdEncryption).toHaveProperty('encryptedStr');

});

test('check the iv and encryptedStr format', async () => {

    // Regex to check encryptedStr & iv formats
    const ivRegex = /^[a-f0-9]{32}$/;
    const encryptedStrRegex = /^[a-f0-9]{64}$/;

    await expect(testUsers[0].authResult.userIdEncryption.iv).toMatch(ivRegex);
    await expect(testUsers[0].authResult.userIdEncryption.encryptedStr).toMatch(encryptedStrRegex);

}); 