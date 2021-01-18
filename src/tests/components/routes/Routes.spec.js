import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, act } from '@testing-library/react';
import Routes from '../../../components/routes/Routes';
import { Context } from '../../../state/Store';
import App from '../../../App';


describe('Routes', () => {
    let history;

    const renderComponent = async (authed) => {
        await act(async () => {
            render(
                <App>
                    <Context.Provider value={[{ isAuthenticated: authed }, () => { }]}>
                        <Router history={history}>
                            <Routes />
                        </Router>
                    </Context.Provider>
                </App>
            )
        });
    }

    beforeEach(() => {
        history = createMemoryHistory();
    });

    describe('app routes', () => {

        it('should have the Login route', async () => {
            history.push('/');
            await renderComponent(true);

            const actual = screen.getByText('Login').textContent;
            expect(actual).toEqual('Login');
        });

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