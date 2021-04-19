import '@testing-library/jest-dom/extend-expect';

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
  };
  
  global.navigator.geolocation = mockGeolocation;