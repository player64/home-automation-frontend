import {sensorTypes} from './types/sensors'
import {deviceTypes} from "./types/devicesType"
import {firmwares} from './types/firmwares'
import {eventRules, eventTypes} from "@/services/types/eventsType"

function objectToArrayOfObjects(obj) {
    return Object.keys(obj).map((key) => {
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

    getSensorReadingsTypesSelectForm: (type) => {
        const sensor = factories.getSensorReadingsByType(type)

        return sensor.map((item) => item.key)
    },

    getSensorUnits: (sensor, type) => {
        const readings = factories.getSensorReadingsByType(sensor).filter((item) => item.key === type)
        return (readings.length) ? readings[0].units : ''
    },

    sensorTypes: Object.keys(sensorTypes),

    getFirmwareReadableFormat: (type) => {
        return (type in firmwares) ? firmwares[type] : 'None'
    },

    getFirmwareList: () => {
        return objectToArrayOfObjects(firmwares)
    },

    getEventsType: () => {
        return objectToArrayOfObjects(eventTypes)
    },

    getEventsRules: () => {
        return objectToArrayOfObjects(eventRules)
    },

    getDeviceTypeReadableFormat: (type) => {
        return (type in deviceTypes) ? deviceTypes[type] : 'None'
    },

    getDeviceTypeList: () => {
        return objectToArrayOfObjects(deviceTypes)
    },
}

export default factories