import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

// Apply saved accent color on load
try {
  const stored = localStorage.getItem('cclk_user')
  if (stored) {
    const userData = JSON.parse(stored)
    if (userData?.settings?.accentColor) {
      document.documentElement.dataset.accent = userData.settings.accentColor
    }
  }
} catch {
  // Ignore
}
