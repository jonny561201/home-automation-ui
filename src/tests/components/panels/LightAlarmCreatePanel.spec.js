import React from 'react';
import { Context } from '../../../state//Store';
import { getStore } from '../../../state/GlobalState';
import { render, screen, act, fireEvent } from '@testing-library/react';
import CreateNewActivityPanel from '../../../components/panels/CreateNewActivityPanel';


describe('Light Alarm Edit Panel', () => {
    const userId = 'fakeUserId';
    const tasks = ['hvac', 'turn on']

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
        const actual = screen.getByLabelText('Task Type');
        expect(actual).toBeDefined();
    });

    it('should display the Cancel Button by default', async () => {
        await renderComponent();
        const actual = screen.getByText('Cancel');
        expect(actual.textContent).toEqual('Cancel');
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