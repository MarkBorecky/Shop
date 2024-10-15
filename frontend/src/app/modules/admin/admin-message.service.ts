import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminMessageService {
  messages: Array<string> = [];
  subject = new Subject<Array<string>>();

  constructor() {}

  clear() {
    this.messages = [];
  }

  addBackendErrors(error: any): void {
    this.clear();
    this.extractMessages(error);
    this.subject.next(this.messages);
  }

  private extractMessages(error: any) {
    if (error.errors?.length > 0) {
      for (let message of error.errors) {
        const errorMessage = (message.field && message.defaultMessage) ?
            `Pole: ${message.field} -> ${message.defaultMessage}` :
            `${message.error}, ${message.message}`
        this.messages.push(errorMessage);
      }
    } else {
      this.messages.push(error.messages);
    }
  }
}
