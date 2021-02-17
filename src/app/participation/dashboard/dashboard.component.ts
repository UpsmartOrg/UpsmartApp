import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { WarningDialogComponent } from 'src/app/shared/dialogs/warning-dialog/warning-dialog.component';
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

  loadingSurveys: boolean = true;

  constructor(private titleService: Title, private router: Router, private participationService: ParticipationService, private alertService: AlertService, private dialog: MatDialog) {
    this.titleService.setTitle("Participatie Dashboard - Smart City Herentals");
    this.loadSurveys();
    this.loadUsers();
  }

  ngOnInit(): void {
  }

  loadSurveys() {
    this.loadingSurveys = true;
    this.surveysCache = this.participationService.getSurveysWithUser();

    this.surveysCache.subscribe(
      result => {
        this.surveys = result;
        this.loadingSurveys = false;
      },
      error => {
        this.alertService.error('Er is iets misgelopen...', 'Enquêtes konden niet worden geladen. Probeer het later opnieuw.');
        this.loadingSurveys = false;
      }
    );
  }

  loadUsers() {
    this.participationService.getUsers().subscribe(
      result => this.users = result,
      error => this.alertService.error('Er is iets misgelopen...', 'Gebruikers konden niet worden geladen. Probeer het later opnieuw.')
    );
  }

  filterSurveys() {
    this.loadingSurveys = true;
    this.surveys = [];
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
      result => {
        this.surveys = result;
        this.loadingSurveys = false;
      },
      error => {
        this.alertService.error('Er is iets misgelopen...', 'Enquêtes konden niet worden geladen. Probeer het later opnieuw.');
        this.loadingSurveys = false;
      }
    );
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

  editSurvey(id: number) {
    this.router.navigate(['/participatie/enquete-wijzigen/' + id]);
  }

  deleteDialog(survey: Survey) {
    var message: string = "Ben je zeker dat je de enquête " + survey.name + " wil verwijderen?\n"

    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: message,
      height: '300',
      width: '500',
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == "confirm") {
          this.deleteSurvey(survey);
        }
      });
  }

  deleteSurvey(deleteSurvey: Survey) {
    this.participationService.deleteSurvey(deleteSurvey.id).subscribe({
      next: () => this.alertService.success('Enquête verwijderd.', 'Enquête werd succesvol verwijderd.'),
      error: () => this.alertService.error('Er is iets misgelopen...', 'Enquête kon niet worden verwijderd. Probeer het later opnieuw.')
    });

    this.loadingSurveys = true;

    this.surveysCache = this.surveysCache.pipe(
      map(array => {
        return array.filter(survey => survey.id != deleteSurvey.id)
      })
    );
    this.filterSurveys();
  }

}
