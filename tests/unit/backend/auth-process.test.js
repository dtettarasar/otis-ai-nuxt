import { expect, test, beforeAll, afterAll } from 'vitest';
import { initDB, closeDB } from '../../../server/database/database.js';
import { createTestUser, createUser } from '~/server/controllers/user-controller.js';

import checkUserLogin from '~/server/auth/check-user-login.js';
import { createToken } from '~/server/auth/token-service.js';

import dotenv from 'dotenv';
dotenv.config(); // Charger les variables d'environnement

const encryptionKey = process.env.ENCRYPTION_KEY;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXP;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXP;

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

    // This array store all the index for the users that should be created, to exclude the last one
    const createdUserId = [0, 1, 2, 3];

    //console.log(testUsersArray);
    for (let i = 0; i < createdUserId.length; i++ ) {

        // await console.log(testUsersArray[i]);
        const test = await createUser(testUsersArray[createdUserId[i]].username, testUsersArray[createdUserId[i]].email, testUsersArray[createdUserId[i]].password);
        testUsersArray[createdUserId[i]].creationResult = test;
        // await console.log(testUsersArray[i]);

    }

}

const testUsers = buildTestUsers();

test('test user creation', async () => {

    await testUserCreation(testUsers);

    const createdUserId = [0, 1, 2, 3];

    for (let i = 0; i < createdUserId.length; i++ ) {

        await expect(testUsers[createdUserId[i]].creationResult.creationStatus).toBe(true);

    }

    /*
    await expect(testUsers[0].creationResult.creationStatus).toBe(true);
    await expect(testUsers[1].creationResult.creationStatus).toBe(true);
    await expect(testUsers[2].creationResult.creationStatus).toBe(true);
    await expect(testUsers[3].creationResult.creationStatus).toBe(true);
    */
    await expect(testUsers[4].creationResult).toBe(null);

    console.log(testUsers);

});

test('Check the authSuccess', async () => {

    testUsers[0].authResult = await checkUserLogin(testUsers[0].username, testUsers[0].password, encryptionKey);
    await expect(testUsers[0].authResult).toHaveProperty('authSuccess', true);

    testUsers[1].authResult = await checkUserLogin(testUsers[1].username, 'didou&dede', encryptionKey);
    await expect(testUsers[1].authResult).toHaveProperty('authSuccess', false);

    testUsers[2].authResult = await checkUserLogin(testUsers[2].username, testUsers[2].password, encryptionKey);
    await expect(testUsers[2].authResult).toHaveProperty('authSuccess', true);

    testUsers[3].authResult = await checkUserLogin(testUsers[3].username, testUsers[3].password, encryptionKey);
    await expect(testUsers[3].authResult).toHaveProperty('authSuccess', true);

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

test("test create token module", async () => {

    testUsers[0].tokenResult = await createToken(testUsers[0].authResult, accessTokenSecret, accessTokenExpiration);
    testUsers[3].tokenResult = await createToken(testUsers[3].authResult, accessTokenSecret, accessTokenExpiration);

    // check that testUsers[0].tokenResult contains a proper token
    await expect(typeof testUsers[0].tokenResult).toBe('string');
    await expect(typeof testUsers[3].tokenResult).toBe('string');

    // check that userCont[0] & userCont[4] contains a token with proper format
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    await expect(testUsers[0].tokenResult).toMatch(jwtRegex);
    await expect(testUsers[3].tokenResult).toMatch(jwtRegex);

});