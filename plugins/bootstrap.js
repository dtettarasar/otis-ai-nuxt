export default defineNuxtPlugin(() => {
    // Import de Bootstrap JS
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
        console.log('Bootstrap JS chargé avec succès !');
      })
      .catch(err => {
        console.error('Erreur lors du chargement de Bootstrap JS:', err);
      });
  });
  