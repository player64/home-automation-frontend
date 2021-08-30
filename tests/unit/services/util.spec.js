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

    it('convertDjangoObjectToSelectField', () => {
        expect(util.convertDjangoObjectToSelectField({pk: 1, name: 'Test'}))
            .toStrictEqual({value: 1, text: 'Test'})
    })

    it('convertDjangoArrayOfObjectsToSelectField', () => {
        expect(util.convertDjangoArrayOfObjectsToSelectField([{pk: 1, name: 'Test'}]))
            .toStrictEqual([{value: 1, text: 'Test'},])
    })

    it('convertDjangoErrorToString', () => {
        const error = {name: ['This field is required.']}
        expect(util.convertDjangoErrorToString(error))
            .toBe('name: This field is required.<br>')

        const error2 = {error: 'Something went wrong'}
        expect(util.convertDjangoErrorToString(error2))
            .toBe('Something went wrong')
    })
})