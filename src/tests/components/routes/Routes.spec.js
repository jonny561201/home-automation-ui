import React from 'react';
import { render, act } from '@testing-library/react';
import Routes from '../../../components/routes/Routes';
import { Context } from '../../../state/Store';


describe('Routes', () => {

    const renderComponent = async (authed) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ auth: { isAuthenticated: authed } }, () => { }]}>
                    <Routes />
                </Context.Provider>
            )
        });
    }


    describe('app routes', () => {

        it('should render without crashing', async () => {
            await renderComponent(false);
            expect(true).toBe(true);
        });

        // it('should have the Login route', async () => {
        //     history.push('/');
        //     await renderComponent(true);

        //     const actual = screen.getByText('Login').textContent;
        //     expect(actual).toEqual('Login');
        // });

        // it('should have the Home route', async () => {
        //     history.push('/home')
        //     await renderComponent(true);

        //     const actual = screen.getByText('Home').textContent;
        //     expect(actual).toEqual('Home');
        // });

        // it('should have the Settings route', async () => {
        //     history.push('/settings')
        //     await renderComponent(true);

        //     const actual = screen.getByText('Settings').textContent;
        //     expect(actual).toEqual('Settings');
        // });

        // it('should have the Account route', async () => {
        //     history.push('/account')
        //     await renderComponent(true);

        //     const actual = screen.getByText('Account').textContent;
        //     expect(actual).toEqual('Account');
        // });
    });
});