import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MissingPersonService } from '../../services/missing-person.service';
import { MissingPerson, SearchFilters } from '../../models/missing-person.model';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MissingPersonCardComponent } from '../../components/missing-person-card/missing-person-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, MissingPersonCardComponent],
  template: `
    <div class="search-page">
      <div class="container">
        <div class="search-header">
          <h1 class="page-title">Rechercher des personnes disparues</h1>
          <p class="page-subtitle">
            Utilisez les filtres ci-dessous pour rechercher parmi les personnes signalées comme disparues.
          </p>
        </div>

        <div class="search-section">
          <app-search-bar (search)="onSearch($event)"></app-search-bar>
        </div>

        <div class="results-section">
          <div class="results-header">
            <h2 class="results-title">
              <span *ngIf="!hasSearched">Toutes les personnes disparues</span>
              <span *ngIf="hasSearched">Résultats de recherche</span>
            </h2>
            <div class="results-count">
              {{ (searchResults$ | async)?.length || 0 }} 
              {{ ((searchResults$ | async)?.length || 0) === 1 ? 'résultat' : 'résultats' }}
            </div>
          </div>

          <div class="loading" *ngIf="loading$ | async">
            <div class="spinner"></div>
            <p>Recherche en cours...</p>
          </div>

          <div class="no-results" *ngIf="!(loading$ | async) && hasSearched && (searchResults$ | async)?.length === 0">
            <div class="no-results-icon">🔍</div>
            <h3>Aucun résultat trouvé</h3>
            <p>Essayez de modifier vos critères de recherche ou de rechercher avec des termes plus généraux.</p>
          </div>

          <div class="results-grid" *ngIf="!(loading$ | async) && (searchResults$ | async)?.length! > 0">
            <app-missing-person-card 
              *ngFor="let person of searchResults$ | async" 
              [person]="person">
            </app-missing-person-card>
          </div>
        </div>

        <!-- Search Tips -->
        <div class="search-tips" *ngIf="!hasSearched">
          <h3 class="tips-title">Conseils de recherche</h3>
          <div class="tips-grid">
            <div class="tip-item">
              <div class="tip-icon">💡</div>
              <h4>Soyez spécifique</h4>
              <p>Utilisez le nom complet ou des caractéristiques distinctives pour des résultats plus précis.</p>
            </div>
            <div class="tip-item">
              <div class="tip-icon">📍</div>
              <h4>Recherche par lieu</h4>
              <p>Recherchez par ville, département ou région où la personne a été vue pour la dernière fois.</p>
            </div>
            <div class="tip-item">
              <div class="tip-icon">🔄</div>
              <h4>Utilisez les filtres</h4>
              <p>Combinez plusieurs critères comme l'âge et le lieu pour affiner votre recherche.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-page {
      min-height: 100vh;
      background-color: var(--gray-50);
      padding: var(--spacing-8) 0;
    }

    .search-header {
      text-align: center;
      margin-bottom: var(--spacing-8);
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
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .search-section {
      margin-bottom: var(--spacing-12);
    }

    .results-section {
      background-color: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-8);
      margin-bottom: var(--spacing-12);
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-8);
      padding-bottom: var(--spacing-4);
      border-bottom: 1px solid var(--gray-200);
    }

    .results-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-800);
    }

    .results-count {
      color: var(--gray-500);
      font-weight: 500;
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

    .no-results {
      text-align: center;
      padding: var(--spacing-16) 0;
    }

    .no-results-icon {
      font-size: 4rem;
      margin-bottom: var(--spacing-4);
    }

    .no-results h3 {
      color: var(--gray-800);
      margin-bottom: var(--spacing-4);
    }

    .no-results p {
      color: var(--gray-600);
      max-width: 400px;
      margin: 0 auto;
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--spacing-8);
    }

    .search-tips {
      background-color: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-8);
    }

    .tips-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-800);
      margin-bottom: var(--spacing-6);
      text-align: center;
    }

    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-6);
    }

    .tip-item {
      text-align: center;
      padding: var(--spacing-4);
    }

    .tip-icon {
      font-size: 2rem;
      margin-bottom: var(--spacing-3);
    }

    .tip-item h4 {
      color: var(--gray-800);
      margin-bottom: var(--spacing-2);
    }

    .tip-item p {
      color: var(--gray-600);
      font-size: 14px;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .search-page {
        padding: var(--spacing-4) 0;
      }

      .page-title {
        font-size: 2rem;
      }

      .results-section {
        padding: var(--spacing-6);
        margin: 0 var(--spacing-4) var(--spacing-8);
      }

      .results-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-2);
      }

      .results-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-6);
      }

      .search-tips {
        padding: var(--spacing-6);
        margin: 0 var(--spacing-4);
      }

      .tips-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-4);
      }
    }
  `]
})
export class SearchComponent implements OnInit {
  searchResults$: Observable<MissingPerson[]>;
  loading$: Observable<boolean>;
  hasSearched = false;

  constructor(private missingPersonService: MissingPersonService) {
    this.searchResults$ = this.missingPersonService.getAllMissingPersons();
    this.loading$ = this.missingPersonService.loading$;
  }

  ngOnInit() {
    // Initial load of all missing persons
  }

  onSearch(filters: SearchFilters) {
    this.hasSearched = true;
    
    if (Object.keys(filters).length === 0 || !filters.query?.trim()) {
      // If no filters, show all
      this.searchResults$ = this.missingPersonService.getAllMissingPersons();
    } else {
      // Apply filters
      this.searchResults$ = this.missingPersonService.searchMissingPersons(filters);
    }
  }
}