import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { Context } from '../../../../state/Store';
import LightingPanel from '../../../../pages/Home/panels/LightingPanel';


describe('LightingPanel', () => {

    const bearer = 'sdfa098s7';
    const lights = [{ groupId: "1", groupName: "LivingRoom", on: false, brightness: 127 }, { groupId: "2", groupName: "LivingRoom", on: false, brightness: 127 }];

    const renderComponent = async (lightGroups) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ lights: lightGroups, auth: { bearer: bearer } }, () => { }]}>
                    <LightingPanel />
                </Context.Provider>
            );
        });
    }

    it('should show the Lighting Panel text', async () => {
        await renderComponent(lights);
        const actual = screen.getByText('Lighting').textContent;
        expect(actual).toEqual('Lighting');
    });

    it('should show lighting icon', async () => {
        await renderComponent(lights);
        const actual = screen.getByRole('img');
        expect(actual).toBeDefined();
    });

    it('should render a button for every group in response', async () => {
        await renderComponent(lights);
        await act(async () => {
            fireEvent.click(screen.getByTestId('lighting-panel'));
        });

        const actual = screen.getAllByTestId('light-group');

        expect(actual.length).toEqual(2);
    });

    it('should display error text when there are no groups returned', async () => {
        await renderComponent(null);
        const actual = screen.getByText('No Light Groups were found').textContent;
        expect(actual).toEqual('No Light Groups were found');
    });

    it('should display error text when there are empty list of groups', async () => {
        await renderComponent([]);
        const actual = screen.getByText('No Light Groups were found').textContent;
        expect(actual).toEqual('No Light Groups were found');
    });
});