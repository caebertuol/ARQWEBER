// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core'; // Adicione importProvidersFrom
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. IMPORTE O MÓDULO E ÍCONES AQUI
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 2. ADICIONE O PROVIDER AQUI
    importProvidersFrom(FeatherModule.pick(allIcons))
  ]
};