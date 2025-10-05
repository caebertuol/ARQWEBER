import { Component, inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Para navegar para a página de orçamento
import { FeatherModule } from 'angular-feather';
import { QuoteService, ServiceItem } from '../../services/quote.service'; // Importe o serviço e a interface
import { AuthService } from '../../services/auth.service'; // Para verificar se o usuário está logado
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

  // Lista de serviços disponíveis (agora definida aqui)
  availableServices: ServiceItem[] = [
    {
      title: 'Projeto Residencial',
      description: 'Criação de espaços personalizados que refletem seu estilo de vida e necessidades familiares.',
      icon: 'home',
      price: 3650
    },
    {
      title: 'Projeto Comercial',
      description: 'Ambientes profissionais que combinam funcionalidade e identidade da marca.',
      icon: 'briefcase',
      price: 5900
    },
    {
      title: 'Consultoria',
      description: 'Orientação especializada para otimizar espaços existentes ou planejar novas construções.',
      icon: 'edit',
      price: 1000
    }
  ];

  // Observable para saber quais serviços estão selecionados
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

  // Função para verificar se um serviço está selecionado (para o estilo do card)
  isSelected(service: ServiceItem): Observable<boolean> {
    return this.selectedServices$.pipe(
      map(selected => selected.some(s => s.title === service.title))
    );
  }

  // Função chamada ao clicar em um card
  toggleServiceSelection(service: ServiceItem): void {
    this.quoteService.toggleService(service);
  }

  // Função para prosseguir para a página de orçamento
  proceedToQuote(): void {
    const currentUser = this.authService.currentUserValue;
    const selectedServices = this.quoteService.getSelectedServices();
    
    // Primeiro, verifica se o usuário está logado
    if (!currentUser) {
      this.router.navigate(['/login']);
      // Usamos o notificationService que já criamos!
      // this.notificationService.show('Por favor, faça o login para solicitar um orçamento.', 'warning');
      this.notificationService.show('Faça o login para solicitar um orçamento.', 'warning');
      return;
    }

    // Depois, verifica se algum serviço foi selecionado
    if (selectedServices.length === 0) {
      this.notificationService.show('Por favor, selecione pelo menos um serviço.', 'warning');
      return;
    }
    
    // Se tudo estiver certo, preparamos a mensagem para o WhatsApp
    const totalPrice = selectedServices.reduce((total, service) => total + service.price, 0);
    const serviceList = selectedServices.map(s => `- ${s.title}`).join('\n');
    const phoneNumber = '5554981160144'; // <-- SUBSTITUA PELO SEU NÚMERO DE WHATSAPP

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