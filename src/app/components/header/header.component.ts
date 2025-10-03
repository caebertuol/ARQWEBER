import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service'; // 1. Importe o AuthService e a interface User
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // 2. Injeta o AuthService
  private authService = inject(AuthService);

  // 3. Cria uma propriedade para "observar" o usuário logado em tempo real
  currentUser$: Observable<User | null>;

  constructor() {
    // Atribui o Observable do serviço à nossa propriedade local
    this.currentUser$ = this.authService.currentUser$;
  }

  // 4. Cria uma função de logout que chama o serviço
  logout(): void {
    this.authService.logout();
  }
}