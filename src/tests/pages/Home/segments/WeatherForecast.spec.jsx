import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherForecast from '../../../../pages/Home/segments/WeatherForecast';
import { Context } from '../../../../state/Store';


describe('WeatherForecast', () => {
    const renderComponent = (extendedForecast) => {
        render(
            <Context.Provider value={[{ extendedForecast }, vi.fn()]}>
                <WeatherForecast />
            </Context.Provider>
        );
    };

    it('should render nothing when extended forecast is empty', () => {
        renderComponent([]);
        expect(screen.queryByRole('img')).toBeNull();
    });

    it('should render a card for each forecast day', () => {
        const days = [
            { day: 'Mon', high: 72, low: 55, description: 'sunny' },
            { day: 'Tue', high: 70, low: 58, description: 'partly cloudy' },
            { day: 'Wed', high: 65, low: 52, description: 'light rain' },
        ];
        renderComponent(days);
        expect(screen.getAllByRole('img')).toHaveLength(3);
    });

    it('should display day name, high, and low for each day', () => {
        renderComponent([
            { day: 'Fri', high: 74, low: 60, description: 'sunny' },
        ]);
        expect(screen.getByText('Fri')).toBeDefined();
        expect(screen.getByText('74°')).toBeDefined();
        expect(screen.getByText('60°')).toBeDefined();
    });

    it('should use the description as the icon alt text', () => {
        renderComponent([
            { day: 'Fri', high: 74, low: 60, description: 'thunderstorm' },
        ]);
        const icon = screen.getByRole('img');
        expect(icon.getAttribute('alt')).toEqual('thunderstorm');
    });

    it('should fall back gracefully when extended forecast is undefined', () => {
        render(
            <Context.Provider value={[{}, vi.fn()]}>
                <WeatherForecast />
            </Context.Provider>
        );
        expect(screen.queryByRole('img')).toBeNull();
    });
});
