import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Asegúrate de que esta URL coincida con la de tu backend
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  /**
   * Envía las credenciales al backend para iniciar sesión.
   * @param credentials - Objeto con email y password.
   * @returns Un Observable con la respuesta del servidor.
   */
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  /**
   * Envía los datos de un nuevo usuario al backend para registrarlo.
   * @param userData - Objeto con username, email y password.
   * @returns Un Observable con la respuesta del servidor.
   */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /**
   * Cierra la sesión del usuario eliminando el token.
   */
  logout(): void {
    localStorage.removeItem('accessToken');
  }

  /**
   * Obtiene el token de acceso del almacenamiento local.
   * @returns El token como string, o null si no existe.
   */
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Verifica si el usuario ha iniciado sesión comprobando la existencia del token.
   * @returns true si el token existe, false en caso contrario.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

