import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MissingPersonService } from '../../services/missing-person.service';
import { User } from '../../models/user.model';
import { MissingPerson } from '../../models/missing-person.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-page">
      <div class="container">
        <div class="admin-header">
          <h1 class="page-title">Panneau d'administration</h1>
          <p class="page-subtitle">
            Gérez les utilisateurs et les signalements de personnes disparues
          </p>
        </div>

        <div class="admin-stats">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <div class="stat-number">{{ (users$ | async)?.length || 0 }}</div>
              <div class="stat-label">Utilisateurs</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔍</div>
            <div class="stat-info">
              <div class="stat-number">{{ (missingPersons$ | async)?.length || 0 }}</div>
              <div class="stat-label">Signalements</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
              <div class="stat-number">{{ getFoundCount() }}</div>
              <div class="stat-label">Retrouvés</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⏳</div>
            <div class="stat-info">
              <div class="stat-number">{{ getActiveCount() }}</div>
              <div class="stat-label">Actifs</div>
            </div>
          </div>
        </div>

        <div class="admin-sections">
          <!-- Users Management -->
          <div class="admin-section">
            <h2 class="section-title">Gestion des utilisateurs</h2>
            <div class="users-table">
              <div class="table-header">
                <div class="table-cell">Utilisateur</div>
                <div class="table-cell">Email</div>
                <div class="table-cell">Rôle</div>
                <div class="table-cell">Statut</div>
                <div class="table-cell">Actions</div>
              </div>
              <div class="table-row" *ngFor="let user of users$ | async">
                <div class="table-cell">
                  <div class="user-info">
                    <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                    <div class="user-date">Inscrit le {{ formatDate(user.createdAt) }}</div>
                  </div>
                </div>
                <div class="table-cell">{{ user.email }}</div>
                <div class="table-cell">
                  <span class="role-badge" [class]="'role-' + user.role">
                    {{ user.role === 'admin' ? 'Admin' : 'Utilisateur' }}
                  </span>
                </div>
                <div class="table-cell">
                  <span class="status-badge" [class]="user.isActive ? 'status-active' : 'status-inactive'">
                    {{ user.isActive ? 'Actif' : 'Inactif' }}
                  </span>
                </div>
                <div class="table-cell">
                  <button 
                    class="btn btn-sm"
                    [class]="user.isActive ? 'btn-secondary' : 'btn-primary'"
                    (click)="toggleUserStatus(user)"
                    [disabled]="user.id === currentUser?.id"
                  >
                    {{ user.isActive ? 'Désactiver' : 'Activer' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Missing Persons Management -->
          <div class="admin-section">
            <h2 class="section-title">Signalements récents</h2>
            <div class="reports-grid">
              <div class="report-card" *ngFor="let person of missingPersons$ | async">
                <div class="report-image">
                  <img 
                    [src]="person.photo || '/api/placeholder/150/150'" 
                    [alt]="person.fullName"
                    (error)="onImageError($event)"
                  />
                  <div class="status-badge" [class]="'status-' + person.status">
                    {{ getStatusText(person.status) }}
                  </div>
                </div>
                <div class="report-info">
                  <h3 class="report-name">{{ person.fullName }}</h3>
                  <div class="report-details">
                    <div class="report-detail">
                      <strong>Âge:</strong> {{ person.age }} ans
                    </div>
                    <div class="report-detail">
                      <strong>Lieu:</strong> {{ person.lastKnownLocation }}
                    </div>
                    <div class="report-detail">
                      <strong>Signalé le:</strong> {{ formatDate(person.createdAt) }}
                    </div>
                  </div>
                  <div class="report-actions">
                    <button class="btn btn-primary btn-sm">
                      Voir détails
                    </button>
                    <button class="btn btn-secondary btn-sm">
                      Modifier statut
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      min-height: 100vh;
      background-color: var(--gray-50);
      padding: var(--spacing-8) 0;
    }

    .admin-header {
      text-align: center;
      margin-bottom: var(--spacing-12);
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
    }

    .admin-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-6);
      margin-bottom: var(--spacing-12);
    }

    .stat-card {
      background-color: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-6);
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
    }

    .stat-icon {
      font-size: 2rem;
      width: 60px;
      height: 60px;
      background-color: var(--primary-red-light);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: var(--gray-800);
    }

    .stat-label {
      color: var(--gray-600);
      font-weight: 500;
    }

    .admin-sections {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-12);
    }

    .admin-section {
      background-color: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-8);
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-800);
      margin-bottom: var(--spacing-6);
    }

    .users-table {
      display: flex;
      flex-direction: column;
    }

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
      gap: var(--spacing-4);
      padding: var(--spacing-4);
      align-items: center;
    }

    .table-header {
      background-color: var(--gray-50);
      border-radius: var(--radius-md);
      font-weight: 600;
      color: var(--gray-700);
    }

    .table-row {
      border-bottom: 1px solid var(--gray-200);
    }

    .table-row:last-child {
      border-bottom: none;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    .user-name {
      font-weight: 500;
      color: var(--gray-800);
    }

    .user-date {
      font-size: 12px;
      color: var(--gray-500);
    }

    .role-badge,
    .status-badge {
      padding: var(--spacing-1) var(--spacing-3);
      border-radius: var(--radius-md);
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .role-admin {
      background-color: var(--primary-red);
      color: var(--white);
    }

    .role-user {
      background-color: var(--gray-200);
      color: var(--gray-700);
    }

    .status-active {
      background-color: var(--success);
      color: var(--white);
    }

    .status-inactive {
      background-color: var(--gray-400);
      color: var(--white);
    }

    .btn-sm {
      padding: var(--spacing-1) var(--spacing-3);
      font-size: 12px;
    }

    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--spacing-6);
    }

    .report-card {
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all 0.2s ease;
    }

    .report-card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }

    .report-image {
      position: relative;
      height: 150px;
      overflow: hidden;
    }

    .report-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .report-image .status-badge {
      position: absolute;
      top: var(--spacing-2);
      right: var(--spacing-2);
    }

    .status-active {
      background-color: var(--primary-red);
      color: var(--white);
    }

    .status-found {
      background-color: var(--success);
      color: var(--white);
    }

    .status-closed {
      background-color: var(--gray-400);
      color: var(--white);
    }

    .report-info {
      padding: var(--spacing-4);
    }

    .report-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-800);
      margin-bottom: var(--spacing-3);
    }

    .report-details {
      margin-bottom: var(--spacing-4);
    }

    .report-detail {
      font-size: 14px;
      color: var(--gray-600);
      margin-bottom: var(--spacing-1);
    }

    .report-detail strong {
      color: var(--gray-800);
    }

    .report-actions {
      display: flex;
      gap: var(--spacing-2);
    }

    .report-actions .btn {
      flex: 1;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .admin-page {
        padding: var(--spacing-4) 0;
      }

      .page-title {
        font-size: 2rem;
      }

      .admin-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-4);
      }

      .admin-section {
        padding: var(--spacing-6);
        margin: 0 var(--spacing-4);
      }

      .table-header,
      .table-row {
        grid-template-columns: 1fr;
        gap: var(--spacing-2);
        text-align: left;
      }

      .table-header {
        display: none;
      }

      .table-row {
        background-color: var(--gray-50);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-4);
        border: none;
      }

      .reports-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminComponent implements OnInit {
  users$: Observable<User[]>;
  missingPersons$: Observable<MissingPerson[]>;
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private missingPersonService: MissingPersonService
  ) {
    this.users$ = this.authService.getAllUsers();
    this.missingPersons$ = this.missingPersonService.getAllMissingPersons();
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {}

  toggleUserStatus(user: User) {
    this.authService.updateUserStatus(user.id!, !user.isActive).subscribe({
      next: (updatedUser) => {
        // Refresh users list
        this.users$ = this.authService.getAllUsers();
      },
      error: (error) => {
        console.error('Error updating user status:', error);
      }
    });
  }

  getFoundCount(): number {
    // This would be calculated from the observable in a real app
    return 1; // Mock value
  }

  getActiveCount(): number {
    // This would be calculated from the observable in a real app
    return 3; // Mock value
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return 'Non spécifié';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('fr-FR');
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'Recherché',
      'found': 'Retrouvé',
      'closed': 'Fermé'
    };
    return statusMap[status] || status;
  }

  onImageError(event: any) {
    event.target.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150';
  }
}