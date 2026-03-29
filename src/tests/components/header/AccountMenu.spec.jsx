import React from 'react';
import { render, screen, act } from '@testing-library/react';
import AccountMenu from '../../../components/header/AccountMenu';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '../../../state/Store';


describe('AccountSettings', () => {

    const renderComponent = async (activePage = 'Home Automation') => {
        await act(async () => {
            render(
                <Context.Provider value={[{ activePage, auth: {} }, () => { }]}> 
                    <BrowserRouter>
                        <AccountMenu />
                    </BrowserRouter>
                </Context.Provider>
            );
        });
    }

    it('should display sign out link', async () => {
        await renderComponent();
        const actual = screen.getByText('Sign Out').textContent;
        expect(actual).toEqual('Sign Out');
    });

    it('should display Settings, Activities, and Account links when active page is set to home', async () => {
        await renderComponent('Home Automation');

        const settings = screen.getByText('Settings').textContent;
        const account = screen.getByText('Account').textContent;
        const activities = screen.getByText('Activities').textContent;
        expect(settings).toEqual('Settings');
        expect(account).toEqual('Account');
        expect(activities).toEqual('Activities');
    });

    it('should display Home, Activities, and Account links when active page is set to settings', async () => {
        await renderComponent('Settings');

        const home = screen.getByText('Home').textContent;
        const account = screen.getByText('Account').textContent;
        const activities = screen.getByText('Activities').textContent;
        expect(home).toEqual('Home');
        expect(account).toEqual('Account');
        expect(activities).toEqual('Activities');
    });

    it('should display Home, Activities, and Settings links when active page is set to Account', async () => {
        await renderComponent('Account');

        const settings = screen.getByText('Settings').textContent;
        const home = screen.getByText('Home').textContent;
        const activities = screen.getByText('Activities').textContent;
        expect(settings).toEqual('Settings');
        expect(home).toEqual('Home');
        expect(activities).toEqual('Activities');
    });

    it('should display Home, Account, and Settings links when active page is set to Activities', async () => {
        await renderComponent('Activities');

        const settings = screen.getByText('Settings').textContent;
        const home = screen.getByText('Home').textContent;
        const account = screen.getByText('Account').textContent;
        expect(settings).toEqual('Settings');
        expect(home).toEqual('Home');
        expect(account).toEqual('Account');
    });
});