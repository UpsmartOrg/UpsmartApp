import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarbageDashboardComponent } from './dashboard/dashboard.component';
import { ZonesListComponent } from './zones-list/zones-list.component';



@NgModule({
  declarations: [GarbageDashboardComponent, ZonesListComponent],
  imports: [
    CommonModule
  ]
})
export class GarbageCollectionModule { }
