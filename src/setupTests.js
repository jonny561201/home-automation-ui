import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const mockGeolocation = {
  getCurrentPosition: vi.fn((_, error) => {
    if (error) error({ message: 'Geolocation mock not configured for this test' });
  }),
  watchPosition: vi.fn()
};

global.navigator.geolocation = mockGeolocation;
window.HTMLMediaElement.prototype.load = () => { };
window.HTMLMediaElement.prototype.play = () => { };