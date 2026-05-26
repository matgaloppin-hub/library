import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private cookieService = inject(CookieService);
  private router = inject(Router);

  isLoggedIn(): boolean {
    const token = this.cookieService.get('token');
    console.log('Token:', token);
    if (!token) {
      return false;
    }

    try {

      // Décodage du JWT
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Vérification expiration
      const expiration = payload.exp * 1000;

      if (Date.now() > expiration) {

        this.logout();
        return false;
      }

      return true;

    } catch (e) {

      this.logout();
      return false;
    }
  }

  logout(): void {

    this.cookieService.delete('token', '/');

    this.router.navigate(['/login']);
  }
}