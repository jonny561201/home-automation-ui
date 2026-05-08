import React, { useEffect, useState } from 'react';
import { Divider, FormControl, FormControlLabel } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import { AutoSwitch } from '../../components/controls/Switches';
import {
    isPushSupported,
    registerPushServiceWorker,
    getCurrentSubscription,
    subscribeToPush,
    unsubscribeFromPush,
} from '../../utilities/PushNotifications';
import { subscribeToPushNotifications, unsubscribeFromPushNotifications } from '../../utilities/RestApi';


export default function AccountNotifications() {
    const [subscribed, setSubscribed] = useState(false);
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState(null);
    const supported = isPushSupported();

    useEffect(() => {
        const init = async () => {
            if (!supported) return;
            await registerPushServiceWorker();
            const existing = await getCurrentSubscription();
            setSubscribed(Boolean(existing));
        };
        init();
    }, [supported]);

    useEffect(() => {
        if (status === null) return;
        const timer = setTimeout(() => setStatus(null), 5000);
        return () => clearTimeout(timer);
    }, [status]);

    const enable = async () => {
        const subscription = await subscribeToPush();
        const response = await subscribeToPushNotifications(subscription);
        if (!response.ok) throw new Error('Server rejected the subscription.');
        setSubscribed(true);
    };

    const disable = async () => {
        const endpoint = await unsubscribeFromPush();
        if (endpoint) await unsubscribeFromPushNotifications(endpoint);
        setSubscribed(false);
    };

    const toggleSubscription = async () => {
        if (busy) return;
        setBusy(true);
        try {
            if (subscribed) {
                await disable();
            } else {
                await enable();
            }
            setStatus('success');
        } catch {
            setStatus('failure');
        } finally {
            setBusy(false);
        }
    };

    const statusMessage = () => {
        if (status === 'success') {
            return <div className="account-message">
                <CheckCircle className="success-text" />
                <p className="success-text">{subscribed ? 'Enabled' : 'Disabled'}</p>
            </div>
        } else if (status === 'failure') {
            return <div className="account-message">
                <Error className="failure-text" />
                <p className="failure-text">Failed</p>
            </div>
        }
        return null;
    };

    return (
        <div className="account-group account-text panel-header-text">
            <h2>Notifications</h2>
            <Divider />
            {!supported && (
                <div className="account-row text">
                    <p className="account">Push notifications aren't supported in this browser.</p>
                </div>
            )}
            {supported && (
                <div className="account-row text">
                    <FormControl>
                        <FormControlLabel
                            label="Push Notifications"
                            control={<AutoSwitch onChange={toggleSubscription} disabled={busy} checked={subscribed} />}
                        />
                    </FormControl>
                    {statusMessage()}
                </div>
            )}
        </div>
    );
}
