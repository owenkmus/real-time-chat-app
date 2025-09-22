import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Decide si una ruta puede ser activada.
   * @returns true si el usuario está logueado, de lo contrario redirige a /login y retorna false.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn()) {
      // Si el usuario está autenticado, permite el acceso a la ruta.
      return true;
    } else {
      // Si no está autenticado, redirige a la página de login.
      this.router.navigate(['/login']);
      return false;
    }
  }
}