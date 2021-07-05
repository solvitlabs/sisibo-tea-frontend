import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/index.css"

Vue.config.productionTip = false

export const bus = new Vue()

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')