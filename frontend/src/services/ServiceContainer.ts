import type { IFeedbackApiService, INotificationService } from '../types';
import { FeedbackApiService } from './FeedbackApiService';
import { NotificationService } from './NotificationService';


export class ServiceContainer {
  private static instance: ServiceContainer;
  private feedbackApiService: IFeedbackApiService;
  private notificationService: INotificationService;

  private constructor() {

    this.feedbackApiService = new FeedbackApiService();
    this.notificationService = new NotificationService();
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  getFeedbackApiService(): IFeedbackApiService {
    return this.feedbackApiService;
  }

  getNotificationService(): INotificationService {
    return this.notificationService;
  }


  setFeedbackApiService(service: IFeedbackApiService): void {
    this.feedbackApiService = service;
  }

  setNotificationService(service: INotificationService): void {
    this.notificationService = service;
  }
}
