import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

// Se añade una interfaz para definir la forma de la respuesta del login.
interface LoginResponse {
  accessToken: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: false,
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        // CORRECCIÓN 2: Se añade el tipo a la respuesta para evitar el error 'any'.
        next: (response: LoginResponse) => {
          localStorage.setItem('accessToken', response.accessToken);
          this.router.navigate(['/chat']);
        },
        // CORRECCIÓN 3: Se añade un tipo al objeto de error.
        error: (err: HttpErrorResponse) => {
          console.error('Login failed', err);
          this.errorMessage = 'Email o contraseña incorrectos. Por favor, inténtalo de nuevo.';
        }
      });
    }
  }
}

