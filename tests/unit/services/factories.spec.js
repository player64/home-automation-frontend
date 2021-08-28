import factories from '@/services/factories'

describe('Testing types methods', () => {
    it('getSensorReadings', () => {
        expect(factories.getSensorReadingsByType('am2301')).toStrictEqual(
            [
                {key: 'temperature', units: '°C'},
                {key: 'humidity', units: '%'}
            ]
        )

        expect(() => factories.getSensorReadingsByType('test'))
            .toThrow('Readings not defined for test in the sensorTypes')
    })

    it('sensorTypes', () => {
        expect(factories.sensorTypes).toStrictEqual(['am2301'])
    })

    it('getFirmwareReadableFormat', () => {
        expect(factories.getFirmwareReadableFormat('tasmota')).toBe('Tasmota')
        expect(factories.getFirmwareReadableFormat('test')).toBe('None')
    })

    it('getFirmwareList', () => {
        expect(factories.getFirmwareList()).toStrictEqual([{'tasmota': 'Tasmota'}])
    })

    it('getDeviceTypeReadableFormat', () => {
        expect(factories.getDeviceTypeReadableFormat('sensor')).toBe('Sensor')
        expect(factories.getDeviceTypeReadableFormat('relay')).toBe('Relay switch')
        expect(factories.getDeviceTypeReadableFormat('test')).toBe('None')
    })

    it('getDeviceTypeList', () => {
        const expected = [
            {relay: 'Relay switch'},
            {sensor: 'Sensor'},
        ]
        expect(factories.getDeviceTypeList()).toStrictEqual(expected)
    })
})