import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MissingPersonService } from '../../services/missing-person.service';
import { AuthService } from '../../services/auth.service';
import { MissingPerson } from '../../models/missing-person.model';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {matLock,matArrowBack} from "@ng-icons/material-icons/baseline";

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon],
  viewProviders: [provideIcons({
    matLock,matArrowBack
  })],
  template: `
    <div class="person-detail-page">
      <div class="container">
        <div class="back-navigation">
          <button class="back-btn" (click)="goBack()">
            <ng-icon name="matArrowBack" size="20" />
            Retour à la recherche
          </button>
        </div>

        <div class="person-detail" *ngIf="person$ | async as person">
          <div class="person-header">
            <div class="person-image-container">
              <img
                  [src]="person.photo || '/api/placeholder/400/400'"
                  [alt]="person.fullName"
                  class="person-image"
                  (error)="onImageError($event)"
              />
              <div class="status-badge" [class]="'status-' + person.status">
                {{ getStatusText(person.status) }}
              </div>
            </div>

            <div class="person-info">
              <h1 class="person-name">{{ person.fullName }}</h1>
              <div class="person-meta">
                <div class="meta-item">
                  <span class="meta-label">Âge au moment de la disparition:</span>
                  <span class="meta-value">{{ person.age }} ans</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Date de disparition:</span>
                  <span class="meta-value">{{ formatDate(person.dateOfDisappearance) }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Dernière localisation connue:</span>
                  <span class="meta-value">{{ person.lastKnownLocation }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Signalé le:</span>
                  <span class="meta-value">{{ formatDate(person.createdAt) }}</span>
                </div>
              </div>

              <div class="action-buttons">
                <a routerLink="/report-info" class="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  J'ai des informations
                </a>
                <button class="btn btn-secondary" (click)="sharePersonInfo(person)">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1M8 1v11M5 8l3 3 3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Partager
                </button>
                <button class="btn btn-secondary" (click)="printPoster(person)">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1v6l3-3M8 7L5 4M1 9v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Imprimer l'affiche
                </button>
              </div>
            </div>
          </div>

          <div class="person-details">
            <div class="detail-section">
              <h2 class="section-title">Description détaillée</h2>
              <p class="description-text">{{ person.description }}</p>
            </div>

            <div class="detail-section">
              <h2 class="section-title">Informations de contact</h2>
              <div class="contact-info" [class.blurred]="!isAuthenticated">
                <div class="contact-item">
                  <span class="contact-label">Personne à contacter:</span>
                  <span class="contact-value">{{ person.contactName }}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">Contact:</span>
                  <span class="contact-value">{{ person.contactInfo }}</span>
                </div>
              </div>
              <div class="login-prompt" *ngIf="!isAuthenticated">
                <div class="login-overlay">
                  <div class="login-message">
                    <ng-icon name="matLock" size="40" class="lock-icon" />
                    <h4>Connexion requise</h4>
                    <p>Connectez-vous pour voir les informations de contact</p>
                    <a routerLink="/login" class="btn btn-primary btn-sm">Se connecter</a>
                  </div>
                </div>
              </div>
              <div class="contact-note">
                <p>
                  <strong>Important:</strong> Si vous avez des informations concernant cette personne,
                  contactez immédiatement les autorités locales ou la personne mentionnée ci-dessus.
                </p>
              </div>
            </div>

            <div class="detail-section">
              <h2 class="section-title">Que faire si vous la voyez?</h2>
              <div class="instructions">
                <div class="instruction-item">
                  <div class="instruction-number">1</div>
                  <div class="instruction-text">
                    <strong>Ne vous approchez pas</strong> - Contactez immédiatement les autorités
                  </div>
                </div>
                <div class="instruction-item">
                  <div class="instruction-number">2</div>
                  <div class="instruction-text">
                    <strong>Notez l'emplacement exact</strong> - Adresse, points de repère
                  </div>
                </div>
                <div class="instruction-item">
                  <div class="instruction-number">3</div>
                  <div class="instruction-text">
                    <strong>Appelez le 17</strong> ou contactez la personne mentionnée
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="loading" *ngIf="!(person$ | async)">
          <div class="spinner"></div>
          <p>Chargement des détails...</p>
        </div>

        <!-- Share Success Message -->
        <div class="share-success" *ngIf="shareSuccess">
          <div class="success-content">
            <div class="success-icon">✓</div>
            <p>Informations copiées dans le presse-papiers!</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .person-detail-page {
      min-height: 100vh;
      background-color: var(--gray-50);
      padding: var(--spacing-8) 0;
    }

    .back-navigation {
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
    }

    .back-btn:hover {
      color: var(--primary-red);
    }

    .person-detail {
      background-color: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      overflow: hidden;
    }

    .person-header {
      display: grid;
      grid-template-columns: 400px 1fr;
      gap: var(--spacing-8);
      padding: var(--spacing-8);
    }

    .person-image-container {
      position: relative;
    }

    .person-image {
      width: 100%;
      height: 500px;
      object-fit: cover;
      border-radius: var(--radius-lg);
    }

    .status-badge {
      position: absolute;
      top: var(--spacing-4);
      right: var(--spacing-4);
      padding: var(--spacing-2) var(--spacing-4);
      border-radius: var(--radius-md);
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-active {
      background-color: var(--primary-red);
      color: var(--white);
    }

    .status-found {
      background-color: var(--success);
      color: var(--white);
    }

    .status-closed {
      background-color: var(--gray-400);
      color: var(--white);
    }

    .person-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .person-name {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--gray-800);
      margin-bottom: var(--spacing-6);
    }

    .person-meta {
      margin-bottom: var(--spacing-8);
    }

    .meta-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-3) 0;
      border-bottom: 1px solid var(--gray-200);
    }

    .meta-item:last-child {
      border-bottom: none;
    }

    .meta-label {
      font-weight: 500;
      color: var(--gray-600);
    }

    .meta-value {
      font-weight: 600;
      color: var(--gray-800);
    }

    .action-buttons {
      display: flex;
      gap: var(--spacing-4);
      flex-wrap: wrap;
    }

    .action-buttons .btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      flex: 1;
      min-width: 150px;
      justify-content: center;
    }

    .person-details {
      padding: 0 var(--spacing-8) var(--spacing-8);
    }

    .detail-section {
      margin-bottom: var(--spacing-8);
      padding-bottom: var(--spacing-8);
      border-bottom: 1px solid var(--gray-200);
    }

    .detail-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-800);
      margin-bottom: var(--spacing-4);
    }

    .description-text {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--gray-700);
    }

    .contact-info {
      margin-bottom: var(--spacing-4);
      position: relative;
    }

    .contact-info.blurred {
      filter: blur(5px);
      pointer-events: none;
    }

    .login-prompt {
      position: relative;
      margin-bottom: var(--spacing-4);
    }

    .login-overlay {
      position: absolute;
      top: -120px;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.95);
      border-radius: var(--radius-md);
      z-index: 10;
    }

    .login-message {
      text-align: center;
      padding: var(--spacing-6);
    }

    .lock-icon {
      color: var(--primary-red) !important;
      margin-bottom: var(--spacing-3);
    }

    .login-message h4 {
      color: var(--gray-800);
      margin-bottom: var(--spacing-2);
    }

    .login-message p {
      color: var(--gray-600);
      margin-bottom: var(--spacing-4);
    }

    .contact-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-3) 0;
      border-bottom: 1px solid var(--gray-200);
    }

    .contact-item:last-child {
      border-bottom: none;
    }

    .contact-label {
      font-weight: 500;
      color: var(--gray-600);
    }

    .contact-value {
      font-weight: 600;
      color: var(--gray-800);
    }

    .contact-note {
      background-color: var(--primary-red-light);
      border: 1px solid var(--primary-red);
      border-radius: var(--radius-md);
      padding: var(--spacing-4);
      margin-top: var(--spacing-6);
    }

    .contact-note p {
      color: var(--primary-red-hover);
      margin: 0;
    }

    .instructions {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .instruction-item {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-4);
    }

    .instruction-number {
      width: 32px;
      height: 32px;
      background-color: var(--primary-red);
      color: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }

    .instruction-text {
      flex: 1;
      line-height: 1.6;
    }

    .loading {
      text-align: center;
      padding: var(--spacing-16) 0;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--gray-200);
      border-top: 3px solid var(--primary-red);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto var(--spacing-4);
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .share-success {
      position: fixed;
      top: var(--spacing-8);
      right: var(--spacing-8);
      background-color: var(--success);
      color: var(--white);
      padding: var(--spacing-4) var(--spacing-6);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    }

    .success-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
    }

    .success-icon {
      width: 20px;
      height: 20px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .person-detail-page {
        padding: var(--spacing-4) 0;
      }

      .person-header {
        grid-template-columns: 1fr;
        gap: var(--spacing-6);
        padding: var(--spacing-6);
      }

      .person-image {
        height: 300px;
      }

      .person-name {
        font-size: 2rem;
      }

      .action-buttons {
        flex-direction: column;
      }

      .action-buttons .btn {
        min-width: auto;
      }

      .person-details {
        padding: 0 var(--spacing-6) var(--spacing-6);
      }

      .meta-item,
      .contact-item {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-1);
      }

      .share-success {
        top: var(--spacing-4);
        right: var(--spacing-4);
        left: var(--spacing-4);
      }

      .login-overlay {
        top: -100px;
      }
    }
  `]
})
export class PersonDetailComponent implements OnInit {
  person$: Observable<MissingPerson | undefined> = of(undefined);
  isAuthenticated = false;
  shareSuccess = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private missingPersonService: MissingPersonService,
      private authService: AuthService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.person$ = this.route.params.pipe(
        switchMap(params => {
          const id = params['id'];
          return this.missingPersonService.getMissingPersonById(id);
        })
    );
  }

  goBack() {
    this.router.navigate(['/search']);
  }

  onImageError(event: any) {
    event.target.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400';
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return 'Non spécifié';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('fr-FR');
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'Recherché',
      'found': 'Retrouvé',
      'closed': 'Fermé'
    };
    return statusMap[status] || status;
  }

  sharePersonInfo(person: MissingPerson) {
    const shareText = `🚨 PERSONNE DISPARUE 🚨

Nom: ${person.fullName}
Âge: ${person.age} ans
Disparu(e) le: ${this.formatDate(person.dateOfDisappearance)}
Dernière localisation: ${person.lastKnownLocation}

Description: ${person.description}

Si vous avez des informations, contactez: ${person.contactName} - ${person.contactInfo}

Partagez pour aider à retrouver cette personne!
#PersonneDisparue #AideRecherche`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        this.showShareSuccess();
      }).catch(() => {
        this.fallbackCopyText(shareText);
      });
    } else {
      this.fallbackCopyText(shareText);
    }
  }

  private fallbackCopyText(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      this.showShareSuccess();
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
    document.body.removeChild(textArea);
  }

  private showShareSuccess() {
    this.shareSuccess = true;
    setTimeout(() => {
      this.shareSuccess = false;
    }, 3000);
  }

  printPoster(person: MissingPerson) {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const posterHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Affiche - ${person.fullName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
            }
            .poster {
              max-width: 600px;
              margin: 0 auto;
              border: 3px solid #dc2626;
              padding: 20px;
              text-align: center;
            }
            .header {
              background-color: #dc2626;
              color: white;
              padding: 15px;
              margin: -20px -20px 20px -20px;
              font-size: 24px;
              font-weight: bold;
            }
            .photo {
              width: 200px;
              height: 200px;
              object-fit: cover;
              border: 2px solid #ccc;
              margin: 20px auto;
              display: block;
            }
            .name {
              font-size: 28px;
              font-weight: bold;
              margin: 20px 0;
              color: #dc2626;
            }
            .details {
              text-align: left;
              margin: 20px 0;
              line-height: 1.6;
            }
            .detail-item {
              margin: 10px 0;
              font-size: 16px;
            }
            .contact {
              background-color: #fef2f2;
              padding: 15px;
              margin: 20px 0;
              border-left: 4px solid #dc2626;
            }
            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #666;
            }
            @media print {
              body { margin: 0; }
              .poster { border: 2px solid #000; }
            }
          </style>
        </head>
        <body>
          <div class="poster">
            <div class="header">PERSONNE DISPARUE</div>
            <img src="${person.photo || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'}" 
                 alt="${person.fullName}" class="photo" />
            <div class="name">${person.fullName}</div>
            <div class="details">
              <div class="detail-item"><strong>Âge au moment de la disparition:</strong> ${person.age} ans</div>
              <div class="detail-item"><strong>Date de disparition:</strong> ${this.formatDate(person.dateOfDisappearance)}</div>
              <div class="detail-item"><strong>Dernière localisation connue:</strong> ${person.lastKnownLocation}</div>
              <div class="detail-item"><strong>Description:</strong> ${person.description}</div>
            </div>
            <div class="contact">
              <strong>Si vous avez des informations:</strong><br>
              Contactez: ${person.contactName}<br>
              ${person.contactInfo}
            </div>
            <div class="footer">
              Merci de partager cette affiche pour aider à retrouver cette personne
            </div>
          </div>
        </body>
        </html>
      `;

      printWindow.document.write(posterHTML);
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  }
}