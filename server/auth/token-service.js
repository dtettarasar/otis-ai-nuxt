import jwt from 'jsonwebtoken'

export const createToken = async (user, secretKey, expirationTime) => {

    console.log('init createToken function');
    console.log("arguments: ");
    console.log({
        user: user,
        secretKey: secretKey,
        expirationTime: expirationTime
    });

    try {

        const accessToken = jwt.sign(user, secretKey, {expiresIn: expirationTime});

        // console.log("accessToken: "); 
        // console.log(accessToken);

        return accessToken;

    } catch (err) {

        console.error("create token error: " + err);
        return false;

    }

};

export const authToken = async () => {

    console.log('init authToken function');

};

export const authRefreshToken = async () => {

    console.log('init authRefreshToken function');

};