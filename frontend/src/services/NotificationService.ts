import toast from 'react-hot-toast';
import type { INotificationService } from '../types';

export class NotificationService implements INotificationService {
  showSuccess(message: string, duration = 4000): void {
    toast.success(message, {
      duration,
      icon: '✅',
    });
  }

  showError(message: string, duration = 5000): void {
    toast.error(message, {
      duration,
      icon: '❌',
    });
  }

  showLoading(message: string): string {
    return toast.loading(message, {
      duration: Infinity,
    });
  }

  dismiss(id: string): void {
    toast.dismiss(id);
  }
}
