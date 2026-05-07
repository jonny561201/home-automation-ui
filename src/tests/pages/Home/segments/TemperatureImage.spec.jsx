import React from 'react';
import { Context } from '../../../../state/Store';
import * as lib from '../../../../utilities/Services';
import TemperatureImage from '../../../../pages/Home/segments/TemperatureImage';
import { render, screen, act } from '@testing-library/react';


describe('TemperatureImage', () => {
    const coords = { latitude: 1, longitude: -1 };
    const internalTemp = 73;
    const externalTemp = 33;
    const isDayLight = vi.spyOn(lib, 'isDayLight');
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

    it('should show -- when internal temperature is null', async () => {
        tempData.currentTemp = null;
        await renderComponent('clear sky');
        const actual = screen.getByText('--');
        expect(actual).toBeTruthy();
        tempData.currentTemp = internalTemp;
    });
});
