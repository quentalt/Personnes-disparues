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
    <div class="min-h-screen bg-gray-50 py-16">

      <div class="container mx-auto px-4">

        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Rechercher des personnes disparues</h1>
          <p class="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Utilisez les filtres ci-dessous pour rechercher parmi les personnes signalées comme disparues.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="mb-12">
          <app-search-bar (search)="onSearch($event)"></app-search-bar>
        </div>

        <!-- Results Section -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-12">

          <!-- Results Header -->
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-4 mb-8 gap-2">
            <h2 class="text-2xl font-semibold text-gray-800">
              <span *ngIf="!hasSearched">Toutes les personnes disparues</span>
              <span *ngIf="hasSearched">Résultats de recherche</span>
            </h2>
            <div class="text-gray-500 font-medium">
              {{ (searchResults$ | async)?.length || 0 }}
              {{ ((searchResults$ | async)?.length || 0) === 1 ? 'résultat' : 'résultats' }}
            </div>
          </div>

          <!-- Loading -->
          <div *ngIf="loading$ | async" class="text-center py-16">
            <div class="w-10 h-10 border-4 border-gray-200 border-t-primary-red rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-gray-600">Recherche en cours...</p>
          </div>

          <!-- No Results -->
          <div *ngIf="!(loading$ | async) && hasSearched && (searchResults$ | async)?.length === 0" class="text-center py-16">
            <div class="text-4xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Aucun résultat trouvé</h3>
            <p class="text-gray-600 max-w-md mx-auto leading-relaxed">
              Essayez de modifier vos critères de recherche ou de rechercher avec des termes plus généraux.
            </p>
          </div>

          <!-- Results Grid -->
          <div *ngIf="!(loading$ | async) && (searchResults$ | async)?.length! > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <app-missing-person-card
                *ngFor="let person of searchResults$ | async"
                [person]="person">
            </app-missing-person-card>
          </div>

        </div>

        <!-- Search Tips -->
        <div *ngIf="!hasSearched" class="bg-white rounded-lg shadow-md p-8">
          <h3 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Conseils de recherche</h3>
          <div class="grid gap-6 md:grid-cols-3">
            <div class="text-center p-4">
              <div class="text-2xl mb-3">💡</div>
              <h4 class="text-lg font-semibold text-gray-800 mb-1">Soyez spécifique</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                Utilisez le nom complet ou des caractéristiques distinctives pour des résultats plus précis.
              </p>
            </div>
            <div class="text-center p-4">
              <div class="text-2xl mb-3">📍</div>
              <h4 class="text-lg font-semibold text-gray-800 mb-1">Recherche par lieu</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                Recherchez par ville, département ou région où la personne a été vue pour la dernière fois.
              </p>
            </div>
            <div class="text-center p-4">
              <div class="text-2xl mb-3">🔄</div>
              <h4 class="text-lg font-semibold text-gray-800 mb-1">Utilisez les filtres</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                Combinez plusieurs critères comme l'âge et le lieu pour affiner votre recherche.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
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
      this.searchResults$ = this.missingPersonService.getAllMissingPersons();
    } else {
      this.searchResults$ = this.missingPersonService.searchMissingPersons(filters);
    }
  }
}
