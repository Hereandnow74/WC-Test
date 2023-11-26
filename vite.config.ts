import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [
    Vue(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Waifu Catalog Interactive',
        short_name: 'WC Interactive',
        description: 'Waifu Catalog (by SwiftRosenthal) made Interactive by om1cr0n',
        theme_color: '#822bc4',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10000000,
      },
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [
        // auto import icons
        // https://github.com/antfu/vite-plugin-icons
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    // https://github.com/antfu/vite-plugin-icons
    Icons(),

    PurgeIcons(),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),

    viteStaticCopy({
      targets: [
        {
          src: './src/data/json/characters.json',
          dest: 'json/',
        },
        {
          src: './src/data/json/userCharacters.json',
          dest: 'json/',
        },
      ],
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },

  json: {
    stringify: true,
  },

  build: {
    rollupOptions: {
      output: {
        // args.getModuleInfo(id))?.ast?.end <= 2000
        manualChunks: id => (id.includes('node_modules') ? 'vendor' : null),
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: 'assets/[name].js',
      },
    },
  },
})
