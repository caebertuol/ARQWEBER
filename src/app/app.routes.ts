// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // Importe o HomeComponent
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { LoginComponent } from './pages/login/login.component'; // <-- IMPORTE AQUI
import { RegisterComponent } from './pages/register/register.component'; // <-- IMPORTE AQUI
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component'; 

export const routes: Routes = [
  // A rota padrão agora carrega o HomeComponent
  { path: '', component: HomeComponent },
  
  // A rota para os detalhes do projeto continua a mesma
  { path: 'projetos/:id', component: ProjectDetailsComponent },

   { path: 'login', component: LoginComponent },  // <-- ADICIONE A ROTA

  { path: 'registro', component: RegisterComponent }, // <-- ADICIONE A ROTA

   { path: 'politica-de-privacidade', component: PrivacyPolicyComponent }, 
  
  // Rota curinga
  { path: '**', redirectTo: '' }
];