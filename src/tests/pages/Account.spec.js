import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
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
        account = mount(<Account />);
    });


    it('should display header for changing password', () => {
        const actual = account.find('h2').at(0);

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
        const actual = account.find('button').at(0).text();
        expect(actual).toEqual('Submit');
    });

    describe('Password Update Errors', () => {

        it('should display error when passwords does do not match', async () => {
            await act(async () => {
                account.find(TextField).at(1).props().onChange({target: {value:'pass1'}});
                account.find(TextField).at(2).props().onChange({target: {value:'pass2'}});
            });
            account.find('button').at(0).simulate('submit');
            account.find('button').at(0).simulate('submit');

            expect(account.find(TextField).at(1).prop("error")).toBeTruthy();
            expect(account.find(TextField).at(2).prop("error")).toBeTruthy();
        });

        it('should not display error when passwords match', async () => {
            const matchingPass = 'test';
            await act(async () => {
                account.find(TextField).at(1).props().onChange({target: {value:matchingPass}});
                account.find(TextField).at(2).props().onChange({target: {value:matchingPass}});
            });
            account.find('button').at(0).simulate('submit');

            expect(account.find(TextField).at(1).prop("error")).toBeFalsy();
            expect(account.find(TextField).at(2).prop("error")).toBeFalsy();
        });

        it('should display old password error when it is empty string on submit', async () => {
            account.find('button').at(0).simulate('submit');

            expect(account.find(TextField).at(0).prop("error")).toBeTruthy();
        });

        it('should not display old password error when it is populated on submit', async () => {
            await act(async () => {
                account.find(TextField).at(0).props().onChange({target: {value:'test'}});
            });
            account.find('button').at(0).simulate('submit');

            expect(account.find(TextField).at(0).prop("error")).toBeFalsy();
        });

        it('should make api call when not in error state', async () => {
            const oldPassword = "oldPassword"
            const newPassword = "newPassword"
            await act(async () => {
                account.find(TextField).at(0).props().onChange({target: {value:oldPassword}});
                account.find(TextField).at(1).props().onChange({target: {value:newPassword}});
                account.find(TextField).at(2).props().onChange({target: {value:newPassword}});
            });
            account.find('button').at(0).simulate('submit');
            expect(spyPost).toBeCalledWith(userId, oldPassword, newPassword)
        });
    });

    describe('Add Device', () => {

        let accountPage;
        const roles = [{role_name: 'garage_door', devices:[]}]

        beforeEach(() => {
            getStore().setUserRoles(roles)
            accountPage = mount(<Account />);
        });

        describe('has unregistered devices', () => {
            it('should display the Add Device header', () => {
                const actual = accountPage.find('h2').at(1).text();
    
                expect(actual).toEqual('Add Device');
            });
    
            it('should display the input box for providing the device ip address', () => {
                const actual = accountPage.find(TextField).at(3);
                expect(actual).toHaveLength(1);
            });
    
            it('should display the add device label', () => {
                const actual = accountPage.find(TextField).at(3);
                expect(actual.props()).toHaveProperty('label', 'Add Device');
            });
    
            it('should display the Add Device button', () => {
                const actual = accountPage.find('button').at(1).text();
    
                expect(actual).toEqual('Add');
            });
        });


        describe('does not have unregistered devices', () => {

            let accountPage;
            const roles = [{role_name: 'garage_door', devices:[{node_name:'first garage'}]}]

            beforeEach(() => {
                getStore().setUserRoles(roles);
                accountPage = mount(<Account />);
            });
            it('should not display the Add Device header when user does not have devices to add', () => {
                const actual = accountPage.find('h2').at(1);
    
                expect(actual).toHaveLength(0);
            });

            it('should not display the button when user does not have devices to add', () => {
                const actual = accountPage.find('button').at(1);
                expect(actual).toHaveLength(0);
            });
    
            it('should not display the TextField when user does not have devices to add', () => {
                const actual = accountPage.find(TextField).at(3);
                expect(actual).toHaveLength(0);
            });
        });
    });
});