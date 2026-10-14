import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { seoPrerender } from './build/seo-prerender'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), seoPrerender()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/index.scss" as *;`,
      },
    },
  },
  server: {
    allowedHosts: ['3d5eb1be3248.ngrok-free.app'],
  },
})
