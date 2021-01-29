import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioskHomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyListComponent } from './survey-list/survey-list.component';



@NgModule({
  declarations: [KioskHomeComponent, SurveyComponent, SurveyListComponent],
  imports: [
    CommonModule
  ]
})
export class KioskModule { }
