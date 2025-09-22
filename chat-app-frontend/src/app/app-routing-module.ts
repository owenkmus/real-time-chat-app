import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { ChatWindowComponent } from './chat/chat-window/chat-window';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  // Rutas existentes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatWindowComponent, canActivate: [AuthGuard] },

  // --- INICIO DE LA CORRECCIÓN ---
  // Esta línea le dice a Angular que la ruta vacía ('') debe redirigir a '/login'.
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Opcional pero recomendado: si el usuario escribe cualquier otra cosa, lo redirige al login.
  { path: '**', redirectTo: '/login' }
  // --- FIN DE LA CORRECCIÓN ---
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

