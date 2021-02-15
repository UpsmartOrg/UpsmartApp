import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
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

  loadingBins: boolean = true;

  constructor(private titleService: Title, private garbageCollectionService: GarbageCollectionService,
    private alertService: AlertService, private router: Router, private dialog: MatDialog) {
    this.titleService.setTitle("Groendienst Dashboard - Smart City Herentals");
    this.loadZones();
    //LoadBinInfo happens when zone loading is done
  }

  ngOnInit(): void {
  }

  loadBinInfo() {
    this.loadingBins = true;
    this.binInfoListCache = this.garbageCollectionService.getBinInfoList().pipe(
      tap(array => {
        array.forEach(binInfo => {
          binInfo.zone = { name: this.getZoneName(binInfo.zone_id || -1) };
        })
      })
    );
    this.binInfoListCache.subscribe(
      result => {
        this.binInfoList = result;
        this.loadingBins = false;
      },
      error => {
        this.alertService.error('Er is iets misgelopen...', 'De vuilbakken konden niet worden geladen. Probeer het later opnieuw.');
        this.loadingBins = false;
      }
    )
  }

  loadZones() {
    this.garbageCollectionService.getZones().subscribe(
      result => this.zones = result,
      error => {
        this.alertService.error('Er is iets misgelopen...', 'De vuilbakken konden niet worden geladen. Probeer het later opnieuw.');
        this.loadingBins = false;
      },
      () => this.loadBinInfo()
    );
  }

  loadNewBins() {
    this.loadingBins = true;
    this.garbageCollectionService.loadNewBins().subscribe(
      () => this.loadZones(),
      error => {
        this.alertService.error('Er is iets misgelopen...', 'De vuilbakken konden niet worden geladen. Probeer het later opnieuw.');
        this.loadingBins = false;
      },
    )
  }

  setBinInfoZoneNames() {

  }

  filterBinInfoList() {
    this.loadingBins = true;
    this.binInfoList = [];
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
      result => {
        this.binInfoList = result;
        this.loadingBins = false;
      },
      error => {
        this.alertService.error('Er is iets misgelopen...', 'De vuilbakken konnen niet worden gefilterd.');
        this.loadingBins = false;
      }
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
          this.deleteBinInfo(binInfo.id);
        }
      });
  }

  deleteBinInfo(binInfoID: number) {
    this.garbageCollectionService.deleteBinInfo(binInfoID).subscribe(
      () => {
        this.removeFromBinInfoList(binInfoID)
        this.alertService.success('Vuilbak verwijderd.', 'De vuilbak werd succesvol verwijderd.')
      },
      error => this.alertService.error('Er is iets misgelopen...', 'De vuilbak kon niet worden verwijderd. Probeer het later opnieuw.')
    );
  }

  removeFromBinInfoList(binInfoID: number) {
    this.binInfoListCache = this.binInfoListCache.pipe(
      map(array => {
        return array.filter(binInfo => binInfo.id != binInfoID)
      })
    );
    this.filterBinInfoList();
  }

  getZoneName(zoneID: number): string {
    if (zoneID == -1) {
      return "N/A";
    }
    return this.zones[this.zones.findIndex(zone => zone.id == zoneID)].name;
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
