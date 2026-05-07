import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';


describe('App Component', () => {

  it('renders', async () => {
    render(<App />);
    const actual = await screen.findByText('...Redirection to sign in...');
    expect(actual).toBeDefined()
  });
});

