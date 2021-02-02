import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from '../models/alert.model';
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
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        if (!alert.messageTitle || !alert.messageBody) {
          return;
        }

        this.alerts.push(alert);

        setTimeout(() => this.removeAlert(alert), 10000);

      });
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;
    else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = [];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    return classes.join(' ');
  }

}
