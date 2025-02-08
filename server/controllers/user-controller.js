import User from '../database/models/user';

export const findUserByName = async (userName) => {
    try {

        // const query = User.find({ username: userName }).select('username');
        // return await query.exec();
        return await User.findOne({ username: userName }).select('username');

    } catch (error) {
        console.error(error);
        return false;
    }
};

export const findUserByEmail = async (userEmail) => {
    try {
        
        return await User.findOne({ email: userEmail }).select('email');

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

    console.log("init create user method from user controller script");

    // Check if username already exist in database
    // const usernameInDB = await findUserByName(userData.username);

    // Check if email already exist in database
    // const emailInDB = await findUserByEmail(userData.email);

    console.log("Checking username in DB...");
    const usernameInDB = await findUserByName(userData.username);
    console.log("Username in DB:", usernameInDB);

    console.log("Checking email in DB...");
    const emailInDB = await findUserByEmail(userData.email);
    console.log("Email in DB:", emailInDB);

    if (usernameInDB) {

        console.log("username already exist in database");
        console.log(`usernameInDB:`);
        console.log(usernameInDB);

        return {creationStatus: false, Error: "username already used"};

    } else if (emailInDB) {

        console.log('email already exist in database');
        console.log(`emailInDB:`);
        console.log(emailInDB);

        return {creationStatus: false, Error: "email already used"};

    } else {

        console.log("username & email doesn't exist in database");
        console.log("we can create new user");

        const userToCreate = new User({
            username: userData.username,
            email: userData.email,
            password: userData.password,
        });

        try {

            const savedUserObj = await userToCreate.save();
            return {creationStatus: true, userData: savedUserObj};

        } catch(err) {

            console.log(err);
            const errMsg = `MongoDB creation error: ${err}`
            return {creationStatus: false, Error: errMsg};

        }

    }


    return {creationStatus: true, Error: null};


};

// used to generate users for unit testing
export const createTestUser = (comment, userNameStr, emailNameStr, emailDomainStr, passwordStr) => {

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