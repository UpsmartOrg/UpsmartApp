import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

import { GarbageDashboardComponent } from './dashboard/dashboard.component';
import { ZonesListComponent } from './zones-list/zones-list.component';
import { SharedModule } from '../shared/shared.module';
import { EditBinInfoComponent } from './edit-bin-info/edit-bin-info.component';
import { AddZoneComponent } from './add-zone/add-zone.component';
import { EditZoneComponent } from './edit-zone/edit-zone.component';
@NgModule({
  declarations: [GarbageDashboardComponent, EditBinInfoComponent, ZonesListComponent, AddZoneComponent, EditZoneComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientJsonpModule,
    GoogleMapsModule
  ]
})
export class GarbageCollectionModule { }
