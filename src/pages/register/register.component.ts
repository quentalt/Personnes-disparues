import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-header">
          <a routerLink="/" class="logo">
            <img src="https://plus.unsplash.com/premium_photo-1687157829884-fae305709c06?w=120&h=60&auto=format&fit=crop&q=80&crop=center" alt="Logo" class="logo-icon">
          </a>
          <h1 class="auth-title">Créer un compte</h1>
          <p class="auth-subtitle">
            Rejoignez notre communauté pour aider à retrouver les personnes disparues
          </p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-row">
            <div class="form-group">
              <label class="label" for="firstName">Prénom</label>
              <input
                  type="text"
                  id="firstName"
                  class="input"
                  placeholder="Votre prénom"
                  formControlName="firstName"
                  [class.error]="isFieldInvalid('firstName')"
              />
              <div class="error-message" *ngIf="isFieldInvalid('firstName')">
                Le prénom est requis
              </div>
            </div>

            <div class="form-group">
              <label class="label" for="lastName">Nom</label>
              <input
                  type="text"
                  id="lastName"
                  class="input"
                  placeholder="Votre nom"
                  formControlName="lastName"
                  [class.error]="isFieldInvalid('lastName')"
              />
              <div class="error-message" *ngIf="isFieldInvalid('lastName')">
                Le nom est requis
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="label" for="email">Adresse email</label>
            <input
                type="email"
                id="email"
                class="input"
                placeholder="votre@email.com"
                formControlName="email"
                [class.error]="isFieldInvalid('email')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              <span *ngIf="registerForm.get('email')?.hasError('required')">L'email est requis</span>
              <span *ngIf="registerForm.get('email')?.hasError('email')">Format d'email invalide</span>
            </div>
          </div>

          <div class="form-group">
            <label class="label" for="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                class="input"
                placeholder="Choisissez un mot de passe"
                formControlName="password"
                [class.error]="isFieldInvalid('password')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('password')">
              <span *ngIf="registerForm.get('password')?.hasError('required')">Le mot de passe est requis</span>
              <span *ngIf="registerForm.get('password')?.hasError('minlength')">
                Le mot de passe doit contenir au moins 6 caractères
              </span>
            </div>
          </div>

          <div class="form-group">
            <label class="label" for="confirmPassword">Confirmer le mot de passe</label>
            <input
                type="password"
                id="confirmPassword"
                class="input"
                placeholder="Confirmez votre mot de passe"
                formControlName="confirmPassword"
                [class.error]="isFieldInvalid('confirmPassword')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('confirmPassword')">
              <span *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
                La confirmation est requise
              </span>
              <span *ngIf="registerForm.hasError('passwordMismatch')">
                Les mots de passe ne correspondent pas
              </span>
            </div>
          </div>

          <div class="error-message" *ngIf="registerError">
            {{ registerError }}
          </div>

          <button
              type="submit"
              class="btn btn-primary btn-full"
              [disabled]="registerForm.invalid || isLoading"
          >
            <span *ngIf="isLoading">Création du compte...</span>
            <span *ngIf="!isLoading">Créer mon compte</span>
          </button>
        </form>

        <div class="auth-footer">
          <p>
            Déjà un compte ?
            <a routerLink="/login" class="auth-link">Se connecter</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-4);
    }

    .auth-container {
      background-color: var(--white);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      padding: var(--spacing-8);
      width: 100%;
      max-width: 500px;
    }

    .auth-header {
      text-align: center;
      margin-bottom: var(--spacing-8);
    }

    .logo {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      text-decoration: none;
      font-weight: 700;
      font-size: 24px;
      color: var(--primary-red);
      margin-bottom: var(--spacing-6);
    }

    .logo-icon {
      width: 120px;
      height: 60px;
      object-fit: contain;
    }

    .auth-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--gray-800);
      margin-bottom: var(--spacing-2);
    }

    .auth-subtitle {
      color: var(--gray-600);
      line-height: 1.5;
    }

    .auth-form {
      margin-bottom: var(--spacing-6);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-4);
    }

    .form-group {
      margin-bottom: var(--spacing-6);
    }

    .label {
      display: block;
      margin-bottom: var(--spacing-2);
      font-weight: 500;
      color: var(--gray-700);
    }

    .input {
      width: 100%;
      padding: var(--spacing-3);
      border: 1px solid var(--gray-300);
      border-radius: var(--radius-md);
      font-size: 16px;
      transition: border-color 0.2s ease;
    }

    .input:focus {
      outline: none;
      border-color: var(--primary-red);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .input.error {
      border-color: var(--error);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .error-message {
      color: var(--error);
      font-size: 14px;
      margin-top: var(--spacing-1);
    }

    .btn {
      padding: var(--spacing-3) var(--spacing-6);
      border: none;
      border-radius: var(--radius-md);
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background-color: var(--primary-red);
      color: var(--white);
    }

    .btn-primary:hover:not(:disabled) {
      background-color: var(--primary-red-dark, #dc2626);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-full {
      width: 100%;
      justify-content: center;
    }

    .auth-footer {
      text-align: center;
      padding-top: var(--spacing-6);
      border-top: 1px solid var(--gray-200);
    }

    .auth-link {
      color: var(--primary-red);
      text-decoration: none;
      font-weight: 500;
    }

    .auth-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      .auth-container {
        padding: var(--spacing-6);
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: var(--spacing-2);
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  registerError = '';

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched)) ||
        (fieldName === 'confirmPassword' && this.registerForm.hasError('passwordMismatch') && !!field?.touched);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.registerError = '';

      const { confirmPassword, ...userData } = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading = false;
          this.registerError = error.message || 'Une erreur est survenue';
        }
      });
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}