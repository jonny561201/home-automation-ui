import React from 'react';
import { Context } from '../../../../state/Store';
import * as lib from '../../../../utilities/Services';
import TemperatureImage from '../../../../pages/Home/segments/TemperatureImage';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';


describe('TemperatureImage', () => {
    const coords = { latitude: 1, longitude: -1 };
    const internalTemp = 73;
    const externalTemp = 33;
    const isDayLight = jest.spyOn(lib, 'isDayLight');
    const tempData = { currentTemp: internalTemp };
    const forecastData = { temp: externalTemp }


    const renderComponent = async (desc) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ garageCoords: coords, tempData: tempData, forecastData: { ...forecastData, description: desc } }, () => { }]}>
                    <TemperatureImage />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        isDayLight.mockClear();
    });

    describe('day time', () => {

        beforeEach(() => {
            isDayLight.mockReturnValue(true);
        });

        it('should show the rounded external temperature', async () => {
            await renderComponent('clear sky');
            const actual = screen.getByText('33°');

            expect(actual).toBeTruthy();
        });

        it('should show the rounded internal temperature', async () => {
            await renderComponent('clear sky');
            const actual = screen.getByText("73°");

            expect(actual).toBeTruthy();
        });

        it('should return sunny weather icon', async () => {
            await renderComponent('clear sky');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'sunny');
        });

        it('should return cloudy weather icon', async () => {
            await renderComponent('cloudy');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'cloudy');
        });

        it('should return mostly cloudy weather icon', async () => {
            await renderComponent('broken clouds');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'mostly cloudy');
        });

        it('should show heavy rain icon when heavy intensity rain', async () => {
            await renderComponent('heavy intensity rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'heavy rain');
        });

        it('should show heavy rain icon when very heavy rain', async () => {
            await renderComponent('very heavy rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'heavy rain');
        });

        it('should show heavy rain icon when extreme rain', async () => {
            await renderComponent('extreme rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'heavy rain');
        });

        it('should show heavy rain icon when shower rain', async () => {
            await renderComponent('shower rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'heavy rain');
        });

        it('should show heavy rain icon when heavy intensity shower rain', async () => {
            await renderComponent('heavy intensity shower rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'heavy rain');
        });

        it('should show drizzle icon when drizzle', async () => {
            await renderComponent('drizzle');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'drizzle');
        });

        it('should show drizzle icon when drizzle rain', async () => {
            await renderComponent('drizzle rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'drizzle');
        });

        it('should show drizzle icon when light intensity drizzle', async () => {
            await renderComponent('light intensity drizzle');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'drizzle');
        });

        it('should show drizzle icon when heavy intensity drizzle', async () => {
            await renderComponent('heavy intensity drizzle');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'drizzle');
        });

        it('should show drizzle icon when light intensity drizzle rain', async () => {
            await renderComponent('light intensity drizzle rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'drizzle');
        });

        it('should show drizzle icon when shower drizzle', async () => {
            await renderComponent('shower drizzle');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'drizzle');
        });

        it('should show drizzle icon when mist', async () => {
            await renderComponent('mist');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'misty');
        });

        it('should show light rain icon when light rain', async () => {
            await renderComponent('light rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'light rain');
        });

        it('should show light rain icon when moderate rain', async () => {
            await renderComponent('moderate rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'light rain');
        });

        it('should show light snow icon when snow', async () => {
            await renderComponent('snow');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'light snow');
        });

        it('should show light snow icon when light snow', async () => {
            await renderComponent('light snow');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'light snow');
        });

        it('should show heavy snow icon when heavy snow', async () => {
            await renderComponent('heavy snow');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'heavy snow');
        });

        it('should show heavy snow icon when sleet', async () => {
            await renderComponent('sleet');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'heavy snow');
        });

        it('should show partly cloudy icon when few clouds', async () => {
            await renderComponent('few clouds');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'partly cloudy');
        });

        it('should show partly cloudy icon when scattered clouds', async () => {
            await renderComponent('scattered clouds');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'partly cloudy');
        });

        it('should show thunderstorm icon when thunderstorm with light rain', async () => {
            await renderComponent('thunderstorm with light rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'thunderstorms');
        });

        it('should show thunderstorm icon when thunderstorm with rain', async () => {
            await renderComponent('thunderstorm with rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'thunderstorms');
        });

        it('should show thunderstorm icon when thunderstorm with heavy rain', async () => {
            await renderComponent('thunderstorm with heavy rain');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'thunderstorms');
        });

        it('should show thunderstorm icon when light thunderstorm', async () => {
            await renderComponent('light thunderstorm');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'thunderstorms');
        });

        it('should show thunderstorm icon when heavy thunderstorm', async () => {
            await renderComponent('heavy thunderstorm');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'thunderstorms');
        });

        it('should show thunderstorm icon when thunderstorm with drizzle', async () => {
            await renderComponent('thunderstorm with drizzle');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'thunderstorms');
        });

        it('should show thunderstorm icon when thunderstorm', async () => {
            await renderComponent('thunderstorm');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'thunderstorms');
        });

        it('should show thunderstorm icon when ragged thunderstorm', async () => {
            await renderComponent('ragged thunderstorm');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'thunderstorms');
        });

        it('should show thunderstorm icon when thunderstorm with light drizzle', async () => {
            await renderComponent('thunderstorm with light drizzle');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'thunderstorms');
        });

        it('should show thunderstorm icon when thunderstorm with heavy drizzle', async () => {
            await renderComponent('thunderstorm with heavy drizzle');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'thunderstorms');
        });
    });

    describe('night time', () => {

        beforeEach(() => {
            isDayLight.mockReturnValue(false);
        });

        it('should show partly cloudy night icon when few clouds at night', async () => {
            await renderComponent('few clouds');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'partly cloudy night');
        });

        it('should return clear night weather icon when clear at night', async () => {
            await renderComponent('clear sky');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'clear night');
        });

        it('should return partly cloudy night icon for scattered clouds', async () => {
            await renderComponent('scattered clouds');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'partly cloudy night');
        });

        it('should return mostly cloudy night icon for broken clouds', async () => {
            await renderComponent('broken clouds');
            const actual = screen.getByAltText('description');
            expect(actual).toHaveAttribute('label', 'mostly cloudy night');
        });
    });
});