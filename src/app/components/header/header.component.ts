import { Component, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { FeatherModule } from 'angular-feather';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FeatherModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  
  currentUser$: Observable<User | null>;
  currentTheme$: Observable<Theme>;

  // 1. NOVA PROPRIEDADE PARA O MENU MOBILE
  isMobileMenuOpen = false;

  navLinks = [
    { path: '/#home', label: 'Home' },
    { path: '/#sobre', label: 'Sobre' },
    { path: '/#projetos', label: 'Projetos' },
    { path: '/#servicos', label: 'Serviços' },
    { path: '/#contato', label: 'Contato' }
  ];

  constructor() {
    this.currentUser$ = this.authService.currentUser$;
    this.currentTheme$ = this.themeService.theme$;
  }
  
  // 2. NOVA FUNÇÃO PARA ABRIR/FECHAR O MENU MOBILE
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
  }
}