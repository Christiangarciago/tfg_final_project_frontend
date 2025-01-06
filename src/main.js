import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import { createPinia } from 'pinia'
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import { FontAwesomeIcon } from './fontawesome.js';


const pinia = createPinia()

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(pinia).use(router).use(BootstrapVue3).mount('#app');
