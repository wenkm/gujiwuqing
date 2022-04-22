import { createApp } from 'vue'
import App from './App.vue'
import '@/style/global.less'
import router from './router'
import config from '@/config'

document.title = config.SITE_NAME;
const app = createApp(App)
app.config.globalProperties.config = config;
app.use(router).mount('#app')
