import { Component, inject, PLATFORM_ID } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService, User, QuoteRequest, QuoteStatus } from '../../services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FeatherModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class DashboardComponent {
  authService = inject(AuthService);
  platformId = inject(PLATFORM_ID);
  user: User | null = null;
  quoteHistory: QuoteRequest[] = [];
  totalRequests: number = 0;
  totalValue: number = 0;
  lastRequestStatus: QuoteStatus | string = 'Nenhuma';

  showDeleteConfirm = false;
  quoteToDelete: QuoteRequest | null = null;

  ngOnInit() {
    this.loadDashboardData();
  }
  
  loadDashboardData(): void {
    this.user = this.authService.currentUserValue;
    this.quoteHistory = this.authService.getQuoteRequests().reverse();
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalRequests = this.quoteHistory.length;
    this.totalValue = this.quoteHistory.reduce((sum, quote) => sum + quote.totalPrice, 0);

    if (this.quoteHistory.length > 0) {
      this.lastRequestStatus = this.quoteHistory[0].status;
    } else {
      this.lastRequestStatus = 'Nenhuma';
    }
  }

  // FUNÇÃO COM A MENSAGEM DO WHATSAPP ATUALIZADA
  sendQuoteToWhatsApp(quote: QuoteRequest): void {
    if (!this.user) return;

    const serviceList = quote.services.map(s => `- ${s.title}`).join('\n');
    const phoneNumber = '5551991106919'; // SEU NÚMERO DE WHATSAPP

    // MENSAGEM ATUALIZADA AQUI
    let message = `Olá! Meu nome é *${this.user.name}* e gostaria de dar andamento à minha solicitação de orçamento.\n\n`;
    message += `*Me interessei por esses serviços:*\n${serviceList}\n\n`;
    message += `*Valor Total Estimado:* ${quote.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n\n`;
    message += `Gostaria de agendar uma reunião para discutirmos os próximos passos. Fico no aguardo. Obrigado(a)!`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    if (isPlatformBrowser(this.platformId)) {
      window.open(whatsappUrl, '_blank');
    }
  }

  deleteQuote(quote: QuoteRequest): void {
    this.quoteToDelete = quote;
    this.showDeleteConfirm = true;
  }

  confirmDeletion(): void {
    if (this.quoteToDelete) {
      this.authService.deleteQuoteRequest(this.quoteToDelete);
      this.loadDashboardData();
      this.cancelDeletion();
    }
  }

  cancelDeletion(): void {
    this.showDeleteConfirm = false;
    this.quoteToDelete = null;
  }
}