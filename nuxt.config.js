require("dotenv").config();

module.exports = {
  server: {
    port: process.env.PORT, // default: 3000,
    host: process.env.HOST
  },
  plugins: [
    { src: '~/plugins/socket.client.js' },
    { src: '~/plugins/vue_draggable_resizable.js' },

  ],
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',
  ],
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.API_KEY,
          authDomain: process.env.AUTH_DOMAIN,
          databaseURL: process.env.DATABASE_URL,
          projectId: process.env.PROJECT_ID,
          storageBucket: process.env.STORAGE_BUCKET,
          messagingSenderId: process.env.MESSAGING_SENDER_ID,
          appId: process.env.APP_ID,
          measurementId: process.env.MEASUREMENT_ID
        },
        services: {
          realtimeDb: true
        }
      }
    ]
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: `${process.env.BASE_URL}/api/auth/login`, method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: `${process.env.BASE_URL}/api/auth/user`, method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    }
  }
};