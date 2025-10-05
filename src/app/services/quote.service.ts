import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// (Opcional, mas boa prática) Interface para definir um Serviço
export interface ServiceItem {
  title: string;
  description: string;
  icon: string; // Nome do ícone do Feather
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  // BehaviorSubject para manter a lista de serviços selecionados
  private selectedServicesSubject = new BehaviorSubject<ServiceItem[]>([]);
  public selectedServices$ = this.selectedServicesSubject.asObservable();

  constructor() { }

  // Adiciona um serviço à lista, evitando duplicatas
  addService(service: ServiceItem): void {
    const currentServices = this.selectedServicesSubject.value;
    // Verifica se o serviço já foi adicionado
    if (!currentServices.some(s => s.title === service.title)) {
      this.selectedServicesSubject.next([...currentServices, service]);
    }
  }

  // Remove um serviço da lista
  removeService(service: ServiceItem): void {
    const currentServices = this.selectedServicesSubject.value;
    const updatedServices = currentServices.filter(s => s.title !== service.title);
    this.selectedServicesSubject.next(updatedServices);
  }

  // Alterna (adiciona ou remove) um serviço
  toggleService(service: ServiceItem): void {
    const currentServices = this.selectedServicesSubject.value;
    if (currentServices.some(s => s.title === service.title)) {
      this.removeService(service);
    } else {
      this.addService(service);
    }
  }

  // Limpa todos os serviços selecionados
  clearServices(): void {
    this.selectedServicesSubject.next([]);
  }

  // Retorna a lista atual de serviços
  getSelectedServices(): ServiceItem[] {
    return this.selectedServicesSubject.value;
  }
}