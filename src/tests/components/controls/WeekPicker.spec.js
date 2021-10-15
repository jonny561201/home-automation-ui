import React from 'react';
import { render, screen, act } from '@testing-library/react';
import WeekPicker from '../../../components/controls/WeekPicker';


describe('Week Picker', () => {
    const renderComponent = async (daysOfWeek) => {
        await act(async () => {
            render(
                <WeekPicker daysOfWeek={daysOfWeek} />
            );
        });
    }

    it('should display a daypicker component', async () => {
        const daysOfWeek = [{id: 'Mon', on: false, day: 'M'}];
        await renderComponent(daysOfWeek);
        const actual = screen.getByText('M').textContent;
        expect(actual).toEqual('M');
    });

    it('should display multiple days of the week', async () => {
        const daysOfWeek = [{id: 'Mon', on: false, day: 'M'}, {id: 'Tue', on: false, day: 'T'}];
        await renderComponent(daysOfWeek);
        const actualMon = screen.getByText('M').textContent;
        const actualTues = screen.getByText('T').textContent;

        expect(actualMon).toEqual('M');
        expect(actualTues).toEqual('T');
    });
});