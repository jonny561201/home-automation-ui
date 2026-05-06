export const calculateDistanceInMeters = (lat1, long1, lat2, long2) => {
    const meterConversion = 6371e3;
    const φ1 = lat2 * Math.PI / 180;
    const φ2 = lat1 * Math.PI / 180;
    const Δφ = (lat1 - lat2) * Math.PI / 180;
    const Δλ = (long1 - long2) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return ((meterConversion * c) * 0.000621371).toFixed(2);
}

export const captureCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported on this device.'));
            return;
        }
        const success = (position) => resolve({
            latitude: Number(position.coords.latitude.toFixed(5)),
            longitude: Number(position.coords.longitude.toFixed(5)),
            accuracy: Math.round(position.coords.accuracy),
        });
        const tryLowAccuracy = () => navigator.geolocation.getCurrentPosition(
            success, reject,
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
        );
        navigator.geolocation.getCurrentPosition(
            success,
            (error) => error.code === error.PERMISSION_DENIED ? reject(error) : tryLowAccuracy(),
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
        );
    });
};

