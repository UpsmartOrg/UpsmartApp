import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/services/account.service';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { MessageAdd } from 'src/app/shared/models/message-add.model';
import { User } from 'src/app/shared/models/user.model';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent implements OnInit {

  message!: MessageAdd;
  user!: User;
  loading: boolean = false;

  constructor(private titleService: Title, private router: Router, private communicationService: CommunicationService, public accountService: AccountService, private alertService: AlertService) {
    this.titleService.setTitle("Bericht Toevoegen - Smart City Herentals");
    this.accountService.user.subscribe(result => {
      this.user = result;
    });
    this.message = new MessageAdd(this.user.id, '', '')
  }

  ngOnInit(): void {
  }

  addMessage() {
    this.loading = true;
    this.communicationService.postMessage(this.message).subscribe({
      next: () => {
        this.router.navigate(['/communicatie/dashboard'])
        this.alertService.success('Bericht toegevoegd.', 'Het bericht werd succesvol toegevoegd.')
      },
      error: () => this.alertService.error('Er is iets misgelopen...', 'Het bericht kon niet worden toegevoegd. Probeer het later opnieuw.')
    })
  }

}
