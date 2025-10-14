import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { FeatherModule } from 'angular-feather';

// Validador customizado para garantir que as senhas coincidem
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('newPassword')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  // Se as senhas não estiverem vazias e forem diferentes, retorna um erro
  return password && confirmPassword && password !== confirmPassword ? { 'passwordMismatch': true } : null;
}

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FeatherModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  editProfileForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }], // O e-mail não pode ser editado
      newPassword: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: passwordMatchValidator }); // Aplica o validador de senha ao formulário inteiro
  }

  ngOnInit() {
    // Preenche o formulário com os dados do usuário logado
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.editProfileForm.patchValue({
        name: currentUser.name,
        email: currentUser.email
      });
    }
  }

  onSubmit(): void {
    if (this.editProfileForm.invalid) {
      this.editProfileForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { name, newPassword } = this.editProfileForm.value;

    // Chama o método de atualização do serviço
    const success = this.authService.updateUser(name, newPassword || undefined);

    if (success) {
      this.notificationService.show('Perfil atualizado com sucesso!');
      this.router.navigate(['/dashboard']);
    } else {
      this.notificationService.show('Ocorreu um erro ao atualizar o perfil.', 'error');
    }

    this.isSubmitting = false;
  }
}