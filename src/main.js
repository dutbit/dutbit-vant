import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router.js'
import App from './App.vue'
import '@vant/touch-emulator'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)

app.use(Lazyload)
if(import.meta.env.DEV) {
    axios.defaults.baseURL = 'http://127.0.0.1:5000/apivue'
    // axios.defaults.baseURL = 'https://www.dutbit.com/apivue'
    console.log('正处于开发模式下')
} else {
    axios.defaults.baseURL = 'https://www.dutbit.com/apivue'
}
app.mount('#app')

