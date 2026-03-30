import React from 'react';
import { Context } from '../../../state/Store';
import AccountChildUser from '../../../pages/Account/AccountChildUser';
import * as lib from '../../../utilities/RestApi';
import { render, screen, fireEvent, within, waitFor, act } from '@testing-library/react';

describe('AccountChildUser', () => {
    const userId = 'fakeUserId';
    const childUserId = 'abc123';
    const bearer = ',kasdf8723';
    const spyGet = vi.spyOn(lib, 'getUserChildAccounts');
    const spyPost = vi.spyOn(lib, 'addUserChildAccount');
    const spyDelete = vi.spyOn(lib, 'deleteUserChildAccount');
    const roles = [{ role_name: 'security' }, { role_name: 'garage_door' }];
    const response = [{ user_name: 'Jon', user_id: childUserId, roles: ['garage_door'] }];

    const renderComponent = async (userRoles = roles) => {
        render(
            <Context.Provider value={[{ user: { userId: userId, roles: userRoles }, auth: { bearer: bearer } }, () => { }]}> 
                <AccountChildUser />
            </Context.Provider>
        );
        await screen.findByRole('button', { name: 'user-Jon' });
    }

    beforeEach(() => {
        spyGet.mockClear();
        spyPost.mockClear();
        spyDelete.mockClear();
        spyGet.mockResolvedValue(response);
    });

    it('should display the add account users button', async () => {
        await renderComponent();
        const actual = screen.getByRole('button', {name: 'Add'});

        expect(actual).toBeDefined();
    });

    it('should display a text box for the email address of new user', async () => {
        await renderComponent();
        const actual = screen.getByRole('textbox', { name: 'Email' });

        expect(actual).toBeDefined();
    });

    it('should display the drop down for the role assignment', async () => {
        await renderComponent();
        const actual = screen.getByRole('combobox');

        expect(actual).toBeDefined();
    });

    it('should display the drop down menu items', async () => {
        const roles = [{ role_name: 'security' }, { role_name: 'garage' }];
        await renderComponent(roles);
        fireEvent.mouseDown(screen.getByRole('combobox'));
        const security = screen.getByText("security").textContent;
        const garage = screen.getByText("garage").textContent;

        expect(security).toEqual('security');
        expect(garage).toEqual('garage');
    });

    describe('Input Validations', () => {

        it('should mark input in error state when trying to submit empty', async () => {
            await renderComponent();
            fireEvent.submit(screen.getByRole('button', {name: 'Add'}));
            const actual = screen.getByLabelText('Email');

            expect(actual.ariaInvalid).toEqual('true');
        });

        it('should mark input in error state when trying updating text to empty', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: "" } });
            fireEvent.submit(screen.getByRole('button', {name: 'Add'}));
            const actual = screen.getByLabelText('Email');

            expect(actual.ariaInvalid).toEqual('true')
        });

        it('should mark roles in error state when no role is selected on submission', async () => {
            await renderComponent();
            fireEvent.submit(screen.getByRole('button', {name: 'Add'}));
            const actual = screen.getByText('Roles', { selector: 'label' }).className;

            expect(actual).toContain('Mui-error');
        });

        it('should not allow submission when email in an error state', async () => {
            await renderComponent();
            const addButton = screen.getByRole('button', {name: 'Add'});
            fireEvent.mouseDown(screen.getByRole('combobox'));
            const listbox = within(screen.getByRole('listbox'));

            fireEvent.click(listbox.getByText('garage_door'));
            fireEvent.submit(addButton);
            expect(spyPost).not.toHaveBeenCalled();
        });

        it('should not allow submission when roles in an error state', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'test@test.com' } });
            fireEvent.submit(screen.getByRole('button', {name: 'Add'}));
            expect(spyPost).not.toHaveBeenCalled();
        });
    });

    describe('Api Calls', () => {

        beforeEach(() => {
            spyPost.mockResolvedValue([]);
        });

        it('should make api call to create child account when submitted', async () => {
            const email = 'test@test.com';
            const roles = ['garage_door', 'security'];
            await renderComponent();
            const addButton = screen.getByRole('button', {name: 'Add'});
            fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: email } });
            fireEvent.mouseDown(screen.getByRole('combobox'));
            const listbox = within(screen.getByRole('listbox'));

            fireEvent.click(listbox.getByText('garage_door'));
            fireEvent.click(listbox.getByText('security'));
            await act(async () => {
                fireEvent.click(addButton);
            });

            await waitFor(() => expect(spyPost).toHaveBeenCalledWith(bearer, email, roles));
        });

        it('should remove item from list after clicking the delete', async () => {
            const childUserId = 'abc123';
            spyDelete.mockResolvedValue({ ok: true });
            spyGet.mockResolvedValue([{ user_name: 'Jon', user_id: childUserId, roles: ['garage_door'] }]);
            await renderComponent();

            fireEvent.click(await screen.findByRole('button', {name: 'user-Jon'}));
            await waitFor(() => expect(screen.queryByText('Jon')).toBeNull());
        });
    });
});