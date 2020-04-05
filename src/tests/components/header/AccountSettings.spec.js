import React from 'react';
import { shallow } from 'enzyme';
import { getStore } from '../../../GlobalState';
import AccountSettings from '../../../components/header/AccountSettings';


describe('AccountSettings', () => {
    let accountSettings;

    beforeEach(() => {
        getStore().updateAuth(true);
        accountSettings = shallow(<AccountSettings />);
    });

    it('should display sign out link', () => {
        const actual = accountSettings.find('.account-button').at(2).text();
        expect(actual).toEqual('Sign Out');
    });

    it('should display Settings and Account links when active page is set to home', () => {
        getStore().setActivePage('Home Automation');
        const accountSet = shallow(<AccountSettings />);

        const settings = accountSet.find('.account-button').at(0).text();
        const account = accountSet.find('.account-button').at(1).text();
        expect(settings).toEqual('Settings');
        expect(account).toEqual('Account');
    });

    it('should display Home and Account links when active page is set to settings', () => {
        getStore().setActivePage('Settings');
        const accountSet = shallow(<AccountSettings />);

        const home = accountSet.find('.account-button').at(0).text();
        const account = accountSet.find('.account-button').at(1).text();
        expect(home).toEqual('Home');
        expect(account).toEqual('Account');
    });

    it('should display Home and Settings links when active page is set to Account', () => {
        getStore().setActivePage('Account');
        const accountSet = shallow(<AccountSettings />);

        const settings = accountSet.find('.account-button').at(1).text();
        const account = accountSet.find('.account-button').at(0).text();
        expect(settings).toEqual('Settings');
        expect(account).toEqual('Home');
    });

    it('should deauthenticate user when click sign out', () => {
        const test = accountSettings.find('.account-button').at(2).simulate('click');
        expect(test).toHaveLength(1);
        expect(getStore().isAuthenticated()).toBeFalsy();
    });
});