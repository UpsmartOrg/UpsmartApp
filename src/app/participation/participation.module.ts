import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipationDashboardComponent } from './dashboard/dashboard.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ParticipationDashboardComponent, AddSurveyComponent, EditSurveyComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class ParticipationModule { }
