import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';
import { ServiceItem } from './quote.service';

export interface User {
  name: string;
  email: string;
  telefone: string;
}

export type QuoteStatus = 'Enviado' | 'Em Análise' | 'Aprovado' | 'Concluído';
export interface QuoteRequest {
  date: Date;
  services: ServiceItem[];
  totalPrice: number;
  status: QuoteStatus;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadInitialUser();
  }

  private loadInitialUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        this.currentUserSubject.next(JSON.parse(userJson));
      }
    }
  }

  register(name: string, email: string, password_not_used: string, telefone: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem(email)) {
        this.notificationService.show('Este e-mail já está cadastrado.', 'error');
        return false;
      }
      const user: User = { name, email, telefone };
      localStorage.setItem(email, JSON.stringify({ password: password_not_used, user, quotes: [] }));
      this.notificationService.show('Cadastro realizado com sucesso! Faça o login para continuar.');
      return true;
    }
    return false;
  }
  
  login(email: string, password_not_used: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem(email);
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data.password === password_not_used) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          this.currentUserSubject.next(data.user);
          this.notificationService.show('Olá, ' + data.user.name + '! Que bom te ver por aqui.');
          this.router.navigate(['/'], { fragment: 'servicos' });
          return true;
        }
      }
      this.notificationService.show('E-mail ou senha incorretos.', 'error');
      return false;
    }
    return false;
  }

  addQuoteRequest(quote: QuoteRequest): void {
    if (isPlatformBrowser(this.platformId) && this.currentUserValue) {
      const email = this.currentUserValue.email;
      const storedData = localStorage.getItem(email);
      if (storedData) {
        const data = JSON.parse(storedData);
        if (!data.quotes) {
          data.quotes = [];
        }
        data.quotes.push(quote);
        localStorage.setItem(email, JSON.stringify(data));
      }
    }
  }

  getQuoteRequests(): QuoteRequest[] {
    if (isPlatformBrowser(this.platformId) && this.currentUserValue) {
      const email = this.currentUserValue.email;
      const storedData = localStorage.getItem(email);
      if (storedData) {
        const data = JSON.parse(storedData);
        return data.quotes || [];
      }
    }
    return [];
  }

  deleteQuoteRequest(quoteToDelete: QuoteRequest): void {
    if (isPlatformBrowser(this.platformId) && this.currentUserValue) {
      const email = this.currentUserValue.email;
      const storedData = localStorage.getItem(email);
      if (storedData) {
        const data = JSON.parse(storedData);
        data.quotes = data.quotes.filter((quote: QuoteRequest) => 
          new Date(quote.date).getTime() !== new Date(quoteToDelete.date).getTime()
        );
        localStorage.setItem(email, JSON.stringify(data));
      }
    }
  }
   updateUser(newName: string, newTelefone: string, newPassword?: string): boolean {
    if (isPlatformBrowser(this.platformId) && this.currentUserValue) {
      const email = this.currentUserValue.email;
      const storedData = localStorage.getItem(email);
      if (storedData) {
        const data = JSON.parse(storedData);
        
        // Atualiza o nome e o telefone
        data.user.name = newName;
        data.user.telefone = newTelefone;

        if (newPassword) {
          data.password = newPassword;
        }

        localStorage.setItem(email, JSON.stringify(data));
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        this.currentUserSubject.next(data.user);

        return true;
      }
    }
    return false;
  }
  // ===================================================================
  // CORREÇÃO: Os métodos 'logout' e 'currentUserValue' foram movidos
  // para DENTRO da classe AuthService, onde eles pertencem.
  // ===================================================================

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    }
  }

} // <-- ESTA é a chave `}` que fecha a classe AuthService corretamente.