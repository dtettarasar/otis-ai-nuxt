// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  css: [
    '~/assets/css/main.css' // Ajoute ce fichier au global
  ],

  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' }
  ],
})
