// src/app/services/theme.service.ts

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

// Define os tipos de tema possíveis
export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  // BehaviorSubject para 'transmitir' o tema atual para toda a aplicação
  private themeSubject = new BehaviorSubject<Theme>('light');
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    // Ao iniciar, carrega o tema salvo ou a preferência do sistema do usuário
    this.loadInitialTheme();
  }

  // Lógica para carregar o tema inicial
  private loadInitialTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      let initialTheme: Theme = 'light';
      if (savedTheme) {
        initialTheme = savedTheme;
      } else if (systemPrefersDark) {
        initialTheme = 'dark';
      }
      
      this.setTheme(initialTheme);
    }
  }

  // Função privada que aplica o tema (salva e muda a classe do HTML)
  private setTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      this.themeSubject.next(theme);
      
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  // Função pública que o botão no Header usa para trocar o tema
  toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}