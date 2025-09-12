import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { SearchFilters } from '../../models/missing-person.model';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  template: `
    <div class="flex flex-col">
      <!-- Barre de recherche principale -->
      <div class="flex items-center bg-gray-50 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-primary-600 transition-all duration-200">
        <div class="pl-4 text-gray-400">
          <ng-icon name="heroMagnifyingGlass" size="20"></ng-icon>
        </div>
        <input
            type="text"
            class="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-base"
            placeholder="Rechercher par nom, ville ou région..."
            [(ngModel)]="searchQuery"
            (keyup.enter)="onSearch()"
        />
        <button class="bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-3 m-1 font-medium transition-colors" (click)="onSearch()">
          Rechercher
        </button>
      </div>

      <!-- Filtres avancés -->
      <div class="mt-4 transition-all duration-300 ease-in-out overflow-hidden" [class.max-h-96]="showAdvanced" [class.max-h-0]="!showAdvanced">
        <div *ngIf="showAdvanced" class="pt-4 border-t border-gray-200">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Lieu de disparition</label>
              <div class="relative">
                <ng-icon name="heroMapPin" size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></ng-icon>
                <input
                    type="text"
                    class="w-full px-10 py-3 border rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-100 focus:border-primary-600"
                    placeholder="Ville, région..."
                    [(ngModel)]="locationFilter"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Âge (min - max)</label>
              <div class="flex items-center gap-2">
                <input
                    type="number"
                    class="flex-1 px-4 py-3 border rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-100 focus:border-primary-600"
                    placeholder="Min"
                    [(ngModel)]="minAge"
                    min="0"
                    max="150"
                />
                <span class="text-gray-400">-</span>
                <input
                    type="number"
                    class="flex-1 px-4 py-3 border rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-100 focus:border-primary-600"
                    placeholder="Max"
                    [(ngModel)]="maxAge"
                    min="0"
                    max="150"
                />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select class="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-primary-100 focus:border-primary-600" [(ngModel)]="statusFilter">
                <option value="">Tous les statuts</option>
                <option value="active">Recherché</option>
                <option value="found">Retrouvé</option>
                <option value="closed">Fermé</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Période de disparition</label>
              <div class="flex items-center gap-2">
                <div class="relative flex-1">
                  <ng-icon name="heroCalendarDays" size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></ng-icon>
                  <input
                      type="date"
                      class="w-full px-10 py-3 border rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-100 focus:border-primary-600"
                      [(ngModel)]="startDate"
                  />
                </div>
                <span class="text-gray-400">à</span>
                <div class="relative flex-1">
                  <ng-icon name="heroCalendarDays" size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></ng-icon>
                  <input
                      type="date"
                      class="w-full px-10 py-3 border rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-100 focus:border-primary-600"
                      [(ngModel)]="endDate"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
            <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-4 py-2 font-medium transition-colors" (click)="clearFilters()">
              Effacer les filtres
            </button>
            <button class="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 font-medium transition-colors" (click)="onSearch()">
              Appliquer les filtres
            </button>
          </div>
        </div>
      </div>

      <!-- Toggle avancé -->
      <button
          class="flex items-center gap-2 font-medium mt-4 transition-colors text-red-600 hover:text-red-700"  (click)="toggleAdvanced()"
          >
        <ng-icon name="heroCog6Tooth" size="16" class="transform" [class.rotate-90]="showAdvanced"></ng-icon>
        {{ showAdvanced ? 'Masquer' : 'Filtres avancés' }}
      </button>
    </div>
  `
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
