import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { feedbackSchema } from '../lib/validations';
import type { FeedbackData } from '../types';
import { useFeedbackSubmission } from '../hooks/useFeedbackSubmission';
import { FeedbackFormLayout } from './FeedbackFormLayout';
import { FeedbackFormFields } from './FeedbackFormFields';
import { ModernButton } from './ui/ModernButton';

export const ModernFeedbackForm: React.FC = () => {
  const { submitFeedback, isSubmitting } = useFeedbackSubmission();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: FeedbackData) => {
    try {
      await submitFeedback(data);
      reset();
    } catch {
      // Error is handled by useFeedbackSubmission hook
    }
  };

  return (
    <FeedbackFormLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FeedbackFormFields
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-4"
        >
          <ModernButton
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </ModernButton>
        </motion.div>
      </form>
    </FeedbackFormLayout>
  );
};