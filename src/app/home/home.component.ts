import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountService } from '../account/services/account.service';
import { GarbageCollectionService } from '../garbage-collection/services/garbage-collection.service';
import { AlertService } from '../shared/alert/services/alert.service';
import { BinInfo } from '../shared/models/bin-info.model';
import { User } from '../shared/models/user.model';
import { Zone } from '../shared/models/zone.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: User;

  zones: Zone[] = [];
  binInfoList: BinInfo[] = [];
  binInfoListCache!: Observable<BinInfo[]>;

  groendienstRole: boolean = false;
  participatieRole: boolean = false;
  communicatieRole: boolean = false;

  constructor(private titleService: Title, private router: Router, private accountService: AccountService, private alertService: AlertService, private garbageCollectionService: GarbageCollectionService) {
    this.titleService.setTitle("Home - Smart City Herentals");
    this.accountService.userRoles.subscribe({
      next: () => {
        this.checkRoles();
        if (this.groendienstRole) {
          this.loadZones();
        }
      }
    })
  }

  ngOnInit(): void {
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

  checkRoles() {
    this.participatieRole = this.accountService.isParticipatie();
    this.groendienstRole = this.accountService.isGroendienst();
    this.communicatieRole = this.accountService.isCommunicatie();
  }

  loadBinInfo() {
    this.binInfoListCache = this.garbageCollectionService.getBinInfoList().pipe(
      tap(array => {
        array.map(binInfo => {
          binInfo.zone = { name: this.getZoneName(binInfo.zone_id || -1) };
        })
      })
    );
    this.binInfoListCache.subscribe(
      result => this.binInfoList = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De vuilbakken konden niet worden geladen. Probeer het later opnieuw.')
    )
  }

  loadZones() {
    this.garbageCollectionService.getZones().subscribe(
      result => this.zones = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De zones konden niet worden geladen. Probeer het later opnieuw.'),
      () => this.loadBinInfo()
    );
  }

  getZoneName(zoneID: number): string {
    if (zoneID == -1) {
      return "N/A";
    }
    return this.zones[this.zones.findIndex(zone => zone.id == zoneID)].name;
  }

}
