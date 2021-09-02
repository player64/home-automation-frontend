import Dashboard from "@/views/Dashboard"
import Login from "@/views/login/Login"
import LostPassword from "@/views/login/LostPassword"
import ResetPassword from "@/views/login/ResetPassword"
import DeviceSingle from "@/views/devices/DeviceSingle"
import VueRouter from "vue-router"
import Devices from "@/views/devices/Devices"
import Users from "@/views/users/Users"
import Workspaces from "@/views/workspaces/Workspaces"
import NotFound from "@/views/NotFound";
import {store} from "@/store"
import DeviceNew from "@/views/devices/DeviceNew";
import WorkspaceNew from "@/views/workspaces/WorkspaceNew";
import WorkspaceEdit from "@/views/workspaces/WorkspaceEdit";
import UserNew from "@/views/users/UserNew";
import UserEdit from "@/views/users/UserEdit";
import EventNew from "@/views/events/EventNew";
import EventEdit from "@/views/events/EventEdit";

export const routes = [
    {path: '/', component: Dashboard, name: 'Dashboard'},
    {path: '/devices', component: Devices, name: 'Devices'},
    {path: '/device/:id/:tab', component: DeviceSingle, name: 'DeviceDetails'},
    {path: '/device/add', component: DeviceNew, name: 'DeviceNew'},
    {path: '/users', component: Users, name: 'Users'},
    {path: '/user/add', component: UserNew, name: 'UserAdd'},
    {path: '/user/:id', component: UserEdit, name: 'UserEdit'},
    {path: '/workspaces', component: Workspaces, name: 'Workspaces'},
    {path: '/workspace/add', component: WorkspaceNew, name: 'WorkspaceNew'},
    {path: '/workspace/edit/:id', component: WorkspaceEdit, name: 'WorkspaceEdit'},
    {path: '/event/add/:deviceId', component: EventNew, name: 'EventNew'},
    {path: '/event/edit/:id', component: EventEdit, name: 'EventEdit'},
    {path: '/login', component: Login, name: 'Login'},
    {path: '/lost-password', component: LostPassword, name: 'LostPassword'},
    {path: '/lost-password/:token', component: ResetPassword, name: 'ResetPassword'},
    {path: '*', component: NotFound, name: 'NotFound'}
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