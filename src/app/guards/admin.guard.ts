import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isLoggedIn = this.authService.isAuthenticated();
    const isAdmin = this.authService.isAdmin();
    if (isLoggedIn && isAdmin) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
