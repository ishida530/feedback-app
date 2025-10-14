import { describe, it, expect } from 'vitest';
import { feedbackSchema } from '../validations';

describe('Form Validation - Best Practices', () => {
  it('validates correct feedback data matching task requirements', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Your platform looks great!',
    };

    const result = feedbackSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('requires all fields (name, email, message)', () => {
    const emptyData = { name: '', email: '', message: '' };
    const result = feedbackSchema.safeParse(emptyData);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.issues.map(issue => issue.message);
      expect(errors).toContain('Name is required');
      expect(errors).toContain('Email is required');
      expect(errors).toContain('Message is required');
    }
  });

  it('validates email format', () => {
    const invalidEmailData = {
      name: 'John Doe',
      email: 'invalid-email',
      message: 'Your platform looks great!',
    };

    const result = feedbackSchema.safeParse(invalidEmailData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address');
    }
  });
});