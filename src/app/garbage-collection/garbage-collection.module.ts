import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ZonesListComponent } from './zones-list/zones-list.component';



@NgModule({
  declarations: [DashboardComponent, ZonesListComponent],
  imports: [
    CommonModule
  ]
})
export class GarbageCollectionModule { }
