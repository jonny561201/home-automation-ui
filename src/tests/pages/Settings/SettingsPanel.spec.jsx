import React from 'react';
import { Context } from '../../../state/Store';
import { render, screen, } from '@testing-library/react';
import SettingsPanel from '../../../pages/Settings/SettingsPanel';
import { act } from 'react';


describe('Settings Panel', () => {
    const roles = [{ "role_name": "lighting" }];
    const city = 'Vienna';
    const tempUnit = 'fahrenheit';
    const measureUnit = 'imperial';
    const garageName = 'Main Door';
    const garageNodeId = 'node-1';
    const garageDoors = [{ nodeId: garageNodeId, doorName: garageName }];
    const preference = { tempUnit: tempUnit, city: city, measureUnit: measureUnit, garageNodeId: garageNodeId };


    const renderComponent = async (pref, doors = garageDoors) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ preferences: pref, roles: roles, garageDoors: doors }, () => { }]}>
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

    it('should display the Measurements header', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('Measurements').textContent;
        expect(actual).toEqual('Measurements');
    });

    it('should display the temperature label', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('Temperature:').textContent;
        expect(actual).toEqual('Temperature:');
    });

    it('should display the fahrenheit setting stored in state', async () => {
        await renderComponent(preference);
        const actual = screen.getByText(tempUnit).textContent;
        expect(actual).toEqual(tempUnit);
    });

    it('should display the distance label', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('Distance:').textContent;
        expect(actual).toEqual('Distance:');
    });

    it('should display the measurement unit stored in state', async () => {
        await renderComponent(preference);
        const actual = screen.getByText(measureUnit).textContent;
        expect(actual).toEqual(measureUnit);
    });

    it('should display the Location header', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('Location').textContent;
        expect(actual).toEqual('Location');
    });

    it('should display the city label', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('City:').textContent;
        expect(actual).toEqual('City:');
    });

    it('should display the currently city setting stored in state', async () => {
        await renderComponent(preference);
        const actual = screen.getByText(city).textContent;
        expect(actual).toEqual(city);
    });

    it('should display the Garage header', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('Garage').textContent;
        expect(actual).toEqual('Garage');
    });

    it('should display the door text for garage', async () => {
        await renderComponent(preference);
        const actual = screen.getByText('Preferred Garage:').textContent;
        expect(actual).toEqual('Preferred Garage:');
    });

    it('should display the door preference stored in state', async () => {
        await renderComponent(preference);
        const actual = screen.getByText(garageName).textContent;
        expect(actual).toEqual(garageName);
    });

    it('should display -- if no door preference stored in state', async () => {
        const preference = { tempUnit: tempUnit, city: city, measureUnit: measureUnit };
        await renderComponent(preference, []);
        const dashes = screen.getAllByText('--');
        expect(dashes.length).toBeGreaterThanOrEqual(1);
    });
});