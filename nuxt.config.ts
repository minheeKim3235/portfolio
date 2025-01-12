// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false, 
  nitro : {
    preset : 'github-pages'
  },
  app: {
    baseURL: '/portfolio/', // baseURL: '/<repository>/'
    buildAssetsDir: 'assets',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        }
      }
    }
  },

  css: [
    'assets/css/common.scss'
  ],
  modules: [
    '@vesp/nuxt-fontawesome',
  ],
  fontawesome: {
    icons: {
      solid: ['pen', 'user', 'envelope', 'paper-plane', 'cake-candles', 'mobile-screen-button', 'xmark']
    }
  }
})