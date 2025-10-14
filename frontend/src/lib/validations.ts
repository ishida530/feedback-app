import { z } from 'zod'

export const feedbackSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .trim(),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  message: z
    .string()
    .min(1, 'Message is required')
    .trim()
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>