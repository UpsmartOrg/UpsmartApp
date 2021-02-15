import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { BinInfo } from 'src/app/shared/models/bin-info.model';
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

  zoneBins!: BinInfo[];
  zonelessBins!: BinInfo[];
  selectedZonelessBinIndex: number = -1;
  selectedZoneBinIndex: number = -1;

  loading: boolean = false;
  loadingZone: boolean = true;

  constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, private garbageCollectionService: GarbageCollectionService, private alertService: AlertService) {
    this.titleService.setTitle("Zone Wijzigen - Smart City Herentals");
    this.zoneID = this.route.snapshot.params['zoneID'];
    this.loadZone();
    this.loadBinInfo();
  }

  ngOnInit(): void {
  }

  loadZone() {
    this.garbageCollectionService.getZone(this.zoneID).subscribe(
      result => {
        this.zone = result;
        this.loadingZone = false;
      },
      error => {
        this.alertService.error('Er is iets misgelopen...', 'De zone kon niet worden geladen. Probeer het later opnieuw.');
        this.loadingZone = false;
      }
    )
  }

  loadBinInfo() {
    this.garbageCollectionService.getBinInfoListByZone(this.zoneID).subscribe(
      result => this.zoneBins = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De vuilbakken van de zone konden niet worden geladen. Probeer het later opnieuw.')
    )
    this.garbageCollectionService.getBinInfoListNozone().subscribe(
      result => this.zonelessBins = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De vuilbakken zonder konden kon niet worden geladen. Probeer het later opnieuw.')
    )
  }

  updateBins() {
    this.loading = true;
    var bin_id_list: number[] = [];
    this.zoneBins.forEach(bin => bin_id_list.push(bin.id));
    this.garbageCollectionService.updateZoneBins(this.zone.id, bin_id_list).subscribe({
      next: () => {
        this.updateZone();
      },
      error: () => {
        this.loading = false;
        this.alertService.error('Er is iets misgelopen...', 'De vuilbakken werden niet toegevoegd. Probeer het later opnieuw.');
        this.updateZone();
      }
    }
    );
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

  addBinToZone() {
    if (this.selectedZonelessBinIndex != -1) {
      this.zoneBins.push(this.zonelessBins[this.selectedZonelessBinIndex]);
      this.zonelessBins.splice(this.selectedZonelessBinIndex, 1);
      this.selectedZonelessBinIndex = 0;
      if (this.zonelessBins.length == 0) {
        this.selectedZonelessBinIndex = -1;
      }
    }
  }

  removeBinFromZone() {
    if (this.selectedZoneBinIndex != -1) {
      this.zonelessBins.push(this.zoneBins[this.selectedZoneBinIndex]);
      this.zoneBins.splice(this.selectedZoneBinIndex, 1);
      this.selectedZoneBinIndex = 0;
      if (this.zoneBins.length == 0) {
        this.selectedZoneBinIndex = -1;
      }
    }
  }

}
