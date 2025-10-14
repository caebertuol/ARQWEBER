import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FeatherModule } from 'angular-feather';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FeatherModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  contactForm: FormGroup;
  isSubmitting = false; // Para controlar o estado do botão de envio

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // Mostra erros de validação se houver
      return;
    }

    this.isSubmitting = true;
    // SUBSTITUA a URL abaixo pela URL que você copiou do Formspree
    const formspreeEndpoint = 'https://formspree.io/f/xeorploq'; 

    this.http.post(formspreeEndpoint, this.contactForm.value, { headers: { 'Accept': 'application/json' } })
      .subscribe({
        next: (response) => {
          this.notificationService.show('Mensagem enviada com sucesso! Obrigado pelo contato.');
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.notificationService.show('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.', 'error');
          this.isSubmitting = false;
        }
      });
  }
}