import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import type { FeedbackData, FeedbackResponse, ApiError, IFeedbackApiService } from '../types';

export class FeedbackApiService implements IFeedbackApiService {
  private api: AxiosInstance;

  constructor(baseURL = 'http://localhost:8080/api') {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async submitFeedback(data: FeedbackData): Promise<FeedbackResponse> {
    try {
      const response = await this.api.post<FeedbackResponse>('/feedback', data);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async getFeedback(): Promise<FeedbackResponse[]> {
    try {
      const response = await this.api.get<FeedbackResponse[]>('/feedback');
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  private handleApiError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      const errorData = axiosError.response?.data;
      
      if (errorData?.details) {
        const validationMessages = errorData.details
          .map(detail => `${detail.field}: ${detail.message}`)
          .join(', ');
        return new Error(`Validation failed: ${validationMessages}`);
      }
      
      const errorMessage = errorData?.error || axiosError.message || 'API request failed';
      return new Error(errorMessage);
    }
    
    return new Error('An unexpected error occurred');
  }
}
