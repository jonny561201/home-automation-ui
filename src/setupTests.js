import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const mockGeolocation = {
  getCurrentPosition: vi.fn((_, error) => {
    if (error) error({ message: 'Geolocation mock not configured for this test' });
  }),
  watchPosition: vi.fn(),
  clearWatch: vi.fn(),
};

global.navigator.geolocation = mockGeolocation;
window.HTMLMediaElement.prototype.load = () => { };
window.HTMLMediaElement.prototype.play = () => { };

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isLoading: false,
    isAuthenticated: false,
    user: { name: 'Test User' },
    getAccessTokenSilently: () => Promise.resolve('test-bearer-token'),
    getIdTokenClaims: () => Promise.resolve({
      'https://soaringleafsolutions.com/user_id': 'test-user-id',
      'https://soaringleafsolutions.com/roles': [],
      given_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
    }),
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
  }),
  Auth0Provider: ({ children }) => children,
  withAuthenticationRequired: (component) => component,
}));