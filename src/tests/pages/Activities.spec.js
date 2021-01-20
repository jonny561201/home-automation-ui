import React from 'react';
import { Context } from '../../state/Store';
import * as lib from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';
import { render, screen, act } from '@testing-library/react';
import ActivitiesPage from '../../pages/Activities';


describe('Activities Page', () => {
    const roles = [{"role_name": "lighting"}];
    const userId = 'ascv123';
    const room = 'BedRoom';
    const time = '07:30:00';
    const days = 'MonTueWedThuFri';

    const spyGet = jest.spyOn(lib, 'getScheduledTasks');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{}, () => { }]}>
                    <ActivitiesPage />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyGet.mockClear();
        getStore().setUserId(userId);
        spyGet.mockReturnValue([{ alarm_group_name: room, alarm_light_group: '2', alarm_days: days, alarm_time: time }]);
    });

    it('should set the active page to Activites',async () => {
        await renderComponent();
        expect(getStore().getActivePage()).toEqual('Activities');
    });

    it('should display Header component', async () => {
        await renderComponent();
        const actual = screen.getByTestId('white-header');
        expect(actual).toBeDefined();
    });

    it('should make api call to get settings data', async () => {
        await renderComponent();
        expect(spyGet).toHaveBeenCalledWith(userId)
    });

    it('should display the light alarm component', async () => {
        await renderComponent();
        const actual = screen.getByText('Light Alarm').textContent;
        expect(actual).toEqual('Light Alarm');
    });

    it('should not display the light alarm component when zero alarms', async () => {
        spyGet.mockReturnValue([]);
        await renderComponent();
        const actual = screen.queryByTestId('light-alarm-group');
        expect(actual).toBeNull();
    });

    it('should display the add tasl button', async () => {
        await renderComponent();
        const actual = screen.queryByTestId('add-task-button');
        expect(actual).toBeDefined();
    });
});