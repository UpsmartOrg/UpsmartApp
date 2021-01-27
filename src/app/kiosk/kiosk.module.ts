import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioskHomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';



@NgModule({
  declarations: [KioskHomeComponent, SurveyComponent],
  imports: [
    CommonModule
  ]
})
export class KioskModule { }
