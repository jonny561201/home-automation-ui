import React from 'react';
import LightAlarm from '../../../components/panels/LightAlarmPanel';
import { render, screen, act, fireEvent } from '@testing-library/react';

describe('Light Alarm Panel', () => {

    const days = 'Mon';
    const groupName = 'Bedroom';
    const alarmTime = '01:00:00';

    const renderComponent = async () => {
        await act(async () => {
            render(
                <LightAlarm groupName={groupName} lightDays={days} lightTime={alarmTime} />
            );
        });
    }

    it('should display the current alarm room setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(groupName).textContent;
        expect(actual).toEqual(groupName);
    });

    it('should display the current alarm time setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(alarmTime).textContent;
        expect(actual).toEqual(alarmTime);
    });

    it('should display the current alarm days setting stored in state', async () => {
        await renderComponent();
        const actual = screen.getByText(days).textContent;
        expect(actual).toEqual(days);
    });

    it('should not display the days when expansion panel opened', async () => {
        await renderComponent();
        fireEvent.click(screen.getByTestId('light-alarm-group'))
        const actual = screen.queryByText(days);
        expect(actual).toBeNull();
    });
});