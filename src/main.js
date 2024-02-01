import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

const app = createApp(App);

const instance = axios.create({
  baseURL: 'http://localhost:3000', // 将此地址更改为你的本地后端地址
});

// 将 Axios 实例添加到 Vue 实例的原型链上
app.config.globalProperties.$axios = instance;


createApp(App).use(router).mount('#app')
