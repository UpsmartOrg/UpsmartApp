import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { BinInfo } from 'src/app/shared/models/bin-info.model';
import { Zone } from 'src/app/shared/models/zone.model';
import { GarbageCollectionService } from '../services/garbage-collection.service';

@Component({
  selector: 'app-edit-bin-info',
  templateUrl: './edit-bin-info.component.html',
  styleUrls: ['./edit-bin-info.component.scss']
})
export class EditBinInfoComponent implements OnInit {

  loading: boolean = false;
  loadingBin = true;

  zones: Zone[] = [];

  binInfoID!: number;
  binInfo!: BinInfo;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private garbageCollectionService: GarbageCollectionService, private alertService: AlertService) {
    this.binInfoID = this.activeRoute.snapshot.params['binInfoID'];
    this.loadBinInfo();
    this.loadZones();
  }

  ngOnInit(): void {
  }

  loadBinInfo() {
    this.loadingBin = true;
    this.garbageCollectionService.getBinInfo(this.binInfoID).subscribe(
      result => {
        this.binInfo = result;
        this.loadingBin = false;
      },
      error => {
        this.alertService.error('Er is iets misgelopen...', 'De vuilbak konden niet worden geladen. Probeer het later opnieuw.');
        this.loadingBin = false;
      }
    );
  }

  loadZones() {
    this.garbageCollectionService.getZones().subscribe(
      result => this.zones = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De zones konden niet worden geladen. Probeer het later opnieuw.')
    );
  }

  loadLatestCoords() {
    this.garbageCollectionService.loadLatestBinCoords(this.binInfoID).subscribe({
      next: (result) => {
        this.binInfo = result;
        this.alertService.error('Vuilbak is aangepast', 'De meest recent coördinaten zijn ingeladen.');
      },
      error: () => {
        this.alertService.error('Er is iets misgelopen...', 'De coordinaten konden niet worden geladen. Probeer het later opnieuw.');
      }
    });
  }

  updateBinInfo() {
    this.loading = true;
    this.garbageCollectionService.updateBinInfo(this.binInfo).subscribe({
      next: () => {
        this.router.navigate(['/groendienst/dashboard']);
        this.alertService.success('Vuilbak gewijzigd', 'De vuilbak werd succesvol gewijzigd.')
      },
      error: () => {
        this.alertService.error('Er is iets misgelopen...', 'De vuilbak kon niet worden gewijzigd. Probeer het later opnieuw.');
        this.loading = false;
      }
    });
  }

}
