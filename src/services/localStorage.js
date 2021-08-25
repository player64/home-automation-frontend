const localStorageJWT = {
    load: () => {
        const storage = localStorage.getItem("jwt");
        try {
            return JSON.parse(storage)
        } catch (e) {
            return false
        }
    },

    isSet: () => {
        return (localStorageJWT.load())
    },

    getItem: (key) => {
        const _json_storage = localStorageJWT.load()
        if(_json_storage && key in _json_storage) {
            return _json_storage[key]
        }
        return false
    },

    setAll: (value) => {
        localStorage.setItem('jwt', JSON.stringify(value))
    },

    setItem: (key, value) => {
        const _json_storage = localStorageJWT.load()
        if(_json_storage) {
            _json_storage[key] = value
            localStorage.setItem('jwt', JSON.stringify(_json_storage))
        }
    },

    deleteAll: () => {
        try {
            localStorage.removeItem('jwt')
        } catch (e) {
            console.log(e)
        }
    }
}

export default localStorageJWT