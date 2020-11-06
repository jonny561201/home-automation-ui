import React from 'react';
import { Context } from '../../../state/Store';
import { render, screen } from '@testing-library/react';
import WeekPicker from '../../../components/controls/WeekPicker';


describe('Week Picker', () => {
    const daysOfWeek = [{id: 'Mon', on: false, day: 'M'}];

    const renderComponent = async () => {
        render(
            <Context.Provider value={[{daysOfWeek: daysOfWeek}, () => { }]}>
                <WeekPicker />
            </Context.Provider>
        );
    }

    it('should display a daypicker component', async () => {
        await renderComponent();
        const actual = screen.getByText('M').textContent;
        expect(actual).toEqual('M');
    });
});