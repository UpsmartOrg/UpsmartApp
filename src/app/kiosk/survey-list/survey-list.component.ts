import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { Survey } from 'src/app/shared/models/survey.model';
import { KioskService } from '../services/kiosk.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {
  surveys: Survey[] = [];

  constructor(private titleService: Title, private kioskService: KioskService, private router: Router, private alertService: AlertService) {
    this.titleService.setTitle("Bevragingen - Smart City Herentals");
    this.loadSurveys();
  }

  ngOnInit(): void {
  }

  loadSurveys() {
    this.kioskService.getSurveys().subscribe(
      result => result.forEach(survey => {
        if (new Date(survey.start_date) <= new Date() && new Date(survey.end_date) >= new Date()) {
          this.surveys.push(survey);
        }
      }),
      error => this.alertService.error('Er is iets misgelopen...', 'Bevragingen konden niet worden opgehaald. Probeer het later opnieuw.')
    )
  }

  goToSurvey(surveyID: number) {
    this.router.navigate(['kiosk/bevraging/' + surveyID]);
  }

  redirectTo() {
    this.router.navigate(['kiosk/home']);
  }

}
