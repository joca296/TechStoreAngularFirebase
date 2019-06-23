import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  async canActivate() {
    if (await this.auth.isAdmin()) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
