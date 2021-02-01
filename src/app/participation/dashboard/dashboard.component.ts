import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { Survey } from 'src/app/shared/models/survey.model';
import { ParticipationService } from '../services/participation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class ParticipationDashboardComponent implements OnInit {

  surveys: Survey[] = [];
  surveysCache!: Observable<Survey[]>;

  searchUserID: number = 0;
  searchWord: string = '';

  constructor(private titleService: Title, private router: Router, private participationService: ParticipationService, private alertService: AlertService) {
    this.titleService.setTitle("Participatie Dashboard - Smart City Herentals");
    this.loadSurveys();
  }

  ngOnInit(): void {
  }

  loadSurveys() {
    this.surveysCache = this.participationService.getSurveysWithUser();

    this.surveysCache.subscribe(
      result => this.surveys = result,
      error => this.alertService.error('Er is iets misgelopen...', 'Enquêtes konden niet worden geladen. Probeer het later opnieuw.')
    )
  }

  filterSurveys() {
    this.surveysCache.pipe(
      map(array => {
        return array.filter(survey => this.searchUserID == 0 ? true :
          survey.user_id == this.searchUserID
        )
      }), map(array => {
        return array.filter(survey => this.searchWord == null ? true : (
          survey.name.toLowerCase().includes(this.searchWord.toLowerCase()) ||
          survey.description.toLowerCase().includes(this.searchWord.toLowerCase())
        ))
      })
    ).subscribe(
      result => this.surveys = result,
      error => this.alertService.error('Er is iets misgelopen...', 'Enquêtes konden niet worden geladen. Probeer het later opnieuw.')
    );
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

  editSurvey(id: number) {

  }

  deleteSurvey(survey: Survey) {

  }

}
