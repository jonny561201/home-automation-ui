import { captureCurrentPosition, calculateDistanceInMeters } from '../../utilities/Location';


describe('Location', () => {

    describe('calculateDistanceInMeters', () => {
        it('should return zero for identical coordinates', () => {
            const actual = calculateDistanceInMeters(41.77, -93.27, 41.77, -93.27);
            expect(Number(actual)).toEqual(0);
        });

        it('should compute non-zero distance between separate coordinates', () => {
            const actual = calculateDistanceInMeters(41.77, -93.27, 41.59, -93.62);
            expect(Number(actual)).toBeGreaterThan(0);
        });
    });

    describe('captureCurrentPosition', () => {
        const errorCodes = { PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 };

        beforeEach(() => {
            navigator.geolocation.getCurrentPosition = vi.fn();
        });

        it('should resolve with rounded coordinates on the first high-accuracy attempt', async () => {
            navigator.geolocation.getCurrentPosition.mockImplementation((success) => {
                success({ coords: { latitude: 41.771234567, longitude: -93.272345678, accuracy: 12.4 } });
            });

            const position = await captureCurrentPosition();

            expect(position).toEqual({ latitude: 41.77123, longitude: -93.27235, accuracy: 12 });
            expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
        });

        it('should fall back to low-accuracy when high-accuracy times out', async () => {
            const calls = [];
            navigator.geolocation.getCurrentPosition.mockImplementation((success, error, options) => {
                calls.push(options);
                if (options.enableHighAccuracy) {
                    error({ ...errorCodes, code: errorCodes.TIMEOUT });
                } else {
                    success({ coords: { latitude: 41.77, longitude: -93.27, accuracy: 250 } });
                }
            });

            const position = await captureCurrentPosition();

            expect(calls).toHaveLength(2);
            expect(calls[0].enableHighAccuracy).toBe(true);
            expect(calls[1].enableHighAccuracy).toBe(false);
            expect(position.accuracy).toEqual(250);
        });

        it('should fall back to low-accuracy when position is unavailable', async () => {
            const calls = [];
            navigator.geolocation.getCurrentPosition.mockImplementation((success, error, options) => {
                calls.push(options);
                if (options.enableHighAccuracy) {
                    error({ ...errorCodes, code: errorCodes.POSITION_UNAVAILABLE });
                } else {
                    success({ coords: { latitude: 41.77, longitude: -93.27, accuracy: 500 } });
                }
            });

            await captureCurrentPosition();

            expect(calls).toHaveLength(2);
        });

        it('should reject without retrying when permission is denied', async () => {
            navigator.geolocation.getCurrentPosition.mockImplementation((success, error) => {
                error({ ...errorCodes, code: errorCodes.PERMISSION_DENIED });
            });

            await expect(captureCurrentPosition()).rejects.toBeDefined();
            expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
        });

        it('should reject when geolocation is not supported', async () => {
            const original = navigator.geolocation;
            navigator.geolocation = undefined;

            await expect(captureCurrentPosition()).rejects.toThrow(/not supported/);

            navigator.geolocation = original;
        });
    });
});
