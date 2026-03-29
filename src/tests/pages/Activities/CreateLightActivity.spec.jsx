import React from 'react';
import { Context } from '../../../state/Store';
import CreateLightActivity from '../../../pages/Activities/CreateLightActivity';
import {render, screen, act} from '@testing-library/react'

describe('Create Light Activity Panel', () => {

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{lights: []}, () => { }]}>
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

    it('should display the time picker', async () => {
        await renderComponent();
        const actual = screen.getByRole('spinbutton', { name: /hours/i });
        expect(actual).toBeDefined();
     });

     it('should display the light room name selector', async () => {
        await renderComponent();
        const actual = screen.getByRole('combobox', { name: /room/i });
        expect(actual).toBeDefined();
     });

     it('should display the light room label', async () => {
        await renderComponent();
        const actual = screen.getByText('Room', { selector: 'label' });
        expect(actual).toBeDefined();
     });
});