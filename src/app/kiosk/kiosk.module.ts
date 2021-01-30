import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioskHomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { CommunicationComponent } from './communication/communication.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { MaterialModule } from '../shared/material.module'


@NgModule({
  declarations: [KioskHomeComponent, SurveyComponent, SurveyListComponent, CommunicationComponent, MessageDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class KioskModule { }
