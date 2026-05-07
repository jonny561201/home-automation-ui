import React from 'react';
import * as lib from '../../../../utilities/RestApi';
import { Context } from '../../../../state/Store';
import SumpDepthChart from '../../../../pages/Home/segments/SumpDepthChart';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';

const bearer = 'fake-token';

vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
        getAccessTokenSilently: vi.fn().mockResolvedValue(bearer),
    }),
}));


describe('SumpDepthChart', () => {

    const sumpData = { warningLevel: 1, depthUnit: 'in', averageDepth: 12.2, currentDepth: 11.1 };
    const spyGetHistory = vi.spyOn(lib, 'getSumpDepthHistory');
    const spyGetDaily = vi.spyOn(lib, 'getSumpDailyHistory');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ sumpData: sumpData }, () => {}]}>
                    <SumpDepthChart />
                </Context.Provider>
            );
        });
    };

    beforeEach(() => {
        spyGetHistory.mockClear();
        spyGetDaily.mockClear();
        spyGetHistory.mockResolvedValue({});
        spyGetDaily.mockResolvedValue({});
    });

    describe('Range Tabs', () => {

        it('should render Today, 7d, and 30d range buttons', async () => {
            await renderComponent();
            expect(screen.getByText('Today')).toBeDefined();
            expect(screen.getByText('7d')).toBeDefined();
            expect(screen.getByText('30d')).toBeDefined();
        });

        it('should have Today button active by default', async () => {
            await renderComponent();
            expect(screen.getByRole('button', { name: 'Today' }).classList).toContain('range-button-active');
        });

        it('should switch active state when 7d is clicked', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByText('7d'));
            });
            expect(screen.getByRole('button', { name: '7d' }).classList).toContain('range-button-active');
            expect(screen.getByRole('button', { name: 'Today' }).classList).not.toContain('range-button-active');
        });
    });

    describe('API Calls', () => {

        it('should call getSumpDepthHistory on mount for Today range', async () => {
            await renderComponent();
            await waitFor(() => expect(spyGetHistory).toHaveBeenCalled());
        });

        it('should call getSumpDailyHistory with 7 when 7d is clicked', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByText('7d'));
            });
            await waitFor(() => expect(spyGetDaily).toHaveBeenCalledWith(7));
        });

        it('should call getSumpDailyHistory with 30 when 30d is clicked', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByText('30d'));
            });
            await waitFor(() => expect(spyGetDaily).toHaveBeenCalledWith(30));
        });
    });

    describe('Empty State', () => {

        it('should display no history message when API returns empty object', async () => {
            spyGetHistory.mockResolvedValue({});
            await renderComponent();
            await waitFor(() => expect(screen.getByText('No history available')).toBeDefined());
        });

        it('should display no history message when readings array is empty', async () => {
            spyGetHistory.mockResolvedValue({ readings: [] });
            await renderComponent();
            await waitFor(() => expect(screen.getByText('No history available')).toBeDefined());
        });
    });
});
