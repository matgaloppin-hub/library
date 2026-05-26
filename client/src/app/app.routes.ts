import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Subscribe } from './components/subscribe/subscribe';
import { Home } from './components/home/home';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'subscribe', component: Subscribe},
  {path: 'home', component: Home, canActivate: [authGuard]},
  {path: 'reservation/:id', loadComponent: () => import('./components/reservations/reservation.component').then(m => m.ReservationComponent), canActivate: [authGuard]},
  {path: '**', redirectTo: 'login'}
];
