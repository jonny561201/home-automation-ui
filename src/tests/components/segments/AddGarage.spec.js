import React from 'react';
import { Context } from '../../../state/Store';
import * as lib from '../../../utilities/RestApi';
import AddGarage from "../../../components/segments/AddGarage";
import { render, screen, fireEvent, act } from '@testing-library/react';


describe('Add Garage', () => {
    const deviceId = 'abc123';
    const userId = 'fakeUserId';
    const spyAdd = jest.spyOn(lib, 'addUserDeviceNode');
    const spyGet = jest.spyOn(lib, 'getRolesByUserId');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{deviceId: deviceId, userId: userId}, () => {}]}>
                    <AddGarage />
                </Context.Provider>
            );
        });
    }
    
    beforeEach(() => {
        spyGet.mockClear();
        spyAdd.mockClear();
        spyGet.mockReturnValue({roles: [{}]});
        spyAdd.mockReturnValue({ ok: false, json: () => { return { availableNodes: 2 } } });
    });

    describe('Add Device Screen', () => {
        it('should display the Add Garage Door text', async () => {
            await renderComponent();
            const actual = screen.getByRole('heading').textContent;
            expect(actual).toEqual('Add Garage Door');
        });

        it('should display the Garage Door input box', async () => {
            await renderComponent();
            const actual = screen.getByRole('textbox');
            expect(actual).toBeDefined();
        });

        it('should display the close icon', async () => {
            await renderComponent();
            const actual = screen.getByTestId('garage-close-button');
            expect(actual).toBeDefined();
        });

        it('should display the Add garage button', async () => {
            await renderComponent();
            const actual = screen.getByRole('button').textContent;
            expect(actual).toEqual('Add');
        });

        it('should make api call to add node if valid name', async () => {
            const name = 'TestGarage';
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: name } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            expect(spyAdd).toBeCalledWith(userId, deviceId, name);
        });

        it('should make api call to get roles if valid name', async () => {
            const name = 'TestGarage';
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: name } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            expect(spyGet).toBeCalledWith(userId);
        });

        it('should not make api call if the when invalid name', async () => {
            await renderComponent();
            const name = '';
            fireEvent.change(screen.getByRole('textbox'), { target: { value: name } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            expect(spyAdd).toHaveBeenCalledTimes(0);
        });

        it('should not make api call if the when name is untouched', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            expect(spyAdd).toHaveBeenCalledTimes(0);
        });
    });

    describe('Add Node Screen', () => {

        it('should display the Success Header', async () => {
            spyAdd.mockReturnValue({ ok: true, json: () => { return { availableNodes: 1 } } });
            const name = "ImValid";
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: name } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            const actual = screen.getByText('Successfully Added').textContent;
            expect(actual).toEqual('Successfully Added');
        });

        it('should display the Close Icon Header', async () => {
            spyAdd.mockReturnValue({ ok: true, json: () => { return { availableNodes: 1 } } });
            const name = "ImValid";
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: name } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            const actual = screen.getByTestId('garage-close-button').textContent;
            expect(actual).toBeDefined();
        });

        it('should display the text asking to setup additional garage door openers', async () => {
            const nodeCount = 1;
            spyAdd.mockReturnValue({ ok: true, json: () => { return { availableNodes: nodeCount } } });
            const name = "ImValid";
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: name } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            const actual = screen.getByText(`Would you like to setup the remaining (${nodeCount}) openers?`).textContent;
            expect(actual).toEqual(`Would you like to setup the remaining (${nodeCount}) openers?`);
        });

        it('should display the Add Garage Door Opener button', async () => {
            spyAdd.mockReturnValue({ ok: true, json: () => { return { availableNodes: 1 } } });
            const name = "ImValid";
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: name } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            const actual = screen.getByRole('button').textContent;
            expect(actual).toEqual('Add');
        });

        it('should navigate back to the Add Garage Door screen when adding another device', async () => {
            spyAdd.mockReturnValue({ ok: true, json: () => { return { availableNodes: 1 } } });
            const name = "ImValid";
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: name } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Add Garage Door').textContent;
            expect(actual).toEqual('Add Garage Door');
        });
    });
});