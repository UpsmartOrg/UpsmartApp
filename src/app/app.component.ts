import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertService } from './shared/alert/services/alert.service';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Herentals Smart City';

  isConnected: boolean = true;

  constructor(private updates: SwUpdate, private alertService: AlertService, private connectionService: ConnectionService) {
    this.updates.available.subscribe(
      event => this.alertService.info('Nieuwe versie beschikbaar!', "<a href=\"http://smartcity.seppealaerts.be\" class=\"text-body\">Klik hier om te updaten</a>")

    )

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (!this.isConnected) {
        this.alertService.warn('Je bent offline.', 'Ga online om de app te gebruiken.')
      }
    })
  }
}
