import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private rourter: Router) {}

  canActivate() {
    if (this.authService.isLoggned()) {
      this.rourter.navigate(['/dashboard']);
      return true;
    } else {
      this.rourter.navigate(['']);
      return false;
    }
  }
}
