import React from 'react';
import Login from '../../../pages/Login/Login';
import { Context } from '../../../state/Store';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Login Component', () => {
    const renderComponent = async () => {
        render(
            <MemoryRouter>
                <Context.Provider value={[{ auth: { isAuthenticated: false } }, () => { }]}>
                    <Login />
                </Context.Provider>
            </MemoryRouter>
        );
    }

    it("should show redirect message when unauthenticated", async () => {
        await renderComponent();
        const actual = screen.getByText('...Redirection to sign in...');
        expect(actual).toBeDefined();
    });
});
