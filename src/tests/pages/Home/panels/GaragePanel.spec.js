import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import GaragePanel from "../../../../pages/Home/panels/GaragePanel";
import { Context } from '../../../../state/Store';


describe('GaragePanel', () => {
    const garageRole = {devices: [{node_name: 'test'}]};
    
    const renderComponent = async (register, doors) => {
        await act(async () => {
            render(
                <Context.Provider value={[{devicesToRegister: register, garageRole: garageRole, garageDoors: doors}, () => {}]}>
                    <GaragePanel />
                </Context.Provider>
            );
        });
    }
    
    describe('should not display garage details', () => {

        it('should display Register Device Text', async () => {
            await renderComponent(true, []);
            const actual = screen.getByText('Register New Device!').textContent;
            expect(actual).toEqual('Register New Device!');
        });

        it('should display Register Device paragraph', async () => {
            await renderComponent(true, []);
            const actual = screen.getByText('A new device has been detected and needs to be registered.').textContent;
            expect(actual).toEqual('A new device has been detected and needs to be registered.');
        });

        it('should display the register device button', async () => {
            await renderComponent(true, []);
            const actual = screen.getByText('Register').textContent;
            expect(actual).toEqual('Register');
        });

        it('should display the register device modal when clicking the register button', async ( )=> {
            await renderComponent(true, []);
            fireEvent.click(screen.getByText('Register'));
            const actual = screen.getByTestId('data-add-device');
            expect(actual).toBeDefined();
        });
    });

    describe('should display garage details', () => {
        const openDoor = {'doorName': 'Main', 'isOpen': true};
        const closedDoor = {'doorName': 'Second', 'isOpen': false};

        it('should display the Garage text', async () => {
            await renderComponent(false, [openDoor]);
            const actual = screen.getByText("Garage");
            expect(actual).toBeDefined();
        });

        it('should display the garage door name on drawer', async () => {
            await renderComponent(false, [openDoor]);
            const actual = screen.getByText('Main:').textContent;
            expect(actual).toEqual('Main:')
        });

        it('should not display the garage door name on drawer when opened', async () => {
            await renderComponent(false, [openDoor]);
            fireEvent.click(screen.getByText('Garage'));
            const actual = screen.queryByText('Main:');
            expect(actual).toBeNull();
        });

        it('should display the garage door status on drawer as open when true', async () => {
            await renderComponent(false, [openDoor]);
            const actual = screen.getAllByText('Open')[0].textContent;
            expect(actual).toEqual('Open')
        });

        it('should display the garage door status on drawer as closed when false', async () => {
            await renderComponent(false, [closedDoor]);
            const actual = screen.getAllByText('Closed')[0].textContent;
            expect(actual).toEqual('Closed')
        });
    });
});