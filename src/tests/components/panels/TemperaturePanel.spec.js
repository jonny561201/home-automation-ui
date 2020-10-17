import React from 'react';
import { Context } from '../../../state/Store';
import 'jest-canvas-mock';
import * as lib from '../../../utilities/RestApi';
import * as services from '../../../utilities/Services';
import { getStore } from '../../../state/GlobalState';
import { render, screen, act, fireEvent } from '@testing-library/react';
import TemperaturePanel from '../../../components/panels/TemperaturePanel';


describe('TemperaturePanel', () => {
    let userId = 'fakeUserId'
    const spySet = jest.spyOn(services, 'debounchApi');
    const spyGet = jest.spyOn(lib, 'getCurrentTemperature');
    const spyUpdate = jest.spyOn(lib, 'setUserTemperature')
    const description = "weather desc";
    const minTemp = 23.9;
    const maxTemp = 49.8;
    const internalTemp = 72.8;
    const externalTemp = 32.7;
    const desiredTemp = 35.7;

    const response = {
        currentTemp: internalTemp, temp: externalTemp, desiredTemp: desiredTemp, mode: "heating",
        minThermostatTemp: minTemp, maxThermostatTemp: maxTemp, description: description, isFahrenheit: true,
    };

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{}, () => { }]}>
                    <TemperaturePanel />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        getStore().setUserId(userId);
        spyUpdate.mockClear();
        spyGet.mockClear();
        spySet.mockClear();
        spyGet.mockReturnValue(response);
    });

    it('should display temperature panel', async () => {
        await renderComponent();
        const actual = screen.getByTestId('temperature-panel');
        expect(actual).toBeDefined();
    })

    it('should display temperature icon', async () => {
        await renderComponent();
        const actual = screen.getByAltText('temperature');
        expect(actual).toBeDefined();
    });

    describe('Component makes api call', () => {

        it('should make api to get current weather', async () => {
            await renderComponent();
            expect(spyGet).toHaveBeenCalledTimes(1);
            expect(spyGet).toBeCalledWith(userId);
        });

        it('should show the rounded external temperature from response on backend', async () => {
            await renderComponent();
            const actual = screen.getByTestId('external-temp').textContent;

            expect(actual).toEqual("33°");
        });

        it('should show the rounded internal temperature from response on backend', async () => {
            await renderComponent();
            const actual = screen.getByTestId('internal-temp').textContent;

            expect(actual).toEqual("73°");
        });

        it('should show the desired temperature knob value from backend', async () => {
            await renderComponent();
            const actual = screen.getByTitle(desiredTemp.toFixed(0).toString());
            expect(actual).toBeDefined();
        });
    });

    describe('toggle heating and cooling', () => {
        it('should set to cooling mode when api responds cooling', async () => {
            response.mode = "cooling";
            await renderComponent();
            const actual = screen.getByTestId('cooling-switch');
            expect(actual.className).toContain('checked');
        });

        it('should set to heating mode when api responds heating', async () => {
            response.mode = "heating";
            await renderComponent();
            const actual = screen.getByTestId('heating-switch');
            expect(actual.className).toContain('checked');
        });

        it('should toggle on heating mode when api responds off', async () => {
            response.mode = null;
            await renderComponent();
            const button = screen.getByTestId('heating-switch');
            expect(button.className).not.toContain('checked');

            fireEvent.click(screen.getAllByRole('checkbox')[0]);
            const updatedButton = screen.getByTestId('heating-switch');
            expect(updatedButton.className).toContain('checked');
        });

        it('should toggle on cooling mode when initial api responds off', async () => {
            response.mode = null;
            await renderComponent();
            const button = screen.getByTestId('cooling-switch');
            expect(button.className).not.toContain('checked');

            fireEvent.click(screen.getAllByRole('checkbox')[1]);
            const updatedButton = screen.getByTestId('cooling-switch');
            expect(updatedButton.className).toContain('checked');
        });

        it('should toggle off heating mode when initial api responds off', async () => {
            response.mode = "heating";
            await renderComponent();
            const button = screen.getByTestId('heating-switch');
            expect(button.className).toContain('checked');

            fireEvent.click(screen.getAllByRole('checkbox')[0]);
            const updatedButton = screen.getByTestId('heating-switch');
            expect(updatedButton.className).not.toContain('checked');
        });

        it('should toggle off cooling mode when initial api responds off', async () => {
            response.mode = "cooling";
            await renderComponent();
            const button = screen.getByTestId('cooling-switch');
            expect(button.className).toContain('checked');

            fireEvent.click(screen.getAllByRole('checkbox')[1]);
            const updatedButton = screen.getByTestId('cooling-switch');
            expect(updatedButton.className).not.toContain('checked');
        });

        it('should toggle on cooling mode when initial api responds heating', async () => {
            response.mode = "heating";
            await renderComponent();
            const coolingButton = screen.getByTestId('cooling-switch');
            const heatingButton = screen.getByTestId('heating-switch');
            expect(coolingButton.className).not.toContain('checked');
            expect(heatingButton.className).toContain('checked');

            fireEvent.click(screen.getAllByRole('checkbox')[1]);
            const updatedCoolingButton = screen.getByTestId('cooling-switch');
            const updatedHeatingButton = screen.getByTestId('heating-switch');
            expect(updatedCoolingButton.className).toContain('checked');
            expect(updatedHeatingButton.className).not.toContain('checked');
        });

        it('should toggle on heating mode when initial api responds cooling', async () => {
            response.mode = "cooling";
            await renderComponent();
            const coolingButton = screen.getByTestId('cooling-switch');
            const heatingButton = screen.getByTestId('heating-switch');
            expect(coolingButton.className).toContain('checked');
            expect(heatingButton.className).not.toContain('checked');

            fireEvent.click(screen.getAllByRole('checkbox')[0]);
            const updatedCoolingButton = screen.getByTestId('cooling-switch');
            const updatedHeatingButton = screen.getByTestId('heating-switch');
            expect(updatedCoolingButton.className).not.toContain('checked');
            expect(updatedHeatingButton.className).toContain('checked');
        });

        it('should make api call to toggle on heating when initially set to off', async () => {
            response.mode = null;
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getAllByRole('checkbox')[0]);
            });

            expect(spyUpdate).toBeCalledWith(userId, Math.round(desiredTemp), 'heating', true);
        });

        it('should make api call to toggle on cooling when initially set to off', async () => {
            response.mode = null;
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getAllByRole('checkbox')[1]);
            });

            expect(spyUpdate).toBeCalledWith(userId, Math.round(desiredTemp), 'cooling', true);
        });

        it('should make api call to toggle off hvac when initially set to heating', async () => {
            response.mode = 'heating';
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getAllByRole('checkbox')[0]);
            });

            expect(spyUpdate).toBeCalledWith(userId, Math.round(desiredTemp), null, true);
        });

        it('should make api call to toggle off hvac when initially set to cooling', async () => {
            response.mode = 'cooling';
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getAllByRole('checkbox')[1]);
            });

            expect(spyUpdate).toBeCalledWith(userId, Math.round(desiredTemp), null, true);
        });
    });
});