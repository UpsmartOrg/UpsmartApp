import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { WarningDialogComponent } from 'src/app/shared/dialogs/warning-dialog/warning-dialog.component';
import { BinInfo } from 'src/app/shared/models/bin-info.model';
import { Zone } from 'src/app/shared/models/zone.model';
import { GarbageCollectionService } from '../services/garbage-collection.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class GarbageDashboardComponent implements OnInit {

  zones: Zone[] = [];
  binInfoList: BinInfo[] = [];
  binInfoListCache!: Observable<BinInfo[]>;

  searchWord: string = '';
  searchZoneID: number = 0;

  constructor(private titleService: Title, private garbageCollectionService: GarbageCollectionService, 
    private alertService: AlertService, private router: Router, private dialog: MatDialog) {
    this.titleService.setTitle("Groendienst Dashboard - Smart City Herentals");
    this.loadBinInfo();
    this.loadZones();
  }

  ngOnInit(): void {
  }

  loadBinInfo() {
    this.binInfoListCache = this.garbageCollectionService.getBinInfoList();
    this.binInfoListCache.subscribe(
      result => this.binInfoList = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De vuilbakken konden niet worden geladen. Probeer het later opnieuw.')
    )
  }

  loadZones() {
    this.garbageCollectionService.getZones().subscribe(
      result => this.zones = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De zones konden niet worden geladen. Probeer het later opnieuw.')
    );
  }

  filterBinInfoList() {
    this.binInfoListCache.pipe(
      map(array => {
        return array.filter(binInfo => this.searchZoneID == 0 ? true :
          binInfo.zone_id == this.searchZoneID
        )
      }), map(array => {
        return array.filter(binInfo => this.searchWord == null ? true : (
          binInfo.name.toLowerCase().includes(this.searchWord.toLowerCase())
        ))
      })
    ).subscribe(
      result => this.binInfoList = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De vuilbakken konnen niet worden gefilterd.')
    );
  }




  editBinInfo(binInfoID: number) {
    this.router.navigate(['groendienst/bininfo-wijzigen/' + binInfoID]);
  }

  deleteDialog(binInfo: BinInfo) {
    var message: string = "Ben je zeker dat je de vuilbak " + binInfo.name + " wil verwijderen?\n"

    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: message,
      height: '300',
      width: '500',
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == "confirm") {
          this.deleteUser(binInfo.id);
        }
      });
  }

  deleteUser(binInfoID: number) {
    this.garbageCollectionService.deleteBinInfo(binInfoID).subscribe(
      () => {
        this.removeFromUserList(binInfoID)
        this.alertService.success('Vuilbak verwijderd.', 'De vuilbak werd succesvol verwijderd.')
      },
      error => this.alertService.error('Er is iets misgelopen...', 'De vuilbak kon niet worden verwijderd. Probeer het later opnieuw.')
    );
  }

  removeFromUserList(userID: number) {
    this.binInfoListCache = this.binInfoListCache.pipe(
      map(array => {
        return array.filter(user => user.id != userID)
      })
    );
    this.filterBinInfoList();
  }
}
