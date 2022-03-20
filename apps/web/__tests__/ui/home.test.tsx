import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/containers/home';

describe('Home Page', () => {
  test('Render the home page', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Welcome to Sharingan/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
