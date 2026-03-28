import React from 'react';
import { Context } from '../../../state/Store';
import { render, screen, } from '@testing-library/react';
import SettingsPanel from '../../../pages/Settings/SettingsPanel';
import { act } from 'react-dom/test-utils';


describe('Settings Panel', () => {
    const roles = [{ "role_name": "lighting" }];
    const city = 'Vienna';
    const tempUnit = 'fahrenheit';
    const measureUnit = 'imperial';
    const garage = 3;
    const preference = { temp_unit: tempUnit, city: city, measure_unit: measureUnit, garage_door: garage };


    const renderComponent = async (pref) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ preferences: pref, roles: roles }, () => { }]}>
                    <SettingsPanel />
                </Context.Provider>
            );
        });
    }

    it('should display edit button', async () => {
        await renderComponent(preference);
        const actual = screen.getByRole('button').textContent;
        expect(actual).toEqual('Edit');
    });

    it('should display the unit text for temperature', async () => {
        await renderComponent(preference);
        const actual = screen.getAllByText('Unit:')[0].textContent;
        expect(actual).toEqual('Unit:');
    });

    it('should display the fahrenheit setting stored in state', async () => {
        await renderComponent(preference);
        const actual = screen.getByText(tempUnit).textContent;
        expect(actual).toEqual(tempUnit);
    });

    it('should display the city text for temperature', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('City:').textContent;
        expect(actual).toEqual('City:');
    });

    it('should display the currently city setting stored in state', async () => {
        await renderComponent(preference);
        const actual = screen.getByText(city).textContent;
        expect(actual).toEqual(city);
    });

    it('should display Temperature header', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('Temperature').textContent;
        expect(actual).toEqual('Temperature');
    });

    it('should display the Measurement header', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('Measurement').textContent;
        expect(actual).toEqual('Measurement');
    });

    it('should display the unit text for measurement', async () => {
        await renderComponent(preference);
        const actual = screen.getAllByText('Unit:')[1].textContent;
        expect(actual).toEqual('Unit:');
    });

    it('should display the measurement unit stored in state', async () => {
        await renderComponent(preference);
        const actual = screen.getByText(measureUnit).textContent;
        expect(actual).toEqual(measureUnit);
    });

    it('should display the Garage header', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('Garage').textContent;
        expect(actual).toEqual('Garage');
    });

    it('should display the door text for garage', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('Open Door:').textContent;
        expect(actual).toEqual('Open Door:');
    });

    it('should display the door preference stored in state', async () => {
        await renderComponent(preference);
        const actual = screen.getByText(garage.toString()).textContent;
        expect(actual).toEqual(garage.toString());
    });

    it('should display the door preference of None if nothing stored in state', async () => {
        const preference = { temp_unit: tempUnit, city: city, measure_unit: measureUnit, garage_door: null };
        await renderComponent(preference);
        const actual = screen.getByText("None").textContent;
        expect(actual).toEqual("None");
    });
});