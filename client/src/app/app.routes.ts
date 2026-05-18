import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Subscribe } from './components/subscribe/subscribe';
import { Book } from './components/book/book';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'subscribe', component: Subscribe},
  {path: 'book', component: Book}
];
