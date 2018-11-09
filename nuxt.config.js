const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
     '@fortawesome/fontawesome-free-webfonts',
     '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
     '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
     '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
     '@/assets/css/main.sass',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase',
    '~/plugins/test',
    { src:'~/plugins/vue-notifications', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma', 
    // en jp以外の言語プラグインは除くというオプションかな
    ['@nuxtjs/moment', 'jp'],
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.BASE_URL   
  },

  env: {
    baseUrl: process.env.BASE_URL,
    fbAPIKey: process.env.API_KEY 
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-notifications'], 
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
