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
      link: [
        { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
      ],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "웹 퍼블리셔 김민희",
      meta: [
        {
          hid: "웹 퍼블리셔 김민희 포트폴리오 사이트입니다.",
          name: "웹 퍼블리셔 김민희 포트폴리오 사이트입니다.",
          content:
            "웹퍼블리셔 김민희의 포트폴리오 사이트입니다.",
        },
        {
          name: "keywords",
          content: "웹퍼블리셔, 웹디자인, 프론트엔드",
        },
        { name: "author", content: "author" },
        { name: "og:type", property: "website" },
        { name: "og:site_name", property: "웹퍼블리셔 김민희 포트폴리오" },
        { name: "og:title", property: "og:title", content: "웹퍼블리셔 김민희 포트폴리오" },
        {
          name: "og:description",
          property: "og:description",
          content:
            "웹퍼블리셔 김민희의 포트폴리오 사이트입니다.",
        },
        {
          name: "og:image",
          property: "og:image",
          content: "https://minheekim3235.github.io/portfolio/images/og_thumb.png",
        },
        { name: "twitter:card", content: "웹퍼블리셔 김민희의 포트폴리오 사이트입니다." },
        { name: "twitter:title", content: "웹퍼블리셔 김민희" },
        {
          name: "twitter:description",
          content:
            "웹퍼블리셔 김민희의 포트폴리오 사이트입니다.",
        },
        { name: "twitter:image", content: "https://minheekim3235.github.io/portfolio/images/og_thumb.png" },
      ],
    },
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
      solid: ['pen', 'user', 'envelope', 'paper-plane', 'cake-candles', 'mobile-screen-button', 'xmark', 'chart-diagram', 'palette', 'laptop-code', 'code']
    }
  }
})