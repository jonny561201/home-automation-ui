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