import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from 'src/app/shared/models/message.model';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class CommunicationDashboardComponent implements OnInit {

  messages: Message[] = [];

  constructor(private titleService: Title, private router: Router, private communicationService: CommunicationService) {
    this.titleService.setTitle("Communicatie Dashboard - Smart City Herentals");
    this.loadMessages();
  }

  ngOnInit(): void {
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

  loadMessages() {
    this.communicationService.getMessagesWithUser().subscribe(
      result => this.messages = result,
    )
  }

  editMessage(messageID: number) {
    this.router.navigate(['communicatie/bericht-wijzigen/' + messageID]);
  }

  deleteMessage(messageID: number) {

  }

}
