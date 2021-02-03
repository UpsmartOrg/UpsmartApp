import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarbageDashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { EditBinInfoComponent } from './edit-bin-info/edit-bin-info.component';



@NgModule({
  declarations: [GarbageDashboardComponent, EditBinInfoComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class GarbageCollectionModule { }
