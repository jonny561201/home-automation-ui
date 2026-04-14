import React from 'react';
import { Context } from '../../../state/Store';
import Account from '../../../pages/Account/Account';
import * as lib from '../../../utilities/RestApi';
import { render, screen, fireEvent, act } from '@testing-library/react';

const bearer = 'fake-token';

vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({ getAccessTokenSilently: vi.fn().mockResolvedValue(bearer) }),
}));

vi.mock('../../../utilities/StateUtil', () => ({ default: () => null }));


describe('Account Page', () => {
    const userId = 'fakeUserId';
    const user = { firstName: 'test', lastName: 'test', userId: userId };
    const dispatch = vi.fn();
    const spyPost = vi.spyOn(lib, 'changeUserPassword');
    const spyGet = vi.spyOn(lib, 'getUserChildAccounts');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ user: user, auth: { bearer: bearer } }, dispatch]}> 
                    <Account />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        dispatch.mockClear();
        spyPost.mockClear();
        spyGet.mockReturnValue([]);
    });

    it('should set the active page to Account', async () => {
        await renderComponent();
        expect(dispatch).toHaveBeenCalledWith({ type: 'SET_ACTIVE_PAGE', payload: 'Account' });
    });

    it('should display the change password email button', async () => {
        await renderComponent();
        const actual = screen.getByRole('button', {name: 'Send Password Reset Email'});
        expect(actual).toBeTruthy();
    });

    it('should make api call when change button clicked', async () => {
        await renderComponent();

        await act(async () => {
            fireEvent.click(screen.getByRole('button', {name: 'Send Password Reset Email'}));
        });
        expect(spyPost).toHaveBeenCalled();
    });
});