import React from 'react';
import { Context } from '../../../state/Store';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../state/GlobalState';
import { render, screen, act, fireEvent } from '@testing-library/react';
import LightAlarmCreatePanel from '../../../components/panels/LightAlarmCreatePanel';


describe('Light Alarm Edit Panel', () => {
    const groupId = '1';
    const days = 'MonTue';
    const time = '01:00:00';
    const groupName = 'Bedroom';
    const userId = 'fakeUserId';
    const groups = [{groupId: groupId, groupName: groupName}];

    const spyPost = jest.spyOn(lib, 'insertScheduledTasks');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{userLightGroups: groups, daysOfWeek: [], taskTypes: []}, () => { }]}>
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

    //  it('should display the drop down options in the menu', async () => {
    //     await renderComponent();
    //     await act(async () => {
    //         fireEvent.click(screen.getByTestId('alarm-room-picker'));
    //     });
    //     const actual = screen.getAllByText(groupName)[1].textContent;
    //     expect(actual).toEqual(groupName);
    //  });

    it('should display the time when expansion panel closed', async () => {
        await renderComponent();
        fireEvent.click(screen.getByTestId('light-alarm-group'));
        const actual = screen.queryByText(time);
        expect(actual).toBeDefined();
    });

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