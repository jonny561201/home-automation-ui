import React from 'react';
import { Context } from '../../../state/Store';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../state/GlobalState';
import { render, screen, act, fireEvent } from '@testing-library/react';
import LightAlarmCreatePanel from '../../../components/panels/LightAlarmCreatePanel';


describe('Light Alarm Edit Panel', () => {
    const userId = 'fakeUserId';
    const days = 'MonTue';
    const time = '01:00:00';
    const groupName = 'Bedroom';
    const groupId = '1';
    const groups = [{groupId: groupId, groupName: groupName}];

    const spyPost = jest.spyOn(lib, 'insertScheduledTasks');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{userLightGroups: groups, daysOfWeek: []}, () => { }]}>
                    <LightAlarmCreatePanel/>
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyPost.mockClear();
        getStore().setUserId(userId);
    });

    it('should display the time picker', async () => {
        await renderComponent();
        const actual = screen.getByTestId('time-picker');
        expect(actual).toBeDefined();
     });

     it('should display the light room label', async () => {
        await renderComponent();
        const actual = screen.getByText('Room');
        expect(actual).toBeDefined();
     });

     it('should display the light room name selector', async () => {
        await renderComponent();
        const actual = screen.getByTestId('alarm-room-picker');
        expect(actual).toBeDefined();
     });

     it('should display the drop down options in the menu', async () => {
        await renderComponent();
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

    it('should display the save button', async () => {
        await renderComponent();
        const actual = screen.getByTestId('save-task-button').textContent;
        expect(actual).toEqual('Save');
    });

    it('should make api call to save task when edited', async () => {
        await renderComponent();
        fireEvent.click(screen.getByText('F'));
        fireEvent.click(screen.getByTestId('save-task-button'));
        expect(spyPost).toHaveBeenCalledWith(userId, groupId, undefined, 'Fri', time);
    });
});