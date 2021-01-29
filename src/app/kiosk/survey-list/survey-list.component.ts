import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Survey } from 'src/app/shared/models/survey.model';
import { KioskService } from '../services/kiosk.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {
  surveys: Survey[] = [];

  constructor(private titleService: Title, private kioskService: KioskService, private router: Router) {
    this.titleService.setTitle("Bevragingen - Smart City Herentals");
    this.loadSurveys();
  }

  ngOnInit(): void {
  }

  loadSurveys() {
    this.kioskService.getSurveys().subscribe(
      result => this.surveys = result,
    )
  }

  goToSurvey(surveyID: number) {
    console.log(surveyID)
  }

  redirectTo() {
    this.router.navigate(['kiosk/home']);
  }

}
