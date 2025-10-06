import { Component } from '@angular/core';
import { FeatherModule } from 'angular-feather'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FeatherModule, RouterModule], 
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // Array com os links da navegação para gerar dinamicamente
  navLinks = [
    { path: '/#home', label: 'Home' },
    { path: '/#sobre', label: 'Sobre' },
    { path: '/#projetos', label: 'Projetos' },
    { path: '/#servicos', label: 'Serviços' },
    { path: '/#contato', label: 'Contato' }
  ];
}