import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { Zone } from 'src/app/shared/models/zone.model';
import { GarbageCollectionService } from '../services/garbage-collection.service';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss']
})
export class AddZoneComponent implements OnInit {

  zone!: Zone;
  loading: boolean = false;

  constructor(private titleService: Title, private router: Router, public garbageCollectionService: GarbageCollectionService, private alertService: AlertService) {
    this.titleService.setTitle("Zone Toevoegen - Smart City Herentals");
    this.zone = new Zone(0, "", "");
  }

  ngOnInit(): void {
  }

  addZone() {
    this.loading = true;
    this.garbageCollectionService.postZone(this.zone).subscribe({
      next: () => {
        this.router.navigate(['/groendienst/zones'])
        this.alertService.success('Zone toegevoegd.', 'De zone werd succesvol toegevoegd.')
      },
      error: () => this.alertService.error('Er is iets misgelopen...', 'De zone kon niet worden toegevoegd. Probeer het later opnieuw.')
    })
  }

}
