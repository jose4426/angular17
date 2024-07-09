// src/app/chat.service.ts
import { Injectable } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    private socket$: WebSocketSubject<any>;

    constructor() {
      this.socket$ = new WebSocketSubject('ws://localhost:8088/chat');
    }
  
    sendMessage(msg: string) {
      this.socket$.next(msg);
    }
  
    getMessages() {
      return this.socket$.asObservable();
    }
}
