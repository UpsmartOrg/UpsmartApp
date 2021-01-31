import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/shared/models/message.model';
import { KioskService } from '../services/kiosk.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {

  messageID!: number;
  message!: Message;

  constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, private kioskService: KioskService) {
    this.titleService.setTitle("Stadsnieuws - Smart City Herentals");
    this.messageID = this.route.snapshot.params['messageID'];
    this.loadMessage();
  }

  ngOnInit(): void {
  }

  loadMessage() {
    this.kioskService.getMessage(this.messageID).subscribe(
      result => this.message = result
    )
  }

  redirectTo() {
    this.router.navigate(['kiosk/stadsnieuws']);
  }

}
