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

}

module.exports = checkUserLogin;