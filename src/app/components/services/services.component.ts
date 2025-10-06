import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { QuoteService, ServiceItem } from '../../services/quote.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FeatherModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  private quoteService = inject(QuoteService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private notificationService = inject(NotificationService);


  availableServices: ServiceItem[] = [
    {
      title: 'Projeto Residencial',
      description: 'Criação de espaços personalizados que refletem seu estilo de vida e necessidades familiares.',
      icon: 'home',
      price: 3500
    },
    {
      title: 'Projeto Comercial',
      description: 'Ambientes profissionais que combinam funcionalidade e identidade da marca.',
      icon: 'briefcase',
      price: 5000
    },
    {
      title: 'Consultoria',
      description: 'Orientação especializada para otimizar espaços existentes ou planejar novas construções.',
      icon: 'edit',
      price: 1000
    }
  ];


  selectedServices$: Observable<ServiceItem[]>;
  totalPrice$: Observable<number>;
  isLoggedIn$: Observable<boolean>;

  constructor() {
    this.selectedServices$ = this.quoteService.selectedServices$;
    this.totalPrice$ = this.selectedServices$.pipe(
      map(services => services.reduce((total, service) => total + service.price, 0))
    );
    this.isLoggedIn$ = this.authService.currentUser$.pipe(
      map(user => !!user)
    );
  }

  isSelected(service: ServiceItem): Observable<boolean> {
    return this.selectedServices$.pipe(
      map(selected => selected.some(s => s.title === service.title))
    );
  }

  toggleServiceSelection(service: ServiceItem): void {
    this.quoteService.toggleService(service);
  }

  proceedToQuote(): void {
    const currentUser = this.authService.currentUserValue;
    const selectedServices = this.quoteService.getSelectedServices();

    if (!currentUser) {
      this.router.navigate(['/login']);
      this.notificationService.show('Faça o login para solicitar um orçamento.', 'warning');
      return;
    }

    if (selectedServices.length === 0) {
      this.notificationService.show('Por favor, selecione pelo menos um serviço.', 'warning');
      return;
    }

    const totalPrice = selectedServices.reduce((total, service) => total + service.price, 0);
    const serviceList = selectedServices.map(s => `- ${s.title}`).join('\n');
    const phoneNumber = '5554981160144';

    let message = `Olá! Meu nome é ${currentUser.name}.\n\n`;
    message += `Me interessei por esses serviços:\n`;
    message += `${serviceList}\n\n`;
    message += ` Orçamento: ${totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.`;
    message += ` Gostaria de agendar uma reunião para discutirmos os próximos passos. Fico no aguardo. Obrigado(a)!`;
    // Codifica a mensagem para ser usada em uma URL e abre o link
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    if (isPlatformBrowser(this.platformId)) {
      window.open(whatsappUrl, '_blank');
    }
  }
}