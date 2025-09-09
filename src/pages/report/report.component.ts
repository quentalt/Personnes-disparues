import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MissingPersonService } from '../../services/missing-person.service';
import { MissingPerson } from '../../models/missing-person.model';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="report-page">
      <div class="container">
        <div class="report-header">
          <h1 class="page-title">Signaler une personne disparue</h1>
          <p class="page-subtitle">
            Veuillez fournir autant d'informations que possible. Les champs marqués d'un astérisque (*) 
            sont obligatoires.
          </p>
        </div>

        <form [formGroup]="reportForm" (ngSubmit)="onSubmit()" class="report-form">
          <!-- Missing Person Information -->
          <div class="form-section">
            <h2 class="section-title">Informations sur la personne disparue</h2>
            
            <div class="form-group">
              <label class="label" for="fullName">
                Nom complet de la personne disparue *
              </label>
              <input
                type="text"
                id="fullName"
                class="input"
                placeholder="Entrer le nom complet"
                formControlName="fullName"
                [class.error]="isFieldInvalid('fullName')"
              />
              <div class="error-message" *ngIf="isFieldInvalid('fullName')">
                Le nom complet est requis
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="label" for="age">
                  Âge au moment de la disparition *
                </label>
                <input
                  type="number"
                  id="age"
                  class="input"
                  placeholder="Entrer l'âge"
                  formControlName="age"
                  [class.error]="isFieldInvalid('age')"
                  min="0"
                  max="150"
                />
                <div class="error-message" *ngIf="isFieldInvalid('age')">
                  <span *ngIf="reportForm.get('age')?.hasError('required')">L'âge est requis</span>
                  <span *ngIf="reportForm.get('age')?.hasError('min') || reportForm.get('age')?.hasError('max')">
                    L'âge doit être entre 0 et 150 ans
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label class="label" for="dateOfDisappearance">
                  Date de disparition *
                </label>
                <input
                  type="date"
                  id="dateOfDisappearance"
                  class="input"
                  formControlName="dateOfDisappearance"
                  [class.error]="isFieldInvalid('dateOfDisappearance')"
                  [max]="today"
                />
                <div class="error-message" *ngIf="isFieldInvalid('dateOfDisappearance')">
                  La date de disparition est requise
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="label" for="description">
                Description *
              </label>
              <textarea
                id="description"
                class="input textarea"
                placeholder="Décrire l'apparence, les vêtements et toute caractéristique distinctive (ex: taille, poids, couleur des cheveux/yeux, cicatrices, tatouages)."
                formControlName="description"
                [class.error]="isFieldInvalid('description')"
                rows="5"
              ></textarea>
              <div class="error-message" *ngIf="isFieldInvalid('description')">
                Une description est requise
              </div>
            </div>

            <div class="form-group">
              <label class="label" for="lastKnownLocation">
                Dernière localisation connue *
              </label>
              <input
                type="text"
                id="lastKnownLocation"
                class="input"
                placeholder="Entrer la ville, le département ou une adresse spécifique"
                formControlName="lastKnownLocation"
                [class.error]="isFieldInvalid('lastKnownLocation')"
              />
              <div class="error-message" *ngIf="isFieldInvalid('lastKnownLocation')">
                La dernière localisation connue est requise
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="form-section">
            <h2 class="section-title">Vos informations de contact</h2>
            <p class="section-description">
              Ces informations ne seront utilisées que par les autorités pour vous contacter.
            </p>

            <div class="form-row">
              <div class="form-group">
                <label class="label" for="contactName">
                  Votre nom *
                </label>
                <input
                  type="text"
                  id="contactName"
                  class="input"
                  placeholder="Entrer votre nom"
                  formControlName="contactName"
                  [class.error]="isFieldInvalid('contactName')"
                />
                <div class="error-message" *ngIf="isFieldInvalid('contactName')">
                  Votre nom est requis
                </div>
              </div>

              <div class="form-group">
                <label class="label" for="contactInfo">
                  Votre contact (Téléphone ou Email) *
                </label>
                <input
                  type="text"
                  id="contactInfo"
                  class="input"
                  placeholder="Téléphone ou adresse email"
                  formControlName="contactInfo"
                  [class.error]="isFieldInvalid('contactInfo')"
                />
                <div class="error-message" *ngIf="isFieldInvalid('contactInfo')">
                  Vos informations de contact sont requises
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" routerLink="/">
              Annuler
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="reportForm.invalid || isSubmitting"
            >
              <span *ngIf="isSubmitting">Envoi en cours...</span>
              <span *ngIf="!isSubmitting">Soumettre le signalement</span>
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div class="success-message" *ngIf="submitSuccess">
          <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Signalement envoyé avec succès!</h3>
            <p>Votre signalement a été enregistré et sera examiné par nos équipes.</p>
            <button class="btn btn-primary" routerLink="/">
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .report-page {
      min-height: 100vh;
      background-color: var(--gray-50);
      padding: var(--spacing-8) 0;
    }

    .report-header {
      text-align: center;
      margin-bottom: var(--spacing-12);
    }

    .page-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--gray-800);
      margin-bottom: var(--spacing-4);
    }

    .page-subtitle {
      font-size: 1.125rem;
      color: var(--gray-600);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .report-form {
      background-color: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-8);
      max-width: 800px;
      margin: 0 auto;
    }

    .form-section {
      margin-bottom: var(--spacing-12);
    }

    .form-section:last-of-type {
      margin-bottom: var(--spacing-8);
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-800);
      margin-bottom: var(--spacing-2);
    }

    .section-description {
      color: var(--gray-600);
      margin-bottom: var(--spacing-6);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-6);
    }

    .form-group {
      margin-bottom: var(--spacing-6);
    }

    .textarea {
      min-height: 120px;
      resize: vertical;
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

    .form-actions {
      display: flex;
      gap: var(--spacing-4);
      justify-content: flex-end;
      padding-top: var(--spacing-8);
      border-top: 1px solid var(--gray-200);
    }

    .success-message {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .success-content {
      background-color: var(--white);
      border-radius: var(--radius-lg);
      padding: var(--spacing-8);
      text-align: center;
      max-width: 400px;
      box-shadow: var(--shadow-xl);
    }

    .success-icon {
      width: 60px;
      height: 60px;
      background-color: var(--success);
      color: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      margin: 0 auto var(--spacing-4);
    }

    .success-content h3 {
      color: var(--gray-800);
      margin-bottom: var(--spacing-4);
    }

    .success-content p {
      color: var(--gray-600);
      margin-bottom: var(--spacing-6);
    }

    @media (max-width: 768px) {
      .report-page {
        padding: var(--spacing-4) 0;
      }

      .page-title {
        font-size: 2rem;
      }

      .report-form {
        padding: var(--spacing-6);
        margin: 0 var(--spacing-4);
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: var(--spacing-4);
      }

      .form-actions {
        flex-direction: column;
      }

      .form-actions .btn {
        width: 100%;
      }
    }
  `]
})
export class ReportComponent {
  reportForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  today: string;

  constructor(
    private fb: FormBuilder,
    private missingPersonService: MissingPersonService,
    private router: Router
  ) {
    this.today = new Date().toISOString().split('T')[0];
    
    this.reportForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
      dateOfDisappearance: ['', Validators.required],
      description: ['', Validators.required],
      lastKnownLocation: ['', Validators.required],
      contactName: ['', Validators.required],
      contactInfo: ['', Validators.required]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.reportForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.reportForm.valid) {
      this.isSubmitting = true;
      
      const missingPerson: Omit<MissingPerson, 'id' | 'createdAt' | 'updatedAt'> = {
        ...this.reportForm.value,
        status: 'active'
      };

      this.missingPersonService.addMissingPerson(missingPerson).subscribe({
        next: (result) => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          
          // Auto-redirect after 3 seconds
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error submitting report:', error);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.reportForm.controls).forEach(key => {
        this.reportForm.get(key)?.markAsTouched();
      });
    }
  }
}