import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';



@NgModule({
  declarations: [HomeComponent, SurveyComponent],
  imports: [
    CommonModule
  ]
})
export class KioskModule { }
