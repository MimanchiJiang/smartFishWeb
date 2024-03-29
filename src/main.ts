import './lib/xue.scss'
import './index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router';
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/dist/index.css'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')

