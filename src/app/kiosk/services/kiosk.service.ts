import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/shared/models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class KioskService {

  constructor(private http: HttpClient) { }

  private url = "http://smartcityapi.seppealaerts.be/api";

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.url + '/surveys');
  }

  getSurvey(surveyID: number): Observable<Survey> {
    return this.http.get<Survey>(this.url + '/surveys/' + surveyID);
  }

  
}
