import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        isAuthenticated: !!(localStorage.getItem('jwt')),
        title: false
    },
    mutations: {
        setAuthenticate(state, payload) {
            state.isAuthenticated = payload
        },
        setTitle(state, payload) {
            state.title = payload
        }
    },
    getters: {
        isAuth(state) {
            return state.isAuthenticated
        },
        title(state) {
            return state.title
        }
    }
})