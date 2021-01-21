import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';



@NgModule({
  declarations: [DashboardComponent, AddSurveyComponent, EditSurveyComponent],
  imports: [
    CommonModule
  ]
})
export class ParticipationModule { }
