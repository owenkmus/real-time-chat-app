import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  // URL de tu servidor de backend
  private readonly socketUrl: string = 'http://localhost:3000';

  constructor(private authService: AuthService) { }

  /**
   * Establece la conexión con el servidor de Socket.IO.
   * Debe llamarse después de que el usuario inicie sesión.
   */
  connect(): void {
    const token = this.authService.getToken();
    if (token) {
      this.socket = io(this.socketUrl, {
        // Envía el token de autenticación en la conexión inicial
        auth: {
          token: token
        }
      });

      this.socket.on('connect', () => {
        console.log('Socket connected successfully:', this.socket.id);
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    }
  }

  /**
   * Emite un evento para unirse a una sala de chat específica.
   * @param roomId - El ID de la sala a la que se quiere unir.
   */
  joinRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('join_room', roomId);
    }
  }

  /**
   * Emite un evento para enviar un mensaje a la sala actual.
   * @param message - El contenido del mensaje.
   * @param roomId - El ID de la sala donde se envía el mensaje.
   */
  sendMessage(message: string, roomId: string): void {
    if (this.socket) {
      this.socket.emit('send_message', { content: message, roomId });
    }
  }

  /**
   * Escucha los nuevos mensajes que llegan desde el servidor.
   * @returns Un Observable que emite cada nuevo mensaje recibido.
   */
  onNewMessage(): Observable<any> {
    return new Observable(observer => {
      if (this.socket) {
        this.socket.on('receive_message', (message) => {
          observer.next(message);
        });
      }
    });
  }

  /**
   * Se desconecta del servidor de Socket.IO.
   * Debe llamarse cuando el usuario cierra la sesión.
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

