import {findUserByName, getUserPsw} from '../controllers/user-controller';

const checkUserLogin = async (usernameToCheck, passwordToCheck) => {

    const userLoginData = {
        authSuccess: false,
        userIdEncryption: {},
        usernameToCheck: usernameToCheck,
        passwordToCheck: passwordToCheck,
    }

    console.log('init checkUserLogin function');
    console.log('userLoginData: ');
    console.log(userLoginData);

    const usernameInDB = await findUserByName(usernameToCheck);
    // console.log(usernameInDB);

    if (usernameInDB.length === 0) {

        console.log('Error: invalid username');

    } else {

        console.log('User exist in DB');
        const userToCheckAuth = usernameInDB[0];
        console.log(userToCheckAuth);

    }

}

export default checkUserLogin;