import React from 'react';
import { Context } from '../../../../state/Store';
import 'jest-canvas-mock';
import * as lib from '../../../../utilities/RestApi';
import * as services from '../../../../utilities/Services';
import { render, screen, act, fireEvent } from '@testing-library/react';
import TemperaturePanel from '../../../../pages/Home/panels/TemperaturePanel';


describe('TemperaturePanel', () => {
    let userId = 'fakeUserId'
    const bearer = 'sdf987';
    const description = "weather desc";
    const minTemp = 24;
    const maxTemp = 50;
    const internalTemp = 73;
    const externalTemp = 33;
    const desiredTemp = 36;
    const coords = { latitude: 1, longitude: -1 };
    const tempData = {
        temp: externalTemp, currentTemp: internalTemp, description: description,
        minThermostatTemp: minTemp, maxThermostatTemp: maxTemp, mode: 'heating',
        desiredTemp: desiredTemp, isFahrenheit: true
    };
    const spySet = jest.spyOn(services, 'debounchApi');
    const spyUpdate = jest.spyOn(lib, 'setUserTemperature');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ auth: { bearer: bearer }, user: { userId: userId }, tempData: tempData, garageCoords: coords }, () => { }]}>
                    <TemperaturePanel />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyUpdate.mockClear();
        spySet.mockClear();
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

    describe('toggle heating and cooling', () => {

        it('should set to cooling mode when api responds cooling', async () => {
            tempData.mode = "cooling";
            await renderComponent();
            const actual = screen.getByLabelText('Cool');
            expect(actual.checked).toBeTruthy();
        });

        it('should set to heating mode when api responds heating', async () => {
            tempData.mode = "heating";
            await renderComponent();
            const actual = screen.getByLabelText('Heat');
            expect(actual.checked).toBeTruthy();
        });

        // it('should toggle on heating mode when api responds off', async () => {
        //     tempData.mode = null;
        //     await renderComponent();
        //     const button = screen.getByLabelText('Heat');
        //     expect(button).not.toBeChecked();

        //     await act(async () => {
        //         fireEvent.click(button);
        //     });

        //     expect(button).toBeChecked();
        // });

        //     it('should toggle on cooling mode when initial api responds off', async () => {
        //         tempData.mode = null;
        //         await renderComponent();
        //         const button = screen.getByTestId('cooling-switch');
        //         expect(button.className).not.toContain('checked');

        //         fireEvent.click(screen.getAllByRole('checkbox')[1]);
        //         const updatedButton = screen.getByTestId('cooling-switch');
        //         expect(updatedButton.className).toContain('checked');
        //     });

        //     it('should toggle off heating mode when initial api responds off', async () => {
        //         tempData.mode = "heating";
        //         await renderComponent();
        //         const button = screen.getByTestId('heating-switch');
        //         expect(button.className).toContain('checked');

        //         fireEvent.click(screen.getAllByRole('checkbox')[0]);
        //         const updatedButton = screen.getByTestId('heating-switch');
        //         expect(updatedButton.className).not.toContain('checked');
        //     });

        //     it('should toggle off cooling mode when initial api responds off', async () => {
        //         tempData.mode = "cooling";
        //         await renderComponent();
        //         const button = screen.getByTestId('cooling-switch');
        //         expect(button.className).toContain('checked');

        //         fireEvent.click(screen.getAllByRole('checkbox')[1]);
        //         const updatedButton = screen.getByTestId('cooling-switch');
        //         expect(updatedButton.className).not.toContain('checked');
        //     });

        //     it('should toggle on cooling mode when initial api responds heating', async () => {
        //         tempData.mode = "heating";
        //         await renderComponent();
        //         const coolingButton = screen.getByTestId('cooling-switch');
        //         const heatingButton = screen.getByTestId('heating-switch');
        //         expect(coolingButton.className).not.toContain('checked');
        //         expect(heatingButton.className).toContain('checked');

        //         fireEvent.click(screen.getAllByRole('checkbox')[1]);
        //         const updatedCoolingButton = screen.getByTestId('cooling-switch');
        //         const updatedHeatingButton = screen.getByTestId('heating-switch');
        //         expect(updatedCoolingButton.className).toContain('checked');
        //         expect(updatedHeatingButton.className).not.toContain('checked');
        //     });

        // it('should toggle on heating mode when initial api responds cooling', async () => {
        //     tempData.mode = "cooling";
        //     await renderComponent();
        //     const coolingButton = screen.getByLabelText('Cool');
        //     const heatingButton = screen.getByLabelText('Heat');
        //     expect(coolingButton.checked).toBeTruthy();
        //     expect(heatingButton.checked).toBeFalsy();

        //     await act(async () => {
        //         fireEvent.click(screen.getByLabelText('Heat'));
        //     });
        //     expect(heatingButton.checked).toBeTruthy();
        //     expect(coolingButton.checked).toBeFalsy();
        // });

        it('should make api call to toggle on heating when initially set to off', async () => {
            tempData.mode = null;
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByLabelText('Heat'));
            });

            expect(spyUpdate).toBeCalledWith(userId, bearer, desiredTemp, 'heating', true);
        });

        it('should make api call to toggle on cooling when initially set to off', async () => {
            tempData.mode = null;
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByLabelText('Cool'));
            });

            expect(spyUpdate).toBeCalledWith(userId, bearer, desiredTemp, 'cooling', true);
        });

        it('should make api call to toggle off hvac when initially set to heating', async () => {
            tempData.mode = 'heating';
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByLabelText('Heat'));
            });

            expect(spyUpdate).toBeCalledWith(userId, bearer, desiredTemp, null, true);
        });

        it('should make api call to toggle off hvac when initially set to cooling', async () => {
            tempData.mode = 'cooling';
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByLabelText('Cool'));
            });

            expect(spyUpdate).toBeCalledWith(userId, bearer, desiredTemp, null, true);
        });
    });

    describe('Status Peek Text', () => {

        it('should display the status text outside on the drawer when collapsed', async () => {
            await renderComponent();
            const actual = screen.getByText('Inside:').textContent;
            expect(actual).toEqual('Inside:');
        });

        it('should not display the status text outside on the drawer when opened', async () => {
            await renderComponent();
            fireEvent.click(screen.getByText('Temperature'));
            const actual = screen.queryByText('Inside:');
            expect(actual).toBeNull();
        });

        it('should display the status inside temperature on the drawer', async () => {
            await renderComponent();
            const actual = screen.getAllByText("73°")[0].textContent;
            expect(actual).toEqual("73°");
        });

        it('should display the status text inside on the drawer when collapsed', async () => {
            await renderComponent();
            const actual = screen.getByText('Outside:').textContent;
            expect(actual).toEqual('Outside:');
        });

        it('should display the inside temperature on the drawer', async () => {
            await renderComponent();
            const actual = screen.getAllByText("33°")[0].textContent;
            expect(actual).toEqual("33°");
        });
    });
});