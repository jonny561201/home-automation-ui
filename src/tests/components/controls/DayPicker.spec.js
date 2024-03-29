import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DayPicker from '../../../components/controls/DayPicker';
import { Context } from '../../../state/Store';


describe('Day Picker', () => {
    const daySelected = { on: true, day: 'M' };
    const dayUnselected = { on: false, day: 'T' };
    const daysOfWeek = [{ id: 'Mon', day: 'M', on: false }];

    const renderComponent = async (day) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ daysOfWeek: daysOfWeek }, () => { }]}>
                    <DayPicker toggleDay={() => {}} day={day} setEdited={() => { }} />
                </Context.Provider>
            );
        });
    }

    it('should display the button with the day name passed into the component', async () => {
        await renderComponent(daySelected);
        const actual = screen.getByText('M').textContent;
        expect(actual).toEqual('M');
    });

    it('should display the selected value when starts in an on state', async () => {
        await renderComponent(daySelected);
        const actual = screen.getByText('M').classList;
        expect(actual).toContain('selected');
        expect(actual).toContain('day-picker');
    });

    it('should not display the selected value when starts in an off state', async () => {
        await renderComponent(dayUnselected);
        const actual = screen.getByText('T').classList;
        expect(actual).not.toContain('selected');
        expect(actual).toContain('day-picker');
    });

    it('should toggle the button state when clicked', async () => {
        await renderComponent(dayUnselected);
        fireEvent.click(screen.getByText('T'));
        const actual = screen.getByText('T').classList;
        expect(actual).toContain('selected');
    });
});