import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AccountNotifications from '../../../pages/Account/AccountNotifications';
import * as push from '../../../utilities/PushNotifications';
import * as api from '../../../utilities/RestApi';


describe('AccountNotifications', () => {
    const fakeSubscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/abc',
        keys: { p256dh: 'pub', auth: 'secret' }
    };

    const spyIsSupported = vi.spyOn(push, 'isPushSupported');
    const spyRegister = vi.spyOn(push, 'registerPushServiceWorker');
    const spyGetCurrent = vi.spyOn(push, 'getCurrentSubscription');
    const spySubscribe = vi.spyOn(push, 'subscribeToPush');
    const spyUnsubscribe = vi.spyOn(push, 'unsubscribeFromPush');
    const spyApiSubscribe = vi.spyOn(api, 'subscribeToPushNotifications');
    const spyApiUnsubscribe = vi.spyOn(api, 'unsubscribeFromPushNotifications');

    beforeEach(() => {
        vi.clearAllMocks();
        spyIsSupported.mockReturnValue(true);
        spyRegister.mockResolvedValue({});
        spyGetCurrent.mockResolvedValue(null);
        spySubscribe.mockResolvedValue(fakeSubscription);
        spyUnsubscribe.mockResolvedValue(fakeSubscription.endpoint);
        spyApiSubscribe.mockResolvedValue({ ok: true });
        spyApiUnsubscribe.mockResolvedValue({ ok: true });
    });

    const renderComponent = async () => {
        await act(async () => {
            render(<AccountNotifications />);
        });
    };

    it('should display the Notifications header', async () => {
        await renderComponent();
        expect(screen.getByText('Notifications')).toBeDefined();
    });

    it('should show the unsupported message when push is not supported', async () => {
        spyIsSupported.mockReturnValue(false);
        await renderComponent();
        expect(screen.getByText(/aren't supported/i)).toBeDefined();
    });

    it('should render the toggle as off when no current subscription exists', async () => {
        await renderComponent();
        const toggle = screen.getByRole('switch');
        expect(toggle.checked).toBe(false);
    });

    it('should render the toggle as on when a subscription already exists', async () => {
        spyGetCurrent.mockResolvedValue(fakeSubscription);
        await renderComponent();
        const toggle = await screen.findByRole('switch');
        await waitFor(() => expect(toggle.checked).toBe(true));
    });

    it('should subscribe and POST to backend when toggled on', async () => {
        await renderComponent();
        await act(async () => {
            fireEvent.click(screen.getByRole('switch'));
        });

        expect(spySubscribe).toHaveBeenCalled();
        expect(spyApiSubscribe).toHaveBeenCalledWith(fakeSubscription);
        await waitFor(() => expect(screen.getByRole('switch').checked).toBe(true));
    });

    it('should unsubscribe and notify backend when toggled off', async () => {
        spyGetCurrent.mockResolvedValue(fakeSubscription);
        await renderComponent();
        const toggle = await screen.findByRole('switch');
        await waitFor(() => expect(toggle.checked).toBe(true));

        await act(async () => {
            fireEvent.click(toggle);
        });

        expect(spyUnsubscribe).toHaveBeenCalled();
        expect(spyApiUnsubscribe).toHaveBeenCalledWith(fakeSubscription.endpoint);
        await waitFor(() => expect(toggle.checked).toBe(false));
    });

    it('should show a failure status when subscribe rejects', async () => {
        spySubscribe.mockRejectedValue(new Error('Notification permission was denied.'));
        await renderComponent();
        await act(async () => {
            fireEvent.click(screen.getByRole('switch'));
        });

        expect(await screen.findByText('Failed')).toBeDefined();
    });

    it('should show a failure status when backend rejects the subscription', async () => {
        spyApiSubscribe.mockResolvedValue({ ok: false });
        await renderComponent();
        await act(async () => {
            fireEvent.click(screen.getByRole('switch'));
        });

        expect(await screen.findByText('Failed')).toBeDefined();
    });
});
