import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import * as lib from '../../../utilities/RestApi';
import LightingPanel from '../../../components/panels/LightingPanel';

describe('LightingPanel', () => {

    const spyGet = jest.spyOn(lib, 'getLightGroups');

    beforeEach(() => {
        spyGet.mockClear();
    });

    it('should show the Lighting Panel text', () => {
        render(<LightingPanel />);
        const actual = screen.getByText('Lighting').textContent;
        expect(actual).toEqual('Lighting');
    });

    it('should show lighting icon', () => {
        render(<LightingPanel />);
        const actual = screen.getByRole('img');
        expect(actual).toBeDefined();
    });

    describe('useEffect', () => {

        it('should make api call to get lighting groups', async () => {
            render(<LightingPanel />);
            expect(spyGet).toHaveBeenCalledTimes(1);
        });

        it('should render a button for every group in response', async () => {
            const response = [{groupId: "1",groupName: "LivingRoom",on: false,brightness: 127}, {groupId: "2",groupName: "LivingRoom",on: false,brightness: 127}];
            spyGet.mockReturnValue(response);
            render(<LightingPanel />);
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });

            const actual = screen.getAllByTestId('light-group');

            expect(actual.length).toEqual(2);
        });

        it('should display error text when there are no groups returned', async () => {
            spyGet.mockReturnValue(null);
            render(<LightingPanel />);
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            const actual = screen.getByText('No Light Groups were found').textContent;
            expect(actual).toEqual('No Light Groups were found');
        });
    });
});