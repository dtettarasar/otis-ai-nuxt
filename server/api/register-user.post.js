import {createUser} from '../controllers/user-controller';

export default defineEventHandler(async (event) => {

    console.log('received post request from register form');
    
    // Récupérer les données envoyées dans la requête
    const body = await readBody(event);

    const userCreation = await createUser(body.username, body.email, body.password);
    console.log(userCreation);

    return {

        message: "received response from register process",
        creationStatus: userCreation.creationStatus,

    }
  

});