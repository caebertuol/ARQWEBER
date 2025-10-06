// src/app/components/notification/notification.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';
import { Observable } from 'rxjs';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FeatherModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);

  notification$: Observable<Notification | null>;

  constructor() {

    this.notification$ = this.notificationService.notification$;
  }

  closeNotification(): void {
    this.notificationService.hide();
  }
}