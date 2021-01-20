import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';



@NgModule({
  declarations: [DashboardComponent, AddSurveyComponent],
  imports: [
    CommonModule
  ]
})
export class ParticipationModule { }
