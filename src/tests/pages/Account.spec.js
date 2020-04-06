import React from 'react';
import { shallow } from 'enzyme';
import Account from '../../pages/Account';
import * as lib from '../../utilities/RestApi';
import { TextField } from '@material-ui/core';
import { getStore } from '../../GlobalState';

describe('Account Page', () => {

    let account;
    const spyPost = jest.spyOn(lib, 'updateUserAccount');
    const userId = 'fakeUserId'

    beforeEach(() => {
        getStore().setUserId(userId);
        spyPost.mockClear();
        account = shallow(<Account />)
    });

    it('should display header for changing password', () => {
        const actual = account.find('h2');

        expect(actual).toHaveLength(1);
    });

    it('should display the old password input box', () => {
        const actual = account.find(TextField).at(0);
        expect(actual).toHaveLength(1);
    });

    it('should display the old password label', () => {
        const actual = account.find(TextField).at(0);
        expect(actual.props()).toHaveProperty('label', 'Old Password');
    });

    it('should display the new password input box', () => {
        const actual = account.find(TextField).at(1);
        expect(actual).toHaveLength(1);
    });

    it('should display the new password label', () => {
        const actual = account.find(TextField).at(1);
        expect(actual.props()).toHaveProperty('label', 'New Password');
    });

    it('should display the confirm new password input box', () => {
        const actual = account.find(TextField).at(2);
        expect(actual).toHaveLength(1);
    });

    it('should display the confirm new password label', () => {
        const actual = account.find(TextField).at(2);
        expect(actual.props()).toHaveProperty('label', 'Confirm New Password');
    });

    it('should display the submit button', () => {
        const actual = account.find('button').text();
        expect(actual).toEqual('Submit');
    });

    describe('SubmitAccountChange', () => {
        const oldPass = "oldPassword";
        const newPass = "newPassword";
        
        it('should call updateUserAccount when not in error state', () => {
            account.state().oldPasswordError = false;
            account.state().changed = true;
            account.state().doPasswordsMatch = false;
            account.state().oldPassword = oldPass;
            account.state().secondNewPassword = newPass;
            account.instance().forceUpdate();

            account.instance().submitAccountChange();

            expect(spyPost).toBeCalledWith(userId, oldPass, newPass)
        });
        
        it('should set to error when state unchanged', () => {
            account.state().oldPasswordError = false;
            account.state().changed = false;
            account.state().doPasswordsMatch = false;
            account.state().oldPassword = oldPass;
            account.state().secondNewPassword = newPass;
            account.instance().forceUpdate();

            account.instance().submitAccountChange();

            expect(spyPost).toHaveBeenCalledTimes(0);
            expect(account.state().oldPasswordError).toBeTruthy();
            expect(account.state().doPasswordsMatch).toBeTruthy();
        });
        
        it('should set to error when state old password error', () => {
            account.state().oldPasswordError = true;
            account.state().changed = true;
            account.state().doPasswordsMatch = false;
            account.state().oldPassword = oldPass;
            account.state().secondNewPassword = newPass;
            account.instance().forceUpdate();

            account.instance().submitAccountChange();

            expect(spyPost).toHaveBeenCalledTimes(0);
            expect(account.state().oldPasswordError).toBeTruthy();
            expect(account.state().doPasswordsMatch).toBeTruthy();
        });
        
        it('should set to error when state password error', () => {
            account.state().oldPasswordError = false;
            account.state().changed = true;
            account.state().doPasswordsMatch = true;
            account.state().oldPassword = oldPass;
            account.state().secondNewPassword = newPass;
            account.instance().forceUpdate();

            account.instance().submitAccountChange();

            expect(spyPost).toHaveBeenCalledTimes(0);
            expect(account.state().oldPasswordError).toBeTruthy();
            expect(account.state().doPasswordsMatch).toBeTruthy();
        });
    });

    describe('onSecondPasswordChange', () => {
        const firstPass ="firstPassword";
        const secondPass = "secondPassword";

        it('should update the second password and update the changed value', () => {
            
            await account.instance().onSecondPasswordChange(secondPass);
            expect(account.state().secondNewPassword).toEqual(secondPass);
            expect(account.state().changed).toBeTruthy();
        });

        it('should set the do passwords match to false when match', () => {
            account.state().firstNewPassword = firstPass;
            account.state().secondNewPassword = firstPass;
            account.instance().forceUpdate();

            await account.instance().onSecondPasswordChange(secondPass);
            expect(account.state().doPasswordsMatch).toBeFalsy();
        });

        it('should set the do passwords match to true when dont match', () => {
            account.state().firstNewPassword = firstPass;
            account.state().secondNewPassword = secondPass;
            account.instance().forceUpdate();

            await account.instance().onSecondPasswordChange(secondPass);
            expect(account.state().doPasswordsMatch).toBeTruthy();
        });
    });
});