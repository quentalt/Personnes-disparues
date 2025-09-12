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
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 md:p-10">
        <!-- Header -->
        <div class="text-center mb-8">
          <a routerLink="/" class="inline-block mb-4">
            <img src="./assets/images/image-6.png" alt="Logo" class="w-16 h-16 object-cover mx-auto rounded-full">
          </a>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Créer un compte</h1>
          <p class="text-gray-500 text-sm md:text-base">
            Rejoignez notre communauté pour aider à retrouver les personnes disparues
          </p>
        </div>

        <!-- Form -->
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                  type="text"
                  id="firstName"
                  placeholder="Votre prénom"
                  formControlName="firstName"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  [class.border-red-500]="isFieldInvalid('firstName')"
              />
              <p *ngIf="isFieldInvalid('firstName')" class="text-red-500 text-xs mt-1">
                Le prénom est requis
              </p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                  type="text"
                  id="lastName"
                  placeholder="Votre nom"
                  formControlName="lastName"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  [class.border-red-500]="isFieldInvalid('lastName')"
              />
              <p *ngIf="isFieldInvalid('lastName')" class="text-red-500 text-xs mt-1">
                Le nom est requis
              </p>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
            <input
                type="email"
                id="email"
                placeholder="votre@email.com"
                formControlName="email"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                [class.border-red-500]="isFieldInvalid('email')"
            />
            <p *ngIf="isFieldInvalid('email')" class="text-red-500 text-xs mt-1">
              <span *ngIf="registerForm.get('email')?.hasError('required')">L'email est requis</span>
              <span *ngIf="registerForm.get('email')?.hasError('email')">Format d'email invalide</span>
            </p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
                type="password"
                id="password"
                placeholder="Choisissez un mot de passe"
                formControlName="password"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                [class.border-red-500]="isFieldInvalid('password')"
            />
            <p *ngIf="isFieldInvalid('password')" class="text-red-500 text-xs mt-1">
              <span *ngIf="registerForm.get('password')?.hasError('required')">Le mot de passe est requis</span>
              <span *ngIf="registerForm.get('password')?.hasError('minlength')">
                Le mot de passe doit contenir au moins 6 caractères
              </span>
            </p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmez votre mot de passe"
                formControlName="confirmPassword"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                [class.border-red-500]="isFieldInvalid('confirmPassword')"
            />
            <p *ngIf="isFieldInvalid('confirmPassword')" class="text-red-500 text-xs mt-1">
              <span *ngIf="registerForm.get('confirmPassword')?.hasError('required')">La confirmation est requise</span>
              <span *ngIf="registerForm.hasError('passwordMismatch')">Les mots de passe ne correspondent pas</span>
            </p>
          </div>

          <div *ngIf="registerError" class="text-red-500 text-sm text-center">
            {{ registerError }}
          </div>

          <button
              type="submit"
              class="w-full bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 text-white font-semibold py-3 rounded-lg shadow-md transition"
              [disabled]="registerForm.invalid || isLoading"
          >
            <span *ngIf="isLoading">Création du compte...</span>
            <span *ngIf="!isLoading">Créer mon compte</span>
          </button>
        </form>

        <div class="text-center mt-6">
          <p class="text-gray-500 text-sm">
            Déjà un compte ?
            <a routerLink="/login" class="text-red-500 hover:underline font-medium">Se connecter</a>
          </p>
        </div>
      </div>
    </div>
  `
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
        next: () => {
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
