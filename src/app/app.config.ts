import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
// Imports para o locale (formatação de moeda/data)
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { routes } from './app.routes';
// Imports para o Feather Icons
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Registra o locale português
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuração do Roteador
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'top'
    })),
    
    // Habilita o Módulo de Animações
    provideAnimations(),
    
    // Habilita o HttpClient para requisições de API (como o Formspree)
    provideHttpClient(withFetch()),

    // Define o idioma padrão da aplicação para Português (Brasil)
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    // Configuração do Feather Icons
    importProvidersFrom(FeatherModule.pick(allIcons))
  ]
};