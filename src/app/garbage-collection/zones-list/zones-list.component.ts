import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { Zone } from 'src/app/shared/models/zone.model';
import { GarbageCollectionService } from '../services/garbage-collection.service';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.scss']
})
export class ZonesListComponent implements OnInit {

  zones: Zone[] = [];

  constructor(private titleService: Title, private garbageCollectionService: GarbageCollectionService, private alertService: AlertService) {
    this.titleService.setTitle("Groendienst Dashboard - Smart City Herentals");
    this.loadZones();
  }

  ngOnInit(): void {
  }

  loadZones() {
    this.garbageCollectionService.getZones().subscribe(
      result => this.zones = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De zones konden niet worden geladen. Probeer het later opnieuw.'),
    );
  }
}
