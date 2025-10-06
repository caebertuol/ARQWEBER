import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },


  { path: 'projetos/:id', component: ProjectDetailsComponent },

  { path: 'login', component: LoginComponent },

  { path: 'registro', component: RegisterComponent },

  { path: 'politica-de-privacidade', component: PrivacyPolicyComponent },

  // Rota curinga
  { path: '**', redirectTo: '' }
];