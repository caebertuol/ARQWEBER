// src/app/services/auth.service.ts

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';

// A interface 'User' precisa ser exportada para que outros componentes a vejam
export interface User {
  name: string;
  email: string;
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

  register(name: string, email: string, password_not_used: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem(email)) {
        this.notificationService.show('Este e-mail já está cadastrado.', 'error');
        return false;
      }

      const user: User = { name, email };
      localStorage.setItem(email, JSON.stringify({ password: password_not_used, user }));
      
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

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}