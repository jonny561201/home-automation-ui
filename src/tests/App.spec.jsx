import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';


describe('App Component', () => {

  it('renders', async () => {
    render(<App />);
    const actual = await screen.findByRole('heading', { name: 'Member Login' });
    expect(actual).toBeDefined()
  });
});

