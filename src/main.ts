// register vue composition api globally
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'

import '@purge-icons/generated'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './styles/main.css'
import 'virtual:windi-utilities.css'
import 'tippy.js/dist/tippy.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 78,
      }
    }
    if (savedPosition)
      return savedPosition
    return { top: 0 }
  },
})
app.use(router)
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
