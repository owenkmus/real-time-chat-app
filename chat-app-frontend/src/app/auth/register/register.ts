import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: false,
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Se ejecuta cuando el usuario envía el formulario de registro.
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          // Si el registro es exitoso, redirige al usuario a la página de login.
          console.log('User registered successfully', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          // Si hay un error, lo muestra en la consola y en la UI.
          console.error('Registration failed', err);
          this.errorMessage = 'El registro falló. El usuario o email ya podría existir.';
        }
      });
    }
  }
}

