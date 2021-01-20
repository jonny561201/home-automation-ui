import React from 'react';
import { Context } from '../../../state/Store';
import { getStore } from '../../../state/GlobalState';
import { render, screen, act, fireEvent } from '@testing-library/react';
import LightAlarmCreatePanel from '../../../components/panels/LightAlarmCreatePanel';


describe('Light Alarm Edit Panel', () => {
    const userId = 'fakeUserId';
    const days = 'MonTue';
    const time = '01:00:00';
    const groupName = 'Bedroom';
    const groups = [{groupId: '1', groupName: groupName}];

    const renderComponent = async (alarmDays, alarmTime, alarmName) => {
        await act(async () => {
            render(
                <Context.Provider value={[{userLightGroups: groups, daysOfWeek: []}, () => { }]}>
                    <LightAlarmCreatePanel  tempUnit={"fahrenheit"} measureUnit={"imperial"} days={alarmDays} time={alarmTime} groupName={alarmName}/>
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        getStore().setUserId(userId);
    });

    it('should display the time picker', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getByTestId('time-picker');
        expect(actual).toBeDefined();
     });

     it('should display the light room label', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getByText('Room');
        expect(actual).toBeDefined();
     });

     it('should display the light room name selector', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getByTestId('alarm-room-picker');
        expect(actual).toBeDefined();
     });

     it('should display the drop down options in the menu', async () => {
        await renderComponent(days, time, groupName);
        await act(async () => {
            fireEvent.click(screen.getByTestId('alarm-room-picker'));
        });
        const actual = screen.getAllByText(groupName)[1].textContent;
        expect(actual).toEqual(groupName);
     });

    it('should not display the days when expansion panel opened', async () => {
        await renderComponent();
        fireEvent.click(screen.getByTestId('light-alarm-group'));
        fireEvent.click(screen.getByText('F'));
        const actual = screen.queryByText(days);
        expect(actual).toBeDefined();
    });

    it('should display the time when expansion panel closed', async () => {
        await renderComponent();
        fireEvent.click(screen.getByTestId('light-alarm-group'));
        const actual = screen.queryByText(time);
        expect(actual).toBeDefined();
    });
});