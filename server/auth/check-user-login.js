import {findUserByName, getUserPsw} from '../controllers/user-controller';
import {checkHash} from '../utils/str_hasher';
import { encryptString } from '../utils/str_encrypter';

const checkUserLogin = async (usernameToCheck, passwordToCheck) => {

    const config = useRuntimeConfig();

    const userLoginData = {
        authSuccess: false,
        userIdEncryption: {},
    }

    // console.log('init checkUserLogin function');
    // console.log('userLoginData: ');
    // console.log(userLoginData);

    const usernameInDB = await findUserByName(usernameToCheck);
    // console.log(usernameInDB);

    if (usernameInDB.length === 0) {

        console.log('Error: invalid username');

    } else {

        console.log('User exist in DB');
        const userToCheckAuth = usernameInDB[0];
        console.log(userToCheckAuth);

        const hashObj = await getUserPsw(userToCheckAuth._id);
        // console.log(hashObj);

        const hashResult = await checkHash(passwordToCheck, hashObj.password);
        // console.log('hashResult: ' + hashResult);

        if (!hashResult) {

            console.log('Error: invalid password');

        } else {

            console.log('Password is valid, auth OK');
            userLoginData.authSuccess = true;

            // make an encrypted version of the id that will be passed to the token before its creation
            userLoginData.userIdEncryption = await encryptString(userToCheckAuth._id.toHexString(), config.encryptionKey);

        }

        // console.log(userLoginData);

    }

    return userLoginData;

}

export default checkUserLogin;