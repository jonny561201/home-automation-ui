import React from 'react';
import AccountChildUser from '../../../components/segments/AccountChildUser';
import { getStore } from '../../../state/GlobalState';
import * as lib from '../../../utilities/RestApi';
import { render, screen, fireEvent, within, act } from '@testing-library/react';

describe('AccountChildUser', () => {
    const userId = 'fakeUserId';
    const childUserId = 'abc123';
    const spyGet = jest.spyOn(lib, 'getUserChildAccounts');
    const spyPost = jest.spyOn(lib, 'addUserChildAccount');
    const spyDelete = jest.spyOn(lib, 'deleteUserChildAccount');
    const roles = [{ role_name: 'security' }, { role_name: 'garage_door' }];
    const response = [{ user_name: 'Jon', user_id: childUserId, roles: ['garage_door'] }];

    const renderComponent = async () => {
        await act(async () => {
            render(
                <AccountChildUser />
            );
        });
    }

    beforeEach(() => {
        getStore().setUserId(userId);
        getStore().setUserRoles(roles);
        spyGet.mockClear();
        spyPost.mockClear();
        spyDelete.mockClear();
        spyGet.mockReturnValue(response);

    });

    it('should display the Account users header', async () => {
        await renderComponent();
        const actual = screen.getByText('Account Users').textContent;

        expect(actual).toEqual('Account Users');
    });

    it('should display the add account users button', async () => {
        await renderComponent();
        const actual = screen.getByTestId('add-user-button');

        expect(actual).toBeDefined();
    });

    it('should display a text box for the email address of new user', async () => {
        await renderComponent();
        const actual = screen.getByTestId('email-account-user').querySelector('input');

        expect(actual).toBeDefined();
    });

    it('should display the drop down for the role assignment', async () => {
        await renderComponent();
        const actual = screen.getByTestId('roles-account-user').querySelector('input');

        expect(actual).toBeDefined();
    });

    it('should display the drop down menu items', async () => {
        const roles = [{ role_name: 'security' }, { role_name: 'garage' }];
        getStore().setUserRoles(roles);
        await renderComponent();
        fireEvent.click(screen.getByTestId("roles-account-user").querySelector('div'));
        const security = screen.getByText("security").textContent;
        const garage = screen.getByText("garage").textContent;

        expect(security).toEqual('security');
        expect(garage).toEqual('garage');
    });

    describe('Api Calls', () => {

        it('should make api call to create child account when submitted', async () => {
            const email = 'test@test.com';
            const roles = ['garage_door', 'security'];
            await renderComponent();
            fireEvent.click(screen.getByTestId('roles-account-user').querySelector('div'));
            const listbox = within(screen.getByRole('listbox'));

            fireEvent.click(listbox.getByText(/garage_door/i));
            fireEvent.click(listbox.getByText(/security/i));
            fireEvent.change(screen.getByTestId('email-account-user'), { target: { value: email } });
            await act(async () => {
                fireEvent.click(screen.getByTestId('add-user-button'));
            });

            expect(spyPost).toHaveBeenCalledWith(userId, email, roles);
        });

        it('should remove item from list after clicking the delete', async () => {
            const childUserId = 'abc123';
            spyDelete.mockReturnValue({ ok: true });
            spyGet.mockReturnValue([{ user_name: 'Jon', user_id: childUserId, roles: ['garage_door'] }]);
            await renderComponent();

            await act(async () => {
                fireEvent.click(screen.getByTestId('user-Jon'));
            });
            const actual = screen.queryByText('Jon');
            expect(actual).toBeNull();
        });
    });
});