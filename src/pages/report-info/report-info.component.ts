import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-report-info',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    template: `
    <div class="report-info-page">
      <div class="container">
        <div class="report-info-header">
          <button class="back-btn" (click)="goBack()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 5l-5 5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Retour
          </button>
          
          <h1 class="page-title">Signaler des informations</h1>
          <p class="page-subtitle">
            Vous avez des informations sur cette personne disparue ? 
            Partagez-les avec nous pour aider dans les recherches.
          </p>
        </div>

        <form [formGroup]="infoForm" (ngSubmit)="onSubmit()" class="info-form">
          <div class="form-section">
            <h2 class="section-title">Vos informations</h2>
            
            <div class="form-row">
              <div class="form-group">
                <label class="label" for="reporterName">
                  Votre nom *
                </label>
                <input
                  type="text"
                  id="reporterName"
                  class="input"
                  placeholder="Entrer votre nom"
                  formControlName="reporterName"
                  [class.error]="isFieldInvalid('reporterName')"
                />
                <div class="error-message" *ngIf="isFieldInvalid('reporterName')">
                  Votre nom est requis
                </div>
              </div>

              <div class="form-group">
                <label class="label" for="reporterContact">
                  Votre contact *
                </label>
                <input
                  type="text"
                  id="reporterContact"
                  class="input"
                  placeholder="Téléphone ou email"
                  formControlName="reporterContact"
                  [class.error]="isFieldInvalid('reporterContact')"
                />
                <div class="error-message" *ngIf="isFieldInvalid('reporterContact')">
                  Vos informations de contact sont requises
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h2 class="section-title">Informations sur la personne</h2>
            
            <div class="form-group">
              <label class="label" for="lastSeenLocation">
                Où avez-vous vu cette personne pour la dernière fois ? *
              </label>
              <input
                type="text"
                id="lastSeenLocation"
                class="input"
                placeholder="Adresse précise, ville, points de repère..."
                formControlName="lastSeenLocation"
                [class.error]="isFieldInvalid('lastSeenLocation')"
              />
              <div class="error-message" *ngIf="isFieldInvalid('lastSeenLocation')">
                La localisation est requise
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="label" for="lastSeenDate">
                  Date de l'observation *
                </label>
                <input
                  type="date"
                  id="lastSeenDate"
                  class="input"
                  formControlName="lastSeenDate"
                  [class.error]="isFieldInvalid('lastSeenDate')"
                  [max]="today"
                />
                <div class="error-message" *ngIf="isFieldInvalid('lastSeenDate')">
                  La date d'observation est requise
                </div>
              </div>

              <div class="form-group">
                <label class="label" for="lastSeenTime">
                  Heure approximative
                </label>
                <input
                  type="time"
                  id="lastSeenTime"
                  class="input"
                  formControlName="lastSeenTime"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="label" for="additionalInfo">
                Informations supplémentaires *
              </label>
              <textarea
                id="additionalInfo"
                class="input textarea"
                placeholder="Décrivez ce que vous avez vu : comportement, vêtements, personnes accompagnantes, véhicule, etc."
                formControlName="additionalInfo"
                [class.error]="isFieldInvalid('additionalInfo')"
                rows="5"
              ></textarea>
              <div class="error-message" *ngIf="isFieldInvalid('additionalInfo')">
                Des informations supplémentaires sont requises
              </div>
            </div>

            <div class="form-group">
              <label class="label" for="certaintyLevel">
                Niveau de certitude *
              </label>
              <select 
                id="certaintyLevel" 
                class="input" 
                formControlName="certaintyLevel"
                [class.error]="isFieldInvalid('certaintyLevel')"
              >
                <option value="">Sélectionner...</option>
                <option value="certain">Certain - Je suis sûr(e) que c'était cette personne</option>
                <option value="probable">Probable - Je pense que c'était cette personne</option>
                <option value="possible">Possible - Cela pourrait être cette personne</option>
              </select>
              <div class="error-message" *ngIf="isFieldInvalid('certaintyLevel')">
                Veuillez indiquer votre niveau de certitude
              </div>
            </div>
          </div>

          <div class="important-note">
            <div class="note-icon">⚠️</div>
            <div class="note-content">
              <h3>Important</h3>
              <p>
                Si vous pensez avoir vu cette personne récemment ou si vous avez des informations urgentes, 
                contactez immédiatement les autorités locales au <strong>17</strong> avant de remplir ce formulaire.
              </p>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="goBack()">
              Annuler
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="infoForm.invalid || isSubmitting"
            >
              <span *ngIf="isSubmitting">Envoi en cours...</span>
              <span *ngIf="!isSubmitting">Envoyer les informations</span>
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div class="success-message" *ngIf="submitSuccess">
          <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Informations envoyées avec succès!</h3>
            <p>Merci pour votre aide. Vos informations ont été transmises aux personnes concernées.</p>
            <button class="btn btn-primary" (click)="goBack()">
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .report-info-page {
      min-height: 100vh;
      background-color: var(--gray-50);
      padding: var(--spacing-8) 0;
    }

    .report-info-header {
      margin-bottom: var(--spacing-8);
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      background: none;
      border: none;
      color: var(--gray-600);
      font-weight: 500;
      cursor: pointer;
      transition: color 0.2s ease;
      margin-bottom: var(--spacing-6);
    }

    .back-btn:hover {
      color: var(--primary-red);
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
      line-height: 1.6;
    }

    .info-form {
      background-color: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-8);
      max-width: 800px;
      margin: 0 auto;
    }

    .form-section {
      margin-bottom: var(--spacing-10);
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-800);
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

    .important-note {
      display: flex;
      gap: var(--spacing-4);
      background-color: var(--warning);
      background-color: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: var(--radius-md);
      padding: var(--spacing-6);
      margin-bottom: var(--spacing-8);
    }

    .note-icon {
      font-size: 24px;
      flex-shrink: 0;
    }

    .note-content h3 {
      color: #92400e;
      margin-bottom: var(--spacing-2);
    }

    .note-content p {
      color: #92400e;
      line-height: 1.6;
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
      .report-info-page {
        padding: var(--spacing-4) 0;
      }

      .page-title {
        font-size: 2rem;
      }

      .info-form {
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

      .important-note {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class ReportInfoComponent {
    infoForm: FormGroup;
    isSubmitting = false;
    submitSuccess = false;
    today: string;

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.today = new Date().toISOString().split('T')[0];

        this.infoForm = this.fb.group({
            reporterName: ['', Validators.required],
            reporterContact: ['', Validators.required],
            lastSeenLocation: ['', Validators.required],
            lastSeenDate: ['', Validators.required],
            lastSeenTime: [''],
            additionalInfo: ['', Validators.required],
            certaintyLevel: ['', Validators.required]
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.infoForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    onSubmit() {
        if (this.infoForm.valid) {
            this.isSubmitting = true;

            // Simulate API call
            setTimeout(() => {
                this.isSubmitting = false;
                this.submitSuccess = true;

                // Auto-redirect after 3 seconds
                setTimeout(() => {
                    this.goBack();
                }, 3000);
            }, 1000);
        } else {
            Object.keys(this.infoForm.controls).forEach(key => {
                this.infoForm.get(key)?.markAsTouched();
            });
        }
    }

    goBack() {
        this.router.navigate(['/search']);
    }
}