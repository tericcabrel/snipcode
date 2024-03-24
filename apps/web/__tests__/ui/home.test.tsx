import { MockedProvider } from '@apollo/client/testing';
import { authenticatedUserQuery } from '@snipcode/front/graphql/users/queries/authenticated-user';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from '@/containers/home';

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

jest.mock('next/router', () => require('next-router-mock'));

describe('Home Page', () => {
  test('Render the home page', () => {
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <Home />
      </MockedProvider>,
    );

    const button = screen.getByRole('button', {
      name: /Request Early Access/i,
    });

    expect(button).toBeInTheDocument();
  });
});
