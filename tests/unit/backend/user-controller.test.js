import { expect, test } from 'vitest';
import {findUserById, findUserByName, findUserByEmail, createUser, createTestUser} from '../../../server/controllers/user-controller';
import { initDB, closeDB } from '../../../server/database/database.js';

let dbConnection;

beforeAll(async () => {
    
    dbConnection = await initDB(process.env.DB_URL);

});

afterAll(async () => {
    await closeDB();
});

const buildTestUsers = () => {

    const testUsers = [];
    testUsers.push(createTestUser('user with correct parameters','DummyTestman', 'dummy.testman', '@otis-ai-test.eu', 'Test001!'));
    testUsers.push(createTestUser('user with correct parameters','KingPilou', 'king.pilou', '@otis-ai-test.eu', 'Test001!'));
    testUsers.push(createTestUser('user with wrong username', 'VivinaDaBest!', 'vivinadabest', '@otis-ai-test.eu', 'Test001!'));
    testUsers.push(createTestUser('user with wrong username', 'Lea Kpop', 'lk', '@otis-ai-test.eu', 'Test001!'));
    testUsers.push(createTestUser('user with wrong password', 'WilliballZ', 'williballz', '@otis-ai-test.eu', 'dbz'));
    testUsers.push(createTestUser('user with wrong password', 'BruceTheSensei', 'bruce', '@otis-ai-test.eu', 'thebestracer63'));
    testUsers.push(createTestUser('user with wrong email format', 'DummyTestlady', '!?dummy', '@otis-ai-test.eu', 'Test001!'));
    testUsers.push(createTestUser('user with wrong email format', 'DummyTestgirl', 'dummy.testgirl', 'otis-ai-test.eu', 'Test001!'));

    return testUsers;

}

const testUserCreation = async (testUsersArray) => {

    //console.log(testUsersArray);
    for (let i = 0; i < testUsersArray.length; i++ ) {

        // await console.log(testUsersArray[i]);
        const test = await createUser(testUsersArray[i].username, testUsersArray[i].email, testUsersArray[i].password);
        testUsersArray[i].creationResult = test;
        await console.log(testUsersArray[i]);

    }

}

const testUsers = buildTestUsers();


test('test user creation', async () => {

    await testUserCreation(testUsers);

    await expect(testUsers[0].creationResult.creationStatus).toBe(true);
    await expect(testUsers[1].creationResult.creationStatus).toBe(true);

});

test('test saved users data', async () => {

    /*
    Test here the username, email and password for the 2 first users.
    Make a comparison between the initial users Object and the object returned by Mongodb after creation. 
    Check that username & email are the same
    Check that the hashed password in MongoDB object match the initial not hashed password. 
    */

});

test('test error handling for user creation: test wrong username', async () => {

    await expect(testUsers[2].creationResult.creationStatus).toBe(false);
    await expect(testUsers[2].creationResult.Error).toBe('username not valid');

    await expect(testUsers[3].creationResult.creationStatus).toBe(false);
    await expect(testUsers[3].creationResult.Error).toBe('username not valid');

});

test('test error handling for user creation: test wrong password', async () => {

    await expect(testUsers[4].creationResult.creationStatus).toBe(false);
    await expect(testUsers[4].creationResult.Error).toBe('password not secure enough');

    await expect(testUsers[5].creationResult.creationStatus).toBe(false);
    await expect(testUsers[5].creationResult.Error).toBe('password not secure enough');

});

test('test error handling for user creation: test wrong email format', async () => {

    await expect(testUsers[6].creationResult.creationStatus).toBe(false);
    await expect(testUsers[6].creationResult.Error).toBe('email format not valid');

    await expect(testUsers[7].creationResult.creationStatus).toBe(false);
    await expect(testUsers[7].creationResult.Error).toBe('email format not valid');

});

test('test the findUserById method', async () => {

    // console.log(testUsers[0].creationResult.userData._id);

    
    const userZero = testUsers[0].creationResult.userData;
    const testFinder = await findUserById(userZero._id);

    await expect(testFinder._id).toEqual(userZero._id);
    await expect(testFinder.username).toEqual(userZero.username);
    await expect(testFinder.email).toEqual(userZero.email);
    await expect(testFinder.password).toEqual(userZero.password);

    console.log(testFinder);

    const falseUserId = "thisis1fakeuserid";
    const testFailedFinder = await findUserById(falseUserId);

    // console.log(testFailedFinder);

    await expect(testFailedFinder).toBe(false);

});


test('test the findUserByName method', async () => {

    const userZero = testUsers[0].creationResult.userData;
    const testFinder = await findUserByName(userZero.username);

    await expect(testFinder).toBeTypeOf('object');
    await expect(testFinder._id).toEqual(userZero._id);
    await expect(testFinder.username).toEqual(userZero.username);

    const userFakeUsername = "thisis1fakeusername";
    const testFailedFinder = await findUserByName(userFakeUsername);

    await expect(testFailedFinder).toBeNull();

});

test('test the findUserByEmail method', async () => {

    const userZero = testUsers[0].creationResult.userData;
    const testFinder = await findUserByEmail(userZero.email);

    await expect(testFinder).toBeTypeOf('object');
    await expect(testFinder._id).toEqual(userZero._id);
    await expect(testFinder.email).toEqual(userZero.email);

    const userFakeEmail = "thisisafake@email.com";
    const testFailedFinder = await findUserByEmail(userFakeEmail);

    await expect(testFailedFinder).toBeNull();

});