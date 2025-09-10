import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-page">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">À propos de nous</h1>
            <p class="hero-subtitle">
              Nous nous engageons à aider les familles et les proches à retrouver leurs êtres chers disparus
            </p>
          </div>
        </div>
      </div>

      <!-- Mission Section -->
      <div class="section">
        <div class="container">
          <div class="content-grid">
            <div class="text-content">
              <h2 class="section-title">Notre mission</h2>
              <p class="section-text">
                Notre plateforme a été créée dans le but de faciliter la recherche de personnes disparues 
                en centralisant les informations et en permettant à la communauté de participer activement 
                aux recherches.
              </p>
              <p class="section-text">
                Nous croyons que chaque personne mérite d'être retrouvée et que l'union fait la force. 
                C'est pourquoi nous mettons à disposition des outils modernes et efficaces pour maximiser 
                les chances de retrouver les personnes disparues.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Values Section -->
      <div class="section section-gray">
        <div class="container">
          <h2 class="section-title text-center">Nos valeurs</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">👥</div>
              <h3 class="value-title">Communauté</h3>
              <p class="value-text">
                Nous croyons en la force de la communauté pour aider à retrouver les personnes disparues.
              </p>
            </div>
            <div class="value-card">
              <div class="value-icon">🔒</div>
              <h3 class="value-title">Confidentialité</h3>
              <p class="value-text">
                La protection des données personnelles et la confidentialité sont nos priorités absolues.
              </p>
            </div>
            <div class="value-card">
              <div class="value-icon">⚡</div>
              <h3 class="value-title">Rapidité</h3>
              <p class="value-text">
                Chaque minute compte. Nous nous efforçons de diffuser l'information le plus rapidement possible.
              </p>
            </div>
            <div class="value-card">
              <div class="value-icon">💝</div>
              <h3 class="value-title">Empathie</h3>
              <p class="value-text">
                Nous comprenons la détresse des familles et agissons avec compassion et professionnalisme.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- How it works Section -->
      <div class="section">
        <div class="container">
          <h2 class="section-title text-center">Comment ça fonctionne</h2>
          <div class="steps-grid">
            <div class="step">
              <div class="step-number">1</div>
              <h3 class="step-title">Signalement</h3>
              <p class="step-text">
                Créez un signalement détaillé avec photos et informations importantes.
              </p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <h3 class="step-title">Diffusion</h3>
              <p class="step-text">
                L'information est diffusée auprès de notre communauté d'utilisateurs.
              </p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <h3 class="step-title">Recherche</h3>
              <p class="step-text">
                La communauté participe activement à la recherche et partage des informations.
              </p>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <h3 class="step-title">Retrouvailles</h3>
              <p class="step-text">
                Les informations recueillies aident à retrouver la personne disparue.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="section section-gray">
        <div class="container">
          <h2 class="section-title text-center">Nos résultats</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">150+</div>
              <div class="stat-label">Personnes retrouvées</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">2,500+</div>
              <div class="stat-label">Utilisateurs actifs</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">500+</div>
              <div class="stat-label">Signalements traités</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Support disponible</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="section">
        <div class="container">
          <div class="contact-content">
            <h2 class="section-title text-center">Contactez-nous</h2>
            <p class="contact-text">
              Vous avez des questions ou souhaitez en savoir plus sur notre mission ? 
              N'hésitez pas à nous contacter.
            </p>
            <div class="contact-actions">
              <a href="mailto:contact@exemple.com" class="btn btn-primary">
                Nous écrire
              </a>
              <a routerLink="/register" class="btn btn-secondary">
                Rejoindre la communauté
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      min-height: 100vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-4);
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, var(--primary-red) 0%, #dc2626 100%);
      color: var(--white);
      padding: var(--spacing-16) 0 var(--spacing-12);
      text-align: center;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: var(--spacing-4);
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
      opacity: 0.95;
    }

    /* Sections */
    .section {
      padding: var(--spacing-16) 0;
    }

    .section-gray {
      background-color: var(--gray-50);
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--gray-800);
      margin-bottom: var(--spacing-8);
    }

    .text-center {
      text-align: center;
    }

    .section-text {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--gray-600);
      margin-bottom: var(--spacing-6);
    }

    /* Content Grid */
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-12);
      align-items: center;
    }

    .image-placeholder {
      background: linear-gradient(135deg, var(--gray-100) 0%, var(--gray-200) 100%);
      border-radius: var(--radius-xl);
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .placeholder-content {
      color: var(--gray-600);
    }

    .placeholder-icon {
      font-size: 4rem;
      display: block;
      margin-bottom: var(--spacing-4);
    }

    /* Values Grid */
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-8);
      margin-top: var(--spacing-12);
    }

    .value-card {
      background: var(--white);
      padding: var(--spacing-8);
      border-radius: var(--radius-xl);
      text-align: center;
      box-shadow: var(--shadow-lg);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .value-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }

    .value-icon {
      font-size: 3rem;
      margin-bottom: var(--spacing-4);
    }

    .value-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-800);
      margin-bottom: var(--spacing-3);
    }

    .value-text {
      color: var(--gray-600);
      line-height: 1.6;
    }

    /* Steps Grid */
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-8);
      margin-top: var(--spacing-12);
    }

    .step {
      text-align: center;
    }

    .step-number {
      width: 60px;
      height: 60px;
      background: var(--primary-red);
      color: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 auto var(--spacing-4);
    }

    .step-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-800);
      margin-bottom: var(--spacing-3);
    }

    .step-text {
      color: var(--gray-600);
      line-height: 1.6;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-8);
      margin-top: var(--spacing-12);
    }

    .stat-card {
      text-align: center;
      background: var(--white);
      padding: var(--spacing-8);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 800;
      color: var(--primary-red);
      margin-bottom: var(--spacing-2);
    }

    .stat-label {
      color: var(--gray-600);
      font-weight: 500;
    }

    /* Contact Section */
    .contact-content {
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }

    .contact-text {
      font-size: 1.125rem;
      color: var(--gray-600);
      line-height: 1.7;
      margin-bottom: var(--spacing-8);
    }

    .contact-actions {
      display: flex;
      gap: var(--spacing-4);
      justify-content: center;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      padding: var(--spacing-3) var(--spacing-6);
      border-radius: var(--radius-md);
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
    }

    .btn-primary {
      background-color: var(--primary-red);
      color: var(--white);
    }

    .btn-primary:hover {
      background-color: #dc2626;
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
    }

    .btn-secondary {
      background-color: var(--white);
      color: var(--primary-red);
      border: 2px solid var(--primary-red);
    }

    .btn-secondary:hover {
      background-color: var(--primary-red);
      color: var(--white);
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.125rem;
      }

      .section {
        padding: var(--spacing-12) 0;
      }

      .section-title {
        font-size: 2rem;
      }

      .content-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-8);
      }

      .contact-actions {
        flex-direction: column;
        align-items: center;
      }

      .btn {
        width: 100%;
        max-width: 300px;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }

      .section-title {
        font-size: 1.75rem;
      }

      .values-grid,
      .steps-grid,
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {
  constructor() {}
}