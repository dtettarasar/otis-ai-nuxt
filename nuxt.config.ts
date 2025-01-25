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

  runtimeConfig: {
    mongoUri: process.env.DB_URL,
    encryptionKey: process.env.ENCRYPTION_KEY,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXP,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXP,
    // jwtSecret: process.env.JWT_SECRET,
    public: {
        apiBase: process.env.API_BASE || 'http://localhost:3000'
    }
  },

  nitro: {
    preset: 'node-server'
  },

  modules: [
    '@nuxt/test-utils/module'
  ],
  
})
