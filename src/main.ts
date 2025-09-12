import { bootstrapApplication } from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from './components/header/header.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroMagnifyingGlass,
  heroUserGroup,
  heroExclamationTriangle,
  heroPhone,
  heroEnvelope,
  heroMapPin,
  heroCalendarDays,
  heroEye,
  heroEyeSlash,
  heroShare,
  heroPrinter,
  heroInformationCircle,
  heroArrowLeft,
  heroBars3,
  heroXMark,
  heroPlus,
  heroCheck,
  heroUser,
  heroLockClosed,
  heroHome,
  heroCog6Tooth
} from '@ng-icons/heroicons/outline';
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, NgIconsModule],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header></app-header>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class App implements OnInit {
  ngOnInit() {
    initFlowbite();
  }
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    NgIconsModule.withIcons({
      heroMagnifyingGlass,
      heroUserGroup,
      heroExclamationTriangle,
      heroPhone,
      heroEnvelope,
      heroMapPin,
      heroCalendarDays,
      heroEye,
      heroEyeSlash,
      heroShare,
      heroPrinter,
      heroInformationCircle,
      heroArrowLeft,
      heroBars3,
      heroXMark,
      heroPlus,
      heroCheck,
      heroUser,
      heroLockClosed,
      heroHome,
      heroCog6Tooth
    }).providers || []
  ]
});