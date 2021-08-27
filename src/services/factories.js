const sensorTypes = {
    am2301: [
        {
            key: 'temperature',
            units: '°C'
        },
        {
            key: 'humidity',
            units: '%'
        }
    ],
}

const getType = (type) => {
    if (type in sensorTypes) {
        return sensorTypes[type]
    }
    return false
}

const firmwares = {
    'tasmota': 'Tasmota'
}

const deviceTypes = {
    'relay': 'Relay switch',
    'sensor': 'Sensor'
}

function objectToArrayOfObjects(obj) {
    return Object.keys(obj).map((key) => [{key: key, name: obj[key]}])
}

const factories = {
    getSensorReadings: (type) => getType(type),
    sensorTypes: Object.keys(sensorTypes),
    getTypes: (type = '', format = 'array', key = false) => {
        const types = {
            'firmwares': firmwares,
            'devices': deviceTypes,
        }

        if(!(type in types)) {
            throw new Error(`There is no ${type} defined.`)
        }

        if (format === 'array') {
            return objectToArrayOfObjects(types[type])
        }

        if(key) {
            return ( key in types[type] ) ? types[type][key] : 'None'
        }
        return types[type]
    },
}

export default factories