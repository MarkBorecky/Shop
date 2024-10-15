import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AdminMessageService } from '../admin-message.service';
import { NgForOf, NgIf } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';

@Component({
  selector: 'app-admin-message',
  standalone: true,
  imports: [MatIconButton, MatIcon, NgIf, NgForOf, FlexModule],
  templateUrl: './admin-message.component.html',
  styleUrl: './admin-message.component.scss',
})
export class AdminMessageComponent implements OnInit, OnDestroy {
  private clickCounter = 0;
  messages: Array<string> = [];

  constructor(
      private readonly adminMessageService: AdminMessageService
  ) {}

  ngOnInit(): void {
    this.adminMessageService.subject.subscribe((messages) => {
      this.messages = messages;
      this.timeoutCloseMessages();
    });
  }

  clearMessages() {
    this.messages = [];
    this.adminMessageService.clear();
  }

  ngOnDestroy(): void {
    this.adminMessageService.subject.unsubscribe();
  }

  private timeoutCloseMessages() {
    this.clickCounter++;
    setTimeout(() => {
      if (this.clickCounter == 1) {
        this.clearMessages();
      }
      this.clickCounter--;
    }, 12000);
  }
}
