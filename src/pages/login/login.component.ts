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
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10">
        <!-- Header -->
        <div class="text-center mb-8">
          <a routerLink="/" class="inline-block mb-4">
            <img src="./assets/images/image-6.png" alt="Logo" class="w-16 h-16 object-cover mx-auto rounded-full">
          </a>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Connexion</h1>
          <p class="text-gray-500 text-sm md:text-base">
            Connectez-vous pour signaler une disparition ou accéder à votre compte
          </p>
        </div>

        <!-- Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
            <input
                type="email"
                id="email"
                formControlName="email"
                placeholder="votre@email.com"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                [class.border-red-500]="isFieldInvalid('email')"
            />
            <p *ngIf="isFieldInvalid('email')" class="text-red-500 text-xs mt-1">
              <span *ngIf="loginForm.get('email')?.hasError('required')">L'email est requis</span>
              <span *ngIf="loginForm.get('email')?.hasError('email')">Format d'email invalide</span>
            </p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
                type="password"
                id="password"
                formControlName="password"
                placeholder="Votre mot de passe"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                [class.border-red-500]="isFieldInvalid('password')"
            />
            <p *ngIf="isFieldInvalid('password')" class="text-red-500 text-xs mt-1">
              Le mot de passe est requis
            </p>
          </div>

          <div *ngIf="loginError" class="text-red-500 text-sm text-center">
            {{ loginError }}
          </div>

          <button
              type="submit"
              class="w-full bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 text-white font-semibold py-3 rounded-lg shadow-md transition"
              [disabled]="loginForm.invalid || isLoading"
          >
            <span *ngIf="isLoading">Connexion en cours...</span>
            <span *ngIf="!isLoading">Se connecter</span>
          </button>
        </form>

        <!-- Footer -->
        <div class="text-center mt-6">
          <p class="text-gray-500 text-sm">
            Pas encore de compte ?
            <a routerLink="/register" class="text-red-500 hover:underline font-medium">Créer un compte</a>
          </p>
        </div>

        <!-- Demo Accounts -->
        <div class="mt-8 border-t border-gray-200 pt-6 text-center">
          <h3 class="text-gray-500 text-sm mb-4">Comptes de démonstration</h3>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <button (click)="loginAsAdmin()"
                    class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition">
              Connexion Admin
            </button>
            <button (click)="loginAsUser()"
                    class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition">
              Connexion Utilisateur
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
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
        next: () => {
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
