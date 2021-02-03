import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarbageDashboardComponent } from './dashboard/dashboard.component';
import { ZonesListComponent } from './zones-list/zones-list.component';
import { SharedModule } from '../shared/shared.module';
import { EditBinInfoComponent } from './edit-bin-info/edit-bin-info.component';
import { AddZoneComponent } from './add-zone/add-zone.component';



@NgModule({
  declarations: [GarbageDashboardComponent, EditBinInfoComponent, ZonesListComponent, AddZoneComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class GarbageCollectionModule { }
