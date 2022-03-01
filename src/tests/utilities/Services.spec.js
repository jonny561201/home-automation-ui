import {  isDayLight, parseDate } from '../../utilities/Services';


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

    describe('isDayLight', () => {
        const lat = 41.621208;
        const long = -93.831599;
        const coords = {latitude: lat, longitude: long};

        describe('Garage Door Coords', () => {

            it('should return true when One PM', () => {
                const febTwentyEight = new Date(1646074800000);
                const actual = isDayLight(coords, null, febTwentyEight);
    
                expect(actual).toBeTruthy()
            });
    
            it('should return true when Seven AM', () => {
                const febTwentyEight = new Date(1646053200000);
                const actual = isDayLight(coords, null, febTwentyEight);
    
                expect(actual).toBeTruthy()
            });
    
            it('should return true when Twelve PM', () => {
                const febTwentyEight = new Date(1646071200000);
                const actual = isDayLight(coords, null, febTwentyEight);
    
                expect(actual).toBeTruthy()
            });
    
            it('should return true when Five PM', () => {
                const febTwentyEight = new Date(1646089200000);
                const actual = isDayLight(coords, null, febTwentyEight);
    
                expect(actual).toBeTruthy()
            });
    
            it('should return false when One AM', () => {
                const febTwentyEight = new Date(1646031600000);
                const actual = isDayLight(coords, null, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
    
            it('should return false when Eight PM', () => {
                const febTwentyEight = new Date(1646100000000);
                const actual = isDayLight(coords, null, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
    
            it('should return false when Seven PM', () => {
                const febTwentyEight = new Date(1646096400000);
                const actual = isDayLight(coords, null, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
    
            it('should return false when Six AM', () => {
                const febTwentyEight = new Date(1646096400000);
                const actual = isDayLight(coords, null, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
    
            it('should return false when Eleven PM', () => {
                const febTwentyEight = new Date(1646110800000);
                const actual = isDayLight(coords, null, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
    
            it('should return false when Twelve AM', () => {
                const febTwentyEight = new Date(1646028000000);
                const actual = isDayLight(coords, null, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
        });

        describe('User Coords', () => {

            it('should return true when One PM', () => {
                const febTwentyEight = new Date(1646074800000);
                const actual = isDayLight(null, coords, febTwentyEight);
    
                expect(actual).toBeTruthy()
            });
    
            it('should return true when Seven AM', () => {
                const febTwentyEight = new Date(1646053200000);
                const actual = isDayLight(null, coords, febTwentyEight);
    
                expect(actual).toBeTruthy()
            });
    
            it('should return true when Twelve PM', () => {
                const febTwentyEight = new Date(1646071200000);
                const actual = isDayLight(null, coords, febTwentyEight);
    
                expect(actual).toBeTruthy()
            });
    
            it('should return true when Five PM', () => {
                const febTwentyEight = new Date(1646089200000);
                const actual = isDayLight(null, coords, febTwentyEight);
    
                expect(actual).toBeTruthy()
            });
    
            it('should return false when One AM', () => {
                const febTwentyEight = new Date(1646031600000);
                const actual = isDayLight(null, coords, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
    
            it('should return false when Eight PM', () => {
                const febTwentyEight = new Date(1646100000000);
                const actual = isDayLight(null, coords, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
    
            it('should return false when Seven PM', () => {
                const febTwentyEight = new Date(1646096400000);
                const actual = isDayLight(null, coords, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
    
            it('should return false when Six AM', () => {
                const febTwentyEight = new Date(1646096400000);
                const actual = isDayLight(null, coords, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
    
            it('should return false when Eleven PM', () => {
                const febTwentyEight = new Date(1646110800000);
                const actual = isDayLight(null, coords, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
    
            it('should return false when Twelve AM', () => {
                const febTwentyEight = new Date(1646028000000);
                const actual = isDayLight(null, coords, febTwentyEight);
    
                expect(actual).toBeFalsy()
            });
        });
    });
});