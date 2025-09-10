import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <nav class="nav">
        <div class="container">
          <div class="nav-content">
            <a routerLink="/" class="logo">
              <img src="https://plus.unsplash.com/premium_photo-1687157829884-fae305709c06?w=120&h=60&auto=format&fit=crop&q=80&crop=center" alt="Logo" class="logo-icon">
            </a>

            <div class="nav-links desktop-only">
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Accueil</a>
              <a routerLink="/search" routerLinkActive="active">Recherche</a>
              <a *ngIf="isAdmin" routerLink="/admin" routerLinkActive="active">Admin</a>
              <a routerLink="/about" routerLinkActive="active">À propos</a>
            </div>

            <div class="nav-actions">
              <a *ngIf="!currentUser" routerLink="/login" class="btn btn-secondary btn-sm desktop-only">
                Connexion
              </a>
              <a *ngIf="!currentUser" routerLink="/register" class="btn btn-primary btn-sm desktop-only">
                Inscription
              </a>
              <a *ngIf="currentUser" routerLink="/report" class="btn btn-primary btn-sm desktop-only">
                Signaler une disparition
              </a>

              <div *ngIf="currentUser" class="user-menu desktop-only">
                <div class="user-info">
                  <span class="user-name">{{ currentUser.firstName }}</span>
                  <span class="user-role" [class.admin]="currentUser.role === 'admin'">
                    {{ currentUser.role === 'admin' ? 'Admin' : 'Utilisateur' }}
                  </span>
                </div>
                <button class="logout-btn" (click)="logout()">
                  Déconnexion
                </button>
              </div>

              <button class="mobile-menu-btn mobile-only" (click)="toggleMobileMenu()">
                <span class="hamburger" [class.active]="mobileMenuOpen"></span>
                <span class="hamburger" [class.active]="mobileMenuOpen"></span>
                <span class="hamburger" [class.active]="mobileMenuOpen"></span>
              </button>
            </div>
          </div>

          <!-- Mobile Menu -->
          <div class="mobile-menu mobile-only" [class.open]="mobileMenuOpen">
            <div class="mobile-nav-links">
              <a routerLink="/" (click)="closeMobileMenu()">Accueil</a>
              <a routerLink="/search" (click)="closeMobileMenu()">Recherche</a>
              <a routerLink="/about" (click)="closeMobileMenu()">À propos</a>
              <a routerLink="/resources" (click)="closeMobileMenu()">Ressources</a>
              <a *ngIf="isAdmin" routerLink="/admin" (click)="closeMobileMenu()">Admin</a>
              <a *ngIf="currentUser" routerLink="/report" (click)="closeMobileMenu()" class="mobile-report-btn">
                Signaler une disparition
              </a>
              <div class="mobile-auth" *ngIf="!currentUser">
                <a routerLink="/login" (click)="closeMobileMenu()">Connexion</a>
                <a routerLink="/register" (click)="closeMobileMenu()">Inscription</a>
              </div>
              <div class="mobile-user" *ngIf="currentUser">
                <div class="mobile-user-info">
                  <span class="mobile-user-name">{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
                  <span class="mobile-user-role" [class.admin]="currentUser.role === 'admin'">
                    {{ currentUser.role === 'admin' ? 'Admin' : 'Utilisateur' }}
                  </span>
                </div>
                <button (click)="logout(); closeMobileMenu()">Déconnexion</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--white);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      text-decoration: none;
      font-weight: 700;
      font-size: 20px;
      color: var(--primary-red);
    }

    .logo-icon {
      font-size: 24px;
    }

    .nav-links {
      display: flex;
      gap: var(--spacing-12);
    }

    .nav-links a {
      text-decoration: none;
      color: var(--gray-600);
      font-weight: 500;
      transition: color 0.2s ease;
      position: relative;
      padding: var(--spacing-2) var(--spacing-3);
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: var(--primary-red);
    }

    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--primary-red);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
    }

    .btn-sm {
      padding: var(--spacing-2) var(--spacing-4);
      font-size: 14px;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .user-name {
      font-weight: 600;
      color: var(--gray-800);
      font-size: 14px;
    }

    .user-role {
      font-size: 12px;
      color: var(--gray-500);
      text-transform: uppercase;
    }

    .user-role.admin {
      color: var(--primary-red);
      font-weight: 600;
    }

    .logout-btn {
      background: none;
      border: 1px solid var(--gray-300);
      color: var(--gray-600);
      padding: var(--spacing-2) var(--spacing-3);
      border-radius: var(--radius-md);
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .logout-btn:hover {
      border-color: var(--primary-red);
      color: var(--primary-red);
    }
    .mobile-menu-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      background: none;
      border: none;
      padding: var(--spacing-3);
      cursor: pointer;
      width: 40px;
      height: 40px;
    }

    .hamburger {
      width: 24px;
      height: 2px;
      background-color: var(--gray-600);
      transition: all 0.3s ease;
      transform-origin: center;
    }

    .hamburger.active:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }

    .mobile-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--white);
      box-shadow: var(--shadow-lg);
      border-top: 1px solid var(--gray-200);
      z-index: 1000;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .mobile-menu.open {
      display: block;
      max-height: 500px;
    }

    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      padding: var(--spacing-4);
    }

    .mobile-nav-links a {
      text-decoration: none;
      color: var(--gray-600);
      font-weight: 500;
      padding: var(--spacing-4);
      border-radius: var(--radius-md);
      transition: all 0.2s ease;
    }

    .mobile-nav-links a:hover {
      background-color: var(--gray-50);
      color: var(--primary-red);
    }

    .mobile-report-btn {
      background-color: var(--primary-red) !important;
      color: var(--white) !important;
      font-weight: 600 !important;
      margin: var(--spacing-2) 0;
    }

    .mobile-auth {
      display: flex;
      flex-direction: column;
      padding-top: var(--spacing-4);
      margin-top: var(--spacing-4);
      border-top: 1px solid var(--gray-200);
    }

    .mobile-user {
      padding-top: var(--spacing-4);
      margin-top: var(--spacing-4);
      border-top: 1px solid var(--gray-200);
    }

    .mobile-user-info {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--spacing-3);
    }

    .mobile-user-name {
      font-weight: 600;
      color: var(--gray-800);
    }

    .mobile-user-role {
      font-size: 12px;
      color: var(--gray-500);
      text-transform: uppercase;
    }

    .mobile-user-role.admin {
      color: var(--primary-red);
      font-weight: 600;
    }

    .mobile-user button {
      background: none;
      border: 1px solid var(--primary-red);
      color: var(--primary-red);
      font-weight: 500;
      cursor: pointer;
      padding: var(--spacing-2) var(--spacing-4);
      border-radius: var(--radius-md);
      width: 100%;
      transition: all 0.2s ease;
    }

    .mobile-user button:hover {
      background-color: var(--primary-red);
      color: var(--white);
    }

    .desktop-only {
      display: block;
    }

    .mobile-only {
      display: none;
    }

    @media (max-width: 768px) {
      .desktop-only {
        display: none;
      }

      .mobile-only {
        display: flex;
      }

      .nav-content {
        position: relative;
      }

      .container {
        position: relative;
      }
    }
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