import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { EditMessageComponent } from './edit-message/edit-message.component';



@NgModule({
  declarations: [DashboardComponent, AddMessageComponent, EditMessageComponent],
  imports: [
    CommonModule
  ]
})
export class CommunicationModule { }
