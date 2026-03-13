import React from 'react';
import * as lib from '../../../utilities/RestApi';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { Context } from '../../../state/Store';
import HvacActivity from '../../../pages/Activities/HvacActivity';


describe('HVAC Activity Panel', () => {
    const days = 'Mon';
    const userId = 'abc123';
    const taskId = 'kasdf9sf';
    const bearer = 'akjsdf783e';
    const groupName = 'Bedroom';
    const hvacStart = '01:00:00';
    const hvacStop = '14:00:00';
    const taskType = 'turn off';
    const task = { task_id: taskId, alarm_group_name: groupName, alarm_days: days, hvac_start: hvacStart, hvac_stop: hvacStop, enabled: true, task_type: taskType };

    const spyDelete = jest.spyOn(lib, 'deleteScheduledTask');
    const spyUpdate = jest.spyOn(lib, 'updateScheduledTasks');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ user: { userId: userId }, auth: { bearer: bearer }, taskTypes: [taskType] }, () => { }]}>
                    <HvacActivity deleteTask={() => { }} task={task} />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyDelete.mockClear();
        spyUpdate.mockClear();
    })

    it('should display the event type stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(`${task.task_type}`);
        expect(actual).toBeTruthy();
    });

    it('should display the current alarm time setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText('01:00 - 14:00');
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

        it('should display the start time header', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByTestId('light-alarm-group'))
            });
            const actual = screen.getByText('start time');
            expect(actual).toBeTruthy();
        });

        it('should display the stop time header', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByTestId('light-alarm-group'))
            });
            const actual = screen.getByText('stop time');
            expect(actual).toBeTruthy();
        });

        it('should display the Start Temp header', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByTestId('light-alarm-group'))
            });
            const actual = screen.getByText('Start Temp');
            expect(actual).toBeTruthy();
        });

        it('should display the Stop Temp header', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByTestId('light-alarm-group'))
            });
            const actual = screen.getByText('Stop Temp');
            expect(actual).toBeTruthy();
        });

        it('should display the start time and stop time picker when expansion panel opened', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByTestId('light-alarm-group'))
            });
            const actual = screen.getAllByTestId('time-picker');
            expect(actual.length).toEqual(2);
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
            const request = { 'taskId': taskId, 'alarmGroupName': groupName, 'alarmDays': 'MonFri', 'hvacStart': hvacStart, 'hvacStop': hvacStop, 'enabled': true, 'taskType': 'turn off' };
            expect(spyUpdate).toHaveBeenCalledWith(userId, bearer, request);
        });

        it('should updated the displayed selected days of the week on the event banner', async () => {
            spyUpdate.mockReturnValue({ ok: true })
            await renderComponent();
            fireEvent.click(screen.getByText('F'));
            fireEvent.click(screen.getByText('Update'));
            const actual = screen.getByText('MonFri').textContent;
            expect(actual).toEqual('MonFri');
        });
    });
});