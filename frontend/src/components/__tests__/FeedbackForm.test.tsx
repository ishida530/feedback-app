import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModernFeedbackForm } from '../ModernFeedbackForm';
import { Toaster } from 'react-hot-toast';


const mockSubmitFeedback = vi.fn();
const mockShowSuccess = vi.fn();
const mockShowError = vi.fn();

vi.mock('../../services/ServiceContainer', () => ({
  ServiceContainer: {
    getInstance: () => ({
      getFeedbackApiService: () => ({
        submitFeedback: mockSubmitFeedback,
      }),
      getNotificationService: () => ({
        showSuccess: mockShowSuccess,
        showError: mockShowError,
      }),
    }),
  },
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => 
      React.createElement('div', props, children),
    form: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => 
      React.createElement('form', props, children),
  },
}));

describe('Feedback Form - Recruitment Task Requirements', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderForm = () => {
    return render(
      <>
        <ModernFeedbackForm />
        <Toaster />
      </>
    );
  };

  it('renders form with required fields: name, email, message and submit button', () => {
    renderForm();


    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();  
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates form fields according to best practices', async () => {
    const user = userEvent.setup();
    renderForm();
    

    await user.click(screen.getByRole('button', { name: /submit/i }));


    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('calls backend endpoint and displays confirmation message on successful submission', async () => {
    const user = userEvent.setup();
    

    const mockResponse = {
      id: 1,
      name: 'John Doe',
      message: 'Your platform looks great!',
    };
    mockSubmitFeedback.mockResolvedValueOnce(mockResponse);

    renderForm();


    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'john@example.com');
    await user.type(screen.getByRole('textbox', { name: /message/i }), 'Your platform looks great!');
    

    await user.click(screen.getByRole('button', { name: /submit/i }));


    await waitFor(() => {
      expect(mockSubmitFeedback).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Your platform looks great!',
      });
    });


    expect(mockShowSuccess).toHaveBeenCalledWith('Thank you! Your feedback has been submitted successfully.');
  });

  it('displays error message when submission fails', async () => {
    const user = userEvent.setup();
    

    mockSubmitFeedback.mockRejectedValueOnce(new Error('Server error'));

    renderForm();


    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'john@example.com');
    await user.type(screen.getByRole('textbox', { name: /message/i }), 'Your platform looks great!');
    await user.click(screen.getByRole('button', { name: /submit/i }));


    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith('Server error');
    });
  });
});