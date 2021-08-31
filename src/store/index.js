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
        }
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
        }
    }
})