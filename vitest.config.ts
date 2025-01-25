import { defineVitestConfig } from '@nuxt/test-utils/config';
import path from 'path';

export default defineVitestConfig({
  test: {
    setupFiles: './setup-test.js', // Charge les variables d'env avant les tests
    globals: true, // Support pour les globales comme `describe`, `it`, etc.
    include: ['tests/**/*.{test,spec}.{js,ts}'], // Localisation des tests
    environment: 'node', // Environnement Node.js
    coverage: {
      provider: 'v8', // Collecteur de couverture
      reportsDirectory: './coverage', // Dossier pour les rapports
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'), // Alias pour la racine
    },
  },
});
