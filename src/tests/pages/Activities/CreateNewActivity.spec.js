import React from 'react';
import { Context } from '../../../state/Store';
import { render, screen, act, fireEvent } from '@testing-library/react';
import CreateNewActivity from '../../../pages/Activities/CreateNewActivity';


describe('Light Alarm Edit Panel', () => {
    const tasks = ['hvac', 'turn on']

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{taskTypes: tasks}, () => { }]}>
                    <CreateNewActivity/>
                </Context.Provider>
            );
        });
    }

    it('should display the Task Type label', async () => {
        await renderComponent();
        const actual = screen.getByTestId('task-type');
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
    //         fireEvent.click(screen.getByLabelText('Task Type'));
    //     });

    //     const actual = screen.getByText('hvac').textContent;
    //     expect(actual).toEqual('hvac');
    //  });
});