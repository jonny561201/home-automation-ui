import React from 'react';
import App from '../App';
import { shallow } from 'enzyme';


describe('App Component', () => {
  let app;

  beforeEach(() => {
    app = shallow(<App />);
  });

  it('renders', () => {
    expect(app).toBeTruthy();
  });

  describe('app routes', () => {

    it('should have the login route', () => {
      const actual = app.find('Route').at(0);
  
      expect(actual.props()).toHaveProperty('path', '/');
    });

    it('should have the home route', () => {
      const actual = app.find('Route').at(1);
  
      expect(actual.props()).toHaveProperty('path', '/home');
    });

    it('should have the settings route', () => {
      const actual = app.find('Route').at(2);
  
      expect(actual.props()).toHaveProperty('path', '/settings');
    });

    it('should have the account route', () => {
      const actual = app.find('Route').at(3);
  
      expect(actual.props()).toHaveProperty('path', '/account');
    });
  });
});

