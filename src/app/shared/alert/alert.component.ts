import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from '../models/alert.model';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
  }

}
