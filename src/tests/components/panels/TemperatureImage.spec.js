import React from 'react';
import { shallow } from 'enzyme';
import TemperatureImage from '../../../components/panels/TemperatureImage';


describe('TemperatureImage', () => {

    it('should return sunny weather icon', () => {
        const tempImage = shallow(<TemperatureImage description={'clear sky'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'sunny');
    });

    it('should return cloudy weather icon', () => {
        const tempImage = shallow(<TemperatureImage description={'cloudy'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'cloudy');
    });

    it('should show heavy rain icon when heavy intensity rain', () => {
        const tempImage = shallow(<TemperatureImage description={'heavy intensity rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy rain');
    });

    it('should show heavy rain icon when very heavy rain', () => {
        const tempImage = shallow(<TemperatureImage description={'very heavy rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy rain');
    });

    it('should show heavy rain icon when extreme rain', () => {
        const tempImage = shallow(<TemperatureImage description={'extreme rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy rain');
    });

    it('should show heavy rain icon when shower rain', () => {
        const tempImage = shallow(<TemperatureImage description={'shower rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy rain');
    });

    it('should show heavy rain icon when heavy intensity shower rain', () => {
        const tempImage = shallow(<TemperatureImage description={'heavy intensity shower rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy rain');
    });

    it('should show drizzle icon when drizzle', () => {
        const tempImage = shallow(<TemperatureImage description={'drizzle'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'drizzle');
    });

    it('should show drizzle icon when drizzle rain', () => {
        const tempImage = shallow(<TemperatureImage description={'drizzle rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'drizzle');
    });

    it('should show drizzle icon when light intensity drizzle', () => {
        const tempImage = shallow(<TemperatureImage description={'light intensity drizzle'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'drizzle');
    });

    it('should show drizzle icon when heavy intensity drizzle', () => {
        const tempImage = shallow(<TemperatureImage description={'heavy intensity drizzle'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'drizzle');
    });

    it('should show drizzle icon when light intensity drizzle rain', () => {
        const tempImage = shallow(<TemperatureImage description={'light intensity drizzle rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'drizzle');
    });

    it('should show drizzle icon when shower drizzle', () => {
        const tempImage = shallow(<TemperatureImage description={'shower drizzle'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'drizzle');
    });

    it('should show light rain icon when light rain', () => {
        const tempImage = shallow(<TemperatureImage description={'light rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'light rain');
    });

    it('should show light rain icon when moderate rain', () => {
        const tempImage = shallow(<TemperatureImage description={'moderate rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'light rain');
    });

    it('should show light snow icon when snow', () => {
        const tempImage = shallow(<TemperatureImage description={'snow'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'light snow');
    });

    it('should show light snow icon when light snow', () => {
        const tempImage = shallow(<TemperatureImage description={'light snow'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'light snow');
    });

    it('should show heavy snow icon when heavy snow', () => {
        const tempImage = shallow(<TemperatureImage description={'heavy snow'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy snow');
    });

    it('should show heavy snow icon when sleet', () => {
        const tempImage = shallow(<TemperatureImage description={'sleet'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'heavy snow');
    });

    it('should show partly cloudy icon when few clouds', () => {
        const tempImage = shallow(<TemperatureImage description={'few clouds'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'partly cloudy');
    });

    it('should show partly cloudy icon when scattered clouds', () => {
        const tempImage = shallow(<TemperatureImage description={'scattered clouds'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'partly cloudy');
    });

    it('should show thunderstorm icon when thunderstorm with light rain', () => {
        const tempImage = shallow(<TemperatureImage description={'thunderstorm with light rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with rain', () => {
        const tempImage = shallow(<TemperatureImage description={'thunderstorm with rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with heavy rain', () => {
        const tempImage = shallow(<TemperatureImage description={'thunderstorm with heavy rain'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when light thunderstorm', () => {
        const tempImage = shallow(<TemperatureImage description={'light thunderstorm'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when heavy thunderstorm', () => {
        const tempImage = shallow(<TemperatureImage description={'heavy thunderstorm'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with drizzle', () => {
        const tempImage = shallow(<TemperatureImage description={'thunderstorm with drizzle'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm', () => {
        const tempImage = shallow(<TemperatureImage description={'thunderstorm'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when ragged thunderstorm', () => {
        const tempImage = shallow(<TemperatureImage description={'ragged thunderstorm'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with light drizzle', () => {
        const tempImage = shallow(<TemperatureImage description={'thunderstorm with light drizzle'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with heavy drizzle', () => {
        const tempImage = shallow(<TemperatureImage description={'thunderstorm with heavy drizzle'} />);
        const actual = tempImage.find('.weather-icon');
        expect(actual.props()).toHaveProperty('label', 'thunderstorms');
    });
});