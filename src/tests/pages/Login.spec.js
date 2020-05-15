import React from 'react';
import Login from '../../pages/Login';
import { Context } from '../../state/Store';
import { render, screen, act } from '@testing-library/react';

describe('Login Component', () => {
    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{}, () => {}]}>
                    <Login />
                </Context.Provider>
            );
        });
    }

    it("should contain a header div", async () => {
        await renderComponent();
        const actual = screen.getByTestId('login-header');
        expect(actual).toBeDefined();
    });

    it('should have member login text', async () => {
        await renderComponent();
        const actual = screen.getByText('Member Login').textContent;
        expect(actual).toEqual('Member Login');
    });

    it('should have Logo element', async () => {
        await renderComponent();
        const actual = screen.getByTestId('white-header');
        expect(actual).toBeDefined();
    });

    it("should contain user pass screen", async () => {
        await renderComponent();
        const actual = screen.getByText('Login');
        expect(actual).toBeDefined();
    });
}); 
