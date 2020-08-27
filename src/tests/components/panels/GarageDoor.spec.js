import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import * as lib from '../../../utilities/RestApi';
import GarageDoor from "../../../components/segments/GarageDoor";
import { Context } from '../../../state/Store';


describe('Garage Door', () => {
    const userId = 'fakeuserid';
    const doorName = 'testNode';
    const device = {node_name: doorName, node_device: 1}
    const spyGet = jest.spyOn(lib, 'getGarageStatus');
    const spyUpdate = jest.spyOn(lib, 'updateGarageState');
    const spyToggle = jest.spyOn(lib, 'toggleGarageDoor');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{userId: userId}, () => {}]}>
                    <GarageDoor device={device}/>
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyGet.mockReturnValue({ isGarageOpen: true });
        spyGet.mockClear();
        spyUpdate.mockClear();
        spyToggle.mockClear();
    });


    it('should show close garage button', async () => {
        spyGet.mockReturnValue({isGarageOpen: true});
        await renderComponent();
        const actual = screen.getByTestId('update-garage-close').textContent;
        expect(actual).toEqual('Close');
    });

    it('should show open garage button', async () => {
        spyGet.mockReturnValue({isGarageOpen: false});
        await renderComponent();
        const actual = screen.getByTestId('update-garage-open').textContent;
        expect(actual).toEqual('Open');
    });

    it('should show toggle garage button', async () => {
        await renderComponent();
        const actual = screen.getByTestId('toggle-garage-button').textContent;
        expect(actual).toEqual('Toggle');
    });

    it('should show Door text', async () => {
        await renderComponent();
        const actual = screen.getByText('Door:').textContent;
        expect(actual).toEqual('Door: ');
    });

    it('should show Door Name text', async () => {
        await renderComponent();
        const actual = screen.getByText(doorName).textContent;
        expect(actual).toEqual(doorName);
    });

    it('should show Door Status text', async () => {
        await renderComponent();
        const actual = screen.getByText('Status:').textContent;
        expect(actual).toEqual('Status: ');
    });

    it('should show Duration text', async () => {
        await renderComponent();
        const actual = screen.getByText('Duration:').textContent;
        expect(actual).toEqual('Duration: ');
    });

    it('should display Close text when response is false', async () => {
        spyGet.mockReturnValue({ isGarageOpen: false })
        await renderComponent();
        const actual = screen.getByText("Closed").textContent;
        expect(actual).toEqual('Closed');
    });

    it('should display Open text when response is true', async () => {
        spyGet.mockReturnValue({ isGarageOpen: true })
        await renderComponent();
        const actual = screen.getByText("Open").textContent;
        expect(actual).toEqual('Open');
    });

    describe('garage door api', () => {

        it('should make the initial call to get the garage data', async () => {
            await renderComponent();
            expect(spyGet).toBeCalledWith(userId, 1);
        });

        it('should call update function with false when closing', async () => {
            spyGet.mockReturnValue({ isGarageOpen: true })
            await renderComponent();
            userEvent.click(screen.getByTestId("update-garage-close"));
            expect(spyUpdate).toBeCalledWith(false, userId, 1);
        });

        it('should call update function with true when opening', async () => {
            spyGet.mockReturnValue({ isGarageOpen: false })
            await renderComponent();
            userEvent.click(screen.getByTestId("update-garage-open"));
            expect(spyUpdate).toBeCalledWith(true, userId, 1);
        });
        
        it('should call toggle function', async () => {
            await renderComponent();
            userEvent.click(screen.getByTestId("toggle-garage-button"));

            expect(spyToggle).toBeCalledWith(userId, 1);
        });
    });
});