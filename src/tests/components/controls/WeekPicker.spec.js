import React from 'react';
import { render, screen } from '@testing-library/react';
import WeekPicker from '../../../components/controls/WeekPicker';


describe('Week Picker', () => {
    let daysOfWeek;

    const renderComponent = async () => {
        render(
                <WeekPicker daysOfWeek={daysOfWeek}/>
        );
    }

    beforeEach(() => {
        daysOfWeek = [{id: 'Mon', on: false, day: 'M'}]
    });

    it('should display a daypicker component', async () => {
        await renderComponent();
        const actual = screen.getByText('M').textContent;
        expect(actual).toEqual('M');
    });

    it('should display multiple days of the week', async () => {
        daysOfWeek.push({id: 'Tue', on: false, day: 'T'});
        await renderComponent();
        const actualMon = screen.getByText('M').textContent;
        const actualTues = screen.getByText('T').textContent;

        expect(actualMon).toEqual('M');
        expect(actualTues).toEqual('T');
    });
});