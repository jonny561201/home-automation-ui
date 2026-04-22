import React from 'react';
import { Context } from '../../../../state/Store';
import SumpStatusInfo from '../../../../pages/Home/segments/SumpStatusInfo';
import { render, screen, act } from '@testing-library/react';


describe('SumpStatusInfo', () => {

    const baseSumpData = { warningLevel: 1, depthUnit: 'in', averageDepth: 12.2, currentDepth: 11.1 };

    const renderComponent = async (sumpData) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ sumpData: sumpData }, () => {}]}>
                    <SumpStatusInfo />
                </Context.Provider>
            );
        });
    };

    describe('Warning Label', () => {

        it('should display Normal for warning level 0', async () => {
            await renderComponent({ ...baseSumpData, warningLevel: 0 });
            expect(screen.getByText('Normal')).toBeDefined();
        });

        it('should display Elevated for warning level 1', async () => {
            await renderComponent({ ...baseSumpData, warningLevel: 1 });
            expect(screen.getByText('Elevated')).toBeDefined();
        });

        it('should display High for warning level 2', async () => {
            await renderComponent({ ...baseSumpData, warningLevel: 2 });
            expect(screen.getByText('High')).toBeDefined();
        });

        it('should display Critical for warning level 3', async () => {
            await renderComponent({ ...baseSumpData, warningLevel: 3 });
            expect(screen.getByText('Critical')).toBeDefined();
        });

        it('should apply status-normal class for warning level 0', async () => {
            await renderComponent({ ...baseSumpData, warningLevel: 0 });
            expect(screen.getByText('Normal').classList).toContain('status-normal');
        });

        it('should apply status-elevated class for warning level 2', async () => {
            await renderComponent({ ...baseSumpData, warningLevel: 2 });
            expect(screen.getByText('High').classList).toContain('status-elevated');
        });

        it('should apply status-critical class for warning level 3', async () => {
            await renderComponent({ ...baseSumpData, warningLevel: 3 });
            expect(screen.getByText('Critical').classList).toContain('status-critical');
        });
    });

    describe('Trend Indicator', () => {

        it('should display Falling when distance exceeds average', async () => {
            await renderComponent({ ...baseSumpData, currentDepth: 15.0, averageDepth: 12.0 });
            expect(screen.getByText('Falling')).toBeDefined();
        });

        it('should display Rising when distance is below average', async () => {
            await renderComponent({ ...baseSumpData, currentDepth: 10.0, averageDepth: 12.0 });
            expect(screen.getByText('Rising')).toBeDefined();
        });

        it('should display Stable when current depth equals average', async () => {
            await renderComponent({ ...baseSumpData, currentDepth: 12.0, averageDepth: 12.0 });
            expect(screen.getByText('Stable')).toBeDefined();
        });

        it('should not display trend when current depth is null', async () => {
            await renderComponent({ ...baseSumpData, currentDepth: null });
            expect(screen.queryByText('Rising')).toBeNull();
            expect(screen.queryByText('Falling')).toBeNull();
            expect(screen.queryByText('Stable')).toBeNull();
        });

        it('should not display trend when average depth is null', async () => {
            await renderComponent({ ...baseSumpData, averageDepth: null });
            expect(screen.queryByText('Rising')).toBeNull();
            expect(screen.queryByText('Falling')).toBeNull();
            expect(screen.queryByText('Stable')).toBeNull();
        });
    });

    describe('Last Reading', () => {

        it('should display last reading text when latestDate is present', async () => {
            const recentDate = new Date().toISOString();
            await renderComponent({ ...baseSumpData, latestDate: recentDate });
            const el = screen.getByText((content, element) =>
                element.classList.contains('sump-last-reading') && content.includes('ago')
            );
            expect(el).toBeDefined();
        });

        it('should not display last reading text when latestDate is absent', async () => {
            await renderComponent({ ...baseSumpData });
            expect(screen.queryByText(/ago/)).toBeNull();
        });

        it('should not display last reading text when latestDate is invalid', async () => {
            await renderComponent({ ...baseSumpData, latestDate: 'not-a-date' });
            expect(screen.queryByText(/ago/)).toBeNull();
        });
    });
});
