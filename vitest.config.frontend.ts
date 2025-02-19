import { defineVitestConfig } from '@nuxt/test-utils/config';
import path from 'path';

import { fileURLToPath } from 'node:url'

export default defineVitestConfig({
  test: {
    name: 'frontend-tests',  // ✅ Ajout d'un nom unique
    //include: ['tests/unit/frontend/**/*.{test,spec}.{js,ts}'],
    environment: 'nuxt',
    environmentOptions: {
      
      nuxt: {
        rootDir: fileURLToPath(new URL('tests/unit/frontend/**/*.{test,spec}.{js,ts}', import.meta.url)),
        domEnvironment: 'jsdom', // 'happy-dom' (default) or 'jsdom'
      },

    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
