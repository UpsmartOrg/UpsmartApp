import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarbageDashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { EditBinInfoComponent } from './edit-bin-info/edit-bin-info.component';
import { AddBinInfoComponent } from './add-bin-info/add-bin-info.component';



@NgModule({
  declarations: [GarbageDashboardComponent, EditBinInfoComponent, AddBinInfoComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class GarbageCollectionModule { }
