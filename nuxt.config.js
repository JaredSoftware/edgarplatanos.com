export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'EdgarPlatano',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/google.js',
    { src: '~/plugins/flowbite.js', ssr: false },
    { src: '~/plugins/simple-mask-money.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    cssPath: "~/assets/css/input.css",
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/sheets-api/': { target: 'https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/', pathRewrite: { '^/sheets-api/': '' }, changeOrigin: true }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'defu'
    ]
  },
  generate: {
    subFolders: true,
  },
  router: {
    extendRoutes(routes) {
      routes.forEach((route) => {
        // When options.generate.subFolders is true (default)
        const alias = route.path.length > 1 ? `${route.path}/index.html` : '/index.html'

        // When options.generate.subFolders is false
        //const normalizedRoute = route.path.replace(/\/$/, '') // Remove trailing slashes if they exist
        //const alias = route.path.length > 1 ? `${normalizedRoute}.html` : '/index.html'

        route.alias = alias
      })
    },
  },
  auth: {
    strategies: {
      google: {
        clientId: "623329904128-0q5atfsm9k2r5jssf600nr5radect0h2.apps.googleusercontent.com", // Define esta variable en tu archivo .env
        responseType: 'token id_token',
        redirectUri: 'http://localhost:3000/dashboard', // Debe coincidir con la configuración en la Consola de Desarrolladores de Google
        codeChallengeMethod: '',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets',
      },
    },
  },
}
