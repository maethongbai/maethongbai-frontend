import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

// import './assets/main.css'
import './assets/index.css'
import 'flowbite';

const app = createApp(App)

const axiosInstance = axios.create({
    baseURL: "http://localhost/api" // laravel api base
})

app.config.globalProperties.$axios = { ...axiosInstance } // สร้าง object ใหม่โดย copy properties ของ object เดิม


app.use(createPinia())
app.use(router)

app.mount('#app')
