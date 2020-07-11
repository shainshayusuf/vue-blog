
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"}
    ]
  },

  loading:{color:'#c2bcac'},
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~plugins/components.js',
    '~plugins/date-filter.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios:{
    baseURL:process.env.BASE_URL ||'https://nuxt-blog-d8707.firebaseio.com',
    credentials:false
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  env:{
    baseUrl:process.env.BASE_URL ||'https://nuxt-blog-d8707.firebaseio.com',
    APIkey:'AIzaSyDSfnXMd3tveMLiSu1jyaQNJ_AoX8pLAyE'
  },
  transition:{
    name:'fade',
    mode:'out-in'
  }
}
