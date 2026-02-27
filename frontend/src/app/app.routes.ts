import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import {Register} from './pages/register/register';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
