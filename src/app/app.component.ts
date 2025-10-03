// src/app/app.component.ts

import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// 1. IMPORTE OS MÓDULOS E COMPONENTES AQUI
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. ADICIONE TUDO AO ARRAY 'imports'
  imports: [
   // RouterOutlet,
    FeatherModule, // Módulo de ícones
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-arquiteta';
}