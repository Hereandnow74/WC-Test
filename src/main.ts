// register vue composition api globally
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { registerSW } from 'virtual:pwa-register'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

import '@purge-icons/generated'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './styles/main.css'
import 'virtual:windi-utilities.css'
import 'tippy.js/dist/tippy.css'
import 'prismjs/themes/prism-okaidia.min.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const element = document.querySelector(to.hash.replaceAll(' ', '\\ ').replaceAll(':', '\\:'))
      nextTick(() => element?.scrollIntoView({ behavior: 'smooth' }))
      // element?.scrollIntoView({ behavior: 'smooth' })
      return
      // return {
      //   selector: to.hash,
      //   behavior: 'smooth',
      // }
    }
    if (savedPosition)
      return savedPosition
    return { top: 0 }
  },
})
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content, updating...')
    updateSW()
  },
  onOfflineReady() {
    console.log('Cached for offline use.')
  },
})
