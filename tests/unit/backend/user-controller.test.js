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

await testUserCreation(testUsers);



//const testUsers = await buildTestUsers();
//await testUserCreation(testUsers);

/*
test('test user creation', async () => {

    await expect(testUsers[0].creationResult.creationStatus).toBe(true);
    await expect(testUsers[1].creationResult.creationStatus).toBe(true);

    //console.log(testUserObj.userCont);

});
*/

test('test error handling for user creation: test wrong username', async () => {

    await expect(testUsers[2].creationResult.creationStatus).toBe(false);
    await expect(testUsers[2].creationResult.Error).toBe('username not valid');

    await expect(testUsers[3].creationResult.creationStatus).toBe(false);
    await expect(testUsers[3].creationResult.Error).toBe('username not valid');

    //console.log(testUserObj.userCont);

});



