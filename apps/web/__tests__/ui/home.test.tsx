import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from '@/containers/home';

describe('Home Page', () => {
  test('Render the home page', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    const button = screen.getByRole('button', {
      name: /Request Early Access/i,
    });

    expect(button).toBeInTheDocument();
  });
});
