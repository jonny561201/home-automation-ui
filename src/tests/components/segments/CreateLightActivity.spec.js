import React from 'react';
import { Context } from '../../../state/Store';
import CreateLightActivity from '../../../components/segments/CreateLightActivity';
import {render, screen, act} from '@testing-library/react'

describe('Create Light Activity Panel', () => {

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{userLightGroups: []}, () => { }]}>
                    <CreateLightActivity type="" cancel={() => {}} save={() => {}}/>
                </Context.Provider>
            );
        });
    }

    it('should display the save button', async () => {
        await renderComponent();
        const actual = screen.getByText('Save').textContent;
        expect(actual).toEqual('Save');
    });

    it('should display the cancel button', async () => {
        await renderComponent();
        const actual = screen.getByText('Cancel').textContent;
        expect(actual).toEqual('Cancel');
    });
});