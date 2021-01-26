import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class CommunicationDashboardComponent implements OnInit {

  users: User[] = [];
  messages: Message[] = [];
  messagesCache!: Observable<Message[]>;

  searchWord: string = '';
  searchUserID: number = 0;

  constructor(private titleService: Title, private router: Router, private communicationService: CommunicationService) {
    this.titleService.setTitle("Communicatie Dashboard - Smart City Herentals");
    this.loadMessages();
    this.loadUsers();
  }

  ngOnInit(): void {
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

  loadMessages() {
    this.messagesCache = this.communicationService.getMessagesWithUser();
    this.messagesCache.subscribe(
      result => this.messages = result,
    )
  }

  loadUsers() {
    this.communicationService.getUsers().subscribe(
      result => this.users = result,
    )
  }

  filterMessages() {
    this.messagesCache.pipe(
      map(array => {
        return array.filter(message => this.searchWord == null ? true :
          message.title.toLowerCase().includes(this.searchWord.toLowerCase()) ||
          message.body.toLowerCase().includes(this.searchWord.toLowerCase())
        )
      }),
      map(array => {
        return array.filter(message => this.searchUserID == 0 ? true :
          message.user.id.toString().includes(this.searchUserID.toString())
        )
      })
    ).subscribe(
      result => this.messages = result
    )
  }

  editMessage(messageID: number) {
    this.router.navigate(['communicatie/bericht-wijzigen/' + messageID]);
  }

  deleteMessage(messageID: number) {

  }

}
