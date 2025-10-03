// src/app/services/auth.service.ts

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// (Opcional, mas boa prática) Define a estrutura do objeto de usuário
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

  // BehaviorSubject é um "Observable especial" que armazena o valor atual.
  // Componentes podem "se inscrever" nele para saber em tempo real se o usuário mudou.
  // Iniciamos com null, pois o usuário não está logado no início.
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Ao iniciar o serviço, tentamos carregar um usuário do localStorage.
    // Isso mantém o usuário logado mesmo se ele recarregar a página.
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

  /**
   * Tenta registrar um novo usuário.
   * Em uma app real, isso faria uma chamada para uma API. Aqui, usamos localStorage.
   */
  register(name: string, email: string, password_not_used: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Verifica se o usuário já existe (simples, pelo email)
      if (localStorage.getItem(email)) {
        alert('Este e-mail já está cadastrado.');
        return false;
      }

      // Salva os dados do usuário (a senha nunca deve ser salva assim em produção!)
      const user: User = { name, email };
      localStorage.setItem(email, JSON.stringify({ password: password_not_used, user }));
      alert('Registro realizado com sucesso!');
      return true;
    }
    return false;
  }

  /**
   * Tenta fazer o login do usuário.
   */
  login(email: string, password_not_used: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem(email);
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data.password === password_not_used) {
          // Sucesso! Armazena o usuário atual no localStorage e no BehaviorSubject
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          this.currentUserSubject.next(data.user);
          this.router.navigate(['/']); // Redireciona para a home após o login
          return true;
        }
      }
      alert('E-mail ou senha incorretos.');
      return false;
    }
    return false;
  }

  /**
   * Faz o logout do usuário.
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']); // Redireciona para a página de login
    }
  }

  /**
   * Retorna o valor atual do usuário logado (se houver).
   */
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}