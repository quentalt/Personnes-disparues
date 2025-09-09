import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilters } from '../../models/missing-person.model';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-bar">
      <div class="search-input-group">
        <div class="search-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <input
          type="text"
          class="search-input"
          placeholder="Rechercher par nom, ville ou région..."
          [(ngModel)]="searchQuery"
          (keyup.enter)="onSearch()"
        />
        <button class="search-button" (click)="onSearch()">
          Rechercher
        </button>
      </div>
      
      <div class="advanced-filters" *ngIf="showAdvanced">
        <div class="filter-row">
          <div class="filter-group">
            <label class="label">Lieu de disparition</label>
            <input
              type="text"
              class="input"
              placeholder="Ville, région..."
              [(ngModel)]="locationFilter"
            />
          </div>
          
          <div class="filter-group">
            <label class="label">Âge (min - max)</label>
            <div class="age-range">
              <input
                type="number"
                class="input age-input"
                placeholder="Min"
                [(ngModel)]="minAge"
                min="0"
                max="150"
              />
              <span>-</span>
              <input
                type="number"
                class="input age-input"
                placeholder="Max"
                [(ngModel)]="maxAge"
                min="0"
                max="150"
              />
            </div>
          </div>
        </div>
        
        <div class="filter-row">
          <div class="filter-group">
            <label class="label">Statut</label>
            <select class="input" [(ngModel)]="statusFilter">
              <option value="">Tous les statuts</option>
              <option value="active">Recherché</option>
              <option value="found">Retrouvé</option>
              <option value="closed">Fermé</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="label">Période de disparition</label>
            <div class="date-range">
              <input
                type="date"
                class="input date-input"
                [(ngModel)]="startDate"
              />
              <span>à</span>
              <input
                type="date"
                class="input date-input"
                [(ngModel)]="endDate"
              />
            </div>
          </div>
        </div>
        
        <div class="filter-actions">
          <button class="btn btn-secondary btn-sm" (click)="clearFilters()">
            Effacer les filtres
          </button>
          <button class="btn btn-primary btn-sm" (click)="onSearch()">
            Appliquer les filtres
          </button>
        </div>
      </div>
      
      <button class="advanced-toggle" (click)="toggleAdvanced()">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7h10M6 3v8M10 5v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        {{ showAdvanced ? 'Masquer' : 'Filtres avancés' }}
      </button>
    </div>
  `,
  styles: [`
    .search-bar {
      background-color: var(--white);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
      padding: var(--spacing-4);
      margin-bottom: var(--spacing-6);
    }

    .search-input-group {
      display: flex;
      align-items: center;
      background-color: var(--gray-50);
      border-radius: var(--radius-lg);
      border: 1px solid var(--gray-200);
      transition: all 0.2s ease;
    }

    .search-input-group:focus-within {
      border-color: var(--primary-red);
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }

    .search-icon {
      padding: 0 var(--spacing-4);
      color: var(--gray-400);
    }

    .search-input {
      flex: 1;
      padding: var(--spacing-4) var(--spacing-2);
      border: none;
      background: transparent;
      font-size: 16px;
      outline: none;
    }

    .search-input::placeholder {
      color: var(--gray-400);
    }

    .search-button {
      background-color: var(--primary-red);
      color: var(--white);
      border: none;
      padding: var(--spacing-4) var(--spacing-6);
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      margin: var(--spacing-1);
    }

    .search-button:hover {
      background-color: var(--primary-red-hover);
      transform: translateY(-1px);
    }

    .advanced-filters {
      margin-top: var(--spacing-4);
      padding-top: var(--spacing-4);
      border-top: 1px solid var(--gray-200);
    }

    .filter-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-4);
      margin-bottom: var(--spacing-4);
    }

    .filter-row:last-of-type {
      margin-bottom: 0;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .age-range,
    .date-range {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    .age-input,
    .date-input {
      flex: 1;
    }

    .filter-actions {
      display: flex;
      gap: var(--spacing-3);
      justify-content: flex-end;
      margin-top: var(--spacing-4);
      padding-top: var(--spacing-4);
      border-top: 1px solid var(--gray-200);
    }

    .btn-sm {
      padding: var(--spacing-2) var(--spacing-4);
      font-size: 14px;
    }
    .advanced-toggle {
      background: none;
      border: none;
      color: var(--primary-red);
      font-weight: 500;
      cursor: pointer;
      margin-top: var(--spacing-4);
      padding: var(--spacing-2) 0;
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    .advanced-toggle:hover {
      color: var(--primary-red-hover);
    }

    @media (max-width: 768px) {
      .search-input-group {
        flex-direction: column;
        gap: var(--spacing-2);
      }

      .search-input {
        padding: var(--spacing-3) var(--spacing-4);
      }

      .search-button {
        width: 100%;
        margin: 0;
      }

      .filter-row {
        grid-template-columns: 1fr;
      }

      .filter-actions {
        flex-direction: column;
      }

      .filter-actions .btn {
        width: 100%;
      }
    }
  `]
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<SearchFilters>();
  
  searchQuery = '';
  locationFilter = '';
  minAge: number | null = null;
  maxAge: number | null = null;
  statusFilter = '';
  startDate = '';
  endDate = '';
  showAdvanced = false;

  onSearch() {
    const filters: SearchFilters = {
      query: this.searchQuery || undefined,
      location: this.locationFilter || undefined,
      ageRange: (this.minAge !== null && this.maxAge !== null) 
        ? { min: this.minAge, max: this.maxAge }
        : undefined,
      dateRange: (this.startDate && this.endDate)
        ? { start: this.startDate, end: this.endDate }
        : undefined,
      status: this.statusFilter || undefined
    };

    this.search.emit(filters);
  }

  toggleAdvanced() {
    this.showAdvanced = !this.showAdvanced;
  }

  clearFilters() {
    this.searchQuery = '';
    this.locationFilter = '';
    this.minAge = null;
    this.maxAge = null;
    this.statusFilter = '';
    this.startDate = '';
    this.endDate = '';
    this.onSearch();
  }
}