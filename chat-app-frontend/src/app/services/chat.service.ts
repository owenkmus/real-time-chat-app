import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) { }

  getChatRooms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rooms`);
  }

  getMessagesForRoom(roomId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/rooms/${roomId}/messages`);
  }

  // --- INICIO DE LA ACTUALIZACIÓN ---
  // Nuevo método para crear una sala de chat
  createChatRoom(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/rooms`, { name });
  }
  // --- FIN DE LA ACTUALIZACIÓN ---
}
