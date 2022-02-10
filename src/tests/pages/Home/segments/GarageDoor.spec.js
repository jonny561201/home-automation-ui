import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import * as lib from '../../../../utilities/RestApi';
import GarageDoor from '../../../../pages/Home/segments/GarageDoor';
import { Context } from '../../../../state/Store';


describe('Garage Door', () => {
    const userId = 'fakeuserid';
    const doorName = 'testNode';
    const bearer = '986adsfjg';
    const device = { doorName: doorName, doorId: 1, isOpen: true };
    const spyUpdate = jest.spyOn(lib, 'updateGarageState');
    const spyToggle = jest.spyOn(lib, 'toggleGarageDoor');

    const renderComponent = async (door) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ auth: { bearer: bearer }, user: { userId: userId } }, () => { }]}>
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
        const actual = screen.getByText('Close').textContent;
        expect(actual).toEqual('Close');
    });

    it('should show open garage button', async () => {
        await renderComponent({ ...device, isOpen: false });
        const actual = screen.getByText('Open').textContent;
        expect(actual).toEqual('Open');
    });

    it('should show toggle garage button', async () => {
        await renderComponent(device);
        const actual = screen.getByText('Toggle').textContent;
        expect(actual).toEqual('Toggle');
    });

    it('should show Door Name text', async () => {
        await renderComponent(device);
        const actual = screen.getByText(doorName).textContent;
        expect(actual).toEqual(doorName);
    });

    it('should display Close text when response is false', async () => {
        await renderComponent({ ...device, isOpen: false });
        const actual = screen.getByText("Closed").textContent;
        expect(actual).toEqual('Closed');
    });

    it('should display Open text when response is true', async () => {
        await renderComponent(device);
        const actual = screen.getByText("Opened").textContent;
        expect(actual).toEqual('Opened');
    });

    describe('garage door api', () => {

        it('should call update function with false when closing', async () => {
            spyUpdate.mockReturnValue({ isOpen: false });
            await renderComponent({ ...device, isOpen: true });
            userEvent.click(screen.getByText("Close"));
            expect(spyUpdate).toBeCalledWith(userId, bearer, false, 1);
        });

        it('should call update function with true when opening', async () => {
            spyUpdate.mockReturnValue({ isOpen: true });
            await renderComponent({ ...device, isOpen: false });
            userEvent.click(screen.getByText("Open"));
            expect(spyUpdate).toBeCalledWith(userId, bearer, true, 1);
        });

        it('should call toggle function', async () => {
            await renderComponent(device);
            userEvent.click(screen.getByText('Toggle'));

            expect(spyToggle).toBeCalledWith(userId, bearer, 1);
        });
    });
});