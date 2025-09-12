import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div class="container text-center">
          <h1 class="text-4xl text-[var(--primary-red)]  md:text-5xl font-bold mb-6">À propos de Recherchez-les</h1>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="py-20 bg-white">
        <div class="container">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-3xl font-bold text-gray-800 mb-6">Notre Mission</h2>
              <p class="text-lg text-gray-600 leading-relaxed">
                Chaque année, des milliers de personnes disparaissent. Derrière chaque disparition,
                il y a une famille qui souffre, des proches qui cherchent des réponses.
                TrouverEux existe pour leur donner de l'espoir et des outils concrets.
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
              <div class="text-center p-6">
                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ng-icon name="heroUserGroup" size="32" class="text-primary-600"></ng-icon>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-3">Communauté</h3>
                <p class="text-gray-600">
                  Mobiliser une communauté solidaire pour multiplier les chances de retrouver les personnes disparues.
                </p>
              </div>

              <div class="text-center p-6">
                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ng-icon name="heroMagnifyingGlass" size="32" class="text-primary-600"></ng-icon>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-3">Recherche</h3>
                <p class="text-gray-600">
                  Faciliter la recherche grâce à des outils modernes et une base de données centralisée.
                </p>
              </div>

              <div class="text-center p-6">
                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ng-icon name="heroHome" size="32" class="text-primary-600"></ng-icon>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-3">Espoir</h3>
                <p class="text-gray-600">
                  Redonner de l'espoir aux familles en leur offrant une plateforme pour agir concrètement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How it Works -->
      <section class="py-20 bg-gray-50">
        <div class="container">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Comment ça fonctionne</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Un processus simple et efficace pour maximiser les chances de retrouver les personnes disparues.
            </p>
          </div>

          <div class="max-w-5xl mx-auto grid gap-10">
            <!-- Step 1 -->
            <div class="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition">
              <div class="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Signalement</h3>
                <p class="text-gray-600">
                  Les proches signalent la disparition en remplissant un formulaire détaillé avec photo,
                  description et dernière localisation connue.
                </p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition">
              <div class="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Diffusion</h3>
                <p class="text-gray-600">
                  L'information est immédiatement diffusée sur la plateforme et peut être partagée
                  sur les réseaux sociaux pour maximiser la visibilité.
                </p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition">
              <div class="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Mobilisation</h3>
                <p class="text-gray-600">
                  La communauté se mobilise : recherches, partages, témoignages.
                  Chaque action compte pour retrouver la personne disparue.
                </p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition">
              <div class="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                <ng-icon name="heroCheck" size="20"></ng-icon>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Retrouvailles</h3>
                <p class="text-gray-600">
                  Grâce à l'effort collectif, la personne est retrouvée et peut rentrer chez elle.
                  Une famille est réunie, une communauté a fait la différence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Statistics -->
      <section class="py-20 bg-white">
        <div class="container">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Notre Impact</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Des chiffres qui témoignent de l'efficacité de notre approche communautaire.
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div class="bg-gray-50 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
              <div class="text-4xl font-bold text-red-600 mb-2">150+</div>
              <div class="text-gray-700 font-medium">Personnes retrouvées</div>
            </div>
            <div class="bg-gray-50 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
              <div class="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div class="text-gray-700 font-medium">Signalements traités</div>
            </div>
            <div class="bg-gray-50 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
              <div class="text-4xl font-bold text-red-600 mb-2">10k+</div>
              <div class="text-gray-700 font-medium">Membres actifs</div>
            </div>
            <div class="bg-gray-50 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
              <div class="text-4xl font-bold text-red-600 mb-2">85%</div>
              <div class="text-gray-700 font-medium">Taux de succès</div>
            </div>
          </div>
        </div>
      </section>
      <!-- Call to Action -->
      <section class="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white relative">
        <div class="container text-center">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
            Rejoignez notre communauté
          </h2>
          <p class="text-lg mb-10 max-w-2xl mx-auto opacity-95">
            Ensemble, nous pouvons faire la différence. Chaque membre de notre communauté
            contribue à ramener les personnes disparues chez elles.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/register"
               class="inline-flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg shadow-md transition-all">
              <ng-icon name="heroUser" size="20"></ng-icon>
              Créer un compte
            </a>
            <a routerLink="/report"
               class="inline-flex items-center justify-center gap-2 bg-red-800 hover:bg-red-900 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all">
              <ng-icon name="heroPlus" size="20"></ng-icon>
              Signaler une disparition
            </a>
          </div>
        </div>
      </section>
      <!-- Contact -->
      <section class="py-16 bg-gray-800 text-white">
        <div class="container">
          <div class="max-w-2xl mx-auto text-center">
            <h3 class="text-2xl font-bold mb-6">Besoin d'aide ?</h3>
            <p class="text-gray-300 mb-8">
              Notre équipe est là pour vous accompagner dans vos démarches.
              N'hésitez pas à nous contacter pour toute question.
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <div class="flex items-center gap-3">
                <ng-icon name="heroPhone" size="20" class="text-primary-400"></ng-icon>
                <span>0800 123 456 (gratuit)</span>
              </div>
              <div class="flex items-center gap-3">
                <ng-icon name="heroEnvelope" size="20" class="text-primary-400"></ng-icon>
                <span><a href="mailto:quentin.altieri@gmail.com" class="underline hover:text-primary-300"></a></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class AboutComponent {}