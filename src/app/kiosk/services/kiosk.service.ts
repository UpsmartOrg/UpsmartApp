import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/shared/models/message.model';
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

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/information');
  }

  getMessage(messageID: number): Observable<Message> {
    return this.http.get<Message>(this.url + '/information/' + messageID);
  }


}
