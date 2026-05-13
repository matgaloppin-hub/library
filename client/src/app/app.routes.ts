import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Subscribe } from './components/subscribe/subscribe';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'subscribe', component: Subscribe}
];
