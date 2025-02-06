import {createUser} from '../controllers/user-controller';

export default defineEventHandler(async (event) => {

    console.log('received post request from register form');
    
    // Récupérer les données envoyées dans la requête
    const body = await readBody(event);

    createUser(body.username, body.email, body.password);

    return {

        message: "received response from register process",
        body: body,

    }
  

});