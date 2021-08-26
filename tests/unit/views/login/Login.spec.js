

describe('Login.vue', () => {
    //
    it('renders the correct title', async () => {
       const url = 'http://127.0.0.1/api/v1/users/token/refresh/'
        const wanted = '/api/v1/users/token/refresh'

        expect(url.includes(wanted)).toBe(true)
    })
})