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
});

