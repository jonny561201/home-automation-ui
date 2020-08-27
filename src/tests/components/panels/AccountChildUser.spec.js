import React from 'react';
import AccountChildUser from '../../../components/segments/AccountChildUser';
import { getStore } from '../../../state/GlobalState';
import * as lib from '../../../utilities/RestApi';
import { render, screen, fireEvent, within } from '@testing-library/react';

describe('AccountChildUser', () => {
    const userId = 'fakeUserId';
    const spyPost = jest.spyOn(lib, 'addUserChildAccount');
    const roles = [{role_name: 'security'}, {role_name: 'garage_door'}];

    beforeEach(() => {
        getStore().setUserId(userId);
        getStore().setUserRoles(roles);
        spyPost.mockClear();
    });

    it('should display the Account users header', () => {
        render(<AccountChildUser />);
        const actual = screen.getByText('Account Users').textContent;

        expect(actual).toEqual('Account Users');
    });

    it('should display the add account users button', () => {
        render(<AccountChildUser />);
        const actual = screen.getByTestId('add-user-button').textContent;

        expect(actual).toEqual('Add User');
    });

    it('should display a text box for the email address of new user', () => {
        render(<AccountChildUser />);
        const actual = screen.getByTestId('email-account-user').querySelector('input');

        expect(actual).toBeDefined();
    });

    it('should display the drop down for the role assignment', () => {
        render(<AccountChildUser />);
        const actual = screen.getByTestId('roles-account-user').querySelector('input');

        expect(actual).toBeDefined();
    });

    it('should display the drop down menu items', () => {
        const roles = [{role_name: 'security'},{role_name: 'garage'}];
        getStore().setUserRoles(roles);
        render(<AccountChildUser />);
        fireEvent.click(screen.getByTestId("roles-account-user").querySelector('div'));
        const security = screen.getByText("security").textContent;
        const garage = screen.getByText("garage").textContent;

        expect(security).toEqual('security');
        expect(garage).toEqual('garage');
    });

    it('should make api call to create child account when submitted', () => {
        const email = 'test@test.com';
        const roles = ['garage_door', 'security'];
        render(<AccountChildUser />);
        fireEvent.click(screen.getByTestId('roles-account-user').querySelector('div'));
        const listbox = within(screen.getByRole('listbox'));

        fireEvent.click(listbox.getByText(/garage_door/i));
        fireEvent.click(listbox.getByText(/security/i));
        fireEvent.change(screen.getByTestId('email-account-user').querySelector('input'), { target: { value: email } });
        fireEvent.click(screen.getByTestId('add-user-button'));

        expect(spyPost).toHaveBeenCalledWith(userId, email, roles);
    });
});