import React from 'react';
import { Context } from '../../../state/Store';
import Settings from '../../../pages/Settings/Settings'
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../state/GlobalState';
import { render, screen, act, fireEvent } from '@testing-library/react';


describe('Settings Page', () => {
    const userId = 'fakeUserId';
    const city = 'Vienna';
    const unitMeasure = 'imperial';
    const tempUnit = 'fahrenheit';
    const roles = [];

    const spyUpdate = jest.spyOn(lib, 'updateUserPreferences');
    const spyGetPrefs = jest.spyOn(lib, 'getUserPreferences');
    const spyGetTasks = jest.spyOn(lib, 'getScheduledTasks');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{roles: roles}, () => { }]}>
                    <Settings />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyUpdate.mockClear();
        spyGetPrefs.mockClear();
        spyGetTasks.mockClear();
        getStore().setUserId(userId);
        spyGetPrefs.mockReturnValue({ city: city, temp_unit: tempUnit, measure_unit: unitMeasure});
        spyGetTasks.mockReturnValue([{ alarm_group_name: 'bathroom', alarm_light_group: '2', alarm_days: 'Mon', alarm_time: '00:00:00' }]);
    });
    
    it('should set the active page to Settings',async () => {
        await renderComponent();
        expect(getStore().getActivePage()).toEqual('Settings');
    });

    it('should display logo header', async () => {
        await renderComponent();
        const actual = screen.getByText('Settings').textContent;
        expect(actual).toEqual('Settings');
    });

    it('should display the settings panel by default', async () => {
        await renderComponent();
        const actual = screen.getByRole('button').textContent;
        expect(actual).toEqual('Edit');
    });

    it('should display the edit settings panel when click edit button', async () => {
        await renderComponent();
        fireEvent.click(screen.getByRole('button'));
        const actual = screen.getByText('Save').textContent;
        expect(actual).toEqual('Save');
    });

    it('should make api call to get settings data', async () => {
        await renderComponent();
        expect(spyGetPrefs).toHaveBeenCalledWith(userId)
    });

    it('should make api call on submit to update the city', () => {
        const newCity = 'Vienna';
        renderComponent();
        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: newCity } });

        fireEvent.click(screen.getByText('Save'));
        expect(spyUpdate).toHaveBeenCalledWith(userId, false, false, newCity);
    });

    it('should make api call on submit to update the unit of measure', () => {
        renderComponent();
        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getAllByRole('radio')[2]);

        fireEvent.click(screen.getByText('Save'));
        expect(spyUpdate).toHaveBeenCalledWith(userId, false, true, undefined);
    });

    it('should make api call on submit to update the temp', () => {
        renderComponent();
        fireEvent.click(screen.getByRole('button'));

        fireEvent.click(screen.getAllByRole('radio')[0]);
        fireEvent.click(screen.getByText('Save'));
        expect(spyUpdate).toHaveBeenCalledWith(userId, true, false, undefined);
    });

    it('should return to the normal screen when cancelling on edit screen', async () => {
        await renderComponent();
        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText('Cancel'));

        const actual = screen.getByText('Edit');

        expect(actual).toBeDefined();
    });

    it('should update the city on the normal screen after saving', async () => {
        const city = 'Berlin';
        await renderComponent();
        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: city } });
        fireEvent.click(screen.getByText('Save'));

        const actual = screen.getByText(city);

        expect(actual).toBeDefined();
    });

    it('should not update the city on the normal screen after cancelling', async () => {
        await renderComponent();
        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Berlin' } });
        fireEvent.click(screen.getByText('Cancel'));

        const actual = screen.getByText(city);

        expect(actual).toBeDefined();
    });

    it('should update the unit of measure on the normal screen after saving', async () => {
        await renderComponent();
        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getAllByRole('radio')[3]);
        fireEvent.click(screen.getByText('Save'));

        const actual = screen.getByText('metric');

        expect(actual).toBeDefined();
    });

    it('should not the unit of measure on the normal screen after saving', async () => {
        await renderComponent();
        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getAllByRole('radio')[3]);
        fireEvent.click(screen.getByText('Cancel'));

        const actual = screen.getByText(unitMeasure);

        expect(actual).toBeDefined();
    });

    it('should update the temp unit on the normal screen after saving', async () => {
        await renderComponent();
        await act(async () => {
            fireEvent.click(screen.getByRole('button'));
        });
        await act(async () => {
            fireEvent.click(screen.getAllByRole('radio')[1]);
        });
        await act(async () => {
            fireEvent.click(screen.getByText('Save'));
        });

        const actual = screen.getByText('celsius');

        expect(actual).toBeDefined();
    });

    it('should not update the temp unit on the normal screen after cancelling', async () => {
        await renderComponent();
        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getAllByRole('radio')[1]);
        fireEvent.click(screen.getByText('Cancel'));

        const actual = screen.getByText(tempUnit);

        expect(actual).toBeDefined();
    });
});