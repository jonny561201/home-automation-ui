import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const mockGeolocation = {
  getCurrentPosition: vi.fn(),
  watchPosition: vi.fn()
};

global.navigator.geolocation = mockGeolocation;
window.HTMLMediaElement.prototype.load = () => { };
window.HTMLMediaElement.prototype.play = () => { };