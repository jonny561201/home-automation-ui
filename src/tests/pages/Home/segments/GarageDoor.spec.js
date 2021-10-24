import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import * as lib from '../../../../utilities/RestApi';
import GarageDoor from '../../../../pages/Home/segments/GarageDoor';
import { Context } from '../../../../state/Store';


describe('Garage Door', () => {
    const userId = 'fakeuserid';
    const doorName = 'testNode';
    const device = { doorName: doorName, node_device: 1, isOpen: true };
    const spyUpdate = jest.spyOn(lib, 'updateGarageState');
    const spyToggle = jest.spyOn(lib, 'toggleGarageDoor');

    const renderComponent = async (door) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ userId: userId }, () => { }]}>
                    <GarageDoor device={door} />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyUpdate.mockClear();
        spyToggle.mockClear();
    });


    it('should show close garage button', async () => {
        await renderComponent(device);
        const actual = screen.getByTestId('update-garage-close').textContent;
        expect(actual).toEqual('Close');
    });

    it('should show open garage button', async () => {
        await renderComponent({ ...device, isOpen: false });
        const actual = screen.getByTestId('update-garage-open').textContent;
        expect(actual).toEqual('Open');
    });

    it('should show toggle garage button', async () => {
        await renderComponent(device);
        const actual = screen.getByTestId('toggle-garage-button').textContent;
        expect(actual).toEqual('Toggle');
    });

    it('should show Door text', async () => {
        await renderComponent(device);
        const actual = screen.getByText('Door:').textContent;
        expect(actual).toEqual('Door: ');
    });

    it('should show Door Name text', async () => {
        await renderComponent(device);
        const actual = screen.getByText(doorName).textContent;
        expect(actual).toEqual(doorName);
    });

    it('should show Door Status text', async () => {
        await renderComponent(device);
        const actual = screen.getByText('Status:').textContent;
        expect(actual).toEqual('Status: ');
    });

    it('should show Duration text', async () => {
        await renderComponent(device);
        const actual = screen.getByText('Duration:').textContent;
        expect(actual).toEqual('Duration: ');
    });

    it('should display Close text when response is false', async () => {
        await renderComponent({ ...device, isOpen: false });
        const actual = screen.getByText("Closed").textContent;
        expect(actual).toEqual('Closed');
    });

    it('should display Open text when response is true', async () => {
        await renderComponent(device);
        const actual = screen.getByText("Open").textContent;
        expect(actual).toEqual('Open');
    });

    describe('garage door api', () => {

        it('should call update function with false when closing', async () => {
            spyUpdate.mockReturnValue({ isOpen: false });
            await renderComponent({ ...device, isOpen: true });
            userEvent.click(screen.getByTestId("update-garage-close"));
            expect(spyUpdate).toBeCalledWith(false, userId, 1);
        });

        it('should call update function with true when opening', async () => {
            spyUpdate.mockReturnValue({ isOpen: true });
            await renderComponent({ ...device, isOpen: false });
            userEvent.click(screen.getByTestId("update-garage-open"));
            expect(spyUpdate).toBeCalledWith(true, userId, 1);
        });

        it('should call toggle function', async () => {
            await renderComponent(device);
            userEvent.click(screen.getByTestId("toggle-garage-button"));

            expect(spyToggle).toBeCalledWith(userId, 1);
        });
    });
});