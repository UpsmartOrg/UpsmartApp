import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Message } from '../../shared/models/message.model';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent implements OnInit {

  constructor(private titleService: Title, private router: Router, private communicationService: CommunicationService) {
    this.titleService.setTitle("Bericht Toevoegen - Smart City Herentals");
   }

  ngOnInit(): void {
  }

}
