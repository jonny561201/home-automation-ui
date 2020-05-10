import React from 'react';
import { shallow } from 'enzyme';
import { getStore } from '../../../state/GlobalState';
import AccountMenu from '../../../components/header/AccountMenu';


describe('AccountSettings', () => {
    let accountMenu;

    beforeEach(() => {
        getStore().updateAuth(true);
        accountMenu = shallow(<AccountMenu />);
    });

    it('should display sign out link', () => {
        const actual = accountMenu.find('.account-button').at(2).text();
        expect(actual).toEqual('Sign Out');
    });

    it('should display Settings and Account links when active page is set to home', () => {
        getStore().setActivePage('Home Automation');
        const accountSet = shallow(<AccountMenu />);

        const settings = accountSet.find('.account-button').at(0).text();
        const account = accountSet.find('.account-button').at(1).text();
        expect(settings).toEqual('Settings');
        expect(account).toEqual('Account');
    });

    it('should display Home and Account links when active page is set to settings', () => {
        getStore().setActivePage('Settings');
        const accountSet = shallow(<AccountMenu />);

        const home = accountSet.find('.account-button').at(0).text();
        const account = accountSet.find('.account-button').at(1).text();
        expect(home).toEqual('Home');
        expect(account).toEqual('Account');
    });

    it('should display Home and Settings links when active page is set to Account', () => {
        getStore().setActivePage('Account');
        const accountSet = shallow(<AccountMenu />);

        const settings = accountSet.find('.account-button').at(1).text();
        const account = accountSet.find('.account-button').at(0).text();
        expect(settings).toEqual('Settings');
        expect(account).toEqual('Home');
    });

    it('should deauthenticate user when click sign out', () => {
        const test = accountMenu.find('.account-button').at(2).simulate('click');
        expect(test).toHaveLength(1);
        expect(getStore().isAuthenticated()).toBeFalsy();
    });
});