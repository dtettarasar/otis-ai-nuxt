import { defineConfig } from 'vitest/config';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    name: 'frontend-tests',  // ✅ Ajout d'un nom unique
    include: ['tests/unit/frontend/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
