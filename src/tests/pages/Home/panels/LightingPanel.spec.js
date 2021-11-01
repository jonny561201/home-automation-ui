import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import * as lib from '../../../../utilities/RestApi';
import { Context } from '../../../../state/Store';
import LightingPanel from '../../../../pages/Home/panels/LightingPanel';

describe('LightingPanel', () => {

    const bearer = 'sdfa098s7';
    const spyGet = jest.spyOn(lib, 'getLightGroups');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ userLights: [], auth: { bearer: bearer } }, () => { }]}>
                    <LightingPanel />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyGet.mockClear();
        spyGet.mockReturnValue([]);
    });

    it('should show the Lighting Panel text', async () => {
        await renderComponent();
        const actual = screen.getByText('Lighting').textContent;
        expect(actual).toEqual('Lighting');
    });

    it('should show lighting icon', async () => {
        await renderComponent();
        const actual = screen.getByRole('img');
        expect(actual).toBeDefined();
    });

    describe('useEffect', () => {

        it('should make api call to get lighting groups', async () => {
            await renderComponent();
            expect(spyGet).toBeCalledWith(bearer);
        });

        it('should render a button for every group in response', async () => {
            const response = [{ groupId: "1", groupName: "LivingRoom", on: false, brightness: 127 }, { groupId: "2", groupName: "LivingRoom", on: false, brightness: 127 }];
            spyGet.mockReturnValue(response);
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByTestId('lighting-panel'));
            });

            const actual = screen.getAllByTestId('light-group');

            expect(actual.length).toEqual(2);
        });

        it('should display error text when there are no groups returned', async () => {
            spyGet.mockReturnValue(null);
            await renderComponent();
            const actual = screen.getByText('No Light Groups were found').textContent;
            expect(actual).toEqual('No Light Groups were found');
        });

        it('should display error text when there are empty list of groups returned', async () => {
            spyGet.mockReturnValue([]);
            await renderComponent();
            const actual = screen.getByText('No Light Groups were found').textContent;
            expect(actual).toEqual('No Light Groups were found');
        });
    });
});