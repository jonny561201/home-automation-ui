import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import GaragePanel from "../../../components/panels/GaragePanel";
import { Context } from '../../../state/Store';


describe('GaragePanel', () => {
    const garageRole = {devices: [{node_name: 'test'}]};

    describe('should not display garage details', () => {

        const renderTrueComponent = async () => {
            await act(async () => {
                render(
                    <Context.Provider value={[{devicesToRegister: true, garageRole: garageRole}, () => {}]}>
                        <GaragePanel />
                    </Context.Provider>
                );
            });
        }

        it('should display Register Device Text', async () => {
            await renderTrueComponent();
            const actual = screen.getByText('Register New Device!').textContent;
            expect(actual).toEqual('Register New Device!');
        });

        it('should display Register Device paragraph', async () => {
            await renderTrueComponent();
            const actual = screen.getByText('A new device has been detected and needs to be registered.').textContent;
            expect(actual).toEqual('A new device has been detected and needs to be registered.');
        });

        it('should display the register device button', async () => {
            await renderTrueComponent();
            const actual = screen.getByTestId('register-device-button').textContent;
            expect(actual).toEqual('Register');
        });

        it('should display the register device modal when clicking the register button', async ( )=> {
            await renderTrueComponent();
            fireEvent.click(screen.getByTestId('register-device-button'));
            const actual = screen.getByTestId('data-add-device');
            expect(actual).toBeDefined();
        });
    });

    describe('should display garage details', () => {

        const renderComponent = async () => {
            await act(async () => {
                render(
                    <Context.Provider value={[{devicesToRegister: false, garageRole: garageRole}, () => {}]}>
                        <GaragePanel />
                    </Context.Provider>
                );
            });
        }

        it('should display the Garage text', async () => {
            await renderComponent();
            const actual = screen.getByText("Garage");
            expect(actual).toBeDefined();
        });
    });
});