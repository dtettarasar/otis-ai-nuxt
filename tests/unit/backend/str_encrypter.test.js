import { expect, test } from 'vitest';
import { encryptString, decryptString } from '../../../server/utils/str_encrypter';

import dotenv from 'dotenv';
dotenv.config(); // Charger les variables d'environnement

const testStr = "The Chase Is Better Than The Catch";
const secretKey = process.env.ENCRYPTION_KEY;

let testEncryption = {};

test('test the encrypter: make sure it returns an object', async () => {

    testEncryption = await encryptString(testStr, secretKey);
    //console.log(testEncryption);
    expect(testEncryption).toBeTypeOf('object');

});

test('test the object returned by the encrypter', async () => {

    //console.log(testEncryption);

    const ivRegex = /^[0-9a-f]{32}$/;
    const encryptedStrRegex = /^[0-9a-f]+$/;

    expect(testEncryption).toHaveProperty('iv');
    expect(testEncryption).toHaveProperty('encryptedStr');

    expect(testEncryption.iv).toMatch(ivRegex);
    expect(testEncryption.encryptedStr).toMatch(encryptedStrRegex);

});

test('test the decrypter', async () => {

    const decryptedStr = await decryptString(testEncryption, secretKey);

    
    console.log("testEncryption: ");
    console.log(testEncryption);
    console.log("decryptedStr: ");
    console.log(decryptedStr);
    

    expect(decryptedStr).toEqual(testStr);

});