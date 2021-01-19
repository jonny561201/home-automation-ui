import React from 'react';
import * as lib from '../../../utilities/RestApi';
import LightAlarm from '../../../components/panels/LightAlarmPanel';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { getStore } from '../../../state/GlobalState';

describe('Light Alarm Panel', () => {
    const days = 'Mon';
    const userId = 'abc123';
    const taskId = 'kasdf9sf';
    const groupName = 'Bedroom';
    const alarmTime = '01:00:00';
    const task = {task_id: taskId,alarm_group_name: groupName, alarm_days: days, alarm_time: alarmTime};

    const spyDelete = jest.spyOn(lib, 'deleteScheduledTask');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <LightAlarm deleteTask={() => {}} task={task} />
            );
        });
    }

    beforeEach(() => {
        getStore().setUserId(userId);
        spyDelete.mockClear();
    })

    it('should display the current alarm room setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(groupName).textContent;
        expect(actual).toEqual(groupName);
    });

    it('should display the current alarm time setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(alarmTime).textContent;
        expect(actual).toEqual(alarmTime);
    });

    it('should display the current alarm days setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(days).textContent;
        expect(actual).toEqual(days);
    });

    it('should not display the days when expansion panel opened', async () => {
        await renderComponent();
        fireEvent.click(screen.getByTestId('light-alarm-group'))
        const actual = screen.queryByText(days);
        expect(actual).toBeNull();
    });

    it('should not display the time when expansion panel opened', async () => {
        await renderComponent();
        fireEvent.click(screen.getByTestId('light-alarm-group'))
        const actual = screen.queryByText(alarmTime);
        expect(actual).toBeNull();
    });

    it('should make api call to delete task when delete button clicked', async () => {
        await renderComponent();
        fireEvent.click(screen.getByText('Delete'));
        expect(spyDelete).toHaveBeenCalledWith(userId, taskId);
    });
});