import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MissingPersonService } from '../../services/missing-person.service';
import { MissingPerson, SearchFilters } from '../../models/missing-person.model';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MissingPersonCardComponent } from '../../components/missing-person-card/missing-person-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent, MissingPersonCardComponent],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-background">
          <img src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Community" />
          <div class="hero-overlay"></div>
        </div>
        
        <div class="hero-content">
          <div class="container">
            <div class="hero-text">
              <h1 class="hero-title">Aidez-nous à les ramener chez eux</h1>
              <p class="hero-subtitle">
                Rejoignez notre communauté dans la recherche de personnes disparues. 
                Chaque partage, chaque indice, nous rapproche des réponses.
              </p>
            </div>
            
            <div class="hero-search">
              <app-search-bar (search)="onSearch($event)"></app-search-bar>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Cases Section -->
      <section class="recent-cases">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Récemment ajoutés</h2>
            <p class="section-subtitle">
              Les dernières personnes signalées comme disparues
            </p>
          </div>

          <div class="loading" *ngIf="loading$ | async">
            <div class="spinner"></div>
            <p>Chargement...</p>
          </div>

          <div class="cases-grid" *ngIf="!(loading$ | async)">
            <app-missing-person-card 
              *ngFor="let person of recentCases$ | async" 
              [person]="person">
            </app-missing-person-card>
          </div>

          <div class="section-actions">
            <a routerLink="/search" class="btn btn-secondary">
              Voir tous les cas
            </a>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="cta">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">Une personne est-elle portée disparue?</h2>
            <p class="cta-subtitle">
              Signalez immédiatement une disparition pour mobiliser la communauté
            </p>
            <a routerLink="/report" class="btn btn-primary btn-lg">
              Signaler une disparition
            </a>
          </div>
        </div>
      </section>

      <!-- Statistics -->
      <section class="statistics">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">{{ totalCases }}</div>
              <div class="stat-label">Cas enregistrés</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ foundCases }}</div>
              <div class="stat-label">Personnes retrouvées</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ activeCases }}</div>
              <div class="stat-label">Recherches actives</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">98%</div>
              <div class="stat-label">Taux de mobilisation</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home {
      min-height: 100vh;
    }

    .hero {
      position: relative;
      height: 100vh;
      display: flex;
      align-items: center;
      color: var(--white);
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .hero-background img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        rgba(30, 41, 59, 0.8) 0%, 
        rgba(220, 38, 38, 0.6) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      width: 100%;
    }

    .hero-text {
      text-align: center;
      margin-bottom: var(--spacing-12);
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: var(--spacing-6);
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      line-height: 1.6;
      max-width: 600px;
      margin: 0 auto;
      opacity: 0.95;
    }

    .hero-search {
      max-width: 800px;
      margin: 0 auto;
    }

    .recent-cases {
      padding: var(--spacing-20) 0;
      background-color: var(--white);
    }

    .section-header {
      text-align: center;
      margin-bottom: var(--spacing-12);
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--gray-800);
      margin-bottom: var(--spacing-4);
    }

    .section-subtitle {
      font-size: 1.125rem;
      color: var(--gray-600);
      max-width: 600px;
      margin: 0 auto;
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

    .cases-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: var(--spacing-8);
      margin-bottom: var(--spacing-12);
    }

    .section-actions {
      text-align: center;
    }

    .cta {
      background: linear-gradient(135deg, var(--primary-red) 0%, var(--primary-red-hover) 100%);
      color: var(--white);
      padding: var(--spacing-20) 0;
    }

    .cta-content {
      text-align: center;
    }

    .cta-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: var(--spacing-4);
    }

    .cta-subtitle {
      font-size: 1.125rem;
      margin-bottom: var(--spacing-8);
      opacity: 0.95;
    }

    .btn-lg {
      padding: var(--spacing-5) var(--spacing-10);
      font-size: 1.125rem;
    }

    .statistics {
      background-color: var(--gray-800);
      color: var(--white);
      padding: var(--spacing-16) 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-8);
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 800;
      color: var(--primary-red);
      margin-bottom: var(--spacing-2);
    }

    .stat-label {
      font-size: 1rem;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .hero {
        height: 80vh;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.125rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .cta-title {
        font-size: 2rem;
      }

      .cases-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-6);
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-6);
      }

      .stat-number {
        font-size: 2.5rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  recentCases$: Observable<MissingPerson[]>;
  loading$: Observable<boolean>;
  totalCases = 0;
  foundCases = 0;
  activeCases = 0;

  constructor(private missingPersonService: MissingPersonService) {
    this.recentCases$ = this.missingPersonService.getRecentlyAdded(6);
    this.loading$ = this.missingPersonService.loading$;
  }

  ngOnInit() {
    this.missingPersonService.getAllMissingPersons().subscribe(persons => {
      this.totalCases = persons.length;
      this.foundCases = persons.filter(p => p.status === 'found').length;
      this.activeCases = persons.filter(p => p.status === 'active').length;
    });
  }

  onSearch(filters: SearchFilters) {
    // Pour l'instant, on redirige vers la page de recherche
    // Dans une vraie app, on pourrait passer les filtres en paramètres
    console.log('Search filters:', filters);
  }
}