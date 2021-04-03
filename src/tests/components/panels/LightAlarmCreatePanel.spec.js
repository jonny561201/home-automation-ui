import React from 'react';
import { Context } from '../../../state/Store';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../state/GlobalState';
import { render, screen, act } from '@testing-library/react';
import LightAlarmCreatePanel from '../../../components/panels/LightAlarmCreatePanel';


describe('Light Alarm Edit Panel', () => {
    const userId = 'fakeUserId';
    const tasks = ['hvac', 'turn on']

    const spyPost = jest.spyOn(lib, 'insertLightTask');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{taskTypes: tasks}, () => { }]}>
                    <LightAlarmCreatePanel/>
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyPost.mockClear();
        getStore().setUserId(userId);
    });

    it('should display the Task Type label', async () => {
        await renderComponent();
        const actual = screen.getByLabelText('Task Type')
        expect(actual).toEqual('Task Type');
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