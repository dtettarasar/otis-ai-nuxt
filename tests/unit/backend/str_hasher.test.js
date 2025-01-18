import { expect, test } from 'vitest';
import { genHashedStr, checkHash } from '../../../server/utils/str_hasher';

const strToHash = "Welcame.The_Legacy_of_Shi.Showdown";
let hashedStr = '';
const fakeHash = '$2a$10$/zzzzzzzzzzz/Q9utbS'

test('test the genHashedStr method', async () => {

    hashedStr = await genHashedStr(strToHash);
    console.log(hashedStr);

    expect(typeof hashedStr).toBe('string');

    // Regex pour vérifier un hash bcrypt (60 caractères avec des lettres, chiffres et caractères spéciaux)
    const bcryptHashRegex = /^\$2[ayb]\$[0-9]{2}\$[./0-9A-Za-z]{53}$/;

    expect(hashedStr).toMatch(bcryptHashRegex);

});

test('test the checkHash method', async () => {

    const testCheckHash = await checkHash(strToHash, hashedStr);
    const testWrongHash = await checkHash(strToHash, fakeHash);

    expect(testCheckHash).toEqual(true);
    expect(testWrongHash).toEqual(false);

});