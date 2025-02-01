export default defineEventHandler(async (event) => {

    console.log('received post request from register form');
    
    // Récupérer les données envoyées dans la requête
    const body = await readBody(event);

    console.log('body: ');
    console.log(body);

    return {

        message: "received response from register process",
        body: body,

    }
  

});