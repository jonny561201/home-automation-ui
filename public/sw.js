self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Home Automation';
    const options = {
        body: data.body || '',
        icon: data.icon || '/logo192.png',
        badge: '/logo192.png',
        tag: data.tag,
        data: { url: data.url || '/' }
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = (event.notification.data && event.notification.data.url) || '/';
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
            const existing = wins.find((w) => w.url.endsWith(url));
            if (existing) return existing.focus();
            return self.clients.openWindow(url);
        })
    );
});

self.addEventListener('pushsubscriptionchange', (event) => {
    event.waitUntil(
        self.registration.pushManager.subscribe(event.oldSubscription.options)
    );
});
