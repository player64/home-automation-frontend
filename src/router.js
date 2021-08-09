import Dashboard from "@/components/Dashboard"
import Login from "@/components/Login";
import LostPassword from "@/components/login/LostPassword";
import ResetPassword from "@/components/login/ResetPassword";

export const router = [
    {path: '/', component: Dashboard, name: 'Dashboard'},
    {path: '/login', component: Login, name: 'Login'},
    {path: '/lost-password', component: LostPassword, name: 'LostPassword'},
    {path: '/lost-password/:token', component: ResetPassword, name: 'ResetPassword'},
]

export default router