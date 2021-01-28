import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/shared/models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(private http: HttpClient) { }

  //private url = "http://smartcityapi.seppealaerts.be/api";
  private url = "http://localhost:8000/api";

  addSurveyComplete(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.url + '/surveys/complete', survey);
  }


}
