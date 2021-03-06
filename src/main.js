import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "@/router";
import {store} from './store'
import axios from './axios'
import VueAxios from 'vue-axios'


import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

new Vue({
    router: router,
    store: store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
