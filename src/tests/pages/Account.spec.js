import React from 'react';
import Account from '../../pages/Account';
import * as lib from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('Account Page', () => {

    const userId = 'fakeUserId';
    const spyPost = jest.spyOn(lib, 'updateUserAccount');
    const spyGet = jest.spyOn(lib, 'getUserChildAccounts');

    const renderComponent = async () => {
        await act(async () => {
            render(<Account />);
        });
    }

    beforeEach(() => {
        getStore().setUserId(userId);
        spyPost.mockClear();
        spyGet.mockReturnValue([]);
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
        const actual = screen.getByTestId('password-submit').textContent;
        expect(actual).toEqual('Submit');
    });

    it('should display the locate garage component', async () => {
        await renderComponent();
        const actual = screen.getByText('Set Garage Location');
        expect(actual).toBeDefined();
    });

    describe('Password Update Errors', () => {

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
            fireEvent.click(screen.getByTestId('password-submit'));
            const actual = screen.getByTestId('old-pass').querySelector('label').className;

            expect(actual).toContain('error');
        });

        it('should not display old password error when it is populated on submit', async () => {
            await renderComponent();
            fireEvent.change(screen.getByTestId('old-pass').querySelector('input'), { target: { value: 'validPass' } });
            fireEvent.click(screen.getByTestId('password-submit'));
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
                fireEvent.click(screen.getByTestId('password-submit'));
            });
            expect(spyPost).toHaveBeenCalledWith(userId, oldPass, matchingPass);
        });
    });
});