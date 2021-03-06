import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { Message } from 'src/app/shared/models/message.model';
import { KioskService } from '../services/kiosk.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {

  messages: Message[] = [];

  constructor(private titleService: Title, private kioskService: KioskService, private router: Router, private alertService: AlertService) {
    this.titleService.setTitle("Stadsnieuws - Smart City Herentals");
    this.loadMessages();
  }

  ngOnInit(): void {
  }

  loadMessages() {
    this.kioskService.getMessages().subscribe(
      result => this.messages = result,
      error => this.alertService.error('Er is iets misgelopen...', 'Berichten konden niet worden geladen. Probeer het later opnieuw.')
    )
  }

  goToMessage(messageID: number) {
    this.router.navigate(['kiosk/stadsnieuws/' + messageID]);
  }

  redirectTo() {
    this.router.navigate(['kiosk/home']);
  }
}