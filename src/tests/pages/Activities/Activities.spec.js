import React from 'react';
import { Context } from '../../../state/Store';
import { getStore } from '../../../state/GlobalState';
import { render, screen, act } from '@testing-library/react';
import ActivitiesPage from '../../../pages/Activities/Activities';


jest.mock('../../../utilities/StateUtil', () => () => { });


describe('Activities Page', () => {
    const user = { firstName: 'test', lastName: 'test' };

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ user: user, tasks: [] }, () => { }]}>
                    <ActivitiesPage />
                </Context.Provider>
            );
        });
    }

    it('should set the active page to Activites', async () => {
        await renderComponent();
        expect(getStore().getActivePage()).toEqual('Activities');
    });

    it('should display Header component', async () => {
        await renderComponent();
        const actual = screen.getByTestId('white-header');
        expect(actual).toBeDefined();
    });

    it('should display the Activities component', async () => {
        await renderComponent();
        const actual = screen.getByTestId('activities-sub-header').textContent;
        expect(actual).toEqual('Activities');
    });

    it('should not display the light alarm component when zero alarms', async () => {
        await renderComponent();
        const actual = screen.queryByTestId('light-alarm-group');
        expect(actual).toBeNull();
    });

    it('should display the add task button', async () => {
        await renderComponent();
        const actual = screen.queryByTestId('add-task-button');
        expect(actual).toBeDefined();
    });
});