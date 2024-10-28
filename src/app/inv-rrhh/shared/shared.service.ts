import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Message} from '../interfaces/shared-interface'


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private messageSubject = new BehaviorSubject<Message | null>(null); // Permitir null si es necesario
  message$ = this.messageSubject.asObservable();

  send(message: Message) {
    this.messageSubject.next(message);
  }
}
