import { MockedProvider } from '@apollo/client/testing';
import { authenticatedUserQuery } from '@snipcode/front/graphql/users/queries/authenticated-user';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from './page';

const mocks = [
  {
    request: {
      query: authenticatedUserQuery,
      variables: {},
    },
    result: {
      data: {
        authenticatedUser: null,
      },
    },
  },
];

describe('Home Page', () => {
  test('Render the home page', () => {
    render(
      <Home
        apolloWrapperElement={(children) => (
          <MockedProvider addTypename={false} mocks={mocks}>
            {children}
          </MockedProvider>
        )}
      />,
    );

    const text = screen.getByText(/Made for developers and content creators/i);

    expect(text).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /Request Early Access/i,
    });

    expect(button).toBeInTheDocument();
  });
});
