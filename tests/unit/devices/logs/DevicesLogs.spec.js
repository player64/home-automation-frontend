import {shallowMount} from '@vue/test-utils';
import DeviceLogs from '@/components/devices/DeviceLogs'

describe('Testing DeviceLogs component methods', () => {

    it('Sensor keys correct format', () => {
        const wrapper = shallowMount(DeviceLogs, {
            propsData: {
                data: {
                    sensor_type: 'am2301',
                    logs: []
                }
            }
        })

        expect(wrapper.vm.sensorKeys()).toStrictEqual([
            {key: 'temperature', unit: '°C'},
            {key: 'humidity', unit: '%'}
        ])

        expect(wrapper.vm.headers).toStrictEqual([
            {text: 'Temperature', value: 'temperature'},
            {text: 'Humidity', value: 'humidity'},
        ])
    })

    it('Relay keys correct format', () => {
        const wrapper = shallowMount(DeviceLogs, {
            propsData: {
                data: {
                    logs: []
                }
            }
        })

        expect(wrapper.vm.relayKeys()).toStrictEqual([
            {key: 'state', unit: null},
        ])

        expect(wrapper.vm.headers).toStrictEqual([
            {text: 'Action', value: 'state'},
        ])
    })

    it('does it correctly convert the relay log', () => {
        jest.disableAutomock()
        const relay = {
            type: "relay",
            logs:  [{
                time: '2021-08-25T01:00:00+01:00',
                readings: {
                    state: 'OFF',
                }
            }],
        }

        const wrapper = shallowMount(DeviceLogs, {
            propsData: {
                data: relay
            }
        })

        expect(wrapper.vm.logs).toStrictEqual(
            [{
                time: '01:00:00',
                state: 'OFF',
            }]
        )
    })

    it('does it correctly convert the sensor log', () => {
        const sensor = {
            type: "sensor",
            sensor_type: "am2301",
            logs:  [{
                time: '2021-08-25T01:00:00+01:00',
                readings: {
                    humidity: 75.5,
                    temperature: 25.1
                }
            }],
        }

        const wrapper = shallowMount(DeviceLogs, {
            propsData: {
                data: sensor
            }
        })
        expect(wrapper.vm.logs).toStrictEqual(
            [{
                time: '01:00:00',
                temperature: '25.1°C',
                humidity: '75.5%',
            }]
        )
    })

    it('che', () => {
        const workspaces = [
            {pk: 1, name: 'Test'},
            {pk: 2, name: 'Test 2'},
            {pk: 3, name: 'Test 3'},
            {pk: 4, name: 'Test 4'},
            {pk: 5, name: 'Test 5'}
        ]

        const res = workspaces.filter((item)=>item.pk === 4)

        expect(res[0].name).toBe('Test 4')
    })

})