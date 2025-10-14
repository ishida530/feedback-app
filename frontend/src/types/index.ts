
export interface FeedbackData {
  name: string;
  email: string;
  message: string;
}

export interface FeedbackResponse {
  id: number;
  name: string;
  message: string;
}

export interface ApiError {
  error: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}


export interface IFeedbackApiService {
  submitFeedback(data: FeedbackData): Promise<FeedbackResponse>;
  getFeedback(): Promise<FeedbackResponse[]>;
}

export interface INotificationService {
  showSuccess(message: string): void;
  showError(message: string): void;
  showLoading(message: string): string;
  dismiss(id: string): void;
}


export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
}

export interface SubmissionState {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}
