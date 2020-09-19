import { CanActivate, Router } from '@angular/router/';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.getCurrentUser().isAdmin) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
