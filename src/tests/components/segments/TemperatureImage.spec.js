import React from 'react';
import TemperatureImage from '../../../components/segments/TemperatureImage';
import { render, screen, act } from '@testing-library/react';
import { Context } from '../../../state/Store';
import '@testing-library/jest-dom';


describe('TemperatureImage', () => {

    const renderComponent = async (desc, isNight) => {
        await act(async () => {
            render(
                <Context.Provider value={[{isNight: isNight}, () => { }]}>
                    <TemperatureImage description={desc} />
                </Context.Provider>
            );
        });
    }

    it('should return clear night weather icon', async () => {
        await renderComponent('clear sky', true);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'clear night');
    });

    it('should return sunny weather icon', async () => {
        await renderComponent('clear sky', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'sunny');
    });

    it('should return cloudy weather icon', async () => {
        await renderComponent('cloudy', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'cloudy');
    });

    it('should show heavy rain icon when heavy intensity rain', async () => {
        await renderComponent('heavy intensity rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy rain');
    });

    it('should show heavy rain icon when very heavy rain', async () => {
        await renderComponent('very heavy rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy rain');
    });

    it('should show heavy rain icon when extreme rain', async () => {
        await renderComponent('extreme rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy rain');
    });

    it('should show heavy rain icon when shower rain', async () => {
        await renderComponent('shower rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy rain');
    });

    it('should show heavy rain icon when heavy intensity shower rain', async () => {
        await renderComponent('heavy intensity shower rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy rain');
    });

    it('should show drizzle icon when drizzle', async () => {
        await renderComponent('drizzle', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show drizzle icon when drizzle rain', async () => {
        await renderComponent('drizzle rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show drizzle icon when light intensity drizzle', async () => {
        await renderComponent('light intensity drizzle', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show drizzle icon when heavy intensity drizzle', async () => {
        await renderComponent('heavy intensity drizzle', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show drizzle icon when light intensity drizzle rain', async () => {
        await renderComponent('light intensity drizzle rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show drizzle icon when shower drizzle', async () => {
        await renderComponent('shower drizzle', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'drizzle');
    });

    it('should show light rain icon when light rain', async () => {
        await renderComponent('light rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'light rain');
    });

    it('should show light rain icon when moderate rain', async () => {
        await renderComponent('moderate rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'light rain');
    });

    it('should show light snow icon when snow', async () => {
        await renderComponent('snow', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'light snow');
    });

    it('should show light snow icon when light snow', async () => {
        await renderComponent('light snow', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'light snow');
    });

    it('should show heavy snow icon when heavy snow', async () => {
        await renderComponent('heavy snow', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy snow');
    });

    it('should show heavy snow icon when sleet', async () => {
        await renderComponent('sleet', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'heavy snow');
    });

    it('should show partly cloudy icon when few clouds', async () => {
        await renderComponent('few clouds', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'partly cloudy');
    });

    it('should show partly cloudy icon when scattered clouds', async () => {
        await renderComponent('scattered clouds', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'partly cloudy');
    });

    it('should show thunderstorm icon when thunderstorm with light rain', async () => {
        await renderComponent('thunderstorm with light rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with rain', async () => {
        await renderComponent('thunderstorm with rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with heavy rain', async () => {
        await renderComponent('thunderstorm with heavy rain', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when light thunderstorm', async () => {
        await renderComponent('light thunderstorm', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when heavy thunderstorm', async () => {
        await renderComponent('heavy thunderstorm', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with drizzle', async () => {
        await renderComponent('thunderstorm with drizzle', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm', async () => {
        await renderComponent('thunderstorm', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when ragged thunderstorm', async () => {
        await renderComponent('ragged thunderstorm', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with light drizzle', async () => {
        await renderComponent('thunderstorm with light drizzle', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });

    it('should show thunderstorm icon when thunderstorm with heavy drizzle', async () => {
        await renderComponent('thunderstorm with heavy drizzle', false);
        const actual = screen.getByAltText('description');
        expect(actual).toHaveAttribute('label', 'thunderstorms');
    });
});