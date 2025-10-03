import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Para navegar para a página de orçamento
import { FeatherModule } from 'angular-feather';
import { QuoteService, ServiceItem } from '../../services/quote.service'; // Importe o serviço e a interface
import { AuthService } from '../../services/auth.service'; // Para verificar se o usuário está logado
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FeatherModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  private quoteService = inject(QuoteService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Lista de serviços disponíveis (agora definida aqui)
  availableServices: ServiceItem[] = [
    {
      title: 'Projeto Residencial',
      description: 'Criação de espaços personalizados que refletem seu estilo de vida e necessidades familiares.',
      icon: 'home'
    },
    {
      title: 'Projeto Comercial',
      description: 'Ambientes profissionais que combinam funcionalidade e identidade da marca.',
      icon: 'briefcase'
    },
    {
      title: 'Consultoria',
      description: 'Orientação especializada para otimizar espaços existentes ou planejar novas construções.',
      icon: 'edit'
    }
  ];

  // Observable para saber quais serviços estão selecionados
  selectedServices$: Observable<ServiceItem[]>;

  constructor() {
    this.selectedServices$ = this.quoteService.selectedServices$;
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
    if (this.authService.currentUserValue) {
      if (this.quoteService.getSelectedServices().length > 0) {
        // Se o usuário está logado e selecionou serviços, navega para a página
        this.router.navigate(['/solicitar-orcamento']);
      } else {
        alert('Por favor, selecione pelo menos um serviço.');
      }
    } else {
      // Se não está logado, redireciona para o login
      alert('Por favor, faça o login para solicitar um orçamento.');
      this.router.navigate(['/login']);
    }
  }
}