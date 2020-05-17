import React from 'react';
import 'jest-canvas-mock';
import { Context } from '../../../state/Store';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../state/GlobalState';
import { render, screen, act } from '@testing-library/react';
import DashboardPanels from '../../../components/panels/DashboardPanels';

describe('DashboardPanel', () => {
    const store = getStore();

    const renderComponent = async () => {
        await act(async() => {
            render(
                <Context.Provider value={[{}, () => {}]}>
                    <DashboardPanels />
                </Context.Provider>
                );
        });
    }

    describe('Garage Panel', () => {

        const spyGetGarage = jest.spyOn(lib, 'getGarageStatus');

        beforeEach(() => {
            spyGetGarage.mockClear();
            spyGetGarage.mockReturnValue({isGarageOpen: true, statusDuration: 12343});
        });

        it('should show the Garage Panel if user has garage role', async () => {
            store.setUserRoles([{'role_name': 'garage_door'}]);
            await renderComponent();
    
            const actual = screen.getByTestId('garage-icon');
            expect(actual).toBeDefined();
        });
    
        it('should not show the Garage Panel if user does not have garage role', async () => {
            store.setUserRoles([]);
            await renderComponent();
    
            const actual = screen.queryByTestId('garage-icon');
            expect(actual).toBeNull();
        });
    });


    describe('Basement Panel', () => {

        const spyGetSump = jest.spyOn(lib, 'getSumpLevels');

        beforeEach(() => {
            spyGetSump.mockClear();
            spyGetSump.mockReturnValue({warningLevel: 1, depthUnit: 'in', currentDepth: 12.2, averageDepth: 33.3});
        });

        it('should show the Basement Panel if user has the sump pump role', async () => {
            store.setUserRoles([{'role_name': 'sump_pump'}]);
            renderComponent();
    
            const actual = screen.getByTestId('basement-panel');
            expect(actual).toBeDefined();
        });
    
        it('should not show the Basement Panel if user does not have the sump pump role', async () => {
            store.setUserRoles([]);
            renderComponent();
            const actual = screen.queryByTestId('basement-panel')
            expect(actual).toBeNull();
        });
    });

    describe('Temperature Panel', () => {

        const spyGetTemp = jest.spyOn(lib, 'getCurrentTemperature');

        beforeEach(() => {
            spyGetTemp.mockClear();
            spyGetTemp.mockReturnValue({temp: 12, currentTemp: 3, isFahrenheit: true, desiredTemp: 5,
                 minThermostatTemp: 50, maxThermostatTemp: 90, mode: 'heating', description: 'cloudy'});
        });

        it('should show the Temperature Panel if user has the thermostat role', async () => {
            store.setUserRoles([{'role_name': 'thermostat'}]);
            await renderComponent();
            const actual = screen.getByTestId('temperature-panel');
            expect(actual).toBeDefined();
        });
    
        it('should not show the Temperature Panel if user does not have the thermostat role', async () => {
            store.setUserRoles([]);
            await renderComponent();
            const actual = screen.queryByTestId('temperature-panel');
            expect(actual).toBeNull();
        });
    });

    describe('Lighting Panel', () => {

        const spyGetLight = jest.spyOn(lib, 'getLightGroups');

        beforeEach(() => {
            spyGetLight.mockClear();
            spyGetLight.mockReturnValue({});
        });

        it('should show the Lighting Panel if user has the lighting role', async () => {
            store.setUserRoles([{'role_name': 'lighting'}]);
            await renderComponent();
            const actual = screen.getByTestId('lighting-panel')
            expect(actual).toBeDefined();
        });
    
        it('should not show the Lighting Panel if user does not have the lighting role', async () => {
            store.setUserRoles([]);
            await renderComponent();
            const actual = screen.queryByTestId('lighting-panel')
            expect(actual).toBeNull();
        });
    });

    describe('Security Panel', () => {

        it('should show the Security Panel if user has the security role', async () => {
            store.setUserRoles([{'role_name': 'security'}]);
            await renderComponent();
            const actual = screen.getByTestId('security-panel');
            expect(actual).toBeDefined();
        });
    
        it('should not show the Security Panel if user does not have the security role', async () => {
            store.setUserRoles([]);
            await renderComponent();
            const actual = screen.queryByTestId('security-panel');
            expect(actual).toBeNull();
        });
    });


});