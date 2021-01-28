import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyAdd } from 'src/app/shared/models/survey-add.model';
import { Survey } from 'src/app/shared/models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(private http: HttpClient) { }

  //private url = "http://smartcityapi.seppealaerts.be/api";
  private url = "http://localhost:8000/api";

  getSurveysWithUser(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.url + '/surveys/withuser');
  }

  getSurveyComplete(id: number): Observable<Survey> {
    return this.http.get<Survey>(this.url + '/surveys/complete/' + id);
  }

  updateSurveyComplete(survey: Survey): Observable<Survey> {
    return this.http.put<Survey>(this.url + '/surveys/complete/' + survey.id, survey);
  }

  addSurveyComplete(survey: SurveyAdd): Observable<Survey> {
    return this.http.post<Survey>(this.url + '/surveys/complete', survey);
  }

  deleteUser(id: number) {
    return this.http.delete<Survey>(this.url + '/surveys/' + id);
  }

}
