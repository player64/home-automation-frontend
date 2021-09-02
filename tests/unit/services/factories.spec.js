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

    it('getSensorUnits', () => {
        expect(factories.getSensorUnits('am2301', 'humidity')).toBe('%')
    })

    it('getSensorReadingsTypesSelectForm', () => {
        expect(factories.getSensorReadingsTypesSelectForm('am2301')).toStrictEqual(
            ['temperature', 'humidity']
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
        expect(factories.getFirmwareList()).toStrictEqual([
            {value: 'tasmota', text: 'Tasmota'}
        ])
    })

    it('getDeviceTypeReadableFormat', () => {
        expect(factories.getDeviceTypeReadableFormat('sensor')).toBe('Sensor')
        expect(factories.getDeviceTypeReadableFormat('relay')).toBe('Relay switch')
        expect(factories.getDeviceTypeReadableFormat('test')).toBe('None')
    })

    it('getDeviceTypeList', () => {
        const expected = [
            {value: 'relay', text: 'Relay switch'},
            {value: 'sensor', text: 'Sensor'},
        ]
        expect(factories.getDeviceTypeList()).toStrictEqual(expected)
    })
})