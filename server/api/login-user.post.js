// server/api/login-user.post.js

import checkUserLogin from '../auth/check-user-login';

export default defineEventHandler(async (event) => {

    // Récupérer les données envoyées dans la requête
    const body = await readBody(event);
  
    // Logguer le username et le mot de passe dans la console
    console.log("received post request from login form");
    console.log("Username:", body.username);
    console.log("Password:", body.password);

    const userLoginData = await checkUserLogin(body.username, body.password);
    console.log(userLoginData);
  
    // Retourner une réponse
    return {
      message: "received response from login process",
      loginData: userLoginData
    };

});
  