import React from 'react';
import { Context } from '../../../state/Store';
import Account from '../../../pages/Account/Account';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../state/GlobalState';
import { render, screen, fireEvent, act } from '@testing-library/react';


vi.mock('../../../utilities/StateUtil', () => ({ default: () => null }));


describe('Account Page', () => {
    const bearer = 'alkjsdf897';
    const userId = 'fakeUserId';
    const user = { firstName: 'test', lastName: 'test', userId: userId };
    const spyPost = vi.spyOn(lib, 'updateUserAccount');
    const spyGet = vi.spyOn(lib, 'getUserChildAccounts');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ user: user, auth: { bearer: bearer } }, () => { }]}>
                    <Account />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyPost.mockClear();
        spyGet.mockReturnValue([]);
    });

    it('should set the active page to Account', async () => {
        await renderComponent();
        expect(getStore().getActivePage()).toEqual('Account');
    });

    it('should display header for changing password', async () => {
        await renderComponent();
        const actual = screen.getByText('Change Password').textContent;

        expect(actual).toEqual('Change Password');
    });

    it('should display the old password label', async () => {
        await renderComponent();
        const actual = screen.queryByLabelText('Old Password');
        expect(actual).toBeDefined();
    });

    it('should display the old password input box', async () => {
        await renderComponent();
        const actual = screen.getByLabelText('Old Password');
        expect(actual).toBeDefined();
    });

    it('should display the new password label', async () => {
        await renderComponent();
        const actual = screen.queryByLabelText('New Password');
        expect(actual).toBeDefined();
    });

    it('should display the new password input box', async () => {
        await renderComponent();
        const actual = screen.getByLabelText('New Password');
        expect(actual).toBeDefined();
    });

    it('should display the confirm new password label', async () => {
        await renderComponent();
        const actual = screen.queryByLabelText('Confirm New Password');
        expect(actual).toBeDefined();
    });

    it('should display the confirm new password input box', async () => {
        await renderComponent();
        const actual = screen.getByLabelText('Confirm New Password');
        expect(actual).toBeDefined();
    });

    it('should display the submit button', async () => {
        await renderComponent();
        const actual = screen.getByRole('button', {name: 'Submit'}).textContent;
        expect(actual).toEqual('Submit');
    });

    describe('Password Update Errors', () => {

        beforeEach(() => {
            spyPost.mockReturnValue({ ok: true })
        })

        it('should display error when passwords do not match', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'pass1' } });
                fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'pass2' } });
            });
            const actualNew = screen.getByText('New Password', { selector: 'label' }).className;
            const actualConfirm = screen.getByText('Confirm New Password', { selector: 'label' }).className;

            expect(actualNew).toContain('error');
            expect(actualConfirm).toContain('error');
        });

        it('should not display error when passwords match', async () => {
            const matchingPass = 'test';
            await renderComponent();
            fireEvent.change(screen.getByLabelText('New Password'), { target: { value: matchingPass } });
            fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: matchingPass } });
            const actualNew = screen.getByText('New Password', { selector: 'label' }).className;
            const actualConfirm = screen.getByText('Confirm New Password', { selector: 'label' }).className;

            expect(actualNew).not.toContain('error');
            expect(actualConfirm).not.toContain('error');
        });

        it('should display old password error when it is empty string on submit', async () => {
            await renderComponent();
            fireEvent.click(screen.getByRole('button', {name: 'Submit'}));
            const actual = screen.getByText('Old Password', { selector: 'label' }).className;

            expect(actual).toContain('error');
        });

        it('should not display old password error when it is populated on submit', async () => {
            await renderComponent();
            fireEvent.change(screen.getByLabelText('Old Password'), { target: { value: 'validPass' } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button', {name: 'Submit'}));
            });
            const actual = screen.getByText('Old Password', { selector: 'label' }).className;

            expect(actual).not.toContain('error');
        });

        it('should make api call when not in error state', async () => {
            const oldPass = 'oldPass';
            const matchingPass = 'newPass';
            await renderComponent();
            fireEvent.change(screen.getByLabelText('Old Password'), { target: { value: oldPass } });
            fireEvent.change(screen.getByLabelText('New Password'), { target: { value: matchingPass } });
            fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: matchingPass } });

            await act(async () => {
                fireEvent.click(screen.getByRole('button', {name: 'Submit'}));
            });
            expect(spyPost).toHaveBeenCalledWith(bearer, oldPass, matchingPass);
        });
    });
});