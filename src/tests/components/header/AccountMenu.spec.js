import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { getStore } from '../../../state/GlobalState';
import AccountMenu from '../../../components/header/AccountMenu';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '../../../state/Store';


describe('AccountSettings', () => {

    const renderComponent = () => {
        render(
            <Context.Provider value={[{}, () => { }]}>
                <BrowserRouter>
                    <AccountMenu />
                </BrowserRouter>
            </Context.Provider>
        );
    };

    it('should display sign out link', () => {
        renderComponent();
        const actual = screen.getByText('Sign Out').textContent;
        expect(actual).toEqual('Sign Out');
    });

    it('should display Settings, Activities, and Account links when active page is set to home', () => {
        getStore().setActivePage('Home Automation');
        renderComponent();

        const settings = screen.getByText('Settings').textContent;
        const account = screen.getByText('Account').textContent;
        const activities = screen.getByText('Activities').textContent;
        expect(settings).toEqual('Settings');
        expect(account).toEqual('Account');
        expect(activities).toEqual('Activities');
    });

    it('should display Home, Activities, and Account links when active page is set to settings', () => {
        getStore().setActivePage('Settings');
        renderComponent();

        const home = screen.getByText('Home').textContent;
        const account = screen.getByText('Account').textContent;
        const activities = screen.getByText('Activities').textContent;
        expect(home).toEqual('Home');
        expect(account).toEqual('Account');
        expect(activities).toEqual('Activities');
    });

    it('should display Home, Activities, and Settings links when active page is set to Account', () => {
        getStore().setActivePage('Account');
        renderComponent();

        const settings = screen.getByText('Settings').textContent;
        const home = screen.getByText('Home').textContent;
        const activities = screen.getByText('Activities').textContent;
        expect(settings).toEqual('Settings');
        expect(home).toEqual('Home');
        expect(activities).toEqual('Activities');
    });

    it('should deauthenticate user when click sign out', () => {
        renderComponent();
        const signOut = screen.getByText('Sign Out');
        fireEvent.click(signOut);
        expect(getStore().isAuthenticated()).toBeFalsy();
    });
});