import { parseDate } from '../../utilities/Services';


describe('Services', () => {

    it('should convert hours date object with matching hours', () => {
        const time = '07:45:00';

        const actual = parseDate(time);

        expect(actual.getHours()).toEqual(7);
    });

    it('should convert minutes date object with matching hours', () => {
        const time = '08:23:00';

        const actual = parseDate(time);

        expect(actual.getMinutes()).toEqual(23);
    });
});