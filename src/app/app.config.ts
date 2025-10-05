// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core'; // Adicione importProvidersFrom
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

// 1. IMPORTE O MÓDULO E ÍCONES AQUI
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled' // Habilita a rolagem para âncoras
    })),

    importProvidersFrom(FeatherModule.pick(allIcons))
  ]
};