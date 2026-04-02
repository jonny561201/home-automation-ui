import React from 'react';
import Login from '../../../pages/Login/Login';
import { Context } from '../../../state/Store';
import { render, screen } from '@testing-library/react';

describe('Login Component', () => {
    const renderComponent = async () => {
        render(
            <Context.Provider value={[{ auth: { isAuthenticated: false } }, () => { }]}> 
                <Login />
            </Context.Provider>
        );
    }

    it("should contain a header div", async () => {
        await renderComponent();
        const actual = screen.getByRole('heading', { name: 'Member Login' });
        expect(actual).toBeDefined();
    });
});
