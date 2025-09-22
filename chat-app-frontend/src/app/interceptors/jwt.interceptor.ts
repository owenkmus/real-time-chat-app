import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  /**
   * Intercepta las peticiones HTTP salientes para añadir el token JWT.
   * @param request - La petición saliente.
   * @param next - El siguiente manejador en la cadena.
   * @returns Un Observable del evento HTTP.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    // Si el token existe, clona la petición y añade la cabecera de autorización.
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pasa la petición (modificada o no) al siguiente manejador.
    return next.handle(request);
  }
}

