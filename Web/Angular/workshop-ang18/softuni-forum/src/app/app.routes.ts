import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AddThemeComponent } from './theme/add-theme/add-theme.component';
import { CurrentThemeComponent } from './theme/current-theme/current-theme.component';
import { ThemesListComponent } from './theme/themes-list/themes-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '404', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'themes',
    children: [
      { path: '', component: MainComponent },
      {
        path: ':themeId',
        component: CurrentThemeComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'add-theme', component: AddThemeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/404' },
];