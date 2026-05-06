import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as restApi from '../../../../utilities/RestApi';
import * as locationUtils from '../../../../utilities/Location';
import CityPrompt from '../../../../pages/Home/segments/CityPrompt';
import { Context } from '../../../../state/Store';

const bearer = 'fake-token';

vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
        getAccessTokenSilently: vi.fn().mockResolvedValue(bearer),
    }),
}));


describe('CityPrompt', () => {
    const mockDispatch = vi.fn();
    const spyCapture = vi.spyOn(locationUtils, 'captureCurrentPosition');
    const spyReverseGeocode = vi.spyOn(restApi, 'reverseGeocode');
    const spyUpdatePrefs = vi.spyOn(restApi, 'updateUserPreferences');

    const renderComponent = (preferences = {}) => {
        render(
            <Context.Provider value={[{ preferences }, mockDispatch]}>
                <CityPrompt />
            </Context.Provider>
        );
    };

    const clickGpsButton = async () => {
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Use My Location/ }));
        });
    };

    const clickSaveButton = async () => {
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Save/ }));
        });
    };

    beforeEach(() => {
        mockDispatch.mockClear();
        spyCapture.mockReset();
        spyReverseGeocode.mockReset();
        spyUpdatePrefs.mockReset();
        spyUpdatePrefs.mockResolvedValue({ ok: true });
    });

    it('should open automatically when preferences has no city', () => {
        renderComponent({});
        expect(screen.getByText('Set Your Location')).toBeDefined();
    });

    it('should not open when preferences already has a city', () => {
        renderComponent({ city: 'Ames' });
        expect(screen.queryByText('Set Your Location')).toBeNull();
    });

    it('should populate city input when Use My Location succeeds', async () => {
        spyCapture.mockResolvedValue({ latitude: 41.77, longitude: -93.27, accuracy: 50 });
        spyReverseGeocode.mockResolvedValue({ city: 'Mingo', state: 'IA' });

        renderComponent({});
        await clickGpsButton();

        expect(screen.getByLabelText('City').value).toEqual('Mingo');
    });

    it('should call reverse geocode with token and captured coordinates', async () => {
        spyCapture.mockResolvedValue({ latitude: 41.77, longitude: -93.27, accuracy: 50 });
        spyReverseGeocode.mockResolvedValue({ city: 'Mingo', state: 'IA' });

        renderComponent({});
        await clickGpsButton();

        expect(spyReverseGeocode).toHaveBeenCalledWith(bearer, 41.77, -93.27);
    });

    it('should show captured accuracy badge after a successful lookup', async () => {
        spyCapture.mockResolvedValue({ latitude: 41.77, longitude: -93.27, accuracy: 42 });
        spyReverseGeocode.mockResolvedValue({ city: 'Mingo', state: 'IA' });

        renderComponent({});
        await clickGpsButton();

        expect(screen.getByText(/Captured ±42 m/)).toBeDefined();
    });

    it('should show an error when reverse geocode returns empty', async () => {
        spyCapture.mockResolvedValue({ latitude: 41.77, longitude: -93.27, accuracy: 50 });
        spyReverseGeocode.mockResolvedValue({});

        renderComponent({});
        await clickGpsButton();

        expect(screen.getByText(/Could not determine your city and state/)).toBeDefined();
    });

    it('should show an error when GPS capture fails', async () => {
        spyCapture.mockRejectedValue(new Error('Timeout expired'));

        renderComponent({});
        await clickGpsButton();

        expect(screen.getByText('Timeout expired')).toBeDefined();
    });

    it('should not call reverse geocode when GPS capture fails', async () => {
        spyCapture.mockRejectedValue(new Error('Permission denied'));

        renderComponent({});
        await clickGpsButton();

        expect(spyReverseGeocode).not.toHaveBeenCalled();
    });

    it('should send city, state, latitude, and longitude when saving after GPS', async () => {
        spyCapture.mockResolvedValue({ latitude: 41.77, longitude: -93.27, accuracy: 50 });
        spyReverseGeocode.mockResolvedValue({ city: 'Mingo', state: 'IA' });

        renderComponent({});
        await clickGpsButton();
        await clickSaveButton();

        expect(spyUpdatePrefs).toHaveBeenCalledWith(bearer, {
            city: 'Mingo',
            state: 'IA',
            isFahrenheit: true,
            isImperial: true,
            latitude: 41.77,
            longitude: -93.27,
        });
    });

    it('should preserve lat/lon when user edits the auto-filled city before saving', async () => {
        spyCapture.mockResolvedValue({ latitude: 41.77, longitude: -93.27, accuracy: 50 });
        spyReverseGeocode.mockResolvedValue({ city: 'Polk', state: 'IA' });

        renderComponent({});
        await clickGpsButton();

        fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Mingo' } });
        await clickSaveButton();

        expect(spyUpdatePrefs).toHaveBeenCalledWith(bearer, {
            city: 'Mingo',
            state: 'IA',
            isFahrenheit: true,
            isImperial: true,
            latitude: 41.77,
            longitude: -93.27,
        });
    });

    it('should dispatch updated preferences after a successful save', async () => {
        spyCapture.mockResolvedValue({ latitude: 41.77, longitude: -93.27, accuracy: 50 });
        spyReverseGeocode.mockResolvedValue({ city: 'Mingo', state: 'IA' });

        renderComponent({});
        await clickGpsButton();
        await clickSaveButton();

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SET_USER_PREFERENCES',
            payload: expect.objectContaining({
                city: 'Mingo',
                state: 'IA',
                latitude: 41.77,
                longitude: -93.27,
            }),
        });
    });
});
