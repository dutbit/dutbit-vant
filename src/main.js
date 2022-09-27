import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router.js'
import App from './App.vue'

const app = createApp(App)
app.use(VueAxios, axios)
if(import.meta.env.DEV) {
    axios.defaults.baseURL = 'http://127.0.0.1:3000/apivue'
    console.log('正处于开发模式下')
} else {
    axios.defaults.baseURL = 'https://www.dutbit.com/apivue'
}
app.mount('#app')

