// src/app/components/notification/notification.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importe a interface 'Notification' do nosso serviço
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

  // 2. A variável agora vai 'escutar' um Observable do tipo 'Notification'
  notification$: Observable<Notification | null>;

  constructor() {
    // 3. CORREÇÃO: Acessamos a propriedade correta 'notification$' do serviço
    this.notification$ = this.notificationService.notification$;
  }

  closeNotification(): void {
    this.notificationService.hide();
  }
}