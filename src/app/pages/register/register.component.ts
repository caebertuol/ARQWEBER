// src/app/pages/register/register.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // ADICIONE ESTA LINHA:
      lgpdConsent: [false, Validators.requiredTrue] // Começa desmarcado e é obrigatório marcar (true)
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // A lógica de submit não precisa mudar, pois a validação já barra o processo se for inválido
    const { name, email, password } = this.registerForm.value;
    const success = this.authService.register(name, email, password);

    if (success) {
      this.router.navigate(['/login']);
    }
  }
}