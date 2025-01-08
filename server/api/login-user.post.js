// server/api/login-user.post.js
export default defineEventHandler(async (event) => {

    // Récupérer les données envoyées dans la requête
    const body = await readBody(event);
  
    // Logguer le username et le mot de passe dans la console
    console.log("received post request from login form");
    console.log("Username:", body.username);
    console.log("Password:", body.password);
  
    // Retourner une réponse
    return {
      success: true,
      message: "Données reçues avec succès.",
    };

});
  