import { convertDate } from '../../utilities/Services';


describe('Services', () => {

    it('should convert hours date object with matching hours', () => {
        const time = '07:45:00';

        const actual = convertDate(time);

        expect(actual.getHours()).toEqual(7);
    });
});