import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private selectedServicesSubject = new BehaviorSubject<ServiceItem[]>([]);
  public selectedServices$ = this.selectedServicesSubject.asObservable();

  constructor() { }


  addService(service: ServiceItem): void {
    const currentServices = this.selectedServicesSubject.value;

    if (!currentServices.some(s => s.title === service.title)) {
      this.selectedServicesSubject.next([...currentServices, service]);
    }
  }


  removeService(service: ServiceItem): void {
    const currentServices = this.selectedServicesSubject.value;
    const updatedServices = currentServices.filter(s => s.title !== service.title);
    this.selectedServicesSubject.next(updatedServices);
  }


  toggleService(service: ServiceItem): void {
    const currentServices = this.selectedServicesSubject.value;
    if (currentServices.some(s => s.title === service.title)) {
      this.removeService(service);
    } else {
      this.addService(service);
    }
  }


  clearServices(): void {
    this.selectedServicesSubject.next([]);
  }

  // Retorna a lista atual de serviços
  getSelectedServices(): ServiceItem[] {
    return this.selectedServicesSubject.value;
  }
}