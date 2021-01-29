import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Message } from 'src/app/shared/models/message.model';
import { KioskService } from '../services/kiosk.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {

  messages: Message[] = [];

  constructor(private titleService: Title, private kioskService: KioskService, private router: Router) {
    this.titleService.setTitle("Stadsnieuws - Smart City Herentals");
    this.loadMessages();
  }

  ngOnInit(): void {
  }

  loadMessages() {
    this.kioskService.getMessages().subscribe(
      result => this.messages = result
    )
  }

  goToMessage(messageID: number) {
    this.router.navigate(['kiosk/stadsnieuws/' + messageID]);
  }
}