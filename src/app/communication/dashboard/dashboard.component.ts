import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { CommunicationService } from '../services/communication.service';
import { WarningDialogComponent } from 'src/app/shared/dialogs/warning-dialog/warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private titleService: Title, private router: Router, private communicationService: CommunicationService, public dialog: MatDialog) {
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
    this.messages = [];
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

  deleteDialog(message: Message): void {
    var deleteMessage: string = "Ben je zeker dat je de dit bericht wil verwijderen?\n"

    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: deleteMessage,
      height: '300',
      width: '500',
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == "confirm") {
          this.messages = [];
          this.communicationService.deleteMessage(message.id).subscribe(
            () => this.filterMessages()
          )
        }
      });
  }

}
