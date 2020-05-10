import React from 'react';
// import { shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import Routes from '../../../components/routes/Routes';
import { Context } from '../../../state/Store';
import App from '../../../App';


describe('Routes', () => {
    let history;

    const renderComponent = () => {
        render(
            <App>
                <Context.Provider>
                    <Router history={history}>
                        <Routes />
                    </Router>
                </Context.Provider>
            </App>
        );
    }

    beforeEach(() => {
        history = createMemoryHistory();
    });

    describe('app routes', () => {

        it('should have the Login route', () => {
            history.push('/')
            renderComponent();

            const actual = screen.getByText('Login').textContent;
            expect(actual).toEqual('Login');
        });

        // it('should have the Home route', () => {
        //     history.push('/home')
        //     renderComponent();

        //     const actual = screen.getByText('Home').textContent;
        //     expect(actual).toEqual('Home');
        // });

        // it('should have the Settings route', () => {
        //     history.push('/settings')
        //     renderComponent();

        //     const actual = screen.getByText('Settings').textContent;
        //     expect(actual).toEqual('Settings');
        // });

        // it('should have the Account route', () => {
        //     history.push('/account')
        //     renderComponent();

        //     const actual = screen.getByText('Account').textContent;
        //     expect(actual).toEqual('Account');
        // });
    });
});