// Adicione 'inject' e 'PLATFORM_ID' se ainda não estiverem
import { Component, HostListener, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; 
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
  private platformId = inject(PLATFORM_ID); // Injetado para segurança no SSR

  currentUser$: Observable<User | null>;
  currentTheme$: Observable<Theme>;
  isMobileMenuOpen = false;

 
  activeSection: string = 'home';


  navLinks = [
    { path: '/#home', label: 'Home', id: 'home' },
    { path: '/#sobre', label: 'Sobre', id: 'sobre' },
    { path: '/#projetos', label: 'Projetos', id: 'projetos' },
    { path: '/#servicos', label: 'Serviços', id: 'servicos' },
    { path: '/#contato', label: 'Contato', id: 'contato' }
  ];

  constructor() {
    this.currentUser$ = this.authService.currentUser$;
    this.currentTheme$ = this.themeService.theme$;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Só executa essa lógica no navegador, não no servidor
    if (isPlatformBrowser(this.platformId)) {
      let currentSection: string = 'home';

      // sobre cada link/seção para ver qual está na tela
      this.navLinks.forEach(link => {
        const section = document.getElementById(link.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          // Se o topo da seção estiver visível na metade superior da tela
          if (window.scrollY >= sectionTop - sectionHeight / 2) {
            currentSection = link.id;
          }
        }
      });

      this.activeSection = currentSection;
    }
  }

  toggleMobileMenu(): void { this.isMobileMenuOpen = !this.isMobileMenuOpen; }
  toggleTheme(): void { this.themeService.toggleTheme(); }
  logout(): void { this.authService.logout(); }
}