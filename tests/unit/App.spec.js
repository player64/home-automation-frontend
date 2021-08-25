import {mount, createLocalVue} from "@vue/test-utils"
import '@testing-library/jest-dom'
import App from '@/App'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login'
import routes from "@/router.js"
import Vuetify from 'vuetify'
import Vuex from 'vuex'


const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isAuthenticated: false,
        title: 'Test title'
    },
    mutations: {
        setTitle(state, payload) {
            state.title = payload
        }
    },
    getters: {
        title: () => {
            return 'Test title'
        }
    }
})

describe("App", () => {
    const localVue = createLocalVue()
    let vuetify
    let router

    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter({routes})
    })

    it('It renders the login component via routing', async () => {
        const wrapper = mount(App, {
            localVue,
            vuetify,
            store,
            router,
        })

        await router.push("/login")
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent(Login).exists()).toBe(true)
    })


    it('It should render the correct title', async () => {
        const wrapper = mount(App, {
            localVue,
            vuetify,
            store,
            router
        })
        expect(wrapper.text()).toMatch('Test title')
    })
})