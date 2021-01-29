import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Survey } from 'src/app/shared/models/survey.model';
import { User } from 'src/app/shared/models/user.model';
import { ParticipationService } from '../services/participation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class ParticipationDashboardComponent implements OnInit {

  surveys: Survey[] = [];
  surveysCache!: Observable<Survey[]>;
  users!: User[];
  
  searchUserID: number = 0;
  searchWord: string = '';

  constructor(private titleService: Title, private router: Router, private participationService: ParticipationService) {
    this.titleService.setTitle("Participatie Dashboard - Smart City Herentals");
    this.loadSurveys();
    this.loadUsers();
  }

  ngOnInit(): void {
  }

  loadSurveys() {
    this.surveysCache = this.participationService.getSurveysWithUser();

    this.surveysCache.subscribe(
      result => this.surveys = result,
    );
  }

  loadUsers() {
    this.participationService.getUsers().subscribe(
      result => this.users = result,
      () => console.log(this.users)
    );
  }

  filterSurveys() {
    this.surveysCache.pipe(
      map(array => {
        return array.filter(survey => this.searchUserID == 0 ? true :
          survey.user_id == this.searchUserID
        )
      }), map(array => {
        return array.filter(survey => this.searchWord == null ? true : (
          survey.name.toLowerCase().includes(this.searchWord.toLowerCase())
        ))
      })
    ).subscribe(
      result => this.surveys = result
    );
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

  editSurvey(id: number) {
    this.router.navigate(['/participatie/enquete-wijzigen/' + id]);
  }

  deleteSurvey(survey: Survey) {

  }

}
