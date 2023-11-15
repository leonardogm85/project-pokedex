import { Injectable } from '@angular/core';

import { ToastModel } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: ToastModel[] = [];

  showSuccess(message: string): void {
    this.show({ message, className: 'text-bg-success', delay: 10000 });
  }

  showWarning(message: string): void {
    this.show({ message, className: 'text-bg-warning', delay: 20000 });
  }

  showError(message: string): void {
    this.show({ message, className: 'text-bg-danger', delay: 30000 });
  }

  show(toast: ToastModel): void {
    this.toasts.push(toast);
  }

  remove(toast: ToastModel): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear(): void {
    this.toasts.splice(0, this.toasts.length);
  }

}
