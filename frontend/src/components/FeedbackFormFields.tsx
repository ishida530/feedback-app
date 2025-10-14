import React from 'react';
import { motion } from 'framer-motion';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { FeedbackData } from '../types';
import { ModernInput } from './ui/ModernInput';
import { ModernTextarea } from './ui/ModernTextarea';
import { Label } from './ui/Label';

interface FeedbackFormFieldsProps {
  register: UseFormRegister<FeedbackData>;
  errors: FieldErrors<FeedbackData>;
  isSubmitting: boolean;
}

export const FeedbackFormFields: React.FC<FeedbackFormFieldsProps> = ({
  register,
  errors,
  isSubmitting,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-2"
      >
        <Label htmlFor="name" required>
          Full Name
        </Label>
        <ModernInput
          id="name"
          placeholder="Enter your full name"
          error={errors.name?.message}
          disabled={isSubmitting}
          {...register('name')}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-2"
      >
        <Label htmlFor="email" required>
          Email Address
        </Label>
        <ModernInput
          id="email"
          type="email"
          placeholder="Enter your email address"
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register('email')}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="space-y-2"
      >
        <Label htmlFor="message" required>
          Your Message
        </Label>
        <ModernTextarea
          id="message"
          placeholder="Share your feedback here..."
          rows={5}
          error={errors.message?.message}
          disabled={isSubmitting}
          {...register('message')}
        />
      </motion.div>
    </>
  );
};
