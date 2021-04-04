import React from 'react';
import * as lib from '../../../../utilities/RestApi';
import { getStore } from '../../../../state/GlobalState';
import BasementPanel from '../../../../pages/Home/panels/BasementPanel';
import { render, screen, act, fireEvent } from '@testing-library/react';

describe('BasementPanel', () => {

    const depthUnit = "in";
    const averageDepth = 12.2;
    const currentDepth = 11.1;
    const fakeUserId = "fakeUserId";
    const spyGet = jest.spyOn(lib, 'getSumpLevels');
    let response = { warningLevel: 1, depthUnit: depthUnit, averageDepth: averageDepth, currentDepth: currentDepth };

    const renderComponent = async () => {
        await act(async () => {
            render(
                <BasementPanel />
            );
        });
    }


    beforeEach(() => {
        getStore().setUserId(fakeUserId);
        spyGet.mockClear();
        spyGet.mockReturnValue(response)
    });

    it('should show the Basement Panel', async () => {
        await renderComponent();
        const actual = screen.getByTestId('basement-panel');
        expect(actual).toBeDefined();
    });

    it('should show basement icon', async () => {
        await renderComponent();
        const actual = screen.getByTestId('sump-logo');
        expect(actual).toBeDefined();
    });

    it('should display the basement Header', async () => {
        await renderComponent();
        const actual = screen.getByText('Basement').textContent;
        expect(actual).toEqual('Basement');
    });

    describe('Sump Pump Icon', () => {

        it('should display the low icon when warning level 0', async () => {
            response.warningLevel = 0;
            await renderComponent();
            const actual = screen.getByTestId('warning-low');
            expect(actual).toBeDefined();
        });

        it('should display the medium low icon when warning level 1', async () => {
            response.warningLevel = 1;
            await renderComponent();
            const actual = screen.getByTestId('warning-medium-low');
            expect(actual).toBeDefined();
        });

        it('should display the medium high icon when warning level 2', async () => {
            response.warningLevel = 2;
            await renderComponent();
            const actual = screen.getByTestId('warning-medium-high')
            expect(actual).toBeDefined();
        });

        it('should display the high icon when warning level 3', async () => {
            response.warningLevel = 3
            await renderComponent();
            const actual = screen.getByTestId('warning-high')
            expect(actual).toBeDefined();
        });
    });

    describe('Sump Details', () => {

        it('should make call to get sump pump depth', async () => {
            await renderComponent();
            expect(spyGet).toBeCalledWith(fakeUserId);
        });

        it('should display current sump depth text', async () => {
            await renderComponent();
            const actual = screen.getByText('Current:').textContent;
            expect(actual).toEqual('Current: ');
        });

        it('should display current depth of sump pump', async () => {
            await renderComponent();

            const actual = screen.getAllByText(currentDepth.toString())[1].textContent;
            expect(parseFloat(actual)).toEqual(currentDepth);
        });

        it('should display the current depth unit of measure', async () => {
            await renderComponent();

            const actual = screen.getAllByText(depthUnit)[0].textContent;
            expect(actual).toEqual(depthUnit);
        });

        it('should display average sump depth text', async () => {
            await renderComponent();

            const actual = screen.getByText('Average:').textContent;
            expect(actual).toEqual('Average: ');
        });

        it('should display average depth of sump pump', async () => {
            await renderComponent();

            const actual = screen.getByText(averageDepth.toString()).textContent;
            expect(parseFloat(actual)).toEqual(averageDepth);
        });

        it('should display the average depth unit of measure', async () => {
            await renderComponent();

            const actual = screen.getAllByText(depthUnit)[1].textContent;
            expect(actual).toEqual(depthUnit);
        });

        it('should display the sump text in alert status', async () => {
            response.warningLevel = 3;
            await renderComponent();
            const actual = screen.getAllByText(currentDepth.toString())[1].classList;
            expect(actual).toContain('alert');
        });

        it('should display the sump text in healthy status', async () => {
            response.warningLevel = 1;
            await renderComponent();
            const actual = screen.getAllByText(currentDepth.toString())[1].classList;
            expect(actual).toContain('healthy');
        });

        it('should display the sump unit in alert status', async () => {
            response.warningLevel = 3;
            await renderComponent();
            const actual = screen.getAllByText(depthUnit.toString())[1].classList;
            expect(actual).toContain('alert');
        });

        it('should display the sump unit in healthy status', async () => {
            response.warningLevel = 1;
            await renderComponent();
            const actual = screen.getAllByText(depthUnit.toString())[1].classList;
            expect(actual).toContain('healthy');
        });
    });

    describe('Status Peek Text', () => {

        it('should display the status Depth text when drawer collapsed', async () => {
            await renderComponent();
            const actual = screen.getByText('Depth:').textContent;
            expect(actual).toEqual('Depth:');
        });

        it('should not display the status Depth text when drawer expanded', async () => {
            await renderComponent();
            fireEvent.click(screen.getByText('Basement'));
            const actual = screen.queryByText('Depth:');
            expect(actual).toBeNull();
        });

        it('should display the sump text in alert status', async () => {
            response.warningLevel = 3;
            await renderComponent();
            const actual = screen.getAllByText(currentDepth.toString())[0].classList;
            expect(actual).toContain('alert');
        });

        it('should display the sump text in healthy status', async () => {
            response.warningLevel = 1;
            await renderComponent();
            const actual = screen.getAllByText(currentDepth.toString())[0].classList;
            expect(actual).toContain('healthy');
        });

        it('should display the status sump unit in alert status', async () => {
            response.warningLevel = 3;
            await renderComponent();
            const actual = screen.getAllByText(depthUnit.toString())[0].classList;
            expect(actual).toContain('alert');
        });

        it('should display the status sump unit in healthy status', async () => {
            response.warningLevel = 1;
            await renderComponent();
            const actual = screen.getAllByText(depthUnit.toString())[0].classList;
            expect(actual).toContain('healthy');
        });
    });
});