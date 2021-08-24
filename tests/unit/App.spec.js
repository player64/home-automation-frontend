import { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import App from '@/App'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import routes from "@/router.js"

const localVue = createLocalVue()
localVue.use(VueRouter)

describe("App", () => {
    it("renders a child component via routing", async () => {
        const router = new VueRouter({ routes })
        const wrapper = mount(App, {
            localVue,
            router
        })

        router.push("/login")
        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent(Login).exists()).toBe(true)
    })
})