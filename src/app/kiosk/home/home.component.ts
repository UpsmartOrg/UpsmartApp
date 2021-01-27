import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Survey } from 'src/app/shared/models/survey.model';
import { KioskService } from '../services/kiosk.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class KioskHomeComponent implements OnInit {
  surveys: Survey[] = [];

  constructor(private titleService: Title, private kioskService: KioskService) {
    this.titleService.setTitle("Kiosk Homepage - Smart City Herentals");
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

}
