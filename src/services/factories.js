import {sensorTypes} from './types/sensors'
import {deviceTypes} from "./types/devicesType"
import {firmwares} from './types/firmwares'

function objectToArrayOfObjects(obj) {
    return Object.keys(obj).map((key) => {
        //return {[key]: obj[key]}
        return {
            value: key,
            text: obj[key]
        }
    })
}

const factories = {
    getSensorReadingsByType: (type) => {
        if (type in sensorTypes) {
            return sensorTypes[type]
        }
        throw new Error(`Readings not defined for ${type} in the sensorTypes`)
    },

    sensorTypes: Object.keys(sensorTypes),

    getFirmwareReadableFormat: (type) => {
        return (type in firmwares) ? firmwares[type] : 'None'
    },

    getFirmwareList: () => {
        return objectToArrayOfObjects(firmwares)
    },

    getDeviceTypeReadableFormat: (type) => {
        return (type in deviceTypes) ? deviceTypes[type] : 'None'
    },

    getDeviceTypeList: () => {
        return objectToArrayOfObjects(deviceTypes)
    },
}

export default factories