import util from '@/services/util'

const testDate = '2021-08-25T01:15:00+01:00'

describe('Testing utilities methods', () => {
    it('convertDate', () => {
        expect(util.convertDate(testDate)).toBe('25/08/2021, 01:15:00')
    })

    it('getTimeFromDate', () => {
        expect(util.getTimeFromDate(testDate)).toBe('01:15:00')
    })

    it('capitalizeFirstLetter', () => {
        expect(util.capitalizeFirstLetter('test test test')).toBe('Test test test')
    })
})