import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        isAuthenticated: !!(localStorage.getItem('jwt')),
        title: 'Home automation',
        message: {
            content: null,
            status: null
        },
        device: null
    },
    mutations: {
        setAuthenticate(state, payload) {
            state.isAuthenticated = payload
        },
        setTitle(state, payload) {
            state.title = payload
        },
        setMessage(state, payload) {
            state.message = payload
        },
        clearMessage(state) {
            state.message = {
                content: null,
                status: null
            }
        },
        setDevice(state, payload) {
            state.device = payload
        }
    },
    getters: {
        isAuth(state) {
            return state.isAuthenticated
        },
        title(state) {
            return state.title
        },
        message(state) {
            return state.message
        },
        device(state) {
            return state.device
        }
    }
})