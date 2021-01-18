import React from 'react';
import { Context } from '../../../state/Store';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../state/GlobalState';
import LightAlarm from '../../../components/panels/LightAlarmPanel';
import { render, screen, act } from '@testing-library/react';

describe('Light Alarm Panel', () => {

    const userId = '987asdfs90';
    const spyGet = jest.spyOn(lib, 'getScheduledTask');
    const groupId = '1';
    const days = 'Mon';
    const groupName = 'Bedroom';
    const alarmTime = '01:00:00';
    const lightGroups = [{groupName: groupName, groupId: groupId}];

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ userLightGroups: lightGroups, daysOfWeek: []}, () => { }]}>
                    <LightAlarm />
                </Context.Provider>
            );
        });
    }
    
    beforeEach(() => {
        spyGet.mockClear();
        getStore().setUserId(userId);
        spyGet.mockReturnValue([{ alarm_days: days, alarm_time: alarmTime, alarm_light_group: groupId, alarm_group_name: groupName }]);
    });

    
    it('should make api call to get light alarm data', async () => {
        await renderComponent();
        expect(spyGet).toHaveBeenCalledWith(userId)
    });

    it('should display Light Alarm header', async () => {
        await renderComponent();
        const actual = screen.getByText('Light Alarm').textContent;
        expect(actual).toEqual('Light Alarm');
    });

    it('should display the alarm room text for measurement', async () => {
        await renderComponent();
        const actual = screen.getByText('Alarm Room:').textContent;
        expect(actual).toEqual('Alarm Room:');
    });

    it('should display the current alarm room setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(groupName).textContent;
        expect(actual).toEqual(groupName);
    });

    it('should display the alarm time for measurement', async () => {
        await renderComponent();
        const actual = screen.getByText('Alarm Time:').textContent;
        expect(actual).toEqual('Alarm Time:');
    });

    it('should display the current alarm time setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(alarmTime).textContent;
        expect(actual).toEqual(alarmTime);
    });

    it('should display the alarm days for measurement', async () => {
        await renderComponent();
        const actual = screen.getByText('Alarm Days:').textContent;
        expect(actual).toEqual('Alarm Days:');
    });

    it('should display the current alarm days setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(days).textContent;
        expect(actual).toEqual(days);
    });
});