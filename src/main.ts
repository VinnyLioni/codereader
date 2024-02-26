import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import "vue-toastification/dist/index.css";
import './assets/fontawesome/all.js'

const options: PluginOptions = {
    position: POSITION.TOP_CENTER,
    timeout: 1800,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: false,
    icon: true,
    rtl: false
};

const app = createApp(App)
const pinia = createPinia()

app.use(Toast, options, {
    maxToasts: 5,
    newestOnTop: true
})
app.use(pinia)
app.mount('#app')
