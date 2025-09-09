import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './pages/report/report.component';
import { SearchComponent } from './pages/search/search.component';
import { PersonDetailComponent } from './pages/person-detail/person-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'person/:id', component: PersonDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'about', redirectTo: '/' }, // Placeholder
  { path: 'resources', redirectTo: '/' }, // Placeholder
  { path: '**', redirectTo: '/' }
];