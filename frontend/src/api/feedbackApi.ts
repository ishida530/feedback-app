import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


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


export const feedbackApi = {

  submitFeedback: async (feedback: FeedbackData): Promise<FeedbackResponse> => {
    try {
      const response = await api.post<FeedbackResponse>('/feedback', feedback);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as ApiError;
        if (errorData?.details) {

          const validationMessages = errorData.details.map(detail => 
            `${detail.field}: ${detail.message}`
          ).join(', ');
          throw new Error(`Validation failed: ${validationMessages}`);
        }
        const errorMessage = errorData?.error || error.message || 'Failed to submit feedback';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred');
    }
  },


  getFeedback: async (): Promise<FeedbackResponse[]> => {
    try {
      const response = await api.get<FeedbackResponse[]>('/feedback');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch feedback';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred');
    }
  },
};

export default feedbackApi;