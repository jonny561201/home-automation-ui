import React from 'react';
import * as lib from '../../../utilities/RestApi';
import LightActivity from '../../../pages/Activities/LightActivity';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { Context } from '../../../state/Store';

describe('Light Activity Panel', () => {
    const days = 'Mon';
    const groupId = '3';
    const userId = 'abc123';
    const taskId = 'kasdf9sf';
    const bearer = 'akjsdf783e';
    const groupName = 'Bedroom';
    const alarmTime = '01:00:00';
    const taskType = 'turn off';
    const task = { task_id: taskId, alarm_group_name: groupName, alarm_days: days, alarm_time: alarmTime, alarm_light_group: groupId, enabled: true, task_type: taskType };

    const spyDelete = jest.spyOn(lib, 'deleteScheduledTask');
    const spyUpdate = jest.spyOn(lib, 'updateScheduledTasks');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ user: { userId: userId }, auth: { bearer: bearer }, taskTypes: [taskType] }, () => { }]}>
                    <LightActivity deleteTask={() => { }} task={task} />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyDelete.mockClear();
        spyUpdate.mockClear();
    })

    it('should display the event type and affected lights stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(`${task.task_type} - ${task.alarm_group_name}`);
        expect(actual).toBeTruthy();
    });

    it('should display the current alarm time setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText('01:00');
        expect(actual).toBeTruthy();
    });

    it('should display the current alarm days setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(days);
        expect(actual).toBeTruthy();
    });

    it('should display the enable/disable toggle button by default', async () => {
        await renderComponent();
        const actual = screen.getByRole('checkbox', { name: 'primary checkbox' });
        expect(actual).toBeTruthy();
    });

    describe('Expansion Panel Details', () => {

        it('should display the update button when expansion panel opened', async () => {
            await renderComponent();
            fireEvent.click(screen.getByTestId('light-alarm-group'))
            const actual = screen.getByText('Update').textContent;
            expect(actual).toEqual('Update');
        });

        it('should display the delete button when expansion panel opened', async () => {
            await renderComponent();
            fireEvent.click(screen.getByTestId('light-alarm-group'))
            const actual = screen.getByText('Delete').textContent;
            expect(actual).toEqual('Delete');
        });

        it('should display the days of the week buttons', async () => {
            await renderComponent();
            fireEvent.click(screen.getByTestId('light-alarm-group'))
            const friday = screen.getByText('F');
            const monday = screen.getByText('M');
            const wednesday = screen.getByText('W');
            const satSun = screen.getAllByText('S');
            const tueThu = screen.getAllByText('T');
            expect(friday).toBeTruthy();
            expect(tueThu).toBeTruthy();
            expect(monday).toBeTruthy();
            expect(wednesday).toBeTruthy();
            expect(satSun).toBeTruthy();
        });

        it('should display the time picker when expansion panel opened', async () => {
            await renderComponent();
            fireEvent.click(screen.getByTestId('light-alarm-group'))
            const actual = screen.getByTestId('time-picker');
            expect(actual).toBeTruthy();
        });

        it('should display the task type combobox', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByTestId('light-alarm-group'));
            });
            const actual = screen.getByTestId('task-type');
            expect(actual).toBeTruthy();
        });

        it('should make api call to delete task when delete button clicked', async () => {
            spyDelete.mockReturnValue({ ok: true })
            await renderComponent();
            fireEvent.click(screen.getByText('Delete'));
            expect(spyDelete).toHaveBeenCalledWith(userId, bearer, taskId);
        });

        it('should make api call to update task when update button clicked', async () => {
            await renderComponent();
            fireEvent.click(screen.getByText('F'));
            fireEvent.click(screen.getByText('Update'));
            const request = { 'taskId': taskId, 'alarmLightGroup': groupId, 'alarmGroupName': groupName, 'alarmDays': 'MonFri', 'alarmTime': alarmTime, 'enabled': true, 'taskType': 'turn off' };
            expect(spyUpdate).toHaveBeenCalledWith(userId, bearer, request);
        });

        it('should update the displayed selected days of the week on the event banner', async () => {
            spyUpdate.mockReturnValue({ ok: true })
            await renderComponent();
            fireEvent.click(screen.getByText('F'));
            fireEvent.click(screen.getByText('Update'));
            const actual = screen.getByText('MonFri').textContent;
            expect(actual).toEqual('MonFri');
        });
    });
});