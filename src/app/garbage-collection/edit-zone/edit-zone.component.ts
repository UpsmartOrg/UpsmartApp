import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { Zone } from 'src/app/shared/models/zone.model';
import { GarbageCollectionService } from '../services/garbage-collection.service';

@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.scss']
})
export class EditZoneComponent implements OnInit {

  zoneID!: number;
  zone!: Zone;
  loading: boolean = false;

  constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, private garbageCollectionService: GarbageCollectionService, private alertService: AlertService) {
    this.titleService.setTitle("Zone Wijzigen - Smart City Herentals");
    this.zoneID = this.route.snapshot.params['zoneID'];
    this.loadZone();
  }

  ngOnInit(): void {
  }

  loadZone() {
    this.garbageCollectionService.getZone(this.zoneID).subscribe(
      result => this.zone = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De zone kon niet worden geladen. Probeer het later opnieuw.')
    )
  }

  updateZone() {
    this.loading = true;
    this.garbageCollectionService.updateZone(this.zone).subscribe({
      next: () => {
        this.router.navigate(['/groendienst/zones'])
        this.alertService.success('Zone gewijzigd.', 'De zone werd succesvol gewijzigd.')
      },
      error: () => {
        this.loading = false;
        this.alertService.error('Er is iets misgelopen...', 'De zone kon niet worden gewijzigd. Probeer het later opnieuw.');
      }
    }
    );
  }

}
