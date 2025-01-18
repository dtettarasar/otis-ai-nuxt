/*
const bcrypt = require("bcryptjs");

const strHasher = {

    genHashedStr: async (strToHash) => {

        try {

            const salt = await bcrypt.genSalt();
            const hashedStr = await bcrypt.hash(strToHash, salt);
            return hashedStr;

        } catch (err) {

            console.log(err);
            return false;

        }

    },

    checkHash: async (strToCheck, hashToCheck) => {

        try {

            const testStr = await bcrypt.compare(strToCheck, hashToCheck);

            if (testStr) {

                return true;

            } else {

                return false;

            }

        } catch (err) {

            console.log(err); 
            return false;

        }

    }

}

exports.method = strHasher;
*/
import bcrypt from "bcrypt";

const genHashedStr = async (strToHash) => {

    console.log('init genHashedStr function');

    try {

        const salt = await bcrypt.genSalt();
        const hashedStr = await bcrypt.hash(strToHash, salt);
        return hashedStr;

    } catch (err) {

        console.log(err);
        return false;

    }

}

const checkHash = async (strToCheck, hashToCheck) => {

    console.log('init checkHash function');

    try {

        const testStr = await bcrypt.compare(strToCheck, hashToCheck);

        if (testStr) {

            return true;

        } else {

            return false;

        }

    } catch (err) {

        console.log(err); 
        return false;

    }

}

module.exports = { genHashedStr, checkHash };