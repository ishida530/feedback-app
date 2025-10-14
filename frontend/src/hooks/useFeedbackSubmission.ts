import { useState, useCallback } from 'react';
import type { FeedbackData, SubmissionState } from '../types';
import { ServiceContainer } from '../services/ServiceContainer';

export const useFeedbackSubmission = () => {
  const [state, setState] = useState<SubmissionState>({
    isSubmitting: false,
    error: null,
    success: false,
  });

  const submitFeedback = useCallback(async (data: FeedbackData) => {
    const container = ServiceContainer.getInstance();
    const apiService = container.getFeedbackApiService();
    const notificationService = container.getNotificationService();

    setState(prev => ({ ...prev, isSubmitting: true, error: null, success: false }));

    try {
      const result = await apiService.submitFeedback(data);
      
      setState(prev => ({ ...prev, isSubmitting: false, success: true }));
      
      notificationService.showSuccess(
        'Thank you! Your feedback has been submitted successfully.'
      );
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to submit feedback. Please try again.';
      
      setState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        error: errorMessage,
        success: false 
      }));
      
      notificationService.showError(errorMessage);
      
      throw error;
    }
  }, []);

  const resetState = useCallback(() => {
    setState({
      isSubmitting: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    submitFeedback,
    resetState,
  };
};
