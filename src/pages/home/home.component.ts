import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MissingPersonService } from '../../services/missing-person.service';
import { MissingPerson, SearchFilters } from '../../models/missing-person.model';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MissingPersonCardComponent } from '../../components/missing-person-card/missing-person-card.component';
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon, SearchBarComponent, MissingPersonCardComponent],
  template: `
    <div class="min-h-screen">
      <!-- Hero Section -->
      <section class="relative h-screen flex items-center text-white overflow-hidden">
        <div class="absolute inset-0 z-10">
          <img src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt="Community"
               class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-br from-dark-800/80 via-primary-600/60 to-primary-700/80"></div>
        </div>

        <div class="relative z-20 w-full">
          <div class="container">
            <div class="text-center mb-12 animate-fade-in">
              <h1 class="text-4xl text-[var(--primary-red)] md:text-6xl font-extrabold leading-tight mb-6 text-balance">
                Aidez-nous à les ramener chez eux
              </h1>
              <p class="text-lg md:text-xl text-[var(--primary-red)] max-w-2xl mx-auto opacity-95 leading-relaxed">
                Rejoignez notre communauté dans la recherche de personnes disparues.
                Chaque partage, chaque indice, nous rapproche des réponses.
              </p>
            </div>

            <div class="max-w-4xl mx-auto animate-slide-up">
              <app-search-bar (search)="onSearch($event)"></app-search-bar>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Cases Section -->
      <section class="py-20 bg-white">
        <div class="container">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Récemment ajoutés
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Les dernières personnes signalées comme disparues
            </p>
          </div>

          <div class="flex justify-center mb-8" *ngIf="loading$ | async">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" *ngIf="!(loading$ | async)">
            <app-missing-person-card
                *ngFor="let person of recentCases$ | async"
                [person]="person"
                class="animate-bounce-in">
            </app-missing-person-card>
          </div>

          <div class="text-center">
            <a routerLink="/search" class="bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white py-2 px-4 rounded m-1 font-medium transition-colors">
              Voir tous les cas
            </a>
          </div>
        </div>
      </section>
      <section class="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div class="container text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-red-500">
            Une personne est-elle portée disparue?
          </h2>
          <p class="text-lg mb-8 opacity-95 max-w-2xl mx-auto text-red-500">
            Signalez immédiatement une disparition pour mobiliser la communauté
          </p>
          <div class="flex justify-center mt-6">
          <a routerLink="/report" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 w-max">
            <ng-icon name="heroPlus" size="20"></ng-icon>
            Signaler une disparition
          </a>
          </div>
        </div>
      </section>
      <!-- Statistics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white shadow-md rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-gray-800">3</div>
          <div class="text-gray-500 text-sm mt-1">Cas enregistrés</div>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-gray-800">0</div>
          <div class="text-gray-500 text-sm mt-1">Personnes retrouvées</div>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-gray-800">3</div>
          <div class="text-gray-500 text-sm mt-1">Recherches actives</div>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-gray-800">98%</div>
          <div class="text-gray-500 text-sm mt-1">Taux de mobilisation</div>
        </div>
      </div>
    </div>
  `,
  styles: []
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
    console.log('Search filters:', filters);
  }
}