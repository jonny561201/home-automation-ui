import React from 'react';
import TemperatureImage from '../../../components/segments/TemperatureImage';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


describe('TemperatureImage', () => {

    it('should return sunny weather icon', () => {
        render(<TemperatureImage description={'clear sky'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'sunny');
    });

    it('should return cloudy weather icon', () => {
        render(<TemperatureImage description={'cloudy'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'cloudy');
    });

    it('should show heavy rain icon when heavy intensity rain', () => {
        render(<TemperatureImage description={'heavy intensity rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy rain');
    });

    it('should show heavy rain icon when very heavy rain', () => {
        render(<TemperatureImage description={'very heavy rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy rain');
    });

    it('should show heavy rain icon when extreme rain', () => {
        render(<TemperatureImage description={'extreme rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy rain');
    });

    it('should show heavy rain icon when shower rain', () => {
        render(<TemperatureImage description={'shower rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy rain');
    });

    it('should show heavy rain icon when heavy intensity shower rain', () => {
        render(<TemperatureImage description={'heavy intensity shower rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy rain');
    });

    it('should show drizzle icon when drizzle', () => {
        render(<TemperatureImage description={'drizzle'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show drizzle icon when drizzle rain', () => {
        render(<TemperatureImage description={'drizzle rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show drizzle icon when light intensity drizzle', () => {
        render(<TemperatureImage description={'light intensity drizzle'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show drizzle icon when heavy intensity drizzle', () => {
        render(<TemperatureImage description={'heavy intensity drizzle'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show drizzle icon when light intensity drizzle rain', () => {
        render(<TemperatureImage description={'light intensity drizzle rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show drizzle icon when shower drizzle', () => {
        render(<TemperatureImage description={'shower drizzle'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show light rain icon when light rain', () => {
        render(<TemperatureImage description={'light rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'light rain');
    });

    it('should show light rain icon when moderate rain', () => {
        render(<TemperatureImage description={'moderate rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'light rain');
    });

    it('should show light snow icon when snow', () => {
        render(<TemperatureImage description={'snow'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'light snow');
    });

    it('should show light snow icon when light snow', () => {
        render(<TemperatureImage description={'light snow'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'light snow');
    });

    it('should show heavy snow icon when heavy snow', () => {
        render(<TemperatureImage description={'heavy snow'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy snow');
    });

    it('should show heavy snow icon when sleet', () => {
        render(<TemperatureImage description={'sleet'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy snow');
    });

    it('should show partly cloudy icon when few clouds', () => {
        render(<TemperatureImage description={'few clouds'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'partly cloudy');
    });

    it('should show partly cloudy icon when scattered clouds', () => {
        render(<TemperatureImage description={'scattered clouds'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'partly cloudy');
    });

    it('should show thunderstorm icon when thunderstorm with light rain', () => {
        render(<TemperatureImage description={'thunderstorm with light rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with rain', () => {
        render(<TemperatureImage description={'thunderstorm with rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with heavy rain', () => {
        render(<TemperatureImage description={'thunderstorm with heavy rain'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when light thunderstorm', () => {
        render(<TemperatureImage description={'light thunderstorm'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when heavy thunderstorm', () => {
        render(<TemperatureImage description={'heavy thunderstorm'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with drizzle', () => {
        render(<TemperatureImage description={'thunderstorm with drizzle'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm', () => {
        render(<TemperatureImage description={'thunderstorm'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when ragged thunderstorm', () => {
        render(<TemperatureImage description={'ragged thunderstorm'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with light drizzle', () => {
        render(<TemperatureImage description={'thunderstorm with light drizzle'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with heavy drizzle', () => {
        render(<TemperatureImage description={'thunderstorm with heavy drizzle'}/>);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });
});