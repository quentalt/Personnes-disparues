import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-header">
          <a routerLink="/" class="logo">
            <img src="/src/assets/Logo.png" alt="Logo" class="logo-icon">
          </a>
          <h1 class="auth-title">Connexion</h1>
          <p class="auth-subtitle">
            Connectez-vous pour signaler une disparition ou accéder à votre compte
          </p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
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
              <span *ngIf="loginForm.get('email')?.hasError('required')">L'email est requis</span>
              <span *ngIf="loginForm.get('email')?.hasError('email')">Format d'email invalide</span>
            </div>
          </div>

          <div class="form-group">
            <label class="label" for="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                class="input"
                placeholder="Votre mot de passe"
                formControlName="password"
                [class.error]="isFieldInvalid('password')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('password')">
              Le mot de passe est requis
            </div>
          </div>

          <div class="error-message" *ngIf="loginError">
            {{ loginError }}
          </div>

          <button
              type="submit"
              class="btn btn-primary btn-full"
              [disabled]="loginForm.invalid || isLoading"
          >
            <span *ngIf="isLoading">Connexion en cours...</span>
            <span *ngIf="!isLoading">Se connecter</span>
          </button>
        </form>

        <div class="auth-footer">
          <p>
            Pas encore de compte ?
            <a routerLink="/register" class="auth-link">Créer un compte</a>
          </p>
        </div>

        <div class="demo-accounts">
          <h3>Comptes de démonstration</h3>
          <div class="demo-buttons">
            <button class="btn btn-secondary btn-sm" (click)="loginAsAdmin()">
              Connexion Admin
            </button>
            <button class="btn btn-secondary btn-sm" (click)="loginAsUser()">
              Connexion Utilisateur
            </button>
          </div>
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
      max-width: 400px;
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
      font-size: 28px;
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

    .form-group {
      margin-bottom: var(--spacing-6);
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

    .demo-accounts {
      margin-top: var(--spacing-6);
      padding-top: var(--spacing-6);
      border-top: 1px solid var(--gray-200);
      text-align: center;
    }

    .demo-accounts h3 {
      font-size: 14px;
      color: var(--gray-600);
      margin-bottom: var(--spacing-4);
    }

    .demo-buttons {
      display: flex;
      gap: var(--spacing-3);
    }

    .btn-sm {
      padding: var(--spacing-2) var(--spacing-3);
      font-size: 12px;
      flex: 1;
    }

    @media (max-width: 480px) {
      .auth-container {
        padding: var(--spacing-6);
      }

      .demo-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading = false;
          this.loginError = error.message || 'Une erreur est survenue';
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  loginAsAdmin() {
    this.loginForm.patchValue({
      email: 'admin@example.com',
      password: 'admin123'
    });
    this.onSubmit();
  }

  loginAsUser() {
    this.loginForm.patchValue({
      email: 'user@example.com',
      password: 'user123'
    });
    this.onSubmit();
  }
}