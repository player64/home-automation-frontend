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
        device: null,
        devices: [],
        event: null,
        workspace: null,
        workspaces: [],
        user: null,
        users: []
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
        // devices
        setDevice(state, payload) {
            state.device = payload
        },
        setDevices(state, payload) {
            state.devices = payload
        },
        setEvent(state, payload) {
            state.event = payload
        },
        // workspaces
        setWorkspace(state, payload) {
            state.workspace = payload
        },
        setWorkspaces(state, payload) {
            state.workspaces = payload
        },
        // users
        setUser(state, payload) {
            state.user = payload
        },
        setUsers(state, payload) {
            state.users = payload
        },
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
        },
        devices(state) {
            return state.devices
        },
        event(state) {
            return state.event
        },
        workspace(state) {
            return state.workspace
        },
        workspaces(state) {
            return state.workspaces
        },
        user(state) {
            return state.user
        },
        users(state) {
            return state.users
        },
    }
})