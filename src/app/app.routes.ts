import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'; // 1. IMPORTE O COMPONENTE
import { authGuard } from './guards/auth.guard'; // 2. IMPORTE O GUARDA
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component'; 

export const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'projetos/:id', component: ProjectDetailsComponent },

  { path: 'login', component: LoginComponent },

  { path: 'registro', component: RegisterComponent },

  { path: 'politica-de-privacidade', component: PrivacyPolicyComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

  { path: 'editar-perfil', component: EditProfileComponent, canActivate: [authGuard] },

  // Rota curinga
  { path: '**', redirectTo: '' }
];