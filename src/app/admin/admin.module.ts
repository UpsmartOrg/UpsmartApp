import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';



@NgModule({
  declarations: [DashboardComponent, AddUserComponent, EditUserComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
