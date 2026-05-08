import React from 'react';
import { Context } from '../../../state/Store';
import AccountChildUser from '../../../pages/Account/AccountChildUser';
import * as lib from '../../../utilities/RestApi';
import { render, screen, fireEvent, within, waitFor, act } from '@testing-library/react';

const bearer = 'fake-token';

vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({ getAccessTokenSilently: vi.fn().mockResolvedValue(bearer) }),
}));

describe('AccountChildUser', () => {
    const userId = 'fakeUserId';
    const childUserId = 'abc123';
    const spyGet = vi.spyOn(lib, 'getUserChildAccounts');
    const spyPost = vi.spyOn(lib, 'addUserChildAccount');
    const spyDelete = vi.spyOn(lib, 'deleteUserChildAccount');
    const devices = [{ name: 'security' }, { name: 'garage_door' }];
    const response = [{ user_name: 'Jon', user_id: childUserId, roles: ['garage_door'] }];

    const renderComponent = async (userDevices = devices) => {
        render(
            <Context.Provider value={[{ user: { userId: userId}, devices: userDevices, auth: { bearer: bearer } }, () => { }]}>
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
        const devices = [{ name: 'security' }, { name: 'garage' }];
        await renderComponent(devices);
        fireEvent.mouseDown(screen.getByRole('combobox'));
        const security = screen.getByText("security");
        const garage = screen.getByText("garage");

        expect(security).toBeTruthy();
        expect(garage).toBeTruthy();
    });

    describe('Input Validations', () => {

        it('should disable the add button when the form is empty', async () => {
            await renderComponent();
            const actual = screen.getByRole('button', { name: 'Add' });

            expect(actual).toBeDisabled();
        });

        it('should disable the add button when only an email is entered', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'test@test.com' } });
            const actual = screen.getByRole('button', { name: 'Add' });

            expect(actual).toBeDisabled();
        });

        it('should disable the add button when only a device is selected', async () => {
            await renderComponent();
            const actual = screen.getByRole('button', { name: 'Add' });
            fireEvent.mouseDown(screen.getByRole('combobox'));
            fireEvent.click(within(screen.getByRole('listbox')).getByText('garage_door'));

            expect(actual).toBeDisabled();
        });

        it('should enable the add button when email and device are populated', async () => {
            await renderComponent();
            const actual = screen.getByRole('button', { name: 'Add' });
            fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'test@test.com' } });
            fireEvent.mouseDown(screen.getByRole('combobox'));
            fireEvent.click(within(screen.getByRole('listbox')).getByText('garage_door'));

            expect(actual).not.toBeDisabled();
        });

        it('should mark input in error state when clearing the email', async () => {
            await renderComponent();
            const emailInput = screen.getByRole('textbox', { name: 'Email' });
            fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
            fireEvent.change(emailInput, { target: { value: '' } });

            expect(emailInput.ariaInvalid).toEqual('true');
        });

        it('should not allow submission when email in an error state', async () => {
            await renderComponent();
            const addButton = screen.getByRole('button', {name: 'Add'});
            fireEvent.mouseDown(screen.getByRole('combobox'));
            const listbox = within(screen.getByRole('listbox'));

            fireEvent.click(listbox.getByText('garage_door'));
            fireEvent.click(addButton);
            expect(spyPost).not.toHaveBeenCalled();
        });

        it('should not allow submission when roles in an error state', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'test@test.com' } });
            fireEvent.click(screen.getByRole('button', {name: 'Add'}));
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

            await waitFor(() => expect(spyPost).toHaveBeenCalledWith(email, roles));
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