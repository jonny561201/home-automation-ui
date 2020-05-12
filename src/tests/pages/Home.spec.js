import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import { getStore } from '../../state/GlobalState';

describe('Home', () => {

    it('should display Header component', () => {
        render(<Home />);
        const actual = screen.getByTestId('white-header');
        expect(actual).toBeDefined();
    });

    it('should display page body', () => {
        render(<Home />);
        const actual = screen.getByTestId('home-body');
        expect(actual).toBeDefined()
    });

    it('should display DashboardPanel', () => {
        render(<Home />);
        const actual = screen.getByTestId('dashboard-panel');
        expect(actual).toBeDefined();
    });

    it('should set the active page to Home', () => {
        expect(getStore().state.activePage).toEqual('Home Automation');
    });
});