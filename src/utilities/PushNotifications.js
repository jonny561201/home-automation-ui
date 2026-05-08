import { getVapidPublicKey } from './RestApi';

let cachedVapidKey = null;

export const isPushSupported = () => {
    return typeof window !== 'undefined'
        && 'serviceWorker' in navigator
        && 'PushManager' in window
        && 'Notification' in window;
};

export const getNotificationPermission = () => {
    if (!isPushSupported()) return 'unsupported';
    return Notification.permission;
};

export const registerPushServiceWorker = async () => {
    if (!isPushSupported()) return null;
    return await navigator.serviceWorker.register('/sw.js');
};

export const getCurrentSubscription = async () => {
    if (!isPushSupported()) return null;
    const reg = await navigator.serviceWorker.ready;
    return await reg.pushManager.getSubscription();
};

export const subscribeToPush = async () => {
    if (!isPushSupported()) throw new Error('Push notifications are not supported in this browser.');

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') throw new Error('Notification permission was denied.');

    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();
    if (existing) return existing;

    if (!cachedVapidKey) cachedVapidKey = await getVapidPublicKey();
    if (!cachedVapidKey) throw new Error('Could not load VAPID public key from server.');

    return await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(cachedVapidKey)
    });
};

export const unsubscribeFromPush = async () => {
    const sub = await getCurrentSubscription();
    if (!sub) return null;
    const endpoint = sub.endpoint;
    await sub.unsubscribe();
    return endpoint;
};

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    const output = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; ++i) {
        output[i] = raw.charCodeAt(i);
    }
    return output;
};
