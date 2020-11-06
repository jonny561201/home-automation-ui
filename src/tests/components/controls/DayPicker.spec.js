import React from 'react';
import { render, screen } from '@testing-library/react';
import DayPicker from '../../../components/controls/DayPicker';
import { Context } from '../../../state/Store';


describe('Day Picker', () => {
    const day = {on: true, day: 'M'}

    const renderComponent = async () => {
        render(
            <Context.Provider value={[{}, () => { }]}>
                <DayPicker day={day}/>
            </Context.Provider>
        );
    }

    it('should display the button with the day name passed into the component', async () => {
        await renderComponent();
        const actual = (screen.getByText('M')).textContent;
        expect(actual).toEqual('M')
    });
});