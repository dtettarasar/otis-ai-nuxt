import * as jwt from 'jsonwebtoken'

export const createToken = async (user, secretKey, expirationTime) => {

    console.log('init createToken function');
    console.log("arguments: ");
    console.log({
        user: user,
        secretKey: secretKey,
        expirationTime: expirationTime
    });

};

export const authToken = async () => {

    console.log('init authToken function');

};

export const authRefreshToken = async () => {

    console.log('init authRefreshToken function');

};