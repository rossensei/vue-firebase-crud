import { createApp } from 'vue'
import App from './App.vue'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router'

const app = createApp(App)

app.use(bootstrap)

app.use(router)

app.mount('#app')