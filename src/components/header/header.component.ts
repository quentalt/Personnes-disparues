import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import {NgIcon} from "@ng-icons/core";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon],
  template: `
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="container">
        <div class="flex items-center justify-between h-18">
          <a routerLink="/" class="flex items-center">
            <img src="./assets/images/image-6.png"
                 alt="Logo"
                 class="w-15 h-15 object-cover rounded-md" />
          </a>

          <div class="hidden md:flex items-center gap-12">
            <a routerLink="/"
               [routerLinkActiveOptions]="{ exact: true }"
               routerLinkActive="text-red-600 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-red-600 after:rounded"
               class="relative py-2 px-3 text-gray-800 font-medium transition-colors hover:text-red-600 focus:text-red-600">
              Accueil
            </a>

            <a routerLink="/search"
               routerLinkActive="text-red-600 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-red-600 after:rounded"
               class="relative py-2 px-3 text-gray-800 font-medium transition-colors hover:text-red-600 focus:text-red-600">
              Recherche
            </a>

            <a *ngIf="isAdmin"
               routerLink="/admin"
               routerLinkActive="text-red-600 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-red-600 after:rounded"
               class="relative py-2 px-3 text-gray-800 font-medium transition-colors hover:text-red-600 focus:text-red-600">
              Admin
            </a>

            <a routerLink="/about"
               routerLinkActive="text-red-600 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-red-600 after:rounded"
               class="relative py-2 px-3 text-gray-800 font-medium transition-colors hover:text-red-600 focus:text-red-600">
              À propos
            </a>
          </div>



          <div class="flex items-center gap-4">
            <a *ngIf="!currentUser"
               routerLink="/login"
               class="hidden md:inline-flex bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white py-2 px-4 rounded m-1 font-medium transition-colors">
              Connexion
            </a>
            <a *ngIf="!currentUser"
               routerLink="/register"
               class="hidden md:inline-flex bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white py-2 px-4 rounded m-1 font-medium transition-colors">
              Inscription
            </a>
            <a *ngIf="currentUser" routerLink="/report" class="btn btn-primary btn-sm hidden md:inline-flex">
              Signaler une disparition
            </a>

            <div *ngIf="currentUser" class="hidden md:flex items-center gap-4">
              <div class="text-right">
                <div class="text-sm font-semibold text-gray-800">{{ currentUser.firstName }}</div>
                <div class="text-xs text-gray-500 uppercase" [class.text-primary-600]="currentUser.role === 'admin'" [class.font-semibold]="currentUser.role === 'admin'">
                  {{ currentUser.role === 'admin' ? 'Admin' : 'Utilisateur' }}
                </div>
              </div>
              <button (click)="logout()" class="btn btn-secondary btn-sm">
                Déconnexion
              </button>
            </div>

            <button class="md:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors" (click)="toggleMobileMenu()">
              <ng-icon [name]="mobileMenuOpen ? 'heroXMark' : 'heroBars3'" size="24" class="text-gray-600"></ng-icon>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
             [class]="mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'">
          <div class="py-4 space-y-2 border-t border-gray-200">
            <a routerLink="/" (click)="closeMobileMenu()"
               class="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors">
              Accueil
            </a>
            <a routerLink="/search" (click)="closeMobileMenu()"
               class="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors">
              Recherche
            </a>
            <a routerLink="/about" (click)="closeMobileMenu()"
               class="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors">
              À propos
            </a>
            <a *ngIf="isAdmin" routerLink="/admin" (click)="closeMobileMenu()"
               class="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors">
              <ng-icon name="heroCog6Tooth" size="16" class="inline mr-2"></ng-icon>
              Admin
            </a>
            <a *ngIf="currentUser" routerLink="/report" (click)="closeMobileMenu()"
               class="block px-4 py-3 bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-colors font-semibold my-2">
              <ng-icon name="heroPlus" size="16" class="inline mr-2"></ng-icon>
              Signaler une disparition
            </a>

            <div class="pt-4 border-t border-gray-200" *ngIf="!currentUser">
              <a routerLink="/login" (click)="closeMobileMenu()"
                 class="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors">
                Connexion
              </a>
              <a routerLink="/register" (click)="closeMobileMenu()"
                 class="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors">
                Inscription
              </a>
            </div>

            <div class="pt-4 border-t border-gray-200" *ngIf="currentUser">
              <div class="px-4 py-2">
                <div class="font-semibold text-gray-800">{{ currentUser.firstName }} {{ currentUser.lastName }}</div>
                <div class="text-sm text-gray-500 uppercase" [class.text-primary-600]="currentUser.role === 'admin'" [class.font-semibold]="currentUser.role === 'admin'">
                  {{ currentUser.role === 'admin' ? 'Admin' : 'Utilisateur' }}
                </div>
              </div>
              <button (click)="logout(); closeMobileMenu()"
                      class="w-full text-left px-4 py-3 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
  `]
})
export class HeaderComponent {
  mobileMenuOpen = false;
  currentUser: User | null = null;
  isAdmin = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAdmin = this.authService.isAdmin();
    });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.closeMobileMenu();
  }
}