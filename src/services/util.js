const util = {
    apiUrl: process.env.VUE_APP_API_URL,
    captchaKey: process.env.VUE_APP_CAPTCHA_KEY,
    convertDate: (date) => {
        if(!date) return ''
        return new Date(date).toLocaleDateString(
            'en-gb',
            {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: 'Europe/Dublin'
            }
        )
    },
    getTimeFromDate: (date) => {
        if(!date) return ''
        return new Date(date).toLocaleTimeString('en-gb')
    },
    capitalizeFirstLetter: (string) => {
        return string[0].toUpperCase() + string.slice(1)
    },
    convertDjangoObjectToSelectField: (item) => {
        return {
            value: item.pk,
            text: item.name
        }
    },
    convertDjangoArrayOfObjectsToSelectField: (array) => {
        if (!array.length) return []
        return array.map((item) => {
            return util.convertDjangoObjectToSelectField(item)
        })
    },
    convertDjangoErrorToString: (response) => {
        let out = ''
        if(typeof response === 'object') {
            Object.keys(response).map((key) => {
                if(key !== 'error') {
                    out += `${key}:`
                }

                if(typeof response[key] === 'object') {
                    response[key].forEach((error) => {
                        out += ' ' + error
                    })
                } else if(typeof response[key] === 'string') {
                    out += response[key]
                }
            })
        } else {
            out = response
        }
        return out
    }
}
export default util