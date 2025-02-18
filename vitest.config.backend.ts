import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    name: 'backend-tests',  // ✅ Ajout d'un nom unique
    include: ['tests/unit/backend/**/*.{test,spec}.{js,ts}'],
    environment: 'node',
    setupFiles: './setup-test.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
