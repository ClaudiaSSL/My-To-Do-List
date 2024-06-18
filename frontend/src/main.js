import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.css'
import Vue from 'vue'

const app = createApp(App)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

app.use(router)
// create pinia instance
const pinia = createPinia();

// apply pinia to app
app.use(pinia);

app.mount('#app')
