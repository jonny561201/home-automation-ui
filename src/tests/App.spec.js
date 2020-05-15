import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';


describe('App Component', () => {
  it('renders', () => {
    render(<App />);
    const actual = screen.getByText('Member Login');
    expect(actual).toBeDefined()
  });
});

