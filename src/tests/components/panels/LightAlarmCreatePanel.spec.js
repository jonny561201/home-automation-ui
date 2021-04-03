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

    const spyPost = jest.spyOn(lib, 'insertLightTask');

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

    //  it('should display the drop down options in the menu', async () => {
    //     await renderComponent();
    //     await act(async () => {
    //         fireEvent.click(screen.getByTestId('alarm-room-picker'));
    //     });
    //     const actual = screen.getAllByText(groupName)[1].textContent;
    //     expect(actual).toEqual(groupName);
    //  });
});