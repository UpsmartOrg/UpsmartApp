import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

import { KioskHomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { CommunicationComponent } from './communication/communication.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { MaterialModule } from '../shared/material.module';
import { QuestionComponent } from './question/question.component'
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [KioskHomeComponent, SurveyComponent, SurveyListComponent, CommunicationComponent, MessageDetailsComponent, QuestionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientJsonpModule,
    GoogleMapsModule
  ],
  providers: [DatePipe]
})
export class KioskModule { }
