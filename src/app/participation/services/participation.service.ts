import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyAdd } from 'src/app/shared/models/survey-add.model';
import { Survey } from 'src/app/shared/models/survey.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(private http: HttpClient) { }

  private url = "http://smartcityapi.seppealaerts.be/api";

  getSurveysWithUser(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.url + '/surveys/withuser');
  }

  getSurveyComplete(id: number): Observable<SurveyAdd> {
    return this.http.get<SurveyAdd>(this.url + '/surveys/complete/' + id);
  }

  updateSurveyComplete(survey: SurveyAdd): Observable<Survey> {
    return this.http.put<Survey>(this.url + '/surveys/complete/' + survey.id, survey);
  }

  addSurveyComplete(survey: SurveyAdd): Observable<Survey> {
    return this.http.post<Survey>(this.url + '/surveys/complete', survey);
  }

  deleteSurvey(id: number) {
    return this.http.delete<Survey>(this.url + '/surveys/' + id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }

}
