import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Welcome } from './welcome/welcome';
import { Dashboard } from './dashboard/dashboard';
import { UserRole } from './user-role/user-role';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'welcome',
    component: Welcome,
    canActivate: [authGuard]
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'user-role',
    component: UserRole,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];