const util = {
    apiUrl: process.env.VUE_APP_API_URL,
    captchaKey: process.env.VUE_APP_CAPTCHA_KEY,
    convertDate: (date) => {
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
        return new Date(date).toLocaleTimeString('en-gb')
    },
    capitalizeFirstLetter: (string) => {
        return string[0].toUpperCase() + string.slice(1)
    }
}
export default util