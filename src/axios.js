/**
 * This creates an axios interceptor that implements refresh token on token expire
 */
import axios from "axios";
import router from "./router";
import localStorageJWT from "@/services/localStorage";
import util from '@/services/util'

axios.interceptors.request.use(
    config => {
        const token = localStorageJWT.getItem('access')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
)

//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
},  (error) => {

    const originalRequest = error.config

    if (error.response.status === 401 && originalRequest.url.includes('/api/v1/users/token/refresh/')) {
        router.push('/login').catch(()=>{})
        return
    }

    if (error.response.status === 401 && !originalRequest._retry) {
        const token_refresh = localStorageJWT.getItem('refresh')
        if(!token_refresh) {
            router.push('/login').catch(()=>{})
            return
        }
        originalRequest._retry = true
        return axios.post(`${util.apiUrl}/users/token/refresh/`,
            {
                "refresh": token_refresh
            })
            .then(res => {
                if (res.status === 200) {
                    localStorageJWT.setItem('access', res.data.access)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`
                    return axios(originalRequest)
                }
            })
    }
    return Promise.reject(error)
})

export default axios