import React from 'react';
import { Context } from '../../../state/Store';
import { render, screen, act } from '@testing-library/react';
import Home from '../../../pages/Home/Home';


vi.mock('../../../utilities/StateUtil', () => ({ default: () => null }));


describe('Home', () => {
    const user = { firstName: 'test', lastName: 'test' };
    const dispatch = vi.fn();

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ user: user }, dispatch]}> 
                    <Home />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        dispatch.mockClear();
    });

    it('should display Header component', async () => {
        await renderComponent();
        const actual = screen.getByRole('img', { name: 'Logo' });
        expect(actual).toBeDefined();
    });

    it('should display page body', async () => {
        await renderComponent();
        const actual = screen.getByRole('main');
        expect(actual).toBeDefined()
    });

    it('should display DashboardPanel', async () => {
        await renderComponent();
        const actual = screen.getByRole('region', { name: 'Dashboard Panels' });
        expect(actual).toBeDefined();
    });

    it('should set the active page to Home', async () => {
        await renderComponent();
        expect(dispatch).toHaveBeenCalledWith({ type: 'SET_ACTIVE_PAGE', payload: 'Home Automation' });
    });
});