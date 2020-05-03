import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddGarage from "../../../components/panels/AddGarage";
import { getStore } from '../../../GlobalState';
import * as lib from '../../../utilities/RestApi';

describe('Add Garage', () => {

    const userId = 'fakeUserId';
    getStore().setUserId(userId);
    const spyAdd = jest.spyOn(lib, 'addUserDeviceNode');

    beforeEach(() => {
        spyAdd.mockClear();
    });

    it('should display the Add Garage Door text', () => {
        render(<AddGarage />);
        const actual = screen.getByRole('heading').textContent;
        expect(actual).toEqual('Add Garage Door');
    });

    it('should display the Garage Door input box', () => {
        render(<AddGarage />);
        const actual = screen.getByRole('textbox');
        expect(actual).toBeDefined();
    });

    it('should display the Add garage button', () => {
        render(<AddGarage />);
        const actual = screen.getByRole('button').textContent;
        expect(actual).toEqual('Add');
    });

    it('should make api call if the when valid name', () => {
        render(<AddGarage />);
        const name = 'TestGarage';
        fireEvent.change(screen.getByRole('textbox'), {target: {value: name}});
        fireEvent.click(screen.getByRole('button'));
        expect(spyAdd).toBeCalledWith(userId, 'deviceId', name);
    });

    it('should not make api call if the when invalid name', () => {
        render(<AddGarage />);
        const name = '';
        fireEvent.change(screen.getByRole('textbox'), {target: {value: name}});
        fireEvent.click(screen.getByRole('button'));
        expect(spyAdd).toHaveBeenCalledTimes(0);
    });

    it('should not make api call if the when name is untouched', () => {
        render(<AddGarage />);
        fireEvent.click(screen.getByRole('button'));
        expect(spyAdd).toHaveBeenCalledTimes(0);
    });
});