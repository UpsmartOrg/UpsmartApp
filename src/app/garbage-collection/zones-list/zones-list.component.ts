import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { WarningDialogComponent } from 'src/app/shared/dialogs/warning-dialog/warning-dialog.component';
import { Zone } from 'src/app/shared/models/zone.model';
import { GarbageCollectionService } from '../services/garbage-collection.service';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.scss']
})
export class ZonesListComponent implements OnInit {

  zones: Zone[] = [];

  loadingZones: boolean = true;

  constructor(private titleService: Title, private garbageCollectionService: GarbageCollectionService, private alertService: AlertService, private router: Router, private dialog: MatDialog) {
    this.titleService.setTitle("Groendienst Dashboard - Smart City Herentals");
    this.loadZones();
  }

  ngOnInit(): void {
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

  editZone(zoneID: number) {
    this.router.navigateByUrl("/groendienst/zones/zone-wijzigen/" + zoneID);
  }

  loadZones() {
    this.loadingZones = true;
    this.garbageCollectionService.getZones().subscribe(
      result => {
        this.zones = result;
        this.loadingZones = false;
      },
      error => {
        this.alertService.error('Er is iets misgelopen...', 'De zones konden niet worden geladen. Probeer het later opnieuw.');
        this.loadingZones = false;
      }
    );
  }

  deleteDialog(zone: Zone) {
    var message: string = "Ben je zeker dat je de zone " + zone.name + " wil verwijderen?\n"

    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: message,
      height: '300',
      width: '500',
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == "confirm") {
          this.deleteBinInfo(zone.id);
        }
      });
  }

  deleteBinInfo(zoneID: number) {
    this.zones = [];
    this.garbageCollectionService.deleteZone(zoneID).subscribe(
      () => {
        this.loadZones();
        this.alertService.success('Zone verwijderd.', 'De zone werd succesvol verwijderd.')
      },
      error => {
        this.alertService.error('Er is iets misgelopen...', 'De zone kon niet worden verwijderd. Probeer het later opnieuw.');
        this.loadZones();
      }
    );
  }
}
