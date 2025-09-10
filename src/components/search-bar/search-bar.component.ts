import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilters } from '../../models/missing-person.model';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {matFilterAlt} from "@ng-icons/material-icons/baseline";
import {heroMagnifyingGlass} from "@ng-icons/heroicons/outline";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  viewProviders: [provideIcons({
    matFilterAlt, heroMagnifyingGlass
  })],
  template: `
    <div class="search-bar">
      <div class="search-input-group">
        <div class="search-icon">
          <ng-icon name="heroMagnifyingGlass" size="24" />
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
        <ng-icon name="matFilterAlt"/>
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
      display: flex;
      align-items: center;
      flex-shrink: 0;
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
      flex-shrink: 0;
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
        /* Garde la structure flex pour maintenir la loupe à côté du texte */
        flex-wrap: wrap;
      }

      .search-icon {
        /* Réduit légèrement la taille de l'icône sur mobile */
        padding: 0 var(--spacing-3);
      }

      .search-icon ng-icon {
        width: 20px !important;
        height: 20px !important;
      }

      .search-input {
        padding: var(--spacing-3) var(--spacing-2);
        font-size: 14px;
        min-width: 0; /* Permet au texte de se comprimer si nécessaire */
      }

      .search-input::placeholder {
        /* Raccourcit le placeholder sur mobile pour éviter la troncature */
        content: "Rechercher par nom, ville...";
      }

      .search-button {
        width: 100%;
        margin: var(--spacing-2) 0 0 0;
        order: 3; /* Place le bouton en dernier */
        flex-basis: 100%; /* Prend toute la largeur */
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

    /* Breakpoint plus petit pour les très petits écrans */
    @media (max-width: 480px) {
      .search-input::placeholder {
        font-size: 13px;
      }

      .search-icon {
        padding: 0 var(--spacing-2);
      }

      .search-icon ng-icon {
        width: 18px !important;
        height: 18px !important;
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