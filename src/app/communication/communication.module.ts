import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationDashboardComponent } from './dashboard/dashboard.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { EditMessageComponent } from './edit-message/edit-message.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CommunicationDashboardComponent, AddMessageComponent, EditMessageComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CommunicationModule { }
