import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertService } from './shared/alert/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Herentals Smart City';

  constructor(updates: SwUpdate, private alertService: AlertService) {
    updates.available.subscribe(
      event => this.alertService.info('Nieuwe versie beschikbaar!', "<a href=\"http://smartcity.seppealaerts.be\" class=\"text-body\">Klik hier om te updaten</a>")

    )
  }
}
