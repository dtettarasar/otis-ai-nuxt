import bcrypt from "bcryptjs";

export const genHashedStr = async (strToHash) => {

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

export const checkHash = async (strToCheck, hashToCheck) => {

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