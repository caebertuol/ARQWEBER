// src/app/services/notification.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Tipos de notificação que aceitamos
export type NotificationType = 'success' | 'error' | 'warning';

// Interface para o objeto de notificação
export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  public notification$ = this.notificationSubject.asObservable();

  private timer: any;
  message$: any;

  constructor() { }

  /**
   * O método show() que aceita 'type' como o segundo argumento.
   */
  show(message: string, type: NotificationType = 'success', duration: number = 3000): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.notificationSubject.next({ message, type });

    this.timer = setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide(): void {
    this.notificationSubject.next(null);
  }
}