import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MissingPerson } from '../../models/missing-person.model';

@Component({
  selector: 'app-missing-person-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="person-card">
      <div class="person-image">
        <img 
          [src]="person.photo || '/api/placeholder/300/300'" 
          [alt]="person.fullName"
          (error)="onImageError($event)"
        />
        <div class="absolute top-3 right-3 px-3 py-1 rounded-md text-[12px] font-semibold uppercase"
             [class]="'status-' + person.status">
          {{ getStatusText(person.status) }}
        </div>
      </div>
      
      <div class="person-info">
        <h3 class="person-name">{{ person.fullName }}</h3>
        <div class="person-details">
          <div class="detail">
            <strong>Âge:</strong> {{ person.age }} ans
          </div>
          <div class="detail">
            <strong>Disparu(e) le:</strong> {{ formatDate(person.dateOfDisappearance) }}
          </div>
          <div class="detail">
            <strong>Lieu:</strong> {{ person.lastKnownLocation }}
          </div>
        </div>
        
        <p class="person-description">{{ truncateDescription(person.description) }}</p>

        <div class="flex justify-center gap-3 mt-auto">
          <a [routerLink]="['/person', person.id]"
             class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded btn-sm text-center w-full">
            Voir le profil
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .person-card {
      background-color: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      overflow: hidden;
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .person-card:hover {
      box-shadow: var(--shadow-xl);
      transform: translateY(-4px);
    }

    .person-image {
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .person-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .person-card:hover .person-image img {
      transform: scale(1.05);
    }

    .status-badge {
      position: absolute;
      top: var(--spacing-3);
      right: var(--spacing-3);
      padding: var(--spacing-1) var(--spacing-3);
      border-radius: var(--radius-md);
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
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

    .person-info {
      padding: var(--spacing-6);
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .person-name {
      font-size: 20px;
      font-weight: 700;
      color: var(--gray-800);
      margin-bottom: var(--spacing-4);
    }

    .person-details {
      margin-bottom: var(--spacing-4);
    }

    .detail {
      font-size: 14px;
      color: var(--gray-600);
      margin-bottom: var(--spacing-2);
    }

    .detail strong {
      color: var(--gray-800);
    }

    .person-description {
      font-size: 14px;
      color: var(--gray-600);
      line-height: 1.6;
      margin-bottom: var(--spacing-6);
      flex: 1;
    }

    .card-actions {
      display: flex;
      gap: var(--spacing-3);
      margin-top: auto;
    }

    .btn-sm {
      padding: var(--spacing-2) var(--spacing-4);
      font-size: 14px;
      flex: 1;
    }

    @media (max-width: 768px) {
      .person-image {
        height: 200px;
      }
      
      .person-info {
        padding: var(--spacing-4);
      }
    }
  `]
})
export class MissingPersonCardComponent {
  @Input() person!: MissingPerson;

  onImageError(event: any) {
    event.target.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }

  truncateDescription(description: string, maxLength: number = 120): string {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'Recherché',
      'found': 'Retrouvé',
      'closed': 'Fermé'
    };
    return statusMap[status] || status;
  }
}