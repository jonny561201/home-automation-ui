import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';


describe('App Component', () => {

  it('renders', () => {
    render(<App />);
    const actual = screen.getByRole('heading', { name: 'Member Login' });
    expect(actual).toBeDefined()
  });
});

