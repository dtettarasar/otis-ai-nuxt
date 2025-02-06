import User from '../database/models/user'

export const findUserByName = async (userName) => {
    try {
        const query = User.find({ username: userName }).select('username');
        return await query.exec();
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const findUserByEmail = async (userEmail) => {
    try {
        const query = User.find({ email: userEmail }).select('email');
        return await query.exec();
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const getUserPsw = async (userID) => {
    try {
        const query = User.findById(userID).select('_id password');
        return await query.exec();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createUser = async (usernameParam, emailParam, passwordParam) => {

    const userData = {

        username: usernameParam,
        email: emailParam,
        password: passwordParam,
        creationStatus: null,
        Error: null,

    }

    console.log("init user creation");
    console.log("userData: ");
    console.log(userData);

    //regex to test the param validity:
    const validUsernameRegex = /^[a-zA-Z0-9]+$/;
    const securePwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const validEmailRegex = /^[_A-Za-z0-9-]+(?:\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?:\.[A-Za-z]{2,})$/gm;

    const testUsername = validUsernameRegex.test(userData.username);
    const testPassword = securePwdRegex.test(userData.password);
    const testEmail = validEmailRegex.test(userData.email);

    if(!testUsername) {

        return {creationStatus: false, Error: "username not valid"};

    }

    if (!testPassword) {

        return {creationStatus: false, Error: "password not secure enough"};

    }

    if (!testEmail) {

        return {creationStatus: false, Error: "email format not valid"};

    }

};

// used to generate users for unit testing
export const createTestUser = async (comment, userNameStr, emailNameStr, emailDomainStr, passwordStr) => {

    const int = Math.floor(Math.random() * 10000);

    const testUserObj = {
        comment: comment,
        username: `${userNameStr}${int}`,
        email: `${emailNameStr}${int}${emailDomainStr}`,
        password: `${passwordStr}`,
        creationResult: null,
        authResult: null,
        tokenResult: null,
        authTokenResult: null,
        refreshTokenResult: null,
        authRefreshTokenResult: null
    }
    
    // console.log("init testUser creation");
    // console.log("test user Object: ");
    // console.log(testUserObj);

    return testUserObj;

}