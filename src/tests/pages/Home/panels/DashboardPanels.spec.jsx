import React from 'react';
import { Context } from '../../../../state/Store';
import * as lib from '../../../../utilities/RestApi';
import { render, screen, act } from '@testing-library/react';
import DashboardPanels from '../../../../pages/Home/panels/DashboardPanels';


vi.mock('../../../../components/controls/Knob', () => ({ default: () => <div></div> }));


describe('DashboardPanel', () => {
    const bearer = 'kjahsd987s798';
    const coords = { latitude: 1, longitude: -1 };
    const sumpData = { warningLevel: 1, depthUnit: 'in' };
    const forecastData = { temp: 2.0, description: 'thunderstorm' }
    const tempData = { currentTemp: 12.0, desiredTemp: 1.0, mode: 'auto', minThermostatTemp: 1.0, maxThermostatTemp: 3.0 };

    const renderComponent = async (roles = [], devices = []) => {
        await act(async () => {
            render(
                <Context.Provider value={[{
                    user: { roles },
                    devices: devices,
                    forecastData: forecastData,
                    tasks: [],
                    auth: { bearer: bearer },
                    sumpData: sumpData,
                    tempData: tempData,
                    garageCoords: coords,
                    garageDoors: [],
                }, () => { }]}>
                    <DashboardPanels />
                </Context.Provider>
            );
        });
    }

    describe('Garage Panel', () => {

        it('should show the Garage Panel if user has garage role', async () => {
            await renderComponent(['garage_door']);
            const actual = screen.getByText('Garage');
            expect(actual).toBeDefined();
        });

        it('should show the Garage Panel if unregistered garage device exists', async () => {
            const unregisteredDevice = { id: 1, name: 'Garage Hub', type: 'garage_door', registered: false };
            await renderComponent([], [unregisteredDevice]);
            const actual = screen.getByText('Garage');
            expect(actual).toBeDefined();
        });

        it('should not show the Garage Panel if no role and no unregistered device', async () => {
            await renderComponent([]);
            const actual = screen.queryByText('Garage');
            expect(actual).toBeNull();
        });
    });

    describe('Basement Panel', () => {

        const spyGetSump = vi.spyOn(lib, 'getSumpLevels');

        beforeEach(() => {
            spyGetSump.mockClear();
            spyGetSump.mockReturnValue({ warningLevel: 1, depthUnit: 'in', currentDepth: 12.2, averageDepth: 33.3 });
        });

        it('should show the Basement Panel if user has the sump pump role', async () => {
            await renderComponent(['sump_pump']);
            const actual = screen.getByText('Basement');
            expect(actual).toBeDefined();
        });

        it('should not show the Basement Panel if user does not have the sump pump role', async () => {
            await renderComponent([]);
            const actual = screen.queryByText('Basement')
            expect(actual).toBeNull();
        });
    });

    describe('Temperature Panel', () => {

        const spyGetTemp = vi.spyOn(lib, 'getCurrentTemperature');

        beforeEach(() => {
            spyGetTemp.mockClear();
            spyGetTemp.mockReturnValue({
                temp: 12, currentTemp: 3, isFahrenheit: true, desiredTemp: 5,
                minThermostatTemp: 50, maxThermostatTemp: 90, mode: 'heating', description: 'cloudy'
            });
        });

        it('should show the Temperature Panel if user has the thermostat role', async () => {
            await renderComponent(['thermostat']);
            const actual = screen.getByText('Temperature');
            expect(actual).toBeDefined();
        });

        it('should not show the Temperature Panel if user does not have the thermostat role', async () => {
            await renderComponent([]);
            const actual = screen.queryByText('Temperature');
            expect(actual).toBeNull();
        });
    });

    describe('Lighting Panel', () => {

        const spyGetLight = vi.spyOn(lib, 'getLightGroups');

        beforeEach(() => {
            spyGetLight.mockClear();
            spyGetLight.mockReturnValue([{ groupId: '1', groupName: 'test', brightness: 0, lights: [], on: false }]);
        });

        it('should show the Lighting Panel if user has the lighting role', async () => {
            await renderComponent(['lighting']);
            const actual = screen.queryByText('Lighting');
            expect(actual).toBeDefined();
        });

        it('should not show the Lighting Panel if user does not have the lighting role', async () => {
            await renderComponent([]);
            const actual = screen.queryByText('Lighting');
            expect(actual).toBeNull();
        });
    });

    describe('Security Panel', () => {

        it('should show the Security Panel if user has the security role', async () => {
            await renderComponent(['security']);
            const actual = screen.getByText('Security');
            expect(actual).toBeDefined();
        });

        it('should not show the Security Panel if user does not have the security role', async () => {
            await renderComponent([]);
            const actual = screen.queryByText('Security');
            expect(actual).toBeNull();
        });
    });
});
