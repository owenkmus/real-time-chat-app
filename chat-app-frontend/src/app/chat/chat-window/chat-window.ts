import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';

// Interfaces para tipar los datos
interface ChatRoom {
  id: number;
  name: string;
}

interface Message {
  id: number;
  content: string;
  timestamp: string;
  roomId: number;
  user: {
    username: string;
  };
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.html',
  standalone: false,
  styleUrls: ['./chat-window.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  chatRooms: ChatRoom[] = [];
  messages: Message[] = [];
  selectedRoom: ChatRoom | null = null;
  messageForm: FormGroup;
  createRoomForm: FormGroup;
  private messageSubscription!: Subscription;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private fb: FormBuilder
  ) {
    this.messageForm = this.fb.group({
      content: ['', Validators.required]
    });

    this.createRoomForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadChatRooms();
    this.setupMessageListener();
  }

  loadChatRooms(): void {
    this.chatService.getChatRooms().subscribe((rooms: ChatRoom[]) => {
      this.chatRooms = rooms;
      if (rooms.length > 0 && !this.selectedRoom) {
        this.selectRoom(rooms[0]);
      }
    });
  }

  setupMessageListener(): void {
    this.messageSubscription = this.socketService.onNewMessage().subscribe((message: Message) => {
      if (this.selectedRoom && message.roomId === this.selectedRoom.id) {
        this.messages.push(message);
      }
    });
  }

  selectRoom(room: ChatRoom): void {
    this.selectedRoom = room;
    if (room) {
      this.socketService.joinRoom(room.id.toString());
      this.chatService.getMessagesForRoom(room.id).subscribe((messages: Message[]) => {
        this.messages = messages;
      });
    } else {
      this.messages = [];
    }
  }

  sendMessage(): void {
    if (this.messageForm.valid && this.selectedRoom) {
      const content = this.messageForm.value.content;
      this.socketService.sendMessage(this.selectedRoom.id.toString(), content);
      this.messageForm.reset();
    }
  }

  onCreateRoom(): void {
    if (this.createRoomForm.valid) {
      const roomName = this.createRoomForm.value.name;
      this.chatService.createChatRoom(roomName).subscribe({
        next: (newRoom: ChatRoom) => {
          this.chatRooms.push(newRoom);
          this.selectRoom(newRoom);
          this.createRoomForm.reset();
        },
        error: (err) => {
          console.error('Error al crear la sala', err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}

