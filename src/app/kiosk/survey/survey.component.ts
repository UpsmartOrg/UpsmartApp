import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Survey } from 'src/app/shared/models/survey.model';
import { KioskService } from '../services/kiosk.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  surveyID!: number;
  survey!: Survey;

  constructor(private titleService: Title, private route: ActivatedRoute, private kioskService: KioskService) {
    this.titleService.setTitle("Bevraging invullen - Smart City Herentals");
    this.surveyID = this.route.snapshot.params['surveyID'];
    this.loadSurvey(this.surveyID);
  }

  ngOnInit(): void {
  }

  loadSurvey(surveyID: number) {
    this.kioskService.getSurvey(surveyID).subscribe(
      result => this.survey = result,
    )
  }
}
