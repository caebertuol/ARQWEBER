import { ApplicationConfig, importProvidersFrom } from '@angular/core'; // Adicione importProvidersFrom
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled', // Habilita a rolagem para âncoras
      scrollPositionRestoration: 'top' 
    })),

    importProvidersFrom(FeatherModule.pick(allIcons))
  ]
};