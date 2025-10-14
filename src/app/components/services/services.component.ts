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

  // Propriedade para controlar o estado de carregamento do botão
  isProcessing = false;

  availableServices: ServiceItem[] = [
    { title: 'Consultoria', description: 'Orientação especializada para otimizar espaços existentes.', icon: 'edit', price: 1500 },
    { title: 'Projeto Residencial', description: 'Criação de espaços personalizados que refletem seu estilo de vida.', icon: 'home', price: 5000 },
    { title: 'Projeto Comercial', description: 'Ambientes profissionais que combinam funcionalidade e identidade da marca.', icon: 'briefcase', price: 8000 },
    { title: 'Projeto Expográfico', description: 'Desenvolvimento de espaços para exposições e museus, criando narrativas visuais que guiam e engajam o visitante.', icon: 'layout', price: 3500 },
    { title: 'Projeto Cenográfico', description: 'Criação de cenários e ambientes para eventos, palcos e produções audiovisuais, transformando espaços em experiências.', icon: 'film', price: 6000 },
    { title: 'Projeto Esporivo', description: 'Planejamento de ginásios e complexos esportivos, focando na funcionalidade para atletas e na experiência do público.', icon: 'shield', price: 7500 },
  
    /* { 
      title: 'Design de Interiores', 
      description: 'Soluções estéticas e funcionais para ambientes internos, do mobiliário à iluminação.', 
      icon: 'box', 
      price: 3500 
    },
    { 
      title: 'Reforma e Retrofit', 
      description: 'Modernização e renovação de edificações existentes para novos usos e melhor performance.', 
      icon: 'refresh-cw', 
      price: 6000 
    },
    { 
      title: 'Aprovação de Projetos', 
      description: 'Assessoria completa para a regularização e aprovação de projetos junto aos órgãos competentes.', 
      icon: 'check-square', 
      price: 2500 
    }
 */

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
    if (this.isProcessing) return; // Bloqueia cliques múltiplos
    this.isProcessing = true; // Ativa o bloqueio

    const currentUser = this.authService.currentUserValue;
    const selectedServices = this.quoteService.getSelectedServices();

    if (!currentUser) {
      this.notificationService.show('Faça o login para solicitar um orçamento.', 'warning');
      this.router.navigate(['/login']);
      this.isProcessing = false; // Libera o botão em caso de erro
      return;
    }

    // 2. Verifica se algum serviço foi selecionado
    if (selectedServices.length === 0) {
      this.notificationService.show('Por favor, selecione pelo menos um serviço.', 'warning');
      this.isProcessing = false; // Libera o botão em caso de erro
      return;
    }

    const totalPrice = selectedServices.reduce((total, service) => total + service.price, 0);

    // 3. Cria o objeto da solicitação
    const newQuoteRequest = {
      date: new Date(),
      services: selectedServices,
      totalPrice: totalPrice,
      status: 'Enviado' as const
    };

    // 4. Salva a solicitação no histórico do usuário
    this.authService.addQuoteRequest(newQuoteRequest);

    this.notificationService.show('Sua solicitação foi salva no seu painel!');

    // 5. Limpa os serviços selecionados atualmente
    this.quoteService.clearServices();

    // 6. Navega o usuário para a página do painel
    this.router.navigate(['/dashboard']);
  }
}