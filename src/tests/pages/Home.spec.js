import React from 'react';
import { Context } from '../../state/Store';
import { render, screen, act } from '@testing-library/react';
import Home from '../../pages/Home';
import { getStore } from '../../state/GlobalState';

describe('Home', () => {

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{}, () => { }]}>
                    <Home />
                </Context.Provider>
            );
        });
    }

    it('should display Header component', async () => {
        await renderComponent();
        const actual = screen.getByTestId('white-header');
        expect(actual).toBeDefined();
    });

    it('should display page body', async () => {
        await renderComponent();
        const actual = screen.getByTestId('home-body');
        expect(actual).toBeDefined()
    });

    it('should display DashboardPanel', async () => {
        await renderComponent();
        const actual = screen.getByTestId('dashboard-panel');
        expect(actual).toBeDefined();
    });

    it('should set the active page to Home',async () => {
        expect(getStore().state.activePage).toEqual('Home Automation');
    });
});