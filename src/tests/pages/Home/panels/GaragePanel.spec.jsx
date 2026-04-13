import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import GaragePanel from "../../../../pages/Home/panels/GaragePanel";
import { Context } from '../../../../state/Store';


describe('GaragePanel', () => {

    const renderComponent = async (devices, doors) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ devices: devices, garageDoors: doors }, () => {}]}>
                    <GaragePanel />
                </Context.Provider>
            );
        });
    }

    describe('Registration', () => {
        const unregisteredDevice = { id: 1, name: 'Garage Hub', type: 'garage_door', registered: false };

        it('should display Register New Device text when unregistered garage device exists', async () => {
            await renderComponent([unregisteredDevice], []);
            const actual = screen.getByText('Register New Device!');
            expect(actual).toBeDefined();
        });

        it('should display the Register button when accordion is expanded', async () => {
            await renderComponent([unregisteredDevice], []);
            fireEvent.click(screen.getByText('Garage'));
            const actual = await screen.findByRole('button', { name: 'Register' });
            expect(actual).toBeDefined();
        });

        it('should show AddGarage when Register is clicked', async () => {
            await renderComponent([unregisteredDevice], []);
            fireEvent.click(screen.getByText('Garage'));
            const registerButton = await screen.findByRole('button', { name: 'Register' });
            fireEvent.click(registerButton);
            const actual = screen.getByText('Add Garage Door');
            expect(actual).toBeDefined();
        });

        it('should not show registration when device is already registered', async () => {
            const registeredDevice = { id: 1, name: 'Garage Hub', type: 'garage_door', registered: true };
            await renderComponent([registeredDevice], []);
            const actual = screen.queryByText('Register New Device!');
            expect(actual).toBeNull();
        });
    });

    describe('Garage Doors', () => {
        const openDoor = { 'doorName': 'Main', 'isOpen': true };
        const closedDoor = { 'doorName': 'Second', 'isOpen': false };

        it('should display the Garage text', async () => {
            await renderComponent([], [openDoor]);
            const actual = screen.getByText("Garage");
            expect(actual).toBeDefined();
        });

        it('should display the garage door name on drawer', async () => {
            await renderComponent([], [openDoor]);
            const actual = screen.getByText('Main:').textContent;
            expect(actual).toEqual('Main:')
        });

        it('should not display the garage door name on drawer when opened', async () => {
            await renderComponent([], [openDoor]);
            fireEvent.click(screen.getByText('Garage'));
            const actual = screen.queryByText('Main:');
            expect(actual).toBeNull();
        });

        it('should display the garage door status on drawer as open when true', async () => {
            await renderComponent([], [openDoor]);
            const actual = screen.getAllByText('Open')[0].textContent;
            expect(actual).toEqual('Open')
        });

        it('should display the garage door status on drawer as closed when false', async () => {
            await renderComponent([], [closedDoor]);
            const actual = screen.getAllByText('Closed')[0].textContent;
            expect(actual).toEqual('Closed')
        });

        it('should display no devices message when no doors registered', async () => {
            await renderComponent([], []);
            const actual = screen.getByText('No Garage devices have been registered');
            expect(actual).toBeDefined();
        });
    });
});
