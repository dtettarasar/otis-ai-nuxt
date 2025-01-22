// server/api/login-user.post.js

import checkUserLogin from '../auth/check-user-login';
import { createToken } from '../auth/token-service';

export default defineEventHandler(async (event) => {

    // Récupérer les données envoyées dans la requête
    const body = await readBody(event);
  
    // Logguer le username et le mot de passe dans la console
    console.log("received post request from login form");
    console.log("Username:", body.username);
    console.log("Password:", body.password);

    const userAuthObj = {
      authSuccess: false,
      accessToken: null,
      refreshToken: null
    }

    const userLoginData = await checkUserLogin(body.username, body.password);
    console.log(userLoginData);

    if (userLoginData.authSuccess) {

      console.log("user login valid");
      console.log("create tokens here");

      const accessToken = await createToken(userLoginData, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXP);
      const refreshToken = await createToken(userLoginData, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXP);

      // console.log("accessToken: "); 
      // console.log(accessToken);

      // console.log("refreshToken: ")
      // console.log(refreshToken);

      if (accessToken && refreshToken) {

        console.log("token creation done");
        userAuthObj.accessToken = accessToken;
        userAuthObj.refreshToken = refreshToken;
        userAuthObj.authSuccess = userLoginData.authSuccess;

      } else {

        console.error('token creation failed');

      }

    } else {

      console.log('user login not valid');

    }
  
    // Retourner une réponse
    return {

      message: "received response from login process",
      userAuthObj: userAuthObj

    };

});
  