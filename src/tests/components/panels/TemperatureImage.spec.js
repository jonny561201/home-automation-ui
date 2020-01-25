import React from 'react';
import { shallow } from 'enzyme';
import TemperatureImage from '../../../components/panels/TemperatureImage';


describe('TemperatureImage', () => {
    const clear = "clear sky";
    const cloudy = "broken clouds";
    const highIntensityRain = "heavy intensity rain";
    const veryHeavyRain = "very heavy rain";
    const extremeRain = "extreme rain";
    const showerRain = "shower rain";
    const heavyIntensityRain = "heavy intensity shower rain";
    const drizzle = "drizzle";
    const drizzleRain = "drizzle rain";
    const lightRain = "light rain";
    const moderateRain = "moderate rain";
    const snow = "snow";
    const lightSnow = "light snow";

    it('should return sunny weather icon', () => {
        const tempImage = shallow(<TemperatureImage description={clear} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'clear sky');
    });

    it('should return cloudy weather icon', () => {
        const tempImage = shallow(<TemperatureImage description={cloudy} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'cloudy');
    });

    it('should show heavy rain icon when heavy intensity rain', () => {
        const tempImage = shallow(<TemperatureImage description={highIntensityRain} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy rain');
    });

    it('should show heavy rain icon when very heavy rain', () => {
        const tempImage = shallow(<TemperatureImage description={veryHeavyRain} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy rain');
    });

    it('should show heavy rain icon when extreme rain', () => {
        const tempImage = shallow(<TemperatureImage description={extremeRain} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy rain');
    });

    it('should show heavy rain icon when shower rain', () => {
        const tempImage = shallow(<TemperatureImage description={showerRain} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy rain');
    });

    it('should show heavy rain icon when heavy intensity shower rain', () => {
        const tempImage = shallow(<TemperatureImage description={heavyIntensityRain} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy rain');
    });

    it('should show light rain icon when drizzle', () => {
        const tempImage = shallow(<TemperatureImage description={drizzle} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'light rain');
    });

    it('should show light rain icon when drizzle rain', () => {
        const tempImage = shallow(<TemperatureImage description={drizzleRain} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'light rain');
    });

    it('should show light rain icon when light rain', () => {
        const tempImage = shallow(<TemperatureImage description={lightRain} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'light rain');
    });

    it('should show light rain icon when moderate rain', () => {
        const tempImage = shallow(<TemperatureImage description={moderateRain} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'light rain');
    });

    it('should show light snow icon when snow', () => {
        const tempImage = shallow(<TemperatureImage description={snow} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'light snow');
    });

    it('should show light snow icon when light snow', () => {
        const tempImage = shallow(<TemperatureImage description={lightSnow} />);

        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'light snow');
    });
});