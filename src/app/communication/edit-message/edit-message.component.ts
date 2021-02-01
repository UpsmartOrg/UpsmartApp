import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { Message } from '../../shared/models/message.model';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss']
})
export class EditMessageComponent implements OnInit {

  messageID!: number;
  message!: Message;
  loading: boolean = false;

  constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, private communicationService: CommunicationService, private alertService: AlertService) {
    this.titleService.setTitle("Bericht Wijzigen - Smart City Herentals");
    this.messageID = this.route.snapshot.params['messageID'];
    this.loadMessage();
  }

  ngOnInit(): void {
  }

  loadMessage() {
    this.communicationService.getMessage(this.messageID).subscribe(
      result => this.message = result,
      error => this.alertService.error('Er is iets misgelopen...', 'Het bericht kon niet worden geladen. Probeer het later opnieuw.')
    )
  }

  updateMessage() {
    this.loading = true;
    this.communicationService.updateMessage(this.message).subscribe({
      next: () => {
        this.router.navigate(['/communicatie/dashboard'])
        this.alertService.success('Bericht gewijzigd.', 'Het bericht werd succesvol gewijzigd.')
      },
      error: () => this.alertService.error('Er is iets misgelopen...', 'Het bericht kon niet worden gewijzigd. Probeer het later opnieuw.')
    }
    );
    ;
  }

}
