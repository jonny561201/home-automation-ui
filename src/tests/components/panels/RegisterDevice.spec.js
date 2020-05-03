import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as lib from '../../../utilities/Services';
import * as api from '../../../utilities/RestApi'
import RegisterDevice from '../../../components/panels/RegisterDevice';
import { getStore } from '../../../GlobalState';

describe('Add Device', () => {

    const userId = 'fakeUserId';
    const spyAdd = jest.spyOn(api, 'addUserDevice')
    const spyDebounce = jest.spyOn(lib, 'debounchApi');
    const spyValidate = jest.spyOn(lib, 'isValidIpAddress');
    getStore().setUserId(userId)

    beforeEach(() => {
        spyAdd.mockClear();
        spyDebounce.mockClear();
        spyValidate.mockClear();
    })

    describe('Before Transition', () => {

        it('should display Add Device text', () => {
            render(<RegisterDevice />)
            const actual = screen.getByTestId('data-add-device');
    
            expect(actual.textContent).toEqual("Add Device");
        });
    
        it('should have an input box for the ip address', () => {
            render(<RegisterDevice />)
            const actual = screen.getByRole('textbox');
            expect(actual).toBeDefined();
        });
    
        it('should display button for submitting request', () => {
            render(<RegisterDevice />);
            const actual = screen.getByRole('button');
            expect(actual).toBeDefined();
        });

        it('should display the close icon', () => {
            render(<RegisterDevice />);
            const actual = screen.getByTestId('close-button');
            expect(actual).toBeDefined();
        });
    
        it('should call debounce function on change', async () => {
            const ipAddress = "12.12.12.12";
            await act(async () => {
                render(<RegisterDevice />);
            });
            const inputBox = screen.getByRole('textbox');
            fireEvent.change(inputBox, {target: {value: ipAddress}});
            expect(spyDebounce).toBeCalled();
        });
    
        it('should make api call to add device when IP not in error', () => {
            const ipAddress = "12.12.12.12";
            render(<RegisterDevice />);
            const inputBox = screen.getByRole('textbox');
            fireEvent.change(inputBox, {target: {value: ipAddress}});
    
            const button = screen.getByRole('button');
            fireEvent.submit(button);
            expect(spyAdd).toBeCalledWith(userId, 'garage_door', ipAddress);
        });
    
        // it('should not make api call to add device when IP in error', async () => {
        //     spyValidate.mockReturnValue(false);
        //     await act(() => {
        //         render(<RegisterDevice />);
        //     });
        //     const inputBox = screen.getByRole('textbox');
        //     fireEvent.change(inputBox, {target: {value: "I dont matter"}});
    
        //     const button = screen.getByRole('button');
        //     // screen.getByText('Add Device')
        //     fireEvent.submit(button);
        //     expect(spyAdd).toHaveBeenCalledTimes(0);
        // });
    });

    describe('After Transition', () => {
        // it('should display Set Garage door name text', async () => {
        //     spyValidate.mockReturnValue(true);
        //     const ipAddress = "12.12.12.12";
        //     render(<RegisterDevice />);
        //     userEvent.type(screen.getByRole('textbox'), ipAddress);
        //     userEvent.click(screen.getByRole('button'));

        //     const actual = screen.getByTestId('data-add-device').textContent;
        //     expect(actual).toEqual('Add Garage Door Opener');
        // });
    });
});