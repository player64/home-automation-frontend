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

const sensors = {
    getKeys: (type) => getType(type),
    types: Object.keys(sensorTypes)
}

export default sensors