import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AdminDashboardComponent, AddUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
