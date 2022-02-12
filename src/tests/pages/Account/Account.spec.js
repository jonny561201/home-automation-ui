import React from 'react';
import { Context } from '../../../state/Store';
import Account from '../../../pages/Account/Account';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../state/GlobalState';
import { render, screen, fireEvent, act } from '@testing-library/react';


jest.mock('../../../utilities/StateUtil', () => () => { });


describe('Account Page', () => {
    const bearer = 'alkjsdf897';
    const userId = 'fakeUserId';
    const user = { firstName: 'test', lastName: 'test', userId: userId };
    const spyPost = jest.spyOn(lib, 'updateUserAccount');
    const spyGet = jest.spyOn(lib, 'getUserChildAccounts');

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
        const actual = screen.getByTestId('old-pass').querySelector('input');
        expect(actual).toBeDefined();
    });

    it('should display the new password label', async () => {
        await renderComponent();
        const actual = screen.queryByLabelText('New Password');
        expect(actual).toBeDefined();
    });

    it('should display the new password input box', async () => {
        await renderComponent();
        const actual = screen.getByTestId('new-pass').querySelector('input');
        expect(actual).toBeDefined();
    });

    it('should display the confirm new password label', async () => {
        await renderComponent();
        const actual = screen.queryByLabelText('Confirm Password');
        expect(actual).toBeDefined();
    });

    it('should display the confirm new password input box', async () => {
        await renderComponent();
        const actual = screen.getByTestId('confirm-pass').querySelector('input');
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
                fireEvent.change(screen.getByTestId('new-pass').querySelector('input'), { target: { value: 'pass1' } });
                fireEvent.change(screen.getByTestId('confirm-pass').querySelector('input'), { target: { value: 'pass2' } });
            });
            const newInput = screen.getByTestId('new-pass').querySelector('label').className;
            const confirmInput = screen.getByTestId('confirm-pass').querySelector('label').className;

            expect(newInput).toContain('error');
            expect(confirmInput).toContain('error');
        });

        it('should not display error when passwords match', async () => {
            const matchingPass = 'test';
            await renderComponent();
            fireEvent.change(screen.getByTestId('new-pass').querySelector('input'), { target: { value: matchingPass } });
            fireEvent.change(screen.getByTestId('confirm-pass').querySelector('input'), { target: { value: matchingPass } });
            const newInput = screen.getByTestId('new-pass').querySelector('label').className;
            const confirmInput = screen.getByTestId('confirm-pass').querySelector('label').className;

            expect(newInput).not.toContain('error');
            expect(confirmInput).not.toContain('error');
        });

        it('should display old password error when it is empty string on submit', async () => {
            await renderComponent();
            fireEvent.click(screen.getByRole('button', {name: 'Submit'}));
            const actual = screen.getByTestId('old-pass').querySelector('label').className;

            expect(actual).toContain('error');
        });

        it('should not display old password error when it is populated on submit', async () => {
            await renderComponent();
            fireEvent.change(screen.getByTestId('old-pass').querySelector('input'), { target: { value: 'validPass' } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button', {name: 'Submit'}));
            });
            const actual = screen.getByTestId('old-pass').querySelector('label').className;

            expect(actual).not.toContain('error');
        });

        it('should make api call when not in error state', async () => {
            const oldPass = 'oldPass';
            const matchingPass = 'newPass';
            await renderComponent();
            fireEvent.change(screen.getByTestId('old-pass').querySelector('input'), { target: { value: oldPass } });
            fireEvent.change(screen.getByTestId('new-pass').querySelector('input'), { target: { value: matchingPass } });
            fireEvent.change(screen.getByTestId('confirm-pass').querySelector('input'), { target: { value: matchingPass } });

            await act(async () => {
                fireEvent.click(screen.getByRole('button', {name: 'Submit'}));
            });
            expect(spyPost).toHaveBeenCalledWith(userId, bearer, oldPass, matchingPass);
        });
    });
});