import React from 'react';
import * as lib from '../../../utilities/RestApi';
import { render, screen, act, fireEvent } from '@testing-library/react';
import SettingsEditPanel from '../../../components/panels/SettingsEditPanel';
import '@testing-library/jest-dom';
import { getStore } from '../../../state/GlobalState';

describe('Settings Edit Panel', () => {
    const userId = 'fakeUserId';
    const spyUpdate = jest.spyOn(lib, 'updateUserPreferences');

    const renderComponent = async () => {
        await act(async() => {
            render(<SettingsEditPanel  tempUnit={"fahrenheit"} measureUnit={"imperial"}/>);
        });
    }

    beforeEach(() => {
        getStore().setUserId(userId);
        spyUpdate.mockClear();
    });

    it('should display save button to submit updated preferences', async () => {
        await renderComponent();
        const actual = screen.getByText('Save').textContent;
        expect(actual).toEqual('Save');
    });

    it('should display the cancel button', async () => {
        await renderComponent();
        const actual = screen.getByText('Cancel').textContent;
        expect(actual).toEqual('Cancel');
    });

    it('should display the radio buttons for celsius and fahrenheit', async () => {
        await renderComponent();
        const fahrenheitRadio = screen.getAllByRole('radio')[0];
        const celciusRadio = screen.getAllByRole('radio')[1];
        expect(fahrenheitRadio).toHaveAttribute('value', 'fahrenheit');
        expect(celciusRadio).toHaveAttribute('value', 'celsius');
    });

    it('should display city input textbox', async () => {
        await renderComponent();
        const actual = screen.getByRole('textbox');
        expect(actual).toBeDefined();
    })

    it('should display Temperature header', async () => {
        await renderComponent();
        const actual = screen.getByText('Temperature').textContent;
        expect(actual).toEqual('Temperature');
    });

    it('should display the Measurement header', async () => {
        await renderComponent();
        const actual = screen.getByText('Measurement').textContent;
        expect(actual).toEqual('Measurement');
    });

    it('should display the radio buttons for imperial and metric', async () => {
        await renderComponent();
        const imperialRadio = screen.getAllByRole('radio')[2];
        const metricRadio = screen.getAllByRole('radio')[3];
        expect(imperialRadio).toHaveAttribute('value', 'imperial');
        expect(metricRadio).toHaveAttribute('value', 'metric');
    });
});