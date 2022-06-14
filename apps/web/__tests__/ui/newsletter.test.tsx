import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';

import NewsletterForm from '@/components/home/newsletter/newsletter-form';
import { subscribeNewsletterMutation } from '@/graphql/newsletters/mutations/subscribe-newsletter';

describe('Newsletter Form', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();

    mockIntersectionObserver.mockReturnValue({
      disconnect: jest.fn().mockReturnValue(null),
      observe: jest.fn().mockReturnValue(null),
      unobserve: jest.fn().mockReturnValue(null),
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

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
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewsletterForm />
      </MockedProvider>,
    );

    const inputEmail = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /Get updates/i });

    userEvent.type(inputEmail, 'user@email.com');

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
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewsletterForm />
      </MockedProvider>,
    );

    const inputEmail = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /Get updates/i });

    userEvent.type(inputEmail, 'user@email.com');

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
