import Dashboard from "@/views/Dashboard"
import Login from "@/views/login/Login"
import LostPassword from "@/views/login/LostPassword"
import ResetPassword from "@/views/login/ResetPassword"
import DeviceSingle from "@/views/DeviceSingle"
import VueRouter from "vue-router"
import Devices from "@/views/Devices"
import Users from "@/views/Users"
import Workspaces from "@/views/Workspaces"
import NotFound from "@/views/NotFound";
import {store} from "@/store"

export const routes = [
    {path: '/', component: Dashboard, name: 'Dashboard'},
    {path: '/devices', component: Devices, name: 'Devices'},
    {path: '/device/:id', component: DeviceSingle, name: 'Device Details'},
    {path: '/users', component: Users, name: 'Users'},
    {path: '/workspaces', component: Workspaces, name: 'Workspaces'},
    {path: '/login', component: Login, name: 'Login'},
    {path: '/lost-password', component: LostPassword, name: 'Lost Password'},
    {path: '/lost-password/:token', component: ResetPassword, name: 'Reset Password'},
    {path: '*', component: NotFound, name: 'Not Found'}
]


const router = new VueRouter({
    routes: routes,
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})

router.beforeEach((to, from, next) => {
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

export default router