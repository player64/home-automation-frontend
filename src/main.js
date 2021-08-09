import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "@/router";
import {store} from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Vue.use(VueMaterial)

const routes = new VueRouter({
    routes: router,
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})

routes.beforeEach((to, from, next) => {
    const componentsWhiteListNoAuth = [
        'Login',
        'LostPassword',
        'ResetPassword'
    ]

    if(!componentsWhiteListNoAuth.includes(to.name) && !store.getters.isAuth) {
        next({name: 'Login'})
    } else {
        next()
    }
})

new Vue({
    router: routes,
    store: store,
    render: h => h(App),
}).$mount('#app')
