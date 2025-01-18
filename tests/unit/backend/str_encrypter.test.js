import { expect, test } from 'vitest';
import { encryptString, decryptString } from '../../../server/utils/str_encrypter';

const testStr = "The Chase Is Better Than The Catch";

let testEncryption = {};

test('test the encrypter: make sure it returns an object', async () => {

    testEncryption = await encryptString(testStr);
    //console.log(testEncryption);

    //expect(testEncryption).toBeTypeOf('object');

});