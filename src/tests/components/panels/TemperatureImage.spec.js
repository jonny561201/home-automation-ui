import React from 'react';
import { shallow } from 'enzyme';
import TemperatureImage from '../../../components/panels/TemperatureImage';


describe('TemperatureImage', () => {
    // let tempImage;
    let clear = "clear sky";
    let cloudy = "broken clouds";

    beforeEach(() => {
        // tempImage = shallow(<TemperatureImage description={description} />);
    });

    it('should return sunny weather icon', () => {
        const tempImage = shallow(<TemperatureImage description={clear} />);
        const actual = tempImage.find('img');
        expect(actual.props()).toHaveProperty('label', 'clear sky');
    });

    it('should return cloudy weather icon', () => {
        const tempImage = shallow(<TemperatureImage description={cloudy} />);

        const actual = tempImage.find('img');
        expect(actual.props()).toHaveProperty('label', 'broken clouds');
    });
});