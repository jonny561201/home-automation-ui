import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react'
import * as lib from '../../../utilities/Services';
import userEvent from '@testing-library/user-event'
import RegisterDevice from '../../../components/panels/RegisterDevice';

describe('Add Device', () => {

    const spyDebounce = jest.spyOn(lib, 'debounchApi');
    const spyValidate = jest.spyOn(lib, 'isValidIpAddress');

    beforeEach(() => {
        spyDebounce.mockClear();
        spyValidate.mockClear();
    })

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

    it('should call debounce function on change', async () => {
        const ipAddress = "12.12.12.12";
        await act(() => {
            render(<RegisterDevice />);
        });
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, {target: {value: ipAddress}});
        expect(spyDebounce).toBeCalled();
    });

    it('should call validate function on change', async () => {
        spyDebounce.mockReturnValue(() => {})
        const ipAddress = "12.12.12.12";
        await act(() => {
            render(<RegisterDevice />);
        });
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, {target: {value: ipAddress}});
        expect(spyDebounce).toBeCalled();
    });
});