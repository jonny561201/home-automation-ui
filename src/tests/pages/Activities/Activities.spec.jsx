import React from 'react';
import { Context } from '../../../state/Store';
import { render, screen, act } from '@testing-library/react';
import ActivitiesPage from '../../../pages/Activities/Activities';


vi.mock('../../../utilities/StateUtil', () => ({ default: () => null }));


describe('Activities Page', () => {
    const user = { firstName: 'test', lastName: 'test' };
    const dispatch = vi.fn();
    const state = { user, tasks: [], activePage: 'Activities' };

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[state, dispatch]}>
                    <ActivitiesPage />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        dispatch.mockClear();
    });

    it('should set the active page to Activites', async () => {
        await renderComponent();
        expect(dispatch).toHaveBeenCalledWith({ type: 'SET_ACTIVE_PAGE', payload: 'Activities' });
    });

    it('should display Header component', async () => {
        await renderComponent();
        const actual = screen.getByRole('img', { name: 'Logo' });
        expect(actual).toBeDefined();
    });

    it('should display the Activities component', async () => {
        await renderComponent();
        const actual = screen.getAllByRole('heading', { name: 'Activities' });
        expect(actual).toHaveLength(2);
    });

    it('should not display the light alarm component when zero alarms', async () => {
        await renderComponent();
        const actual = screen.queryByRole('switch');
        expect(actual).toBeNull();
    });

    it('should display the add task button', async () => {
        await renderComponent();
        const actual = screen.getByRole('button', { name: 'Add task' });
        expect(actual).toBeDefined();
    });
});