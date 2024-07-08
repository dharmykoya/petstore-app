import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import Paginator from 'primevue/paginator'
import Menu from 'primevue/menu'
import Select from 'primevue/select'
import 'primeicons/primeicons.css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia).use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false,
    },
  },
})
app.component('Tag', Tag)
app.component('Button', Button)
app.component('Dataview', DataView)
app.component('Menu', Menu)
app.component('Paginator', Paginator)
app.component('Select', Select)
app.mount('#app')
