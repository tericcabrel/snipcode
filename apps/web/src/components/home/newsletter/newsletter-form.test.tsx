import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { act } from 'react';

import { subscribeNewsletterMutation } from '@snipcode/front/graphql';

import { NewsletterForm } from './newsletter-form';

describe('Newsletter Form', () => {
  test('Subscribe successfully to the newsletter', async () => {
    const mocks = [
      {
        request: {
          query: subscribeNewsletterMutation,
          variables: {
            email: 'user@email.com',
          },
        },
        result: {
          data: {
            subscribeToNewsletter: { message: 'success!' },
          },
        },
      },
    ];

    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <NewsletterForm />
      </MockedProvider>,
    );

    const inputEmail = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /Get updates/i });

    await act(async () => {
      await userEvent.type(inputEmail, 'user@email.com');
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');

      expect(dialog).toBeInTheDocument();

      const successHeading = screen.getByRole('heading', { name: /Subscription successful/ });

      expect(successHeading).toBeInTheDocument();

      expect(inputEmail).toHaveValue('');
    });
  });

  test('Error while subscribing to the newsletter', async () => {
    const mocks = [
      {
        error: new Error('API key not found.'),
        request: {
          query: subscribeNewsletterMutation,
          variables: {
            email: 'user@email.com',
          },
        },
      },
    ];

    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <NewsletterForm />
      </MockedProvider>,
    );

    const inputEmail = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /Get updates/i });

    await act(async () => {
      await userEvent.type(inputEmail, 'user@email.com');
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');

      expect(dialog).toBeInTheDocument();

      const successHeading = screen.getByRole('heading', { name: /Subscription failure/ });

      expect(successHeading).toBeInTheDocument();
    });
  });
});
