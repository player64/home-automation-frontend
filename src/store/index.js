import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        isAuthenticated: !!(localStorage.getItem('jwt'))
    },
    mutations: {
        setAuthenticate(state, payload) {
            state.isAuthenticated = payload
        }
    },
    getters: {
        isAuth(state) {
            return state.isAuthenticated
        }
    }
})