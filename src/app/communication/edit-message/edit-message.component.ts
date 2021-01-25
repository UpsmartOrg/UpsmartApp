import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, private communicationService: CommunicationService) {
    this.titleService.setTitle("Bericht Wijzigen - Smart City Herentals");
    this.messageID = this.route.snapshot.params['messageID'];
    this.loadMessage();
  }

  ngOnInit(): void {
  }

  loadMessage() {
    this.communicationService.getMessage(this.messageID).subscribe(
      result => this.message = result
    )
  }

  updateMessage() {
    this.loading = true;
    this.communicationService.updateMessage(this.message).subscribe(
      result => this.router.navigate(['/communicatie/dashboard'])
    );
    ;
  }

}
